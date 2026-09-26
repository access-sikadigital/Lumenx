"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SITE } from "@/lib/site";

/**
 * Inner-page hero.
 *
 * Shorter than the home hero on purpose: a landing page's job is to get to
 * the substance, so this is sized to the content rather than the viewport.
 * It keeps the home page's language — navy, grain, masked line reveal, ember
 * glow — so inner pages read as the same site.
 */
export default function PageHero({ eyebrow, h1, lead, image, imageAlt, chips = [], breadcrumbs = [] }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".ph-media", { scale: 1.14, duration: 1.6, ease: "expo.out" }, 0)
        .from(".ph-crumb", { y: 14, opacity: 0, duration: 0.6 }, 0.15)
        .from(".ph-eyebrow", { y: 16, opacity: 0, duration: 0.6 }, 0.25)
        .from(".ph-line-in", { yPercent: 118, duration: 1.05, stagger: 0.08 }, 0.3)
        .from(".ph-lead", { y: 22, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".ph-act", { y: 18, opacity: 0, duration: 0.65, stagger: 0.08 }, "-=0.55")
        .from(".ph-chip", { y: 14, opacity: 0, duration: 0.5, stagger: 0.07 }, "-=0.45");
    },
    { scope: root }
  );

  return (
    <section ref={root} className="grain relative overflow-hidden bg-blue">
      {/* media */}
      <div className="ph-media absolute inset-0">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" 
            quality={90}
          />
        <div className="absolute inset-0 bg-blue/72" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #0b143b 8%, rgba(11,20,59,.82) 46%, rgba(11,20,59,.55) 100%)",
          }}
        />
      </div>

      <div
        aria-hidden="true"
        className="glow glow--solar right-[-8%] top-[-20%]"
        style={{
          width: "min(680px, 55%)",
        }}
      />

      {/* Padding lives on .page-hero-copy in globals.css: 60px under the
          header on phones, roomier from md up. */}
      <div className="shell page-hero-copy relative z-10">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="ph-crumb mb-7">
            <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.7rem] uppercase tracking-[0.14em] text-white/55">
              {breadcrumbs.map((b, i) => (
                <li key={b.href} className="flex items-center gap-2.5">
                  {i > 0 && <span aria-hidden="true" className="text-white/55">/</span>}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-white/75" aria-current="page">{b.label}</span>
                  ) : (
                    <Link href={b.href} className="transition-colors duration-500 hover:text-white">
                      {b.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <p className="ph-eyebrow eyebrow mb-5 text-yellow">{eyebrow}</p>

        {/* 26ch: these H1s run 41–65 characters and were breaking to three
            lines with the right half of the hero empty. */}
        <h1 className="t-h1 max-w-[26ch] text-white">
          {h1.split("\n").map((l, i) => (
            <span key={i} className="line">
              <span className="ph-line-in block">{l}</span>
            </span>
          ))}
        </h1>

        <p className="ph-lead t-lead mt-7 max-w-[54ch] text-white/72">{lead}</p>

        <div className="mt-9 flex flex-wrap items-center gap-3.5">
          <Link href="/get-a-quote" className="ph-act btn btn-primary">
            <span>Get a Free Quote</span>
          </Link>
          <a href={SITE.quotePhoneHref} className="ph-act btn btn-ghost">
            <span>{SITE.quotePhone}</span>
          </a>
        </div>

        {chips.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-white/12 pt-6 text-[0.68rem] uppercase tracking-[0.14em] text-white/50">
            {chips.map((c) => (
              <li key={c} className="ph-chip flex items-center gap-2">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-green" />
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
