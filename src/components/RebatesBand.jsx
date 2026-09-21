"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REBATES } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export default function RebatesBand() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".rb-copy > *", {
        y: 26,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      gsap.from(".rb-card", {
        x: 44,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".rb-stack", start: "top 84%" },
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
        className="pointer-events-none absolute right-[-10%] top-[-15%] h-[36vw] w-[36vw] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(255,177,32,.38), rgba(232,66,10,.22) 55%, transparent 75%)",
        }}
      />

      <div className="shell relative grid items-center gap-[clamp(2.5rem,5vw,6rem)] lg:grid-cols-[0.95fr_1.05fr]">
        {/* copy */}
        <div className="rb-copy">
          <p className="eyebrow mb-5 text-yellow">Rebates, handled for you</p>
          <h2 className="t-h2 max-w-[13ch]">
            Three rebates. <span className="text-solar">One lower price.</span>
          </h2>
          <p className="t-body mt-6 max-w-[42ch] text-white/65">
            More than one program can apply to the same job. We check every one you qualify for,
            claim them, and handle the paperwork, so the discount is already in your quote.
          </p>
          <Link href="/solar-rebates" className="btn btn-ember mt-9">
            <span>See what you qualify for</span>
          </Link>
        </div>

        {/* Evenly spaced cards. An earlier version overlapped them with
            negative margins to look like a fanned pile, which buried each
            card's description under the next one. */}
        <div className="rb-stack space-y-[clamp(0.9rem,1.2vw,1.25rem)]">
          {REBATES.map((r) => (
            <article
              key={r.n}
              className="rb-card relative rounded-[20px] border border-white/14 bg-blue-2/70 p-[clamp(1.4rem,1.7vw,2.1rem)] transition-colors duration-500 hover:border-yellow/45 hover:bg-blue-2"
            >
              <div className="flex items-start gap-4">
                <span
                  className="numeral shrink-0 leading-none"
                  style={{
                    fontSize: "clamp(1.5rem,1.9vw,2.1rem)",
                    color: "rgba(255,177,32,0.14)",
                    WebkitTextStroke: "1.5px rgba(255,177,32,0.85)",
                  }}
                >
                  {r.n}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="t-h3">{r.name}</h3>
                    <span className="whitespace-nowrap rounded-full bg-green/15 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-green">
                      Claimed for you
                    </span>
                  </div>
                  <p className="mt-2.5 text-[0.93rem] leading-relaxed text-white/60">{r.line}</p>
                </div>
              </div>
            </article>
          ))}

          {/* the payoff line under the stack */}
          <p className="mt-7 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.16em] text-white/40">
            <span className="h-px w-8 bg-yellow" />
            All three checked on every quote
          </p>
        </div>
      </div>
    </section>
  );
}
