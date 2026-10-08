"use client";

import { useEffect } from "react";
import { EVENTS, track } from "@/lib/track";
import { captureAttribution } from "@/lib/attribution";

/**
 * Catches the clicks that are scattered across dozens of components.
 *
 * The phone number appears in the header, the hero, every page hero, the
 * footer, the contact page, both error states and the thank-you page. Adding
 * an onClick to each of those is a dozen edits that the next person has to
 * remember to repeat, and the one they forget is the one that silently stops
 * counting.
 *
 * One delegated listener on the document handles all of them, and keeps
 * working for any tel: or mailto: link added later without anybody wiring
 * anything up.
 *
 * Capture phase, because a tel: link navigates away from the page: the event
 * has to be recorded before the browser hands over to the dialler.
 */
export default function TrackingBridge() {
  // Keep the ad campaign that brought this visit in, for the quote form.
  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") || "";

      if (href.startsWith("tel:")) {
        // The number is Lumenx's own published line, not the visitor's, so
        // there is nothing personal in this event.
        track(EVENTS.PHONE_CLICK, { context: a.dataset.trackContext || "page" });
        return;
      }
      if (href.startsWith("mailto:")) {
        track(EVENTS.PHONE_CLICK, { context: "email" });
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
