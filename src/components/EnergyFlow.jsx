"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ENERGY_FLOW } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * The energy journey, as four readable stages.
 *
 * Deliberately NOT pinned and NOT state-driven: the previous version revealed
 * one stage at a time, so the reader only ever saw an abstract line with dots
 * and had to guess the story. Everything is legible here at once; the motion
 * adds the sense of flow instead of carrying the meaning.
 */
export default function EnergyFlow() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".ef-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: { trigger: ".ef-grid", start: "top 80%", end: "bottom 75%", scrub: 0.7 },
        }
      );

      gsap.from(".ef-card", {
        y: 44,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ef-grid", start: "top 82%" },
      });

      gsap.from(".ef-dot", {
        scale: 0,
        duration: 0.55,
        stagger: 0.14,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".ef-grid", start: "top 82%" },
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[-12%] h-[32vw] w-[32vw] rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(255,177,32,.4), transparent 70%)" }}
      />

      <div className="shell relative">
        {/* header */}
        <div>
          <p className="eyebrow mb-5 text-yellow">How your energy moves</p>
          <h2 className="t-h2 max-w-[16ch]">
            Sun in. <span className="text-solar">Bills down.</span>
          </h2>
        </div>

        {/* stages */}
        <div className="ef-grid relative mt-[clamp(3rem,6vw,5.5rem)]">
          {/* rail, desktop only */}
          <div aria-hidden="true" className="absolute left-0 right-0 top-0 hidden h-px bg-white/14 lg:block" />
          <div
            aria-hidden="true"
            className="ef-fill absolute left-0 right-0 top-0 hidden h-[2px] lg:block"
            style={{ background: "linear-gradient(90deg,#ffb120,#e8420a 55%,#81d553)" }}
          />

          <div className="grid gap-x-[clamp(1.5rem,2.4vw,3rem)] gap-y-12 lg:grid-cols-4">
            {ENERGY_FLOW.map((s) => (
              <article
                key={s.n}
                className="ef-card relative flex h-full flex-col border-l border-white/12 pl-6 lg:border-l-0 lg:pl-0 lg:pt-12"
              >
                {/* node on the rail */}
                <span
                  aria-hidden="true"
                  className="ef-dot absolute left-0 top-0 hidden h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-yellow ring-4 ring-blue lg:block"
                />

                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/[0.07] ring-1 ring-white/10">
                    <img src={s.icon} alt="" className="h-7 w-7 [filter:brightness(0)_invert(1)]" />
                  </span>
                  {/* Outlined numeral: reads clearly on navy and stays an
                      index rather than competing with the stat below, which
                      is the solid gradient figure. */}
                  <span
                    className="numeral text-[clamp(2.4rem,3vw,3.4rem)] leading-none"
                    style={{
                      color: "rgba(255,177,32,0.14)",
                      WebkitTextStroke: "1.6px rgba(255,177,32,0.9)",
                    }}
                  >
                    {s.n}
                  </span>
                </div>

                <p className="eyebrow mt-6 text-yellow/80">{s.label}</p>
                <h3 className="t-h3 mt-2.5">{s.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-white/60">{s.line}</p>

                {/* mt-auto keeps every stat row on the same baseline even when
                    the descriptions differ in length */}
                <div className="mt-auto border-t border-white/10 pt-4">
                  <p className="numeral text-[clamp(1.5rem,2vw,2.2rem)] leading-none text-solar">
                    {s.stat}
                  </p>
                  <p className="mt-1.5 text-[0.64rem] uppercase tracking-[0.16em] text-white/40">
                    {s.statLabel}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
