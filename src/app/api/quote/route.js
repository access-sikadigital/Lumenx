import { NextResponse } from "next/server";
import { validateQuote } from "@/lib/quote-validation";
import { SERVICE_SLUGS, labelForSlug } from "@/lib/quote-services";
import { SITE } from "@/lib/site";

/**
 * Quote request endpoint → GoHighLevel inbound webhook.
 *
 * FAILS CLOSED BY DESIGN.
 *
 * Until `QUOTE_WEBHOOK_URL` is set this returns 503 rather than accepting a
 * submission and quietly dropping it, which would lose a real lead and show
 * the customer a success screen that is a lie. The form then tells the
 * visitor to call or email instead, with the real numbers on screen.
 *
 * TO GO LIVE: in GHL create a workflow with the "Inbound Webhook" trigger,
 * copy its URL into QUOTE_WEBHOOK_URL (Vercel → Settings → Environment
 * Variables), redeploy, and map the fields below. docs/GHL.md has the field
 * list and the mapping.
 *
 * THE PAYLOAD IS FLAT AND ALL STRINGS, ON PURPOSE. GHL's workflow mapper reads
 * {{inboundWebhookRequest.first_name}}-style paths; flat keys are one click to
 * map, and strings ("Yes"/"No", comma lists) drop straight into text, radio
 * and dropdown custom fields without a conversion step. No key is ever null or
 * missing, so a mapping never breaks on a lead that skipped an optional field.
 */

export const dynamic = "force-dynamic";

/* The bill upload: the browser sends only the file's name and type, never the
   file. A GHL inbound webhook cannot turn file data into a contact
   attachment, and a multi-megabyte payload risks the whole lead being
   rejected. The lead is flagged instead so the team knows to ask for it.
   See docs/GHL.md, "Bill uploads". */
const ALLOWED_UPLOAD = /^(image\/(jpeg|png|webp|heic|heif)|application\/pdf|text\/csv|application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet)$/;

const str = (v, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const yesNo = (b) => (b ? "Yes" : "No");

function attachmentInfo(a) {
  if (!a || typeof a !== "object") return null;
  const type = str(a.type, 120);
  if (!ALLOWED_UPLOAD.test(type)) return null;
  return { name: str(a.name, 160) || "bill", type };
}

/* Campaign attribution captured on the visitor's landing page (see
   TrackingBridge). Only these keys, only short strings. */
const ATTRIBUTION_KEYS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "gclid", "fbclid", "msclkid", "landing_page", "referrer",
];

function cleanAttribution(a) {
  const out = {};
  for (const k of ATTRIBUTION_KEYS) out[k] = a && typeof a === "object" ? str(a[k], 300) : "";
  return out;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: a hidden field real people never fill in. Pretend it worked so
  // the bot does not retry, but send nothing on.
  if (str(body.company, 100)) return NextResponse.json({ ok: true });

  const { errors, values: v } = validateQuote(body, SERVICE_SLUGS);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "validation", errors }, { status: 422 });
  }

  const endpoint = process.env.QUOTE_WEBHOOK_URL;
  if (!endpoint) {
    // Deliberately no lead data in the log line.
    console.error("[quote] QUOTE_WEBHOOK_URL is not set. Refusing to accept a submission.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const commercial = v.property === "commercial";
  const serviceLabels = v.services.map(labelForSlug);
  const bill = attachmentInfo(body.attachment);
  const optIn = body.marketingOptIn === true;
  const now = new Date().toISOString();

  /* Tags for routing in GHL. Lower-case, hyphenated, stable: the workflow
     branches on these, so they never change wording with the UI. */
  const tags = [
    "website-lead",
    commercial ? "commercial" : "residential",
    `state-${v.state.toLowerCase()}`,
    ...v.services.map((s) => `svc-${s}`),
    v.helpMeChoose && "help-me-choose",
    body.wantsFinance === true && "finance-interest",
    optIn && "marketing-opt-in",
  ].filter(Boolean);

  const ghl = {
    // ---- GHL standard contact fields ----
    first_name: v.firstName,
    last_name: v.lastName,
    full_name: v.fullName,
    email: v.email,
    phone: v.phone, // +61XXXXXXXXX
    address1: v.street,
    city: v.suburb,
    state: v.state, // VIC | NSW
    postal_code: v.postcode,
    country: "AU",
    company_name: v.businessName,
    source: "Website - Quote Form",

    // ---- custom fields ----
    phone_display: v.phoneDisplay,
    phone_type: v.phoneType, // Mobile | Landline
    full_address: `${v.street}, ${v.suburb} ${v.state} ${v.postcode}`,
    property_type: commercial ? "Commercial" : "Residential",
    services: serviceLabels.join(", "),
    service_slugs: v.services.join(","),
    help_me_choose: yesNo(v.helpMeChoose),
    package: str(body.chosenPackage, 40),
    power_bill: v.bill,
    abn: v.abn,
    existing_inverter: v.existingInverter,
    finance_interest: yesNo(body.wantsFinance === true),
    bill_uploaded: yesNo(Boolean(bill)),
    bill_file_name: bill ? bill.name : "",
    notes: v.notes,
    /* Consent as its own field with the time it was given: under the Spam Act
       the sender has to be able to show consent existed. */
    marketing_opt_in: yesNo(optIn),
    marketing_opt_in_at: optIn ? now : "",
    site_state_selected: /^(VIC|NSW)$/.test(body.siteState) ? body.siteState : "",
    tags: tags.join(","),

    // ---- attribution ----
    ...cleanAttribution(body.attribution),
    page_url: `${SITE.domain}/get-a-quote`,
    submitted_at: now,
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ghl),
      // A hung CRM must not hang the visitor. Ten seconds, then the form
      // shows the call-or-email fallback.
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
  } catch (err) {
    console.error("[quote] delivery failed:", err.message);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
