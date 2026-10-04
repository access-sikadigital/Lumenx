"use client";

import Link from "next/link";
import { useId } from "react";
import { useAuState } from "@/lib/state-context";
import StateSelector from "@/components/StateSelector";
import { ENERGY } from "@/components/illustrations/kit";
import { SITE } from "@/lib/site";

/**
 * The Commercial page.
 *
 * Built to its own look rather than the residential one: steel grey and navy
 * instead of cream and yellow. That is deliberate and it is the client's
 * instruction. A business buyer evaluating a 300kW system against their
 * interval data is not the same reader as a homeowner comparing three quotes,
 * and a page that looks identical to the residential one tells them this is
 * a residential company having a go at commercial.
 *
 * The case studies are PLACEHOLDERS and are rendered as visibly empty slots.
 * The client brief is explicit: 2 to 3 real commercial case studies are
 * needed before the page is promoted. Showing invented ones, or stock photos
 * standing in for projects, would be fabricating proof.
 */

const STEPS = [
  {
    n: "1",
    title: "Site and data review",
    line: "Roof, switchboard and twelve months of interval data. The data is what makes the model real rather than a rule of thumb.",
  },
  {
    n: "2",
    title: "Design and ROI model",
    line: "System size, payback and every incentive, itemised. You get the assumptions as well as the answer.",
  },
  {
    n: "3",
    title: "Network approval",
    line: "We apply to your network operator and confirm what export limit you will actually be given.",
  },
  {
    n: "4",
    title: "Install around you",
    line: "Staged works and planned shutdowns, scheduled so you keep trading.",
  },
  {
    n: "5",
    title: "Monitor and report",
    line: "Monitoring portal and savings reporting, so the business case can be checked against reality.",
  },
];

const INCENTIVES = {
  federal: [
    {
      name: "Small-scale Technology Certificates",
      tag: "Up to 100kW",
      d: "Expanding to 1MW from 1 October 2026 once the regulations are made. We re-check this before any quote relies on it.",
    },
    {
      name: "Cheaper Home Batteries for small business",
      tag: "Up to 100kWh",
      d: "The federal battery discount reaches small business installations as well as households.",
    },
    {
      name: "Instant asset write-off",
      tag: "Tax treatment",
      d: "$20,000 threshold for turnover under $10m. This is a tax matter, not a discount: talk to your accountant.",
    },
  ],
  VIC: [
    {
      name: "VEU commercial and industrial solar",
      tag: "30–200kW",
      d: "Running since 29 September 2025, delivered through accredited providers.",
    },
    {
      name: "VEU heat pump hot water, heating and cooling",
      tag: "Equipment",
      d: "Separate from solar. Covers efficient replacement of existing gas or electric systems.",
    },
  ],
  NSW: [
    {
      name: "Batteries for Businesses Incentive",
      tag: "From 1 Sep 2026",
      d: "SMEs at 20–200kWh, commercial and industrial above 200kWh. Stacks with the federal program.",
    },
    {
      name: "Energy Savings Scheme",
      tag: "Equipment",
      d: "Covers heat pump hot water and efficient heating and cooling upgrades.",
    },
  ],
};

/* Illustrative shape only: business demand is flat through the working day
   and solar is a midday arc. The overlap is the argument, and the chart is
   labelled as an illustration because it is not anyone's real data. */
const HOURS = ["6am", "9am", "Noon", "3pm", "6pm"];
const SOLAR = [5, 62, 100, 64, 8];
const DEMAND = [34, 82, 88, 84, 46];

function DemandChart() {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const W = 560;
  const H = 230;
  const pad = { l: 34, r: 14, t: 14, b: 30 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const x = (i) => pad.l + (i / (HOURS.length - 1)) * iw;
  const y = (v) => pad.t + ih - (v / 100) * ih;
  const path = (arr) => arr.map((v, i) => `${i ? "L" : "M"}${x(i)} ${y(v)}`).join(" ");
  const area = (arr) => `${path(arr)} L${x(arr.length - 1)} ${pad.t + ih} L${x(0)} ${pad.t + ih} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Illustration: solar generation peaks around midday while business demand stays high through the working day, so most of the solar is used on site."
      className="ltr-lock block h-auto w-full"
    >
      <defs>
        <clipPath id={`${id}-clip`}>
          <rect x={pad.l} y={pad.t} width={iw} height={ih} />
        </clipPath>
      </defs>

      {[0, 50, 100].map((v) => (
        <line key={v} x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      ))}

      <g clipPath={`url(#${id}-clip)`}>
        <path d={area(SOLAR)} fill={ENERGY.solar} opacity="0.26" />
        <path d={path(SOLAR)} fill="none" stroke={ENERGY.solar} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={path(DEMAND)} fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="7 6" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {HOURS.map((h, i) => (
        <text key={h} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.55)" fontFamily="var(--font-display)">
          {h}
        </text>
      ))}
    </svg>
  );
}

export default function CommercialPage() {
  const { state, label } = useAuState();
  const stateItems = INCENTIVES[state] ?? [];

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="relative overflow-hidden bg-[#1B2436] text-white">
        <div
          className="shell relative"
          style={{ paddingTop: "calc(var(--header-h) + clamp(3rem,7vh,6rem))", paddingBottom: "clamp(3.5rem,8vh,6rem)" }}
        >
          <p className="eyebrow mb-6 text-action">Lumenx Commercial</p>
          <h1 className="t-h1 max-w-[20ch]">Cut your daytime energy bill.</h1>
          <p className="t-lead mt-7 max-w-[52ch] text-white/70">
            Solar and batteries for warehouses, offices, farms, clinics and retail, from 30kW to
            1MW, across Victoria and New South Wales.
          </p>

          <div className="mt-[clamp(2rem,3.5vw,3rem)] flex flex-wrap items-center gap-3.5">
            <Link href="#assessment" className="btn btn-primary">
              <span>Book a site assessment</span>
            </Link>
            <Link href="#incentives" className="btn btn-ghost">
              <span>See incentives</span>
            </Link>
          </div>

          <dl className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-6 sm:grid-cols-3">
            {[
              ["30kW – 1MW", "System sizes"],
              ["VIC + NSW", "Business incentives"],
              ["ROI model", "From your interval data"],
            ].map(([v, k]) => (
              <div key={k} className="border-t border-white/15 pt-4">
                <dt className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold text-action">{v}</dt>
                <dd className="mt-1 text-[0.84rem] text-white/55">{k}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------- why business suits solar ---------------- */}
      <section className="bg-[#232D42] text-white" style={{ paddingTop: "clamp(3.5rem,8vh,6rem)", paddingBottom: "clamp(3.5rem,8vh,6rem)" }}>
        <div className="shell grid items-center gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-5 text-action">Why businesses suit solar</p>
            <h2 className="t-h2 max-w-[20ch]">You use most of your power while the sun is up.</h2>
            <p className="t-body mt-6 max-w-[48ch] text-white/65">
              Business demand runs through the working day, so more of your solar is used on site
              instead of exported at a low feed-in rate. A battery covers the late-afternoon peak
              and can cut demand charges.
            </p>
          </div>

          <div className="rounded-[22px] border border-white/12 bg-white/[0.04] p-[clamp(1.1rem,2vw,1.75rem)]">
            <DemandChart />
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="flex items-center gap-2 text-[0.82rem] text-white/70">
                <span aria-hidden="true" className="h-[3px] w-7 rounded-full" style={{ background: ENERGY.solar }} />
                Solar generation
              </span>
              <span className="flex items-center gap-2 text-[0.82rem] text-white/70">
                <span aria-hidden="true" className="h-0 w-7 border-t-[3px] border-dashed border-white" />
                Typical business demand
              </span>
              <span className="text-[0.76rem] text-white/40">Illustration, not your data</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- incentives ---------------- */}
      <section id="incentives" className="scroll-mt-[calc(var(--header-h)+24px)] bg-white" style={{ paddingTop: "clamp(3.5rem,8vh,6rem)", paddingBottom: "clamp(3.5rem,8vh,6rem)" }}>
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-5 text-ember">Business incentives</p>
              <h2 className="t-h2 max-w-[20ch] text-blue">What your business may qualify for</h2>
            </div>
            <StateSelector label="Site state" />
          </div>

          <div aria-live="polite" className="mt-[clamp(2rem,4vw,3rem)] grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-2">
            <div>
              <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-blue">
                Federal · all states
              </p>
              <ul className="space-y-2.5">
                {INCENTIVES.federal.map((f) => (
                  <li key={f.name} className="rounded-[16px] border border-blue/12 bg-cloud p-4">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-[0.95rem] font-semibold text-blue">{f.name}</span>
                      <span className="rounded-full bg-paper px-2.5 py-0.5 text-[0.66rem] font-bold uppercase tracking-[0.08em] text-ink">
                        {f.tag}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink">{f.d}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-blue">
                {label}
              </p>
              <ul className="space-y-2.5">
                {stateItems.map((f) => (
                  <li key={f.name} className="rounded-[16px] border border-blue/12 bg-cloud p-4">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-[0.95rem] font-semibold text-blue">{f.name}</span>
                      <span className="rounded-full bg-paper px-2.5 py-0.5 text-[0.66rem] font-bold uppercase tracking-[0.08em] text-ink">
                        {f.tag}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink">{f.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-7 max-w-[72ch] text-[0.84rem] leading-relaxed text-ink-soft">
            Eligibility, amounts and dates depend on the program rules at the time of
            installation. Your proposal itemises each incentive with a link to the official
            program and the date we last checked it. Talk to your accountant about tax treatment.
          </p>
        </div>
      </section>

      {/* ---------------- how a project runs ---------------- */}
      <section className="bg-[#1B2436] text-white" style={{ paddingTop: "clamp(3.5rem,8vh,6rem)", paddingBottom: "clamp(3.5rem,8vh,6rem)" }}>
        <div className="shell">
          <p className="eyebrow mb-5 text-action">How a commercial project runs</p>
          <h2 className="t-h2 max-w-[18ch]">Five stages, and you keep trading through all of them.</h2>

          <ol className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1rem,1.6vw,1.5rem)] md:grid-cols-3 lg:grid-cols-5">
            {STEPS.map((s) => (
              <li key={s.n} className="rounded-[18px] border border-white/12 bg-white/[0.04] p-5">
                <span className="numeral grid h-9 w-9 place-items-center rounded-full bg-action text-[0.9rem] text-blue">
                  {s.n}
                </span>
                <p className="mt-4 font-[family-name:var(--font-display)] text-[0.98rem] font-bold">
                  {s.title}
                </p>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-white/60">{s.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- case studies (empty on purpose) ---------------- */}
      <section className="bg-cloud" style={{ paddingTop: "clamp(3.5rem,8vh,6rem)", paddingBottom: "clamp(3.5rem,8vh,6rem)" }}>
        <div className="shell">
          <p className="eyebrow mb-5 text-ember">Commercial projects</p>
          <h2 className="t-h2 max-w-[20ch] text-blue">Real sites, real numbers.</h2>

          {/* THESE ARE EMPTY SLOTS, NOT PLACEHOLDER CONTENT.
              The brief asks for 2 to 3 real commercial case studies before
              this page is promoted. Inventing them, or dropping in stock
              photography captioned as a Lumenx project, would be fabricating
              proof. The frames show the shape the content needs so Lumenx can
              see exactly what to send: a drone photo, business type, suburb,
              kW, kWh, year, and the annual saving or payback. */}
          <ul className="mt-[clamp(2rem,4vw,3rem)] grid gap-[clamp(1rem,1.6vw,1.5rem)] md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <li key={i} className="overflow-hidden rounded-[20px] border border-dashed border-blue/25 bg-paper">
                <div className="grid aspect-[4/3] place-items-center bg-blue/[0.04]">
                  <span className="text-[0.8rem] text-ink-soft">Drone photo of project</span>
                </div>
                <div className="p-5">
                  <p className="text-[0.8rem] text-ink-soft">Business type · Suburb</p>
                  <p className="mt-1.5 text-[0.9rem] font-semibold text-blue">
                    [kW] solar · [kWh] battery · [year]
                  </p>
                  <p className="mt-1 text-[0.86rem] text-ink-soft">Annual saving or payback</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[0.84rem] text-ink-soft">
            Case studies are added as projects are completed and the owner agrees to be named.
          </p>
        </div>
      </section>

      {/* ---------------- site assessment ---------------- */}
      <section id="assessment" className="scroll-mt-[calc(var(--header-h)+24px)] bg-white" style={{ paddingTop: "clamp(3.5rem,8vh,6rem)", paddingBottom: "clamp(4rem,9vh,7rem)" }}>
        <div className="shell">
          <div className="rounded-[24px] bg-[#1B2436] p-[clamp(1.5rem,3.5vw,3.5rem)] text-white">
            <h2 className="t-h2 max-w-[22ch]">Book a commercial site assessment</h2>
            <p className="t-body mt-5 max-w-[56ch] text-white/65">
              Send twelve months of interval data and we will come back with a sized design, an
              ROI model and every incentive itemised. If the numbers do not work, we will tell
              you that instead.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link href="/get-a-quote?service=commercial" className="btn btn-primary">
                <span>Request my assessment</span>
              </Link>
              <a href={SITE.phoneHref} className="btn btn-ghost">
                <span>{SITE.phone}</span>
              </a>
            </div>

            <p className="mt-6 text-[0.82rem] text-white/45">
              The form asks for your ABN, site address and interval data. Nothing is shared
              outside Lumenx.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
