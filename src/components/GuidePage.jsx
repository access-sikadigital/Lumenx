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
import Marquee from "@/components/Marquee";
import { getGuide } from "@/lib/guides";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- intro ---------------- */
function Intro({ intro }) {
  const root = useRef(null);
  const [lede, ...rest] = intro.body;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".gd-copy > *", {
        y: 30, opacity: 0, duration: 0.85, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".gd-media", {
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
        <div className="gd-copy">
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

        <div className="gd-media relative aspect-[4/5] overflow-hidden rounded-[24px] lg:mt-[clamp(2rem,5vw,5rem)]">
          <Image src={intro.image} alt={intro.imageAlt} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" 
            quality={90}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- process steps ---------------- */
function Steps({ steps }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".gs-head > *", {
        y: 26, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".gs-rule", {
        scaleX: 0, transformOrigin: "left center", duration: 1.1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".gs-grid", start: "top 86%" },
      });
      gsap.from(".gs-card", {
        y: 32, opacity: 0, duration: 0.8, stagger: 0.11, ease: "power3.out",
        scrollTrigger: { trigger: ".gs-grid", start: "top 85%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="grain relative overflow-hidden bg-blue text-white"
      style={{ paddingTop: "clamp(4.5rem, 11vh, 9rem)", paddingBottom: "clamp(4.5rem, 11vh, 9rem)" }}
    >
      <div aria-hidden="true" className="glow glow--solar right-[-10%] top-[-15%]" style={{ width: "min(640px, 50%)" }} />

      <div className="shell relative">
        <div className="gs-head">
          <p className="eyebrow mb-5 text-yellow">{steps.eyebrow}</p>
          <h2 className="t-h2 max-w-[24ch]">{steps.heading}</h2>
          <p className="t-body mt-6 max-w-[58ch] text-white/65">{steps.lead}</p>
        </div>

        <ol className="gs-grid mt-[clamp(2.5rem,5vw,4rem)] grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
          {steps.items.map((s) => (
            <li key={s.n} className="relative border-t border-white/12 pt-8">
              <span aria-hidden="true" className="gs-rule absolute left-0 top-[-1px] h-[2px] w-full bg-yellow" />
              <div className="gs-card">
                <span className="numeral text-[0.7rem] tracking-[0.16em] text-yellow">{s.n}</span>
                <h3 className="t-h3 mt-4">{s.t}</h3>
                <p className="mt-3.5 max-w-[36ch] text-[0.93rem] leading-relaxed text-white/60">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- checklist + related ---------------- */
function Checklist({ checklist, related }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".gc-item", {
        y: 22, opacity: 0, duration: 0.65, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 85%" },
      });
      gsap.from(".gc-card", {
        y: 30, opacity: 0, duration: 0.75, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".gc-related", start: "top 88%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="bg-cloud"
      style={{ paddingTop: "clamp(4rem, 9vh, 7rem)", paddingBottom: "clamp(4rem, 9vh, 7rem)" }}
    >
      <div className="shell grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span aria-hidden="true" className="mb-7 block h-[3px] w-12 bg-ember" />
          <h2 className="t-h2 max-w-[18ch] text-blue">{checklist.heading}</h2>
          <ul className="mt-8 space-y-4">
            {checklist.items.map((c) => (
              <li key={c} className="gc-item flex items-start gap-3.5 border-b border-blue/10 pb-4">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-yellow/25">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember" />
                </span>
                <span className="text-[0.96rem] leading-relaxed text-ink">{c}</span>
              </li>
            ))}
          </ul>
          <Link href="/get-a-quote" className="btn btn-ember mt-9">
            <span>Check what I qualify for</span>
          </Link>
        </div>

        <div className="gc-related lg:pt-[clamp(1rem,3vw,3.5rem)]">
          <p className="eyebrow mb-6 text-ember">Related</p>
          <div className="grid gap-[clamp(0.75rem,1.2vw,1.1rem)]">
            {related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="gc-card group flex items-center justify-between gap-5 rounded-[18px] border border-blue/12 bg-paper p-[clamp(1.2rem,1.8vw,1.75rem)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-blue/25"
              >
                <span className="min-w-0">
                  <span className="block font-[family-name:var(--font-display)] text-[1.02rem] font-bold text-blue">
                    {r.label}
                  </span>
                  <span className="mt-1.5 block text-[0.88rem] leading-relaxed text-ink">{r.line}</span>
                </span>
                <span aria-hidden="true" className="shrink-0 text-ember transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= page ================= */
export default function GuidePage({ slug }) {
  const g = getGuide(slug);
  if (!g) return null;

  return (
    <>
      <PageHero
        eyebrow={g.eyebrow}
        h1={g.h1}
        lead={g.lead}
        image={g.hero.image}
        imageAlt={g.hero.alt}
        chips={g.chips}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Rebates", href: "/solar-rebates-victoria" },
          { label: g.label, href: `/${g.slug}` },
        ]}
      />
      <Intro intro={g.intro} />
      <Steps steps={g.steps} />
      <Checklist checklist={g.checklist} related={g.related} />
      <Marquee />
      <Faq
        items={g.faqs}
        heading={`${g.label}, answered.`}
        lead="Send us your address and what you are considering, and we will confirm your position in writing."
      />
      <CTA />
    </>
  );
}
