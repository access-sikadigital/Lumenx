"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import { CALCULATORS, REBATE_CHECK, TOOLS_HUB, SUN_HOURS, PERFORMANCE_RATIO } from "@/lib/calculators";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- intro ---------------- */
function Intro() {
  const root = useRef(null);
  const { intro } = TOOLS_HUB;
  const [lede, ...rest] = intro.body;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".th-copy > *", {
        y: 30, opacity: 0, duration: 0.85, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".th-media", {
        y: 44, opacity: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="bg-white"
      style={{ paddingTop: "clamp(4.5rem, 11vh, 9rem)", paddingBottom: "clamp(4.5rem, 11vh, 9rem)" }}
    >
      <div className="shell grid items-start gap-[clamp(2.5rem,5vw,6rem)] lg:grid-cols-[1.15fr_0.85fr]">
        <div className="th-copy">
          <span aria-hidden="true" className="mb-7 block h-[3px] w-12 bg-ember" />
          <h2 className="t-h2 max-w-[22ch] text-blue">{intro.heading}</h2>
          <p className="t-lead mt-7 max-w-[54ch] text-blue/80">{lede}</p>
          {rest.map((p) => (
            <p key={p.slice(0, 30)} className="t-body mt-5 max-w-[60ch] text-ink">{p}</p>
          ))}

          <ul className="mt-[clamp(2.25rem,3.5vw,3rem)] grid gap-x-[clamp(1.5rem,2.5vw,3rem)] gap-y-4 border-t border-blue/12 pt-8 sm:grid-cols-2">
            {intro.points.map((p) => (
              <li key={p} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green/15">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 6.2 4.8 8.5 9.5 3.8" stroke="#63b93b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[0.95rem] leading-relaxed text-ink">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="th-media relative aspect-[4/5] overflow-hidden rounded-[24px] lg:mt-[clamp(2rem,5vw,5rem)]">
          <Image src={intro.image} alt={intro.imageAlt} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" 
            quality={90}
          />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   The tool rack — signature section.

   Numbered rows rather than cards, because these are instruments
   rather than products, and a visitor is picking one to use now.
   ---------------------------------------------------------------- */
function Rack() {
  const root = useRef(null);

  const tools = [
    ...CALCULATORS.map((c) => ({ slug: c.slug, nav: c.nav, label: c.label, lead: c.lead, chips: c.chips })),
    { slug: REBATE_CHECK.slug, nav: REBATE_CHECK.nav, label: REBATE_CHECK.label, lead: REBATE_CHECK.lead, chips: REBATE_CHECK.chips },
  ];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".rk-head > *", {
        y: 26, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 84%" },
      });
      gsap.from(".rk-rule", {
        scaleX: 0, transformOrigin: "left center", duration: 1.05, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: ".rk-list", start: "top 86%" },
      });
      gsap.from(".rk-row", {
        y: 26, opacity: 0, duration: 0.7, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: ".rk-list", start: "top 86%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="bg-cloud"
      style={{ paddingTop: "clamp(4.5rem, 11vh, 9rem)", paddingBottom: "clamp(4.5rem, 11vh, 9rem)" }}
    >
      <div className="shell">
        <div className="rk-head max-w-[40rem]">
          <p className="eyebrow mb-5 text-ember">Pick one</p>
          <h2 className="t-h2 text-blue">Six tools, no email gate.</h2>
        </div>

        <ol className="rk-list mt-[clamp(2.5rem,5vw,4rem)]">
          {tools.map((t, i) => (
            <li key={t.slug} className="relative border-t border-blue/12">
              <span aria-hidden="true" className="rk-rule absolute left-0 top-[-1px] h-[2px] w-full bg-ember" />
              <Link
                href={`/${t.slug}`}
                className="rk-row group grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-3 py-[clamp(1.5rem,2.5vw,2.25rem)] md:grid-cols-[auto_1fr_auto] md:items-baseline"
              >
                <span className="numeral text-[clamp(1.4rem,2.4vw,2.2rem)] leading-none text-ember/60 transition-colors duration-500 group-hover:text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0">
                  <span className="block font-[family-name:var(--font-display)] text-[clamp(1.15rem,1.8vw,1.55rem)] font-bold leading-snug text-blue transition-colors duration-500 group-hover:text-ember">
                    {t.label}
                  </span>
                  <span className="mt-2.5 block max-w-[60ch] text-[0.93rem] leading-relaxed text-ink">
                    {t.lead}
                  </span>
                  <span className="mt-4 flex flex-wrap gap-2">
                    {t.chips.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-blue/12 bg-paper px-3 py-1 text-[0.72rem] text-ink-soft"
                      >
                        {c}
                      </span>
                    ))}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className="shrink-0 text-[0.88rem] font-semibold text-ember md:justify-self-end"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                    Open →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   The two assumptions every calculator shares, published once here
   rather than only in the fine print of each tool.
   ---------------------------------------------------------------- */
function SharedAssumptions() {
  const root = useRef(null);
  const max = Math.max(...SUN_HOURS.map((s) => s.hours));

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".sa-bar", {
        scaleX: 0, transformOrigin: "left center", duration: 1.1, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 84%" },
      });
      gsap.from(".sa-row", {
        y: 18, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 84%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="grain relative overflow-hidden bg-blue text-white"
      style={{ paddingTop: "clamp(4rem, 9vh, 7rem)", paddingBottom: "clamp(4rem, 9vh, 7rem)" }}
    >
      <div aria-hidden="true" className="glow glow--solar right-[-12%] top-[-20%]" style={{ width: "min(600px, 50%)" }} />

      <div className="shell relative grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="eyebrow mb-5 text-yellow">Our only two assumptions</p>
          <h2 className="t-h2 max-w-[22ch]">Everything else comes from your paperwork.</h2>
          <p className="t-body mt-6 max-w-[52ch] text-white/65">
            Every dollar figure in these tools is a number you typed in off your own bill or your own
            quote. The only things we supply are the peak sun hours for your state and the standard
            derating applied to any solar estimate.
          </p>

          <div className="mt-9 rounded-[20px] card-navy p-[clamp(1.3rem,2vw,1.85rem)]">
            <span className="block text-[0.66rem] uppercase tracking-[0.16em] text-white/55">
              Performance ratio
            </span>
            <p className="numeral mt-3 text-[clamp(2.2rem,4vw,3.2rem)] leading-none text-yellow">
              {PERFORMANCE_RATIO.toFixed(2)}
            </p>
            <p className="mt-4 text-[0.88rem] leading-relaxed text-white/60">
              The conventional allowance for inverter losses, cabling, temperature, soiling and
              orientation. Applied to every generation estimate on this site.
            </p>
          </div>
        </div>

        <div className="lg:pt-[clamp(1rem,3vw,3rem)]">
          <span className="mb-7 block text-[0.66rem] uppercase tracking-[0.16em] text-white/55">
            Approximate daily peak sun hours, by state capital
          </span>
          <ul className="space-y-[clamp(0.9rem,1.4vw,1.25rem)]">
            {SUN_HOURS.map((s) => (
              <li key={s.code} className="sa-row">
                <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                  <span className="min-w-0 text-[0.95rem] text-white/85">{s.state}</span>
                  <span className="numeral text-[0.92rem] text-yellow">{s.hours} hrs</span>
                </div>
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="sa-bar h-full rounded-full"
                    style={{
                      width: `${(s.hours / max) * 100}%`,
                      background: "linear-gradient(90deg, #e8420a 0%, #ffb120 100%)",
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-7 border-t border-white/12 pt-6 text-[0.8rem] leading-relaxed text-white/55">
            Long-run averages for each state capital, shown for comparison. A state is not one
            climate, so a household a long way from the capital can sit well above or below its
            figure. Your own roof also depends on pitch, orientation and shading, which we model
            from your address rather than from a regional number.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function ToolsHubPage() {
  return (
    <>
      <PageHero
        eyebrow={TOOLS_HUB.eyebrow}
        h1={TOOLS_HUB.h1}
        lead={TOOLS_HUB.lead}
        image={TOOLS_HUB.hero.image}
        imageAlt={TOOLS_HUB.hero.alt}
        chips={TOOLS_HUB.chips}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
        ]}
      />
      <Intro />
      <Rack />
      <SharedAssumptions />
      <Faq
        items={TOOLS_HUB.faqs}
        heading="The tools, answered."
        lead="If a calculator elsewhere gave you a very different number, check which electricity price it assumed."
      />
      <CTA />
    </>
  );
}
