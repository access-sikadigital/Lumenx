"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import { OtherTools, ToolCard } from "@/components/CalculatorPage";
import Select from "@/components/Select";
import { SITE } from "@/lib/site";
import { REBATE_CHECK } from "@/lib/calculators";

gsap.registerPlugin(ScrollTrigger);

const STATUS = {
  likely: { label: "Likely applies", dot: "bg-green", ring: "border-green/30", tint: "bg-green/[0.05]" },
  check: { label: "Needs checking", dot: "bg-yellow", ring: "border-yellow/35", tint: "bg-yellow/[0.06]" },
  unlikely: { label: "Probably not", dot: "bg-ink-soft", ring: "border-blue/15", tint: "bg-cloud" },
  note: { label: "Worth knowing", dot: "bg-ember", ring: "border-ember/30", tint: "bg-ember/[0.05]" },
};

/* ----------------------------------------------------------------
   Hero with the checker on the right, matching the calculators, then
   the programs below. No amounts anywhere: each result says what a
   program does and what it needs.
   ---------------------------------------------------------------- */
function Checker() {
  const root = useRef(null);

  const initial = useMemo(() => {
    const o = {};
    for (const q of REBATE_CHECK.questions) o[q.key] = q.default;
    return o;
  }, []);
  const [a, setA] = useState(initial);
  const results = REBATE_CHECK.evaluate(a);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".rh-copy > *", { y: 30, opacity: 0, duration: 0.9, stagger: 0.09, ease: "power3.out" });
      gsap.from(".tc-card", { y: 40, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
      gsap.from(".rh-chip", { y: 14, opacity: 0, duration: 0.55, stagger: 0.07, ease: "power3.out", delay: 0.5 });
      gsap.from(".rp-card", {
        y: 34, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: ".rp-wrap", start: "top 86%" },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      {/* ---------- hero ---------- */}
      <section className="grain relative overflow-hidden bg-blue text-white">
        <div aria-hidden="true" className="glow glow--ember right-[-14%] top-[-30%]" style={{ width: "min(720px, 64%)" }} />
        <div aria-hidden="true" className="glow glow--solar left-[-18%] bottom-[-34%]" style={{ width: "min(560px, 52%)" }} />

        <div className="shell page-hero-copy relative z-10">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] text-white/45">
              <li><Link href="/" className="transition-colors hover:text-yellow">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/tools" className="transition-colors hover:text-yellow">Tools</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/70">{REBATE_CHECK.label}</li>
            </ol>
          </nav>

          <div className="grid items-start gap-[clamp(2.5rem,4vw,4.5rem)] lg:grid-cols-[1fr_0.92fr]">
            <div className="lg:pt-[clamp(0.5rem,2vw,2rem)]">
              <div className="rh-copy">
                <p className="eyebrow mb-6 text-yellow">{REBATE_CHECK.eyebrow}</p>
                <h1 className="t-h1 max-w-[16ch]">{REBATE_CHECK.h1}</h1>
                <p className="t-lead mt-7 max-w-[46ch] text-white/70">{REBATE_CHECK.lead}</p>
              </div>

              <ul className="mt-[clamp(2rem,3vw,2.75rem)] flex flex-wrap gap-2.5">
                {REBATE_CHECK.chips.map((x) => (
                  <li key={x} className="rh-chip rounded-full border border-white/18 bg-white/[0.04] px-4 py-2 text-[0.78rem] text-white/70">
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            <ToolCard
              title="About your property"
              live={
                <div
                  aria-live="polite"
                  className="mt-8 rounded-[18px] border border-ember/25 bg-ember/[0.06] px-5 py-[1.1rem]"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="text-[0.62rem] uppercase tracking-[0.16em] text-ember">Result</span>
                    <a
                      href="#programs"
                      className="text-[0.76rem] font-semibold text-ember transition-opacity hover:opacity-70"
                    >
                      See the detail ↓
                    </a>
                  </div>
                  <p className="numeral mt-2 text-[clamp(1.9rem,3.4vw,2.6rem)] leading-none text-blue">
                    {results.length}
                  </p>
                  <p className="mt-2 text-[0.84rem] leading-relaxed text-ink">
                    {results.length === 1 ? "program worth looking at" : "programs worth looking at"}
                  </p>
                </div>
              }
              footnote="Nothing here is sent to us. This is a guide to what is worth pursuing, not a formal eligibility determination."
            >
              {/* Dropdowns rather than chip rows. Five questions with up to
                  four options each made a chip wall roughly twice the height
                  of the card, which pushed the result off screen on a laptop
                  and made the phone layout a long scroll before anything
                  happened. */}
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                {REBATE_CHECK.questions.map((q) => (
                  <div key={q.key}>
                    <label
                      htmlFor={`rq-${q.key}`}
                      className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-soft"
                    >
                      {q.label}
                    </label>
                    <Select
                      id={`rq-${q.key}`}
                      value={a[q.key]}
                      options={q.options}
                      onChange={(o) => setA((p) => ({ ...p, [q.key]: o }))}
                    />
                  </div>
                ))}
              </form>
            </ToolCard>
          </div>
        </div>
      </section>

      {/* ---------- programs ---------- */}
      <section
        id="programs"
        className="rp-wrap scroll-mt-[calc(var(--header-h)+24px)] bg-white"
        style={{ paddingTop: "clamp(3.5rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 9vh, 7rem)" }}
      >
        <div className="shell" aria-live="polite">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2 className="t-h2 text-blue">
              {results.length} {results.length === 1 ? "program" : "programs"} to look at
            </h2>
            <span className="text-[0.85rem] text-ink-soft">No amounts, on purpose</span>
          </div>

          <div className="grid gap-[clamp(0.9rem,1.4vw,1.25rem)] lg:grid-cols-2">
            {results.map((r) => {
              const s = STATUS[r.status] || STATUS.check;
              return (
                <article key={r.name} className={`rp-card rounded-[20px] border ${s.ring} ${s.tint} p-[clamp(1.2rem,2vw,1.85rem)]`}>
                  <div className="mb-3.5 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-blue/12 bg-paper px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-ink">
                      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                      {s.label}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold leading-snug text-blue">
                    {r.name}
                  </h3>
                  <p className="mt-3 text-[0.94rem] leading-relaxed text-ink">{r.line}</p>

                  <div className="mt-5 border-t border-blue/10 pt-5">
                    <span className="mb-3 block text-[0.64rem] uppercase tracking-[0.16em] text-ink-soft">
                      What it needs
                    </span>
                    <ul className="space-y-2">
                      {r.needs.map((n) => (
                        <li key={n} className="flex items-start gap-3">
                          <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                          <span className="text-[0.9rem] leading-relaxed text-ink">{n}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-[clamp(1.5rem,2.5vw,2.25rem)] flex flex-wrap items-center justify-between gap-x-8 gap-y-5 rounded-[20px] border border-blue/12 bg-cloud p-[clamp(1.3rem,2.2vw,2rem)]">
            <p className="max-w-[52ch] text-[0.95rem] leading-relaxed text-ink">
              We confirm your actual entitlement in writing and show it as a deducted line on your
              quote, so the figure you compare against other quotes is the figure you pay.
            </p>
            <div className="flex flex-wrap items-center gap-3.5">
              <Link href="/get-a-quote" className="btn btn-ember btn-sm">
                <span>Check what I qualify for</span>
              </Link>
              <a href={SITE.phoneHref} className="text-[0.9rem] font-semibold text-ember transition-opacity hover:opacity-70">
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- where to read more ---------------- */
function ReadMore() {
  const links = [
    { label: "All Victorian rebates", href: "/solar-rebates-victoria", line: "Every program explained in one place." },
    { label: "Battery rebate", href: "/victorian-battery-rebate", line: "What changed, and why storage adds up now." },
    { label: "Heat pump rebate", href: "/heat-pump-rebate-victoria", line: "Replacing gas or electric hot water." },
  ];

  return (
    <section
      className="grain relative overflow-hidden bg-blue text-white"
      style={{ paddingTop: "clamp(3.5rem, 8vh, 6rem)", paddingBottom: "clamp(3.5rem, 8vh, 6rem)" }}
    >
      <div aria-hidden="true" className="glow glow--solar left-[-12%] top-[-20%]" style={{ width: "min(560px, 48%)" }} />

      <div className="shell relative">
        <p className="eyebrow mb-7 text-yellow">Read the detail</p>
        <div className="grid gap-[clamp(0.75rem,1.2vw,1.1rem)] sm:grid-cols-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group rounded-[20px] border border-white/14 bg-blue-2/40 p-[clamp(1.2rem,1.8vw,1.6rem)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-white/30"
            >
              <span className="block font-[family-name:var(--font-display)] text-[1.02rem] font-bold text-white">
                {l.label}
              </span>
              <span className="mt-2 block text-[0.87rem] leading-relaxed text-white/60">{l.line}</span>
              <span
                aria-hidden="true"
                className="mt-4 inline-block text-[0.8rem] font-semibold text-yellow transition-transform duration-300 group-hover:translate-x-1.5"
              >
                Read →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RebateCheckPage() {
  return (
    <>
      <Checker />
      <ReadMore />
      <Faq
        items={REBATE_CHECK.faqs}
        heading="Rebates, answered."
        lead="Send us your address and what you are considering, and we will confirm your position in writing."
      />
      <OtherTools current={REBATE_CHECK.slug} />
      <CTA />
    </>
  );
}
