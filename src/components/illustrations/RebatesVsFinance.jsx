"use client";

import { ENERGY } from "./kit";

/**
 * Rebates versus finance.
 *
 * The distinction this draws is the one the whole punch list keeps coming
 * back to, and it is the reason the Solar Victoria copy had to be rewritten:
 *
 *   An INCENTIVE reduces the price.
 *   A LOAN changes when you pay. It does not reduce anything.
 *
 * Bundling the two is how "interest-free loans" ends up sitting in a list of
 * rebates and a customer believes they are getting $8,000 off when they are
 * getting $8,000 of credit. Two steps, drawn separately, with the repayment
 * stated in the same breath as the finance.
 *
 * THE NUMBERS HERE ARE FICTIONAL AND LABELLED AS SUCH. They are round
 * teaching figures, not a Lumenx quote, and the banner says so before the
 * reader reaches them.
 */

const INSTALLED = 15000;
const INCENTIVES = 4000;
const PAYABLE = INSTALLED - INCENTIVES;
const UPFRONT = 3000;
const FINANCED = PAYABLE - UPFRONT;

const money = (n) => `$${n.toLocaleString("en-AU")}`;

export default function RebatesVsFinance({ className = "" }) {
  return (
    <div className={className}>
      {/* Said first, before any figure is on screen. */}
      <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/[0.06] px-4 py-1.5 text-[0.76rem] font-semibold text-ember">
        Fictional example, not a Lumenx quote
      </p>

      <div className="grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-2">
        {/* ---------- step 1: incentives cut the price ---------- */}
        <section className="rounded-[22px] border border-blue/10 bg-[#FBF7EC] p-[clamp(1.2rem,2.2vw,2rem)]">
          <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
            Step 1
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.15rem] font-bold text-blue">
            Incentives lower the price
          </h3>

          <dl className="mt-7 space-y-3.5">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-[0.9rem] text-ink">Installed system</dt>
              <dd className="numeral text-[1.05rem] text-blue">{money(INSTALLED)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-[0.9rem] text-ink">Confirmed incentives</dt>
              <dd className="numeral text-[1.05rem]" style={{ color: ENERGY.battery }}>
                &minus; {money(INCENTIVES)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-blue/15 pt-3.5">
              <dt className="text-[0.95rem] font-bold text-blue">Price you pay</dt>
              <dd className="numeral text-[1.5rem] text-blue">{money(PAYABLE)}</dd>
            </div>
          </dl>

          {/* The bar makes the deduction physical rather than arithmetic. */}
          <div
            className="mt-6 flex h-3 w-full overflow-hidden rounded-full"
            role="img"
            aria-label={`Of ${money(INSTALLED)}, ${money(INCENTIVES)} is covered by incentives and ${money(PAYABLE)} is payable.`}
          >
            <div
              style={{ width: `${(INCENTIVES / INSTALLED) * 100}%`, background: ENERGY.battery }}
            />
            <div style={{ width: `${(PAYABLE / INSTALLED) * 100}%`, background: "#0B143B" }} />
          </div>

          <p className="mt-5 text-[0.86rem] leading-relaxed text-ink">
            Your quote lists each incentive separately, against the equipment it applies to.
          </p>
        </section>

        {/* ---------- step 2: finance spreads what is left ---------- */}
        <section className="rounded-[22px] border border-blue/10 bg-[#FBF7EC] p-[clamp(1.2rem,2.2vw,2rem)]">
          <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
            Step 2
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.15rem] font-bold text-blue">
            Finance spreads the rest
          </h3>

          <p className="mt-7 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
            How you pay the {money(PAYABLE)}
          </p>

          <dl className="mt-3.5 space-y-3.5">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-[0.9rem] text-ink">Upfront</dt>
              <dd className="numeral text-[1.05rem] text-blue">{money(UPFRONT)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-[0.9rem] text-ink">On 0% interest finance</dt>
              <dd className="numeral text-[1.05rem]" style={{ color: ENERGY.grid }}>
                {money(FINANCED)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-blue/15 pt-3.5">
              <dt className="text-[0.95rem] font-bold text-blue">Still repaid</dt>
              <dd className="numeral text-[1.5rem]" style={{ color: ENERGY.grid }}>
                {money(FINANCED)}
              </dd>
            </div>
          </dl>

          <div
            className="mt-6 flex h-3 w-full overflow-hidden rounded-full"
            role="img"
            aria-label={`Of ${money(PAYABLE)}, ${money(UPFRONT)} is paid upfront and ${money(FINANCED)} is financed and repaid over the term.`}
          >
            <div style={{ width: `${(UPFRONT / PAYABLE) * 100}%`, background: "#0B143B" }} />
            <div style={{ width: `${(FINANCED / PAYABLE) * 100}%`, background: ENERGY.grid }} />
          </div>

          <p className="mt-5 text-[0.86rem] leading-relaxed text-ink">
            A loan is not a rebate. The {money(FINANCED)} is still repaid over the term. Fees,
            eligibility and the lender&rsquo;s approval apply.
          </p>
        </section>
      </div>

      {/* The one-line takeaway, stated as a pair so neither can be read alone. */}
      <div className="mt-[clamp(1rem,2vw,1.5rem)] grid gap-2.5 sm:grid-cols-2">
        <p className="rounded-[16px] px-5 py-4 text-[0.92rem] font-semibold text-blue" style={{ background: `${ENERGY.battery}1A` }}>
          An incentive reduces the price.
        </p>
        <p className="rounded-[16px] px-5 py-4 text-[0.92rem] font-semibold text-blue" style={{ background: `${ENERGY.grid}1A` }}>
          Finance changes how and when you pay.
        </p>
      </div>
    </div>
  );
}
