"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * Legal document layout.
 *
 * Deliberately not the marketing template. No hero image, no glows on the
 * body, no scroll theatre over the clauses — a policy should look like a
 * document, and animation over legal text reads as evasive. The only motion is
 * a quiet fade on the header.
 *
 * What it does keep: a plain-language summary above the clauses, and a sticky
 * contents index, because the fastest way to make a policy honest is to make
 * it navigable.
 */
export default function LegalPage({ doc }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".lg-head > *", { y: 26, opacity: 0, duration: 0.85, stagger: 0.09, ease: "power3.out" });
      gsap.from(".lg-sum", { y: 20, opacity: 0, duration: 0.7, stagger: 0.07, ease: "power3.out", delay: 0.35 });
    },
    { scope: root }
  );

  const slug = (h) => h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <div ref={root}>
      {/* header */}
      <section className="grain relative overflow-hidden bg-blue text-white">
        <div aria-hidden="true" className="glow glow--solar right-[-16%] top-[-34%]" style={{ width: "min(640px, 58%)" }} />

        <div className="shell page-hero-copy relative z-10">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] text-white/55">
              <li><Link href="/" className="transition-colors hover:text-yellow">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/70">{doc.label}</li>
            </ol>
          </nav>

          <div className="lg-head max-w-[42rem]">
            <p className="eyebrow mb-6 text-yellow">{doc.eyebrow}</p>
            <h1 className="t-h1">{doc.h1}</h1>
            <p className="t-lead mt-7 max-w-[52ch] text-white/70">{doc.lead}</p>
            <p className="mt-8 text-[0.78rem] uppercase tracking-[0.14em] text-white/55">
              Last updated {doc.updated}
            </p>
          </div>

          {doc.summary && (
            <ul className="mt-[clamp(2.5rem,4vw,3.5rem)] grid max-w-[54rem] gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-4 border-t border-white/12 pt-8 sm:grid-cols-2">
              {doc.summary.map((s) => (
                <li key={s} className="lg-sum flex items-start gap-3.5">
                  <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-yellow" />
                  <span className="text-[0.93rem] leading-relaxed text-white/75">{s}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* body */}
      <section
        className="bg-white"
        style={{ paddingTop: "clamp(3.5rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 9vh, 7rem)" }}
      >
        <div className="shell grid gap-[clamp(2.5rem,4vw,5rem)] lg:grid-cols-[0.7fr_1.3fr]">
          {/* contents */}
          <nav aria-label="Contents" className="lg:sticky lg:top-[14vh] lg:self-start">
            <p className="eyebrow mb-6 text-ember">Contents</p>
            <ol className="border-t border-blue/12">
              {doc.sections.map((s, i) => (
                <li key={s.h} className="border-b border-blue/10">
                  <a
                    href={`#${slug(s.h)}`}
                    className="flex items-baseline gap-3.5 py-3 text-[0.9rem] text-ink transition-colors duration-300 hover:text-ember"
                  >
                    <span className="numeral shrink-0 text-[0.68rem] text-ink-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">{s.h}</span>
                  </a>
                </li>
              ))}
            </ol>

            <div className="mt-9 rounded-[20px] border border-blue/12 bg-cloud p-[clamp(1.2rem,1.8vw,1.75rem)]">
              <p className="text-[0.92rem] leading-relaxed text-ink">
                Questions about your information, or want a copy of what we hold?
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-4 block break-words font-[family-name:var(--font-display)] text-[0.98rem] font-bold text-blue transition-colors hover:text-ember"
              >
                {SITE.email}
              </a>
              <a
                href={SITE.phoneHref}
                className="mt-1.5 block text-[0.9rem] text-ember transition-colors hover:text-blue"
              >
                {SITE.phone}
              </a>
            </div>
          </nav>

          {/* clauses */}
          <div className="max-w-[68ch]">
            {doc.sections.map((s, i) => (
              <section
                key={s.h}
                id={slug(s.h)}
                className="scroll-mt-[calc(var(--header-h)+24px)] border-t border-blue/12 pt-8 [&:not(:first-child)]:mt-[clamp(2.5rem,4vw,3.5rem)]"
              >
                <div className="flex items-baseline gap-4">
                  <span className="numeral text-[0.68rem] tracking-[0.14em] text-ember">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="t-h3 text-blue">{s.h}</h2>
                </div>
                {s.p.map((p) => (
                  <p key={p.slice(0, 32)} className="mt-4 text-[0.97rem] leading-[1.75] text-ink">
                    {p}
                  </p>
                ))}
              </section>
            ))}

            <p className="mt-[clamp(2.5rem,4vw,3.5rem)] border-t border-blue/12 pt-8 text-[0.85rem] leading-relaxed text-ink-soft">
              {doc.entity.line}. This policy describes how we handle personal information in
              accordance with the Australian Privacy Principles.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
