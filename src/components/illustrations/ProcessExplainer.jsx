"use client";

/**
 * Quote to handover: who does what.
 *
 * The point of the two-column shape is that a customer can see their OWN
 * obligations in one glance. A single list of steps reads as "Lumenx does
 * everything", and then an install stalls because nobody told the customer
 * they had to confirm Solar Victoria eligibility before the crew arrives.
 *
 * Splitting it makes the handful of things the customer must do impossible to
 * miss, and makes the length of the Lumenx column the argument for using
 * Lumenx.
 */

const STEPS = [
  {
    n: "1",
    stage: "Quote",
    lumenx: "Design from your roof and your bill, with every incentive itemised.",
    you: "Send a recent bill, then accept the quote.",
  },
  {
    n: "2",
    stage: "Approvals",
    lumenx: "Request network approval and prepare the incentive paperwork.",
    you: "VIC: confirm Solar Victoria eligibility before install. Optional: apply for 0% finance.",
  },
  {
    n: "3",
    stage: "Install",
    lumenx: "SAA-accredited install, testing and commissioning.",
    you: "Give site access on the day.",
  },
  {
    n: "4",
    stage: "Connect",
    lumenx: "Lodge the compliance certificate and arrange the meter change.",
    you: "Choose a feed-in plan with your retailer.",
  },
  {
    n: "5",
    stage: "Handover",
    lumenx: "App set-up, warranties and certificates in one pack.",
    you: "Keep the app online so problems are spotted early.",
  },
];

export default function ProcessExplainer({ className = "" }) {
  return (
    <div className={className}>
      {/* Column headings, shown once. On mobile each card repeats them
          inline instead, because a sticky two-column header over a stacked
          list is a thing nobody reads. */}
      <div className="hidden grid-cols-[4.5rem_1fr_1fr] gap-4 border-b border-blue/12 pb-3 md:grid">
        <span />
        <span className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
          Lumenx handles
        </span>
        <span className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
          You do
        </span>
      </div>

      <ol className="mt-1">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="grid gap-x-4 gap-y-3 border-b border-blue/10 py-5 md:grid-cols-[4.5rem_1fr_1fr] md:items-start"
          >
            <div className="flex items-center gap-3">
              <span className="numeral grid h-9 w-9 shrink-0 place-items-center rounded-full bg-action text-[0.9rem] text-blue">
                {s.n}
              </span>
              <span className="font-[family-name:var(--font-display)] text-[0.95rem] font-bold text-blue md:hidden">
                {s.stage}
              </span>
            </div>

            <div>
              <span className="mb-1 block text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink-soft md:hidden">
                Lumenx handles
              </span>
              <p className="hidden font-[family-name:var(--font-display)] text-[0.9rem] font-bold text-blue md:block">
                {s.stage}
              </p>
              <p className="text-[0.9rem] leading-relaxed text-ink md:mt-1.5">{s.lumenx}</p>
            </div>

            <div className="rounded-[14px] bg-action/[0.12] px-4 py-3 md:bg-transparent md:px-0 md:py-0">
              <span className="mb-1 block text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink-soft md:hidden">
                You do
              </span>
              <p className="text-[0.9rem] leading-relaxed text-blue md:text-ink">{s.you}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-5 text-[0.82rem] leading-relaxed text-ink-soft">
        Steps and timing vary by state, network and system. Your quote confirms them.
      </p>
    </div>
  );
}
