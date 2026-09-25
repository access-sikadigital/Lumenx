"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Select from "@/components/Select";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import { SITE } from "@/lib/site";
import { CALCULATORS, REBATE_CHECK, getCalculator } from "@/lib/calculators";

gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   Shared input card.

   Lives in the hero on the right, so the tool is the first thing a
   visitor sees rather than something they have to scroll to find.
   Exported so the rebate checker can sit in the same frame.
   ================================================================ */
export function ToolCard({ title, children, live, footnote }) {
  return (
    <div className="tc-card relative rounded-[26px] border border-white/10 bg-paper p-[clamp(1.4rem,2.4vw,2.25rem)] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)]">
      <p className="eyebrow mb-7 text-ember">{title}</p>
      {children}
      {live}
      <p className="mt-7 border-t border-blue/12 pt-6 text-[0.8rem] leading-relaxed text-ink-soft">
        {footnote}
      </p>
    </div>
  );
}

/**
 * Live answer strip, inside the card.
 *
 * The full breakdown lives in its own section below the hero, which on a laptop
 * sits under the fold. Without this, someone fills the form in and nothing
 * visibly happens, so the tool reads as broken. The strip gives the answer the
 * moment it is computable, right where they are typing, and points down to the
 * working rather than replacing it.
 */
function LiveAnswer({ result, missing }) {
  if (!result) {
    return (
      <div className="mt-8 rounded-[18px] border border-dashed border-blue/22 bg-cloud px-5 py-4">
        <p className="text-[0.82rem] leading-relaxed text-ink-soft">
          Fill in {missing.map((f) => f.label.toLowerCase()).join(" and ")} and your answer appears
          here.
        </p>
      </div>
    );
  }

  return (
    <div
      aria-live="polite"
      className="mt-8 rounded-[18px] border border-ember/25 bg-ember/[0.06] px-5 py-[1.1rem]"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-[0.62rem] uppercase tracking-[0.16em] text-ember">Your answer</span>
        <a
          href="#answer"
          className="text-[0.76rem] font-semibold text-ember transition-opacity hover:opacity-70"
        >
          See the working ↓
        </a>
      </div>
      <p className="numeral mt-2 break-words text-[clamp(1.9rem,3.4vw,2.6rem)] leading-none text-blue">
        {result.headline}
      </p>
      <p className="mt-2 text-[0.84rem] leading-relaxed text-ink">{result.headlineLabel}</p>
    </div>
  );
}

/* ---------------- one field ---------------- */
function Field({ f, value, onChange }) {
  const id = `f-${f.key}`;

  return (
    <div>
      <label htmlFor={id} className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
          {f.label}
          {f.required && <span className="ml-1 text-ember">*</span>}
        </span>
        {f.type === "range" && (
          <span className="numeral text-[0.95rem] text-blue">
            {value}
            {f.unit}
          </span>
        )}
      </label>

      {f.type === "select" ? (
        <Select id={id} value={value} options={f.options} onChange={onChange} meta={f.meta} />
      ) : f.type === "range" ? (
        <input
          id={id}
          type="range"
          min={f.min}
          max={f.max}
          step={f.step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full accent-[var(--color-ember)]"
        />
      ) : (
        <div className="relative">
          <input
            id={id}
            type="number"
            inputMode="decimal"
            min={f.min}
            max={f.max}
            step={f.step}
            value={value}
            placeholder={f.unit === "$" ? "0" : ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-[14px] border border-blue/15 bg-paper px-4 py-3.5 pr-16 text-[0.95rem] text-blue outline-none transition-colors duration-300 placeholder:text-ink-soft/60 focus:border-ember focus:ring-2 focus:ring-ember/20"
          />
          {f.unit && (
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.8rem] text-ink-soft">
              {f.unit}
            </span>
          )}
        </div>
      )}

      {f.help && <p className="mt-2 text-[0.8rem] leading-relaxed text-ink-soft">{f.help}</p>}
    </div>
  );
}

/* ================================================================
   Hero + results.

   One component because the inputs and the result share state: the
   card sits in the hero, the answer lands directly beneath it, and
   both update as the visitor types.
   ================================================================ */
function Tool({ c }) {
  const root = useRef(null);

  const initial = useMemo(() => {
    const o = {};
    for (const f of c.inputs) o[f.key] = f.default;
    return o;
  }, [c]);
  const [v, setV] = useState(initial);

  const set = (f) => (raw) =>
    setV((p) => ({ ...p, [f.key]: f.type === "select" ? raw : raw === "" ? "" : Number(raw) }));

  const missing = c.inputs.filter(
    (f) => f.required && (v[f.key] === "" || v[f.key] === null || Number.isNaN(v[f.key]))
  );
  const ready = missing.length === 0;
  const result = ready ? c.compute(v) : null;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".ch-copy > *", { y: 30, opacity: 0, duration: 0.9, stagger: 0.09, ease: "power3.out" });
      gsap.from(".tc-card", { y: 40, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
      gsap.from(".ch-chip", { y: 14, opacity: 0, duration: 0.55, stagger: 0.07, ease: "power3.out", delay: 0.5 });
      gsap.from(".tr-panel", {
        y: 44, opacity: 0, duration: 0.95, ease: "power3.out",
        scrollTrigger: { trigger: ".tr-wrap", start: "top 86%" },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      {/* ---------- hero, with the tool on the right ---------- */}
      <section className="grain relative overflow-hidden bg-blue text-white">
        <div aria-hidden="true" className="glow glow--solar right-[-14%] top-[-30%]" style={{ width: "min(720px, 64%)" }} />
        <div aria-hidden="true" className="glow glow--ember left-[-18%] bottom-[-34%]" style={{ width: "min(560px, 52%)" }} />

        <div className="shell page-hero-copy relative z-10">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] text-white/45">
              <li><Link href="/" className="transition-colors hover:text-yellow">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/tools" className="transition-colors hover:text-yellow">Tools</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/70">{c.label}</li>
            </ol>
          </nav>

          <div className="grid items-start gap-[clamp(2.5rem,4vw,4.5rem)] lg:grid-cols-[1fr_0.92fr]">
            {/* copy */}
            <div className="lg:pt-[clamp(0.5rem,2vw,2rem)]">
              <div className="ch-copy">
                <p className="eyebrow mb-6 text-yellow">{c.eyebrow}</p>
                <h1 className="t-h1 max-w-[16ch]">{c.h1}</h1>
                <p className="t-lead mt-7 max-w-[46ch] text-white/70">{c.lead}</p>
              </div>

              <ul className="mt-[clamp(2rem,3vw,2.75rem)] flex flex-wrap gap-2.5">
                {c.chips.map((x) => (
                  <li key={x} className="ch-chip rounded-full border border-white/18 bg-white/[0.04] px-4 py-2 text-[0.78rem] text-white/70">
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            {/* the tool */}
            <ToolCard
              title="Your numbers"
              live={<LiveAnswer result={result} missing={missing} />}
              footnote="Nothing here is sent to us. The maths runs in your browser, and there is no email gate."
            >
              <form onSubmit={(e) => e.preventDefault()} className="space-y-7">
                {c.inputs.map((f) => (
                  <Field key={f.key} f={f} value={v[f.key]} onChange={set(f)} />
                ))}
              </form>
            </ToolCard>
          </div>
        </div>
      </section>

      {/* ---------- the answer ---------- */}
      <section
        id="answer"
        className="tr-wrap scroll-mt-[calc(var(--header-h)+24px)] bg-white"
        style={{ paddingTop: "clamp(3.5rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 9vh, 7rem)" }}
      >
        <div className="shell">
          {!ready ? (
            <div className="tr-panel rounded-[26px] border border-dashed border-blue/25 bg-cloud p-[clamp(1.75rem,4vw,3.5rem)]">
              <p className="eyebrow mb-6 text-ink-soft">Still needed</p>
              <ul className="grid gap-3.5 sm:grid-cols-2">
                {missing.map((f) => (
                  <li key={f.key} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                    <span className="text-[0.97rem] leading-relaxed text-ink">{f.label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-[58ch] border-t border-blue/12 pt-7 text-[0.92rem] leading-relaxed text-ink-soft">
                These come off your electricity bill. We ask for them rather than guessing, which is
                the entire point of this tool, and the reason the answer will be about your house
                rather than an average one.
              </p>
            </div>
          ) : (
            <div
              aria-live="polite"
              className="tr-panel grain relative overflow-hidden rounded-[26px] bg-blue text-white"
            >
              <div aria-hidden="true" className="glow glow--solar right-[-16%] top-[-40%]" style={{ width: "min(520px, 55%)" }} />

              <div className="relative grid gap-[clamp(2rem,4vw,4rem)] p-[clamp(1.75rem,4vw,3.5rem)] lg:grid-cols-[0.85fr_1.15fr]">
                {/* headline */}
                <div>
                  <p className="eyebrow mb-6 text-yellow">Your answer</p>
                  {/* The floor is 2.2rem rather than 2.8: at 320px the panel
                      leaves ~232px of inner width, and a headline like
                      "100+ years" overflows it at the larger size. */}
                  <p className="numeral break-words text-[clamp(2.2rem,7vw,5.2rem)] leading-none text-yellow">
                    {result.headline}
                  </p>
                  <p className="mt-4 max-w-[26ch] text-[0.98rem] leading-relaxed text-white/65">
                    {result.headlineLabel}
                  </p>

                  <div className="mt-9 flex flex-wrap items-center gap-3.5">
                    <Link href="/get-a-quote" className="btn btn-primary btn-sm">
                      <span>{c.cta}</span>
                    </Link>
                    <a href={SITE.phoneHref} className="text-[0.9rem] font-semibold text-yellow transition-opacity hover:opacity-75">
                      {SITE.phone}
                    </a>
                  </div>
                </div>

                {/* working */}
                <div>
                  <dl className="border-t border-white/12">
                    {result.rows.map((r) => (
                      <div
                        key={r.k}
                        className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 border-b border-white/10 py-3.5"
                      >
                        <dt className={`text-[0.9rem] ${r.strong ? "text-white" : "text-white/60"}`}>{r.k}</dt>
                        <dd className={`numeral text-[0.98rem] ${r.strong ? "text-yellow" : "text-white/85"}`}>{r.v}</dd>
                      </div>
                    ))}
                  </dl>

                  {result.note && (
                    <p className="mt-7 rounded-[16px] border border-yellow/25 bg-yellow/[0.07] p-5 text-[0.9rem] leading-relaxed text-white/80">
                      {result.note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ----------------------------------------------------------------
   Assumptions, stated rather than buried. This section is the whole
   reason these calculators are defensible.
   ---------------------------------------------------------------- */
function Assumptions({ items }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".as-item", {
        y: 20, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 86%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="bg-cloud"
      style={{ paddingTop: "clamp(3.5rem, 8vh, 6rem)", paddingBottom: "clamp(3.5rem, 8vh, 6rem)" }}
    >
      <div className="shell grid gap-[clamp(2rem,4vw,5rem)] lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span aria-hidden="true" className="mb-7 block h-[3px] w-12 bg-ember" />
          <h2 className="t-h3 max-w-[20ch] text-blue">What this assumes, in full.</h2>
          <p className="mt-5 max-w-[32ch] text-[0.92rem] leading-relaxed text-ink">
            Every calculator makes assumptions. Most sites hide theirs, because naming them makes the
            headline number look less impressive.
          </p>
        </div>

        <ol className="border-t border-blue/12">
          {items.map((a, i) => (
            <li key={a.slice(0, 30)} className="as-item flex items-start gap-4 border-b border-blue/10 py-5">
              <span className="numeral mt-0.5 shrink-0 text-[0.68rem] text-ember">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.95rem] leading-relaxed text-ink">{a}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- other tools ---------------- */
export function OtherTools({ current }) {
  const items = [
    ...CALCULATORS.map((c) => ({ slug: c.slug, nav: c.nav, label: c.label, lead: c.lead })),
    { slug: REBATE_CHECK.slug, nav: REBATE_CHECK.nav, label: REBATE_CHECK.label, lead: REBATE_CHECK.lead },
  ].filter((c) => c.slug !== current);

  return (
    <section
      className="bg-white"
      style={{ paddingTop: "clamp(3.5rem, 8vh, 6rem)", paddingBottom: "clamp(3.5rem, 8vh, 6rem)" }}
    >
      <div className="shell">
        <p className="eyebrow mb-7 text-ember">The other tools</p>
        <div className="grid gap-[clamp(0.75rem,1.2vw,1.1rem)] sm:grid-cols-2 xl:grid-cols-3">
          {items.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className="group flex flex-col rounded-[20px] border border-blue/12 bg-paper p-[clamp(1.2rem,1.8vw,1.6rem)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-blue/25"
            >
              <span className="mb-3 block text-[0.64rem] uppercase tracking-[0.16em] text-ember">{t.nav}</span>
              <span className="font-[family-name:var(--font-display)] text-[1.02rem] font-bold leading-snug text-blue">
                {t.label}
              </span>
              <span className="mt-2.5 flex-1 text-[0.87rem] leading-relaxed text-ink">
                {t.lead.split(".")[0]}.
              </span>
              <span
                aria-hidden="true"
                className="mt-4 inline-block text-[0.8rem] font-semibold text-ember transition-transform duration-300 group-hover:translate-x-1.5"
              >
                Open →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CalculatorPage({ slug }) {
  const c = getCalculator(slug);
  if (!c) return null;

  return (
    <>
      <Tool c={c} />
      <Assumptions items={c.assumptions} />
      <Faq
        items={c.faqs}
        heading={`${c.nav}, answered.`}
        lead="If the numbers here do not match what a salesperson told you, ask them which assumption they used."
      />
      <OtherTools current={c.slug} />
      <CTA />
    </>
  );
}
