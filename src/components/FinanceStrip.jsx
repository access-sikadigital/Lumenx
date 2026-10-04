"use client";

import Link from "next/link";
import { useAuState } from "@/lib/state-context";
import { offersFor } from "@/lib/finance";
import StateSelector from "@/components/StateSelector";
import { EVENTS, track } from "@/lib/track";

/**
 * The strip pinned under the main navigation.
 *
 * It does two jobs, and the order matters. First it carries the VIC/NSW
 * selector, which makes it the first state control a reader meets on any
 * page. Only then does it show finance offers, and only the ones that exist
 * in the chosen state.
 *
 * When no offer is available — because Brighte has not approved the wording
 * yet, or because NSW program access is unconfirmed — the strip still renders
 * the selector. The state choice is useful on its own; the finance line is
 * the part that is gated.
 *
 * `offersFor` applies both gates, so this component cannot show an
 * unapproved offer even if someone edits it carelessly.
 */
export default function FinanceStrip() {
  const { state, ready } = useAuState();
  const offers = offersFor(state);

  return (
    /* A FIXED height, not padding. The header is position:fixed and every
       full-height hero and scroll-margin on the site offsets by --header-h,
       so this strip has to be a known number rather than whatever its
       contents happen to measure. h-[46px] here, and --header-h in
       globals.css carries the same 46px. Change one, change both.

       Nothing wraps: below sm the offer line is hidden and only the state
       selector remains, which is the part that must never be missed. */
    <div className="relative z-10 h-[46px] border-t border-white/10 bg-blue/80 backdrop-blur-md">
      <div className="shell flex h-full items-center justify-between gap-x-6">
        <StateSelector tone="dark" label="Property in" />

        {/* aria-live: switching state rewrites this line, and a screen reader
            user needs to hear that the offers changed under them. */}
        <div aria-live="polite" className="hidden items-center gap-x-5 sm:flex">
          {offers.length === 0 ? (
            <span className="text-[0.78rem] text-white/45">
              {ready ? "Finance options confirmed in your written quote" : " "}
            </span>
          ) : (
            <>
              {offers.map((o) => (
                <span key={o.name} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-action"
                  />
                  <span className="text-[0.8rem] text-white/80">{o.name}</span>
                  <span className="rounded-full bg-action/15 px-2 py-0.5 text-[0.68rem] font-semibold text-action">
                    {o.tag}
                  </span>
                </span>
              ))}
              <Link
                href="/0-percent-finance"
                onClick={() => track(EVENTS.FINANCE_CLICK, { from: "nav_strip", state })}
                className="text-[0.78rem] font-semibold text-action underline-offset-4 hover:underline"
              >
                How it works
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
