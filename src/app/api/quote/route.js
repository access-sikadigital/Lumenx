import { NextResponse } from "next/server";

/**
 * Quote request endpoint.
 *
 * FAILS CLOSED BY DESIGN.
 *
 * There is no destination wired up yet. Rather than accept a submission and
 * quietly drop it — which loses a real lead and shows the customer a success
 * screen that is a lie — this returns 503 until `QUOTE_WEBHOOK_URL` is set.
 * The form then tells the visitor to call or email instead, with the real
 * numbers on screen.
 *
 * TO GO LIVE: set QUOTE_WEBHOOK_URL in the environment to whatever should
 * receive the lead — a CRM inbound webhook, Zapier/Make, a Formspree-style
 * endpoint, or your own mailer. The payload below is posted to it as JSON.
 */

export const dynamic = "force-dynamic";

const MAX = { name: 120, email: 160, phone: 40, address: 200, notes: 2000, abn: 20 };

/* An 8MB base64 ceiling for the optional bill attachment. The form caps the
   raw file at 6MB and base64 adds about a third, so this is that limit plus
   headroom. It is enforced here as well as in the browser because a client
   side cap is a convenience, not a control. */
const MAX_ATTACHMENT_CHARS = 8 * 1024 * 1024;

const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Accept the uploaded bill only if it is the shape the form sends and a type
 * we asked for. Anything else is dropped silently rather than forwarded: the
 * lead is still worth delivering without the attachment, and passing an
 * unvalidated data URL straight through to a CRM is not something to do on
 * trust.
 */
const ALLOWED_UPLOAD = /^(image\/(jpeg|png|webp|heic|heif)|application\/pdf|text\/csv|application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet)$/;

function cleanAttachment(a) {
  if (!a || typeof a !== "object") return null;
  const type = clean(a.type, 120);
  const data = typeof a.data === "string" ? a.data : "";
  if (!ALLOWED_UPLOAD.test(type)) return null;
  if (!data.startsWith(`data:${type};base64,`)) return null;
  if (data.length > MAX_ATTACHMENT_CHARS) return null;
  return {
    name: clean(a.name, 160),
    type,
    size: Number.isFinite(a.size) ? a.size : null,
    data,
  };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: a hidden field real people never fill in.
  if (clean(body.company, 100)) {
    // Pretend it worked so the bot does not retry, but send nothing on.
    return NextResponse.json({ ok: true });
  }

  const lead = {
    name: clean(body.name, MAX.name),
    email: clean(body.email, MAX.email),
    phone: clean(body.phone, MAX.phone),
    address: clean(body.address, MAX.address),
    propertyType: clean(body.propertyType, 40),
    abn: clean(body.abn, MAX.abn),
    // Decides whether a battery retrofit is a hybrid swap, an AC-coupled
    // unit, or an inverter replacement. Worth more to whoever quotes this
    // than any other optional field on the form.
    existingInverter: clean(body.existingInverter, 120),
    interests: Array.isArray(body.interests) ? body.interests.slice(0, 12).map((i) => clean(i, 60)) : [],
    // The slugs as well as the labels. The labels are for whoever reads the
    // email; the slugs are stable identifiers for a CRM to route on without
    // having to string-match human wording that might get reworded later.
    serviceSlugs: Array.isArray(body.serviceSlugs)
      ? body.serviceSlugs.slice(0, 12).map((i) => clean(i, 40))
      : [],
    chosenPackage: clean(body.chosenPackage, 40),
    helpMeChoose: body.helpMeChoose === true,
    wantsFinance: body.wantsFinance === true,
    /* Marketing consent, recorded as its own field with the time it was
       given. Under the Spam Act the burden is on the sender to show consent
       existed, so "they filled in a form once" is not a record: the flag and
       the timestamp are. Default false, and an absent field is a no. */
    marketingOptIn: body.marketingOptIn === true,
    marketingOptInAt: body.marketingOptIn === true ? new Date().toISOString() : null,
    // Which state's programs the visitor was being shown when they submitted.
    // Without it, a NSW enquiry quoted against Victorian rebates is an easy
    // and expensive mistake to make.
    state: /^(VIC|NSW)$/.test(body.state) ? body.state : "",
    bill: clean(body.bill, 40),
    notes: clean(body.notes, MAX.notes),
    attachment: cleanAttachment(body.attachment),
    submittedAt: new Date().toISOString(),
    source: "/get-a-quote",
  };

  const missing = ["name", "email", "phone", "address"].filter((k) => !lead[k]);
  if (missing.length) {
    return NextResponse.json({ ok: false, error: "missing_fields", fields: missing }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) {
    return NextResponse.json({ ok: false, error: "invalid_email", fields: ["email"] }, { status: 422 });
  }

  const endpoint = process.env.QUOTE_WEBHOOK_URL;
  if (!endpoint) {
    // Deliberately no lead data in the log line.
    console.error("[quote] QUOTE_WEBHOOK_URL is not set. Refusing to accept a submission.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
  } catch (err) {
    console.error("[quote] delivery failed:", err.message);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
