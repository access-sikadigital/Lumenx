"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WHY, TRUST } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * "Why Lumenx" as a single engineered spec panel.
 *
 * Earlier attempts used an accordion, which duplicated the FAQ pattern further
 * down the page and hid content behind clicks, and an overlapping two-image
 * composition that collided with the section edge. This is one clean bordered
 * panel: image on the left, four reasons in quadrants divided by hairlines,
 * every word visible at once. The technical, drawn-to-spec feel suits solar.
 */
export default function WhyLumenx() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".wl-panel", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
      gsap.from(".wl-cell", {
        opacity: 0,
        y: 26,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".wl-panel", start: "top 72%" },
      });
      gsap.from(".wl-chip", {
        opacity: 0,
        y: 14,
        duration: 0.5,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: { trigger: ".wl-chips", start: "top 92%" },
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
        {/* header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-5 text-ember">Why Lumenx</p>
            <h2 className="t-h2 max-w-[18ch] text-blue">
              Premium solar, done properly, and <span className="text-solar">backed.</span>
            </h2>
          </div>
          <div className="flex items-end gap-3 rounded-2xl bg-blue px-6 py-4 text-white">
            <p className="numeral text-[clamp(2rem,2.6vw,3rem)] leading-none text-yellow">16</p>
            <p className="pb-1 text-[0.68rem] uppercase leading-tight tracking-[0.16em] text-white/65">
              year
              <br />
              warranty
            </p>
          </div>
        </div>

        {/* spec panel */}
        <div className="wl-panel mt-[clamp(2.5rem,5vw,4rem)] overflow-hidden rounded-[24px] border border-blue/12 bg-white">
          <div className="grid lg:grid-cols-[minmax(0,0.95fr)_1fr_1fr]">
            {/* media cell, spans both rows on desktop */}
            <div className="relative min-h-[260px] lg:row-span-2">
              <Image
                src="/images/installation.webp"
                alt="Lumenx crew installing rooftop solar panels"
                fill
                sizes="(max-width:1024px) 100vw, 32vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue/60 via-blue/10 to-transparent" />
              <p className="absolute bottom-6 left-6 max-w-[22ch] text-[0.82rem] leading-snug text-white/85">
                CEC-accredited crews across Victoria and New South Wales.
              </p>
            </div>

            {/* four quadrants */}
            {WHY.map((w, i) => (
              <article
                key={w.n}
                /* Every quadrant has something to its left (the image or the
                   other column), so all get a left rule on desktop. Only the
                   bottom row needs a top rule. Stacked on mobile, so top rules
                   all round. */
                className={`wl-cell group relative border-t border-blue/12 p-[clamp(1.5rem,2.2vw,2.75rem)] transition-colors duration-500 hover:bg-cloud lg:border-l ${
                  i >= 2 ? "lg:border-t" : "lg:border-t-0"
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="numeral text-sm text-ember">{w.n}</span>
                  <span className="h-px flex-1 bg-blue/10 transition-colors duration-500 group-hover:bg-ember/40" />
                </div>

                <h3 className="t-h3 mt-5 text-blue">{w.title}</h3>
                <p className="t-body mt-3 max-w-[42ch] text-ink">{w.line}</p>
              </article>
            ))}
          </div>
        </div>

        {/* accreditation chips */}
        <div className="wl-chips mt-[clamp(1.75rem,2.5vw,2.5rem)] flex flex-wrap gap-2.5">
          {TRUST.map((t) => (
            <span
              key={t}
              className="wl-chip rounded-full border border-blue/12 bg-white px-4 py-2 text-[0.72rem] uppercase tracking-[0.12em] text-ink"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
