"use client";

import { STATES, useAuState } from "@/lib/state-context";
import { EVENTS, track } from "@/lib/track";

/**
 * The VIC / NSW control.
 *
 * A two-option segmented control rather than a dropdown: with only two
 * choices, a select hides the alternative behind a tap, and the whole point
 * of this control is that a reader can SEE that the page is state-specific
 * before they read a single incentive.
 *
 * It is a real radiogroup, so arrow keys move between the options and screen
 * readers announce it as a choice rather than as two unrelated buttons.
 *
 * `tone="dark"` for the navy sections, `"light"` for the pale ones.
 */
export default function StateSelector({
  tone = "light",
  label = "Your property is in",
  className = "",
  id = "state-selector",
}) {
  const { state, setState } = useAuState();
  const dark = tone === "dark";

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2.5 ${className}`}>
      <span
        id={`${id}-label`}
        className={`text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${
          dark ? "text-white/55" : "text-ink-soft"
        }`}
      >
        {label}
      </span>

      <div
        role="radiogroup"
        aria-labelledby={`${id}-label`}
        className={`inline-flex rounded-full p-1 ${
          dark ? "bg-white/[0.07] ring-1 ring-white/15" : "bg-cloud ring-1 ring-blue/10"
        }`}
      >
        {STATES.map((s) => {
          const on = s.code === state;
          return (
            <button
              key={s.code}
              type="button"
              role="radio"
              aria-checked={on}
              // Only the selected option is in the tab order; arrow keys move
              // within the group. That is the expected behaviour for a
              // radiogroup and keeps the header from eating two tab stops.
              tabIndex={on ? 0 : -1}
              onClick={() => {
                setState(s.code);
                track(EVENTS.STATE_CHANGE, { to: s.code });
              }}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                e.preventDefault();
                const i = STATES.findIndex((x) => x.code === state);
                const next = STATES[(i + (e.key === "ArrowRight" ? 1 : -1) + STATES.length) % STATES.length];
                setState(next.code);
              }}
              className={`rounded-full px-4 py-1.5 text-[0.82rem] font-semibold transition-colors duration-300 ${
                on
                  ? "bg-action text-blue"
                  : dark
                    ? "text-white/65 hover:text-white"
                    : "text-ink hover:text-blue"
              }`}
            >
              <span className="sm:hidden">{s.short}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * The banner form of the control, for the top of a page whose entire content
 * is state-dependent. It states plainly what switching does, because a
 * segmented control on its own does not tell a reader that the programs below
 * will change.
 */
export function StateGate({ children, className = "" }) {
  const { label } = useAuState();

  return (
    <div
      className={`rounded-[20px] border border-blue/12 bg-cloud p-[clamp(1.1rem,2vw,1.6rem)] ${className}`}
    >
      <StateSelector />
      <p className="mt-3 text-[0.86rem] leading-relaxed text-ink">
        {children ?? (
          <>
            Showing the programs that apply in <strong className="text-blue">{label}</strong>.
            Federal programs apply in both states and are listed separately.
          </>
        )}
      </p>
    </div>
  );
}
