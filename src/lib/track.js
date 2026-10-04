/**
 * Conversion tracking.
 *
 * The site currently measures nothing, so there is no way to show that a lead
 * came from anywhere. This fixes that WITHOUT hard-coding a vendor.
 *
 * Everything is pushed to `window.dataLayer`. Attach Google Tag Manager, GA4,
 * Meta or anything else to that layer and the events are already there; no
 * component ever has to be edited again to add or swap an analytics tool. If
 * nothing is attached, the pushes go into an array nobody reads and cost
 * nothing.
 *
 * WHY NO PIXEL IS INSTALLED HERE:
 * The privacy policy currently states that the site sets no analytics or
 * advertising cookies and runs no third-party tracking pixels, and that there
 * is no cookie banner "because there is nothing to consent to". The moment a
 * real tag is attached to this layer, THAT STOPS BEING TRUE and the policy
 * plus a consent banner have to land in the same release. So the plumbing
 * ships now and the tag is a deliberate, separate decision. See
 * `docs/TRACKING.md`.
 *
 * NOTHING IDENTIFYING IS EVER PUSHED. No name, email, phone or address goes
 * into an event — only what was clicked and which service or state it
 * concerned. Pushing a customer's address into a marketing data layer is how
 * a tracking setup becomes a privacy incident.
 */

export const EVENTS = {
  QUOTE_START: "quote_start",
  QUOTE_SUBMIT: "quote_submit",
  QUOTE_ERROR: "quote_error",
  FINANCE_CLICK: "finance_click",
  PHONE_CLICK: "phone_click",
  SERVICE_CTA: "service_cta_click",
  STATE_CHANGE: "state_change",
  PACKAGE_CHOOSE: "package_choose",
};

/** Keys that must never leave the browser in an event. */
const BANNED = new Set([
  "name", "email", "phone", "address", "abn", "notes", "attachment", "contact",
]);

function scrub(payload = {}) {
  const out = {};
  for (const [k, v] of Object.entries(payload)) {
    if (BANNED.has(k)) continue;
    if (v == null) continue;
    // Arrays of slugs are fine; anything object-shaped is not worth the risk.
    if (typeof v === "object" && !Array.isArray(v)) continue;
    out[k] = v;
  }
  return out;
}

export function track(event, payload = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...scrub(payload) });
  } catch {
    // Analytics must never be able to break the page it is measuring.
  }
}
