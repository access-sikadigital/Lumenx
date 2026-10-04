"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { PACKAGE_TABS, TAB_QUOTE_SLUG, isPopulated, packagesFor } from "@/lib/packages";
import { money, offersFor } from "@/lib/finance";
import { useAuState } from "@/lib/state-context";
import { EVENTS, track } from "@/lib/track";

/**
 * The package tabs.
 *
 * Three tabs, three tiers each, as the client brief specifies. "Choose" opens
 * the quote form with the tab and tier already carried through, so the first
 * two questions the form would ask are answered by the click that got there.
 *
 * UNTIL LUMENX SUPPLIES PRODUCT DATA, every card renders as an "ask us" card
 * rather than as a product. There is no placeholder model number and no
 * placeholder price anywhere in this component, because a package card is the
 * most specific promise on the site: it names hardware we hold and a price we
 * will honour. Inventing one to fill the layout is the easiest possible way
 * to publish something false, and it would survive right through to launch
 * because it looks finished.
 *
 * The structure is complete, so populating lib/packages.js is the only step
 * left.
 */
export default function PackageTabs({ className = "" }) {
  const [tab, setTab] = useState(PACKAGE_TABS[0].key);
  const { state } = useAuState();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  const current = PACKAGE_TABS.find((t) => t.key === tab) ?? PACKAGE_TABS[0];
  const cards = packagesFor(tab);
  const finance = offersFor(state);
  const anyPopulated = cards.some(isPopulated);

  return (
    <div className={className}>
      {/* ---------- tabs ---------- */}
      <div
        role="tablist"
        aria-label="Package types"
        className="inline-flex flex-wrap rounded-full bg-cloud p-1 ring-1 ring-blue/10"
      >
        {PACKAGE_TABS.map((t) => {
          const on = t.key === tab;
          return (
            <button
              key={t.key}
              id={`${uid}-tab-${t.key}`}
              role="tab"
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setTab(t.key)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                e.preventDefault();
                const i = PACKAGE_TABS.findIndex((x) => x.key === tab);
                const next =
                  PACKAGE_TABS[(i + (e.key === "ArrowRight" ? 1 : -1) + PACKAGE_TABS.length) % PACKAGE_TABS.length];
                setTab(next.key);
                document.getElementById(`${uid}-tab-${next.key}`)?.focus();
              }}
              className={`rounded-full px-5 py-2.5 text-[0.86rem] font-semibold transition-colors duration-300 ${
                on ? "bg-action text-blue" : "text-ink hover:text-blue"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <p className="mt-5 max-w-[56ch] text-[0.95rem] leading-relaxed text-ink">{current.line}</p>

      {/* ---------- cards ---------- */}
      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${tab}`}
        className="mt-[clamp(1.75rem,3.5vw,2.75rem)] grid gap-[clamp(1rem,1.6vw,1.5rem)] md:grid-cols-3"
      >
        {cards.map((p) => {
          const ready = isPopulated(p);
          const featured = p.tier === "Gold";

          return (
            <article
              key={p.tier}
              className={`flex flex-col rounded-[22px] border p-[clamp(1.2rem,2vw,1.75rem)] ${
                featured ? "border-action bg-action/[0.07]" : "border-blue/12 bg-paper"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold text-blue">
                  {p.tier}
                </h3>
                {featured && (
                  <span className="rounded-full bg-action px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.1em] text-blue">
                    Most chosen
                  </span>
                )}
              </div>

              {/* photo slot — an empty frame, not a stock photo of
                  something else */}
              <div className="mt-5 grid aspect-[4/3] place-items-center overflow-hidden rounded-[16px] bg-blue/[0.04]">
                {p.photo ? (
                  <img
                    src={p.photo}
                    alt={`${p.panel} and ${p.inverter}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="px-4 text-center text-[0.78rem] text-ink-soft">
                    Product photo
                  </span>
                )}
              </div>

              {ready ? (
                <>
                  <dl className="mt-5 space-y-2 border-b border-blue/10 pb-5 text-[0.88rem]">
                    <Row k="System" v={p.size} />
                    <Row k="Panels" v={p.panel} />
                    <Row k="Inverter" v={p.inverter} />
                    {p.battery && <Row k="Battery" v={p.battery} />}
                  </dl>

                  {p.price != null && (
                    <div className="mt-5">
                      <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
                        From, after incentives
                      </p>
                      <p className="numeral mt-1.5 text-[clamp(1.9rem,3vw,2.5rem)] leading-none text-blue">
                        {money(p.price)}
                      </p>
                      {p.priceNote && (
                        <p className="mt-2 text-[0.82rem] leading-relaxed text-ink">{p.priceNote}</p>
                      )}
                      {p.checked && (
                        <p className="mt-1.5 text-[0.74rem] text-ink-soft">Checked {p.checked}</p>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <p className="mt-5 flex-1 text-[0.88rem] leading-relaxed text-ink">
                  We are confirming the exact models and current pricing for this tier. Ask us and
                  you will get a fixed, itemised quote with every incentive already deducted,
                  which is the number that matters anyway.
                </p>
              )}

              {finance.length > 0 && (
                <p className="mt-4 text-[0.82rem] text-ink-soft">
                  {finance[0].name} available · {finance[0].tag}
                </p>
              )}

              <Link
                href={`/get-a-quote?service=${TAB_QUOTE_SLUG[tab]}&package=${encodeURIComponent(p.tier)}`}
                onClick={() => track(EVENTS.PACKAGE_CHOOSE, { tier: p.tier, tab, state })}
                className={`btn mt-6 w-full justify-center ${featured ? "btn-primary" : "btn-ghost btn-ghost-ink"}`}
              >
                <span>Choose {p.tier}</span>
              </Link>
            </article>
          );
        })}
      </div>

      {!anyPopulated && (
        <p className="mt-6 max-w-[72ch] text-[0.82rem] leading-relaxed text-ink-soft">
          Model numbers and prices are published here once stock and pricing are confirmed. We
          would rather show you nothing than show you a package we cannot actually supply at the
          price shown.
        </p>
      )}
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="shrink-0 text-ink-soft">{k}</dt>
      <dd className="text-end font-semibold text-blue">{v}</dd>
    </div>
  );
}
