"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ENERGY_FLOW } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * Accent per stage, following the rail's own gradient so the colour tells the
 * same story as the line: sun, conversion, storage, and the result. Kept in the
 * component rather than the data file because it is presentation, not content.
 *
 * Stage 04 takes a yellow-to-green sweep rather than a flat colour: it is the
 * point the whole journey resolves at, so its edge carries both ends of it.
 */
/* Accent per stage, used ONLY in small elements: the top bar, the numeral, the
   label and the stat. An earlier version tinted the whole card in its hue,
   which turned the row into four colour blocks and read as traffic lights.
   The surface is the same on all four; the colour is the punctuation.
 
   The ramp runs sun-yellow to green with no ember in it. Ember sat at stage 02
   and made that card read as a red warning rather than a step in a sequence.
   All four clear 7:1 on the card surface and stay distinct from each other. */
const CARD_BG = "linear-gradient(165deg,#373150 0%,#312c4a 55%,#2b2742 100%)";

const ACCENTS = [
  { key: "#ffb120", text: "#ffb120" },
  { key: "#e8cf49", text: "#e8cf49" },
  { key: "#b0d85c", text: "#b0d85c" },
  { key: "#81d553", text: "#81d553" },
];

/**
 * The energy journey, as four readable stages.
 *
 * Deliberately NOT pinned and NOT state-driven: an earlier version revealed one
 * stage at a time, so the reader only ever saw an abstract line with dots and
 * had to guess the story. Everything is legible here at once; the motion adds
 * the sense of flow instead of carrying the meaning.
 *
 * The stages are cards on a lifted surface rather than bare text on navy. As
 * flat text they measured about 1.04:1 against the section behind them, which
 * is why the whole band read as an undifferentiated field of blue.
 */
export default function EnergyFlow() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;


      gsap.from(".ef-card", {
        y: 34,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: ".ef-grid", start: "top 82%" },
      });

    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="grain relative overflow-hidden text-white"
      style={{
        paddingTop: "clamp(4.5rem, 11vh, 9rem)",
        paddingBottom: "clamp(4.5rem, 11vh, 9rem)",
        // Drifts from navy into a warm plum across the diagonal. The section
        // was a single flat #0b143b, which is what read as "too blue".
        background: "linear-gradient(155deg,#0b143b 0%,#151a44 38%,#241c3f 68%,#331e33 100%)",
      }}
    >
      {/* warm light trailing the sun, so the ground itself changes colour */}
      <div aria-hidden="true" className="ef-wash" />
      {/* solar, not ember: the ember glow washed the lower-left corner red, which
          is the same thing that made stage 02 look like a warning */}
      <div aria-hidden="true" className="glow glow--solar left-[-14%] bottom-[-26%]" style={{ width: "min(560px, 46%)" }} />

      <div className="shell relative">
        {/* header */}
        <div>
          <p className="eyebrow mb-5 text-yellow">How your energy moves</p>
          <h2 className="t-h2 max-w-[16ch]">Sun in. Bills down.</h2>
        </div>

        {/* stages */}
        <div className="ef-grid relative mt-[clamp(3rem,6vw,5.5rem)]">

          <div className="grid gap-[clamp(1rem,1.6vw,1.5rem)] sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-[clamp(1rem,1.4vw,1.4rem)]">
            {ENERGY_FLOW.map((s, i) => {
              const a = ACCENTS[i] || ACCENTS[0];
              return (
                <article
                  key={s.n}
                  className="ef-card relative flex flex-col overflow-hidden rounded-[22px] p-[clamp(1.25rem,1.7vw,1.85rem)]"
                  style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: a.key }} />


                  <div className="flex items-center justify-between gap-4">
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px]"
                      style={{ background: `color-mix(in oklab, ${a.key} 18%, transparent)` }}
                    >
                      <img src={s.icon} alt="" className="h-6 w-6 [filter:brightness(0)_invert(1)] opacity-90" />
                    </span>
                    {/* Outlined numeral: reads as an index rather than competing
                        with the solid stat figure at the foot of the card. */}
                    <span
                      className="numeral leading-none"
                      style={{
                        fontSize: "clamp(2rem,2.4vw,2.7rem)",
                        color: "transparent",
                        WebkitTextStroke: `1.5px ${a.key}`,
                        opacity: 0.55,
                      }}
                    >
                      {s.n}
                    </span>
                  </div>

                  <p className="eyebrow mt-6 text-[0.62rem]" style={{ color: a.text }}>
                    {s.label}
                  </p>

                  {/* Two-line floor on the heading. Two of the four titles run
                      to one line and two to two, which left the body copy and
                      the stat rows starting at different heights across the
                      row. */}
                  <h3
                    className="mt-2.5 font-[family-name:var(--font-display)] font-bold lg:min-h-[2.3em]"
                    style={{ fontSize: "clamp(1.12rem,1.35vw,1.5rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
                  >
                    {s.title}
                  </h3>

                  <p className="mt-3 text-[0.92rem] leading-relaxed text-white/60">{s.line}</p>

                  {/* mt-auto floors the stat, so all four sit on one line even
                      though the descriptions differ in length */}
                  <div className="mt-auto border-t border-white/12 pt-5">
                    <p className="numeral leading-none" style={{ fontSize: "clamp(1.35rem,1.8vw,2rem)", color: a.text }}>
                      {s.stat}
                    </p>
                    <p className="mt-2 text-[0.63rem] uppercase leading-snug tracking-[0.14em] text-white/55">
                      {s.statLabel}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
