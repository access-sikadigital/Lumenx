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

const MAX = { name: 120, email: 160, phone: 40, address: 200, notes: 2000 };

const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

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
    interests: Array.isArray(body.interests) ? body.interests.slice(0, 10).map((i) => clean(i, 40)) : [],
    bill: clean(body.bill, 40),
    notes: clean(body.notes, MAX.notes),
    submittedAt: new Date().toISOString(),
    source: "lumenex.com.au/get-a-quote",
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
    console.error("[quote] QUOTE_WEBHOOK_URL is not set — refusing to accept a submission.");
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
