"use client";

import { useState } from "react";
import { useAuState } from "@/lib/state-context";
import { BRIGHTE, NSW_LOAN, offersFor } from "@/lib/finance";
import StateSelector from "@/components/StateSelector";
import { ENERGY } from "@/components/illustrations/kit";

/**
 * The finance offers, as tabs, filtered by state.
 *
 * `offersFor` applies the approval gates, so if Brighte has not signed the
 * wording off this renders nothing at all rather than a disabled tab. A tab
 * labelled with a product you cannot describe yet is still an advertisement
 * for it.
 *
 * The NSW loan is labelled "0% interest – NSW only" everywhere it appears and
 * is simply absent in Victoria, because a Victorian reader cannot apply.
 */

const STEPS = [
  {
    n: "1",
    title: "Get your quote",
    line: "We price the system with every incentive already deducted, so you are financing the real number rather than a list price.",
  },
  {
    n: "2",
    title: "Choose what to finance",
    line: "Pay some upfront and finance the rest, or finance the lot. The split is yours, within the lender's limits.",
  },
  {
    n: "3",
    title: "Apply with the lender",
    line: "The application is with the credit provider, not with us. They assess it and tell you the amount and the term.",
  },
  {
    n: "4",
    title: "We install, you repay",
    line: "Installation goes ahead once finance is approved. Repayments run for the term you agreed with the lender.",
  },
];

export default function FinanceTabs() {
  const { state, label } = useAuState();
  const offers = offersFor(state);
  const [active, setActive] = useState(0);

  if (offers.length === 0) {
    return (
      <div className="rounded-[22px] border border-blue/12 bg-paper p-[clamp(1.4rem,2.5vw,2.25rem)]">
        <h3 className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold text-blue">
          No published plan for {label} yet
        </h3>
        <p className="mt-3 max-w-[56ch] text-[0.92rem] leading-relaxed text-ink">
          We will set out the repayment options alongside your written quote. Ask for them when
          you request it and they will be in the same document as the price.
        </p>
        <div className="mt-6">
          <StateSelector />
        </div>
      </div>
    );
  }

  const offer = offers[Math.min(active, offers.length - 1)];
  const isBrighte = offer.name === BRIGHTE.name;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        {offers.length > 1 ? (
          <div role="tablist" aria-label="Finance plans" className="inline-flex rounded-full bg-paper p-1 ring-1 ring-blue/10">
            {offers.map((o, i) => {
              const on = i === active;
              return (
                <button
                  key={o.name}
                  role="tab"
                  aria-selected={on}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`rounded-full px-5 py-2 text-[0.84rem] font-semibold transition-colors duration-300 ${
                    on ? "bg-action text-blue" : "text-ink hover:text-blue"
                  }`}
                >
                  {o.name === NSW_LOAN.name ? "NSW loan" : "Brighte 0%"}
                </button>
              );
            })}
          </div>
        ) : (
          <span />
        )}
        <StateSelector />
      </div>

      <div className="grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-[1.25fr_1fr]">
        {/* ---------- the four steps ---------- */}
        <section className="rounded-[22px] border border-blue/10 bg-paper p-[clamp(1.3rem,2.4vw,2.1rem)]">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <h3 className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold text-blue">
              {offer.name}
            </h3>
            <span className="rounded-full bg-action/20 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-blue">
              {offer.tag}
            </span>
          </div>

          <ol className="space-y-5">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="numeral grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cloud text-[0.84rem] text-blue">
                  {s.n}
                </span>
                <div>
                  <p className="font-[family-name:var(--font-display)] text-[0.95rem] font-bold text-blue">
                    {s.title}
                  </p>
                  <p className="mt-1 text-[0.9rem] leading-relaxed text-ink">{s.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- terms, fees, eligibility ---------- */}
        <section className="rounded-[22px] border border-blue/10 bg-paper p-[clamp(1.3rem,2.4vw,2.1rem)]">
          {isBrighte && (
            <>
              <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
                Terms, as published {BRIGHTE.checked}
              </p>
              <dl className="mt-4 space-y-2.5 border-b border-blue/10 pb-5">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[0.88rem] text-ink">Amount</dt>
                  <dd className="numeral text-[0.92rem] text-blue">
                    ${BRIGHTE.amountMin.toLocaleString("en-AU")} – $
                    {BRIGHTE.amountMax.toLocaleString("en-AU")}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[0.88rem] text-ink">Term</dt>
                  <dd className="text-[0.92rem] font-semibold text-blue">
                    {BRIGHTE.termMin} to {BRIGHTE.termMax}
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
                Fees
              </p>
              <dl className="mt-3 space-y-2.5 border-b border-blue/10 pb-5">
                {BRIGHTE.fees.map((f) => (
                  <div key={f.k} className="flex items-baseline justify-between gap-4">
                    <dt className="text-[0.88rem] text-ink">{f.k}</dt>
                    <dd className="text-[0.92rem] font-semibold" style={{ color: ENERGY.grid }}>
                      {f.v}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-[0.8rem] leading-relaxed text-ink-soft">
                0% interest does not mean no cost. The fees above are what the plan charges.
              </p>
            </>
          )}

          {!isBrighte && (
            <>
              <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
                What it is
              </p>
              <p className="mt-3 border-b border-blue/10 pb-5 text-[0.92rem] leading-relaxed text-ink">
                {NSW_LOAN.note}
              </p>
            </>
          )}

          <p className="mt-5 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
            Eligibility
          </p>
          <ul className="mt-3 space-y-2">
            {offer.eligibility.map((e) => (
              <li key={e} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: ENERGY.battery }}
                />
                <span className="text-[0.88rem] leading-relaxed text-ink">{e}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="mt-5 rounded-[16px] border border-blue/12 bg-paper px-5 py-4 text-[0.82rem] leading-relaxed text-ink-soft">
        {offer.disclaimer}
      </p>
    </div>
  );
}
