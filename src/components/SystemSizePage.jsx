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
import { SYSTEM_SIZES, SYSTEMS_HUB } from "@/lib/systems";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- spec block ---------------- */
function Specs({ s }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".sp-copy > *", {
        y: 28, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".sp-rule", {
        scaleX: 0, transformOrigin: "left center", duration: 1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".sp-grid", start: "top 88%" },
      });
      gsap.from(".sp-cell", {
        y: 22, opacity: 0, duration: 0.65, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: ".sp-grid", start: "top 88%" },
      });
      gsap.from(".sp-media", {
        y: 40, opacity: 0, duration: 1.05, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
    },
    { scope: root }
  );

  const cells = [
    { k: "Panels", v: `${s.panels} × 440W` },
    { k: "Inverter", v: s.inverter },
    { k: "Roof space", v: s.roofArea },
    { k: "Best for", v: s.suits },
  ];

  return (
    <section
      className="bg-white"
      ref={root}
      style={{ paddingTop: "clamp(4.5rem, 11vh, 9rem)", paddingBottom: "clamp(4.5rem, 11vh, 9rem)" }}
    >
      <div className="shell grid items-start gap-[clamp(2.5rem,5vw,6rem)] lg:grid-cols-[1.15fr_0.85fr]">
        <div className="sp-copy">
          <span aria-hidden="true" className="mb-7 block h-[3px] w-12 bg-ember" />
          <h2 className="t-h2 max-w-[22ch] text-blue">What a {s.kw} system looks like</h2>
          <p className="t-lead mt-7 max-w-[54ch] text-blue/80">{s.profile}</p>

          <div className="sp-grid mt-[clamp(2.5rem,4vw,3.5rem)] grid gap-x-[clamp(1.5rem,2.5vw,3rem)] gap-y-9 sm:grid-cols-2">
            {cells.map((c) => (
              <div key={c.k} className="relative border-t border-blue/12 pt-6">
                <span aria-hidden="true" className="sp-rule absolute left-0 top-[-1px] h-[2px] w-9 bg-ember" />
                <div className="sp-cell">
                  <span className="block text-[0.66rem] uppercase tracking-[0.16em] text-ink-soft">{c.k}</span>
                  <p className="numeral mt-3 text-[clamp(1.15rem,1.6vw,1.6rem)] leading-tight text-blue">{c.v}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Savings only appear where Lumenx publishes a real figure. */}
          {s.savings && (
            <div className="mt-[clamp(2rem,3vw,2.75rem)] rounded-[20px] border border-green/25 bg-green/[0.05] p-[clamp(1.4rem,2vw,2rem)]">
              <p className="numeral text-[clamp(1.9rem,3vw,2.8rem)] leading-none text-blue">{s.savings.value}</p>
              <p className="mt-2.5 text-[0.86rem] text-ink">{s.savings.label}</p>
              <p className="mt-3 text-[0.8rem] leading-relaxed text-ink-soft">
                Your figure depends on your usage, tariff and roof. We calculate it properly in
                your quote rather than quoting an average back at you.
              </p>
            </div>
          )}

          <ul className="mt-[clamp(2rem,3vw,2.75rem)] space-y-3.5 border-t border-blue/12 pt-8">
            {s.consider.map((c) => (
              <li key={c} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-yellow/20">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember" />
                </span>
                <span className="text-[0.95rem] leading-relaxed text-ink">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="sp-media relative aspect-[4/5] overflow-hidden rounded-[24px] lg:mt-[clamp(2rem,5vw,5rem)]">
          <Image src={s.image} alt={s.imageAlt} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- the size ladder (signature) ---------------- */
export function SizeLadder({ current }) {
  const root = useRef(null);
  const max = Math.max(...SYSTEM_SIZES.map((s) => s.kwNum));

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".sl-head > *", {
        y: 26, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".sl-bar", {
        scaleX: 0, transformOrigin: "left center", duration: 1.1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".sl-list", start: "top 86%" },
      });
      gsap.from(".sl-row", {
        y: 22, opacity: 0, duration: 0.6, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: ".sl-list", start: "top 86%" },
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
        <div className="sl-head">
          <p className="eyebrow mb-5 text-yellow">Compare the range</p>
          <h2 className="t-h2 max-w-[24ch]">Every size, side by side.</h2>
          <p className="t-body mt-6 max-w-[58ch] text-white/65">
            Panel counts and roof space are arithmetic from 440W modules. Which one is right for
            you comes from your bill, not this table.
          </p>
        </div>

        <ul className="sl-list mt-[clamp(2.5rem,5vw,4rem)] space-y-[clamp(0.75rem,1.2vw,1.1rem)]">
          {SYSTEM_SIZES.map((s) => {
            const active = s.slug === current;
            return (
              <li key={s.slug}>
                <Link
                  href={`/solar-systems/${s.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`sl-row group block rounded-[18px] border p-[clamp(1.1rem,1.8vw,1.75rem)] transition-colors duration-500 ${
                    active
                      ? "border-yellow/50 bg-blue-2"
                      : "border-white/12 bg-blue-2/35 hover:border-white/28 hover:bg-blue-2/60"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1.5">
                    <span className="numeral text-[clamp(1.3rem,2vw,1.9rem)] leading-none">
                      {s.kw}
                      {active && (
                        <span className="ml-3 align-middle rounded-full bg-yellow px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-blue">
                          You are here
                        </span>
                      )}
                    </span>
                    <span className="text-[0.82rem] text-white/50">
                      {s.panels} panels · {s.roofArea}
                    </span>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/8">
                    <div
                      className="sl-bar h-full rounded-full"
                      style={{
                        width: `${(s.kwNum / max) * 100}%`,
                        background: active ? "#ffb120" : "rgba(255,255,255,0.3)",
                      }}
                    />
                  </div>

                  <p className="mt-3.5 text-[0.88rem] text-white/55">{s.suits}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ================= size page ================= */
export default function SystemSizePage({ slug }) {
  const s = SYSTEM_SIZES.find((x) => x.slug === slug);
  if (!s) return null;

  return (
    <>
      <PageHero
        eyebrow={`${s.kw} system`}
        h1={s.h1}
        lead={s.lead}
        image={s.image}
        imageAlt={s.imageAlt}
        chips={[`${s.panels} × 440W panels`, `${s.inverter} inverter`, s.roofArea]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solar Systems", href: "/solar-systems" },
          { label: s.kw, href: `/solar-systems/${s.slug}` },
        ]}
      />
      <Specs s={s} />
      <SizeLadder current={s.slug} />
      <Process />
      <Reviews />
      <Faq
        items={SYSTEMS_HUB.faqs}
        heading="System sizing, answered."
        lead="Send us a recent bill and we will tell you which of these is actually right for you."
      />
      <CTA />
    </>
  );
}
