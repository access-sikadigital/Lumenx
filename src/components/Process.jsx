"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STEPS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * The process as an asymmetric bento grid.
 *
 * Step 01 is a 2x2 media tile, step 02 is wide, steps 03 and 04 pair beneath.
 * Those spans are set in globals.css (.pr-bento) rather than as Tailwind
 * utilities, because class strings assembled in JS are not reliably picked up
 * by the scanner and the grid silently collapses to four equal columns.
 */
export default function Process() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".pr-tile", {
        y: 44,
        opacity: 0,
        scale: 0.97,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pr-bento", start: "top 80%" },
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
      <div className="shell">
        <div>
          <p className="eyebrow mb-5 text-ember">How it works</p>
          <h2 className="t-h2 max-w-[16ch] text-blue">
            From first quote to switch-on.
          </h2>
        </div>

        <div className="pr-bento mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(0.9rem,1.2vw,1.4rem)] lg:auto-rows-[minmax(250px,auto)]">
          {STEPS.map((s, i) => {
            if (i === 0) {
              return (
                <article
                  key={s.n}
                  className="pr-tile group relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-[22px]"
                >
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  {/* stronger scrim so the copy never fights the photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue via-blue/80 to-blue/20" />

                  <span
                    className="numeral absolute leading-none"
                    style={{
                      top: "clamp(1.5rem, 2vw, 2.25rem)",
                      right: "clamp(1.5rem, 2vw, 2.25rem)",
                      fontSize: "clamp(3.5rem,6vw,7rem)",
                      color: "rgba(255,177,32,0.12)",
                      WebkitTextStroke: "2px rgba(255,177,32,0.8)",
                    }}
                  >
                    {s.n}
                  </span>

                  <div
                    className="relative z-10"
                    style={{ padding: "clamp(1.75rem, 2.2vw, 2.75rem)" }}
                  >
                    <span className="inline-block whitespace-nowrap rounded-full bg-yellow px-3.5 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-blue">
                      {s.meta}
                    </span>
                    <h3 className="t-h3 mt-5 text-white">{s.title}</h3>
                    <p className="mt-3 max-w-[44ch] text-[0.96rem] leading-relaxed text-white/75">
                      {s.line}
                    </p>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={s.n}
                className="pr-tile group relative flex flex-col overflow-hidden rounded-[22px] border border-blue/12 bg-cloud transition-colors duration-500 hover:bg-white"
                style={{ padding: "clamp(1.6rem, 1.9vw, 2.4rem)" }}
              >
                {/* badge + numeral share one aligned row across every tile */}
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-block whitespace-nowrap rounded-full bg-white px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-500 group-hover:bg-yellow group-hover:text-blue">
                    {s.meta}
                  </span>
                  <span
                    className="numeral shrink-0 leading-none"
                    style={{
                      fontSize: "clamp(2rem,2.6vw,3rem)",
                      color: "rgba(232,66,10,0.10)",
                      WebkitTextStroke: "1.6px rgba(232,66,10,0.85)",
                    }}
                  >
                    {s.n}
                  </span>
                </div>

                {/* natural flow, not justify-between, so spacing is identical
                    in every tile regardless of description length */}
                <h3 className="t-h3 mt-8 text-blue">{s.title}</h3>
                <p className="t-body mt-3 max-w-[44ch] text-ink">{s.line}</p>

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[3px] w-0 bg-ember transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
