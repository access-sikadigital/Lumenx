/**
 * Campaign attribution for quote enquiries.
 *
 * Visitors land on the home page or a service page from an ad, then click
 * through to /get-a-quote, and the ?utm_source=… on the landing URL is gone
 * by the time they submit. This keeps it for the length of the visit so the
 * lead in GHL says which campaign it came from.
 *
 * FIRST-PARTY AND SESSION-ONLY. sessionStorage, not a cookie: it is never
 * sent anywhere on its own, it disappears when the tab closes, and it only
 * leaves the browser inside a quote request the visitor chose to submit.
 * First touch wins within a visit, so a later internal link cannot overwrite
 * the ad click that actually brought someone in.
 */

const KEY = "lx_attribution";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "msclkid"];

/** Call once per page load (TrackingBridge does). */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(KEY)) return;
    const q = new URLSearchParams(window.location.search);
    const data = {
      landing_page: window.location.pathname,
      // Only the referring SITE, not its full URL: a referrer path can carry
      // someone's search terms or another site's private page address.
      referrer: document.referrer ? new URL(document.referrer).origin : "",
    };
    for (const p of PARAMS) {
      const v = q.get(p);
      if (v) data[p] = v.slice(0, 200);
    }
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Private mode or storage disabled: attribution is a nice-to-have.
  }
}

export function readAttribution() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}
