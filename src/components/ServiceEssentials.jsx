"use client";

import Link from "next/link";
import { useAuState } from "@/lib/state-context";
import { essentialsFor } from "@/lib/service-essentials";
import { money, offersFor, priceFor } from "@/lib/finance";
import StateSelector from "@/components/StateSelector";
import { EVENTS, track } from "@/lib/track";
import EnergyFlowScene from "@/components/illustrations/EnergyFlowScene";
import BackupExplainer from "@/components/illustrations/BackupExplainer";
import ProcessExplainer from "@/components/illustrations/ProcessExplainer";
import {
  EvChargerDiagram,
  HeatPumpDiagram,
  VppDiagram,
} from "@/components/illustrations/ServiceDiagrams";

/**
 * The five parts every service page owes the reader, in order:
 *
 *   1. who it suits, one line
 *   2. one explainer illustration
 *   3. "from $X after incentives", with 0% finance beside it
 *   4. the incentives for THAT service, in THIS reader's state
 *   5. a quote button that opens the form with the service preselected
 *
 * This block sits directly under the hero and answers the page. What follows
 * it is depth for people who want depth. The point of the restructure is that
 * every service page used to end in the same four repeated bands — process,
 * rebates, reviews, brands — so by the third page a reader was scrolling past
 * content they had already read twice.
 *
 * The price renders ONLY when a real figure exists. There is no "from $TBC"
 * and no zero: if Lumenx has not supplied the number, the finance line stands
 * on its own and the quote button does the work.
 */

const STATUS_STYLE = {
  likely: { label: "Likely eligible", dot: "bg-green" },
  check: { label: "Check", dot: "bg-yellow" },
  unlikely: { label: "Not available", dot: "bg-ink-soft" },
  note: { label: "Info", dot: "bg-ember" },
};

function Illustration({ kind }) {
  if (kind === "energy-flow") return <EnergyFlowScene />;
  if (kind === "backup") return <BackupExplainer />;
  if (kind === "process") return <ProcessExplainer />;
  if (kind === "heat-pump") return <HeatPumpDiagram />;
  if (kind === "ev") return <EvChargerDiagram />;
  if (kind === "vpp") return <VppDiagram />;
  return null;
}

export default function ServiceEssentials({ slug, label }) {
  const e = essentialsFor(slug);
  const { state, label: stateLabel } = useAuState();

  if (!e) return null;

  const price = e.priceKey ? priceFor(e.priceKey) : null;
  const finance = offersFor(state);
  const stateIncentives = e.incentives?.[state] ?? [];
  const federal = e.incentives?.federal ?? [];
  const hasIncentives = federal.length > 0 || stateIncentives.length > 0;

  return (
    <section
      className="bg-white"
      style={{ paddingTop: "clamp(3rem,7vh,5rem)", paddingBottom: "clamp(3rem,7vh,5rem)" }}
    >
      <div className="shell">
        {/* 1 — who it suits */}
        <p className="t-lead max-w-[54ch] text-blue">{e.suits}</p>

        {/* 2 — the one visual */}
        <div className="mt-[clamp(2rem,4vw,3.25rem)]">
          <Illustration kind={e.illustration} />
        </div>

        {/* 3 + 4 + 5 */}
        <div className="mt-[clamp(2rem,4vw,3.25rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-[1fr_1.1fr]">
          {/* price + finance, side by side as the client asked */}
          <div className="rounded-[22px] border border-blue/12 bg-cloud p-[clamp(1.3rem,2.4vw,2rem)]">
            {price ? (
              <>
                <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
                  From, after incentives
                </p>
                <p className="numeral mt-3 text-[clamp(2.4rem,4.5vw,3.4rem)] leading-none text-blue">
                  {money(price.from)}
                </p>
                {price.note && (
                  <p className="mt-3 max-w-[38ch] text-[0.88rem] leading-relaxed text-ink">
                    {price.note}
                  </p>
                )}
                {price.checked && (
                  <p className="mt-2 text-[0.76rem] text-ink-soft">Checked {price.checked}</p>
                )}
              </>
            ) : (
              <>
                <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
                  What it costs
                </p>
                <p className="mt-3 max-w-[40ch] text-[0.95rem] leading-relaxed text-ink">
                  Your roof, your switchboard, your access and the size you actually need all move
                  the number, so we price it properly rather than publish a figure we would have
                  to revise. You get a fixed, itemised quote with every incentive already
                  deducted.
                </p>
              </>
            )}

            {finance.length > 0 && (
              <div className="mt-6 border-t border-blue/12 pt-5">
                <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
                  Paying for it
                </p>
                <ul className="mt-3 space-y-2">
                  {finance.map((f) => (
                    <li key={f.name} className="flex items-start gap-2.5">
                      <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-action" />
                      <span className="text-[0.88rem] leading-relaxed text-ink">
                        {f.name}{" "}
                        <span className="font-semibold text-blue">{f.tag}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/0-percent-finance"
                  onClick={() => track(EVENTS.FINANCE_CLICK, { from: "service_page", service: slug, state })}
                  className="mt-3 inline-block text-[0.84rem] font-semibold text-blue underline-offset-4 hover:underline"
                >
                  How 0% finance works
                </Link>
              </div>
            )}

            {/* 5 — the next step, with the service already chosen */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={`/get-a-quote?service=${e.quoteSlug}`}
                onClick={() => track(EVENTS.SERVICE_CTA, { service: slug, state })}
                className="btn btn-primary"
              >
                {/* Just "Get a free quote". It used to interpolate the
                    service name in lower case, which read fine for "solar
                    only" and badly for "battery for existing solar". The
                    button already sits on that service's page and already
                    carries the service through in the URL, so repeating the
                    name buys nothing and costs legibility. */}
                <span>Get a free quote</span>
              </Link>
            </div>
          </div>

          {/* incentives for this service, in this state */}
          <div className="rounded-[22px] border border-blue/12 bg-paper p-[clamp(1.3rem,2.4vw,2rem)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
                What may apply to this
              </p>
              <StateSelector label="" />
            </div>

            {!hasIncentives ? (
              <p className="mt-5 text-[0.92rem] leading-relaxed text-ink">
                No rebate program applies to this on its own. We will tell you plainly if
                something you are also considering does attract one.
              </p>
            ) : (
              <div aria-live="polite" className="mt-5 space-y-5">
                {federal.length > 0 && (
                  <div>
                    <p className="mb-2.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-blue">
                      Federal · both states
                    </p>
                    <IncentiveList items={federal} />
                  </div>
                )}
                {stateIncentives.length > 0 && (
                  <div>
                    <p className="mb-2.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-blue">
                      {stateLabel}
                    </p>
                    <IncentiveList items={stateIncentives} />
                  </div>
                )}
              </div>
            )}

            <p className="mt-6 text-[0.78rem] leading-relaxed text-ink-soft">
              No amounts, on purpose: they change, sometimes mid-year. We confirm your actual
              entitlement in writing and show it as a deducted line on your quote.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function IncentiveList({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((i) => {
        const s = STATUS_STYLE[i.status] ?? STATUS_STYLE.check;
        return (
          <li key={i.name} className="rounded-[14px] border border-blue/10 bg-cloud px-4 py-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-[0.9rem] font-semibold text-blue">{i.name}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-paper px-2.5 py-0.5 text-[0.66rem] font-bold uppercase tracking-[0.08em] text-ink">
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                {s.label}
              </span>
            </div>
            <p className="mt-1.5 text-[0.86rem] leading-relaxed text-ink">{i.line}</p>
          </li>
        );
      })}
    </ul>
  );
}
