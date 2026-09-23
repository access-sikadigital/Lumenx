"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import { REBATES_PAGE } from "@/lib/rebates";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- intro ---------------- */
function Intro() {
  const root = useRef(null);
  const { intro } = REBATES_PAGE;
  const [lede, ...rest] = intro.body;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".rp-copy > *", {
        y: 30, opacity: 0, duration: 0.85, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".rp-media", {
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
        <div className="rp-copy">
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

        <div className="rp-media relative aspect-[4/5] overflow-hidden rounded-[24px] lg:mt-[clamp(2rem,5vw,5rem)]">
          <Image src={intro.image} alt={intro.imageAlt} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- the four programs ---------------- */
function Programs() {
  const root = useRef(null);
  const { programs } = REBATES_PAGE;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".pg-head > *", {
        y: 26, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".pg-card", {
        y: 36, opacity: 0, duration: 0.85, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".pg-grid", start: "top 85%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="grain relative overflow-hidden bg-blue text-white"
      style={{
        paddingTop: "clamp(4.5rem, 11vh, 9rem)",
        paddingBottom: "clamp(4.5rem, 11vh, 9rem)",
        // isolate this section's repaints from the rest of the page
        contain: "paint",
      }}
    >
      {/* .glow: gradient wash instead of a blur filter — see globals.css */}
      <div
        aria-hidden="true"
        className="glow glow--solar right-[-10%] top-[-15%]"
        style={{ width: "min(720px, 55%)" }}
      />

      <div className="shell relative">
        <div className="pg-head">
          <p className="eyebrow mb-5 text-yellow">The programs</p>
          <h2 className="t-h2 max-w-[24ch]">Two federal, two Victorian.</h2>
          <p className="t-body mt-6 max-w-[58ch] text-white/65">
            Each one covers different equipment and carries its own rules. Here is what each actually
            does, without the acronyms.
          </p>
        </div>

        <div className="pg-grid mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1rem,1.5vw,1.5rem)] md:grid-cols-2">
          {programs.map((p) => (
            <article
              key={p.n}
              className="pg-card relative flex flex-col overflow-hidden rounded-[22px] border border-white/12 bg-blue-2/45 p-[clamp(1.5rem,2.2vw,2.5rem)] transition-colors duration-500 hover:border-yellow/40"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <span className="numeral text-[0.7rem] tracking-[0.16em] text-yellow">{p.n}</span>
                  <h3 className="t-h3 mt-4">{p.name}</h3>
                  <p className="mt-1.5 text-[0.82rem] text-white/40">{p.full}</p>
                </div>
                <span className="shrink-0 whitespace-nowrap rounded-full border border-white/15 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/55">
                  {p.level}
                </span>
              </div>

              <p className="t-body mt-6 flex-1 text-white/65">{p.line}</p>

              <dl className="mt-7 space-y-3 border-t border-white/10 pt-6">
                <div className="flex items-start justify-between gap-5">
                  <dt className="text-[0.66rem] uppercase tracking-[0.14em] text-white/40">Applies to</dt>
                  <dd className="text-right text-[0.88rem] font-medium">{p.applies}</dd>
                </div>
                <p className="text-[0.82rem] leading-relaxed text-white/45">{p.note}</p>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- signature: eligibility matrix ---------------- */
function Mark({ v }) {
  if (v === true)
    return (
      <span aria-label="Applies" className="grid h-7 w-7 place-items-center rounded-full bg-green/15">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 6.2 4.8 8.5 9.5 3.8" stroke="#63b93b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  if (v === false)
    return (
      <span aria-label="Does not apply" className="grid h-7 w-7 place-items-center rounded-full bg-blue/[0.05]">
        <span aria-hidden="true" className="h-[2px] w-3 rounded-full bg-blue/25" />
      </span>
    );
  return (
    <span className="whitespace-nowrap rounded-full bg-yellow/20 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-ember">
      {v}
    </span>
  );
}

function Matrix() {
  const root = useRef(null);
  const { matrix } = REBATES_PAGE;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".mx-head > *", {
        y: 26, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".mx-line", {
        y: 20, opacity: 0, duration: 0.6, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: ".mx-grid", start: "top 88%" },
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
        <div className="mx-head">
          <p className="eyebrow mb-5 text-ember">{matrix.eyebrow}</p>
          <h2 className="t-h2 max-w-[24ch] text-blue">{matrix.heading}</h2>
          <p className="t-body mt-6 max-w-[58ch] text-ink">{matrix.lead}</p>
        </div>

        <div className="mx-grid mt-[clamp(2.5rem,5vw,4rem)] overflow-hidden rounded-[22px] border border-blue/12 bg-white">
          <div className="mx-line grid grid-cols-[1fr_repeat(3,auto)] items-end gap-x-3 border-b border-blue/10 px-[clamp(1rem,2vw,2rem)] py-5 sm:gap-x-6">
            <span className="text-[0.66rem] uppercase tracking-[0.14em] text-ink-soft">Program</span>
            {matrix.columns.map((c) => (
              <span key={c} className="w-[clamp(64px,10vw,120px)] text-center text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-blue sm:text-[0.74rem]">
                {c}
              </span>
            ))}
          </div>

          {matrix.rows.map((r) => (
            <div
              key={r.name}
              className="mx-line grid grid-cols-[1fr_repeat(3,auto)] items-center gap-x-3 border-b border-blue/[0.07] px-[clamp(1rem,2vw,2rem)] py-4 last:border-b-0 sm:gap-x-6"
            >
              <span className="text-[0.88rem] font-medium leading-snug text-blue sm:text-[0.96rem]">{r.name}</span>
              {r.marks.map((m, i) => (
                <span key={i} className="flex w-[clamp(64px,10vw,120px)] justify-center">
                  <Mark v={m} />
                </span>
              ))}
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-[76ch] text-[0.82rem] leading-relaxed text-ink-soft">{matrix.note}</p>

        <Link href="/get-a-quote" className="btn btn-ember mt-9">
          <span>Check what I qualify for</span>
        </Link>
      </div>
    </section>
  );
}

/* ================= page ================= */
export default function RebatesPage() {
  return (
    <>
      <PageHero
        eyebrow={REBATES_PAGE.eyebrow}
        h1={REBATES_PAGE.h1}
        lead={REBATES_PAGE.lead}
        image={REBATES_PAGE.hero.image}
        imageAlt={REBATES_PAGE.hero.alt}
        chips={REBATES_PAGE.chips}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solar Rebates Victoria", href: "/solar-rebates-victoria" },
        ]}
      />
      <Intro />
      <Programs />
      <Matrix />
      <Process />
      <Reviews />
      <Faq
        items={REBATES_PAGE.faqs}
        heading="Rebates, answered."
        lead="Send us your address and what you are considering, and we will confirm exactly what you qualify for in writing."
      />
      <CTA />
    </>
  );
}
