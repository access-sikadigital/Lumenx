"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * Proof band.
 *
 * The previous version was four equal columns with vertical hairlines between
 * them. Because the numerals are wildly different widths ("2" against "100%"),
 * the left-aligned content left ragged voids before each divider and the band
 * read as broken rather than rhythmic.
 *
 * Each stat now sits under its own top rule, which segments the row cleanly,
 * and carries a line of copy that fills the space and says why the number
 * matters. The ember rules draw in left to right as the section arrives.
 */
export default function Stats() {
  const root = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // count up
      root.current.querySelectorAll("[data-count]").forEach((el) => {
        const target = parseFloat(el.dataset.count);
        if (reduce) {
          el.textContent = String(target);
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v);
          },
        });
      });

      if (reduce) return;

      gsap.from(".st-head > *", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      gsap.from(".st-rule", {
        scaleX: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        transformOrigin: "left center",
        scrollTrigger: { trigger: ".st-grid", start: "top 86%" },
      });

      gsap.from(".st-body", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".st-grid", start: "top 84%" },
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
        className="glow glow--ember left-[-8%] top-1/2 -translate-y-1/2"
        style={{
          width: "min(620px, 42%)",
        }}
      />

      <div className="shell relative">
        {/* header */}
        <div className="st-head flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div>
            <p className="eyebrow mb-5 text-yellow">By the numbers</p>
            <h2 className="t-h2 max-w-[14ch]">
              Proof, not <span className="text-solar">promises.</span>
            </h2>
          </div>
          <p className="t-body max-w-[40ch] text-white/60">
            Every figure here is something you can hold us to, in writing, before you sign
            anything.
          </p>
        </div>

        {/* stats */}
        <div
          className="st-grid grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-14"
          style={{ marginTop: "clamp(3rem, 6vw, 5.5rem)" }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="relative border-t border-white/12 pt-8">
              {/* ember segment drawn over the hairline */}
              <span
                aria-hidden="true"
                className="st-rule absolute left-0 h-0.5 w-full bg-ember"
                style={{ top: "-1px" }}
              />

              <div className="st-body">
                <p
                  className="numeral leading-[0.92]"
                  style={{ fontSize: "clamp(3.25rem, 5.4vw, 6.75rem)" }}
                >
                  <span data-count={s.value}>0</span>
                  <span className="text-solar">{s.suffix}</span>
                </p>

                <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white">
                  {s.label}
                </p>

                <p className="mt-3 max-w-[30ch] text-[0.9rem] leading-relaxed text-white/55">
                  {s.line}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
