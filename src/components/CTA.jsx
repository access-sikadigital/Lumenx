"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE, TRUST, CTA_PROMISES } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * Closing call to action.
 *
 * Two earlier versions failed for different reasons: the first repeated the
 * hero and duplicated the footer's contact details, the second was a centred
 * block that read as a generic template and left most of the 1920 canvas
 * empty. This one is an asymmetric panel with the ask on the left, a photo
 * holding the right edge, and the accreditations anchored across the bottom.
 *
 * Every clamp() value is an inline style, and the grid template lives in
 * globals.css: Tailwind arbitrary utilities have silently failed to compile
 * three times in this project, and this section is where it showed worst.
 */
export default function CTA() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const st = { trigger: root.current, start: "top 80%" };

      gsap.from(".cta-panel", { y: 48, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: st });

      // scale/opacity, never clip-path: an incomplete clip tween leaves the
      // panel invisible, which is how the hero image disappeared earlier.
      gsap.from(".cta-photo", {
        scale: 1.12,
        opacity: 0,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: st,
      });

      gsap.from(".cta-in", {
        y: 26,
        opacity: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 74%" },
      });

      gsap.from(".cta-bar", {
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: ".cta-bar", start: "top 95%" },
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
      <div className="shell">
        <div className="cta-panel grain relative overflow-hidden rounded-[28px] bg-blue text-white">
          <div className="cta-split grid">
            {/* ---------------- ask ---------------- */}
            <div
              className="relative z-10 flex flex-col justify-center"
              style={{
                paddingTop: "clamp(2.5rem, 4vw, 5rem)",
                paddingBottom: "clamp(2.5rem, 4vw, 5rem)",
                paddingLeft: "clamp(1.75rem, 3.4vw, 4.5rem)",
                paddingRight: "clamp(1.75rem, 3.4vw, 4.5rem)",
              }}
            >
              {/* warm glow behind the copy — .glow, no blur filter */}
              <div
                aria-hidden="true"
                className="glow glow--solar left-[-18%] top-[-30%]"
                style={{ width: "min(640px, 85%)" }}
              />

              <div className="relative">
                <p className="cta-in eyebrow mb-5 text-yellow">Get started</p>

                <h2 className="cta-in t-h2 max-w-[15ch]">
                  Ready for a <span className="text-solar">lower power bill?</span>
                </h2>

                <p className="cta-in t-body mt-6 text-white/65" style={{ maxWidth: "44ch" }}>
                  Send us your address and a recent bill. Here is exactly what comes back.
                </p>

                <ul className="cta-in mt-8 space-y-3.5">
                  {CTA_PROMISES.map((p) => (
                    <li key={p} className="flex items-start gap-3.5">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green/15">
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path
                            d="M2.5 6.2 4.8 8.5 9.5 3.8"
                            stroke="#81d553"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-[0.97rem] leading-relaxed text-white/80">{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="cta-in mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Link href="/get-a-quote" className="btn btn-primary">
                    <span>Get a Free Quote</span>
                  </Link>
                  <a
                    href={SITE.phoneHref}
                    className="group text-sm text-white/55 transition-colors duration-500 hover:text-white"
                  >
                    Prefer to talk?{" "}
                    <span className="font-semibold text-yellow underline decoration-yellow/30 underline-offset-4 transition-colors duration-500 group-hover:decoration-yellow">
                      {SITE.phone}
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* ---------------- photo ---------------- */}
            <div
              className="relative min-h-[300px] overflow-hidden lg:min-h-0"
              aria-hidden="true"
            >
              <Image
                src="/images/family-solar.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="cta-photo object-cover"
              />
              {/* blend the photo into the navy panel: sideways on desktop,
                  upward on mobile where the columns stack */}
              <div
                className="absolute inset-0 hidden lg:block"
                style={{
                  background:
                    "linear-gradient(90deg, #0b143b 0%, rgba(11,20,59,.72) 26%, rgba(11,20,59,.12) 62%, rgba(11,20,59,0) 100%)",
                }}
              />
              <div
                className="absolute inset-0 lg:hidden"
                style={{
                  background:
                    "linear-gradient(0deg, #0b143b 0%, rgba(11,20,59,.55) 40%, rgba(11,20,59,.1) 100%)",
                }}
              />
            </div>
          </div>

          {/* ---------------- credential bar ---------------- */}
          <div
            className="cta-bar relative z-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 text-[0.66rem] uppercase tracking-[0.14em] text-white/45"
            style={{
              paddingTop: "clamp(1.25rem, 1.6vw, 1.75rem)",
              paddingBottom: "clamp(1.25rem, 1.6vw, 1.75rem)",
              paddingLeft: "clamp(1.75rem, 3.4vw, 4.5rem)",
              paddingRight: "clamp(1.75rem, 3.4vw, 4.5rem)",
              background: "rgba(11,20,59,0.72)",
              backdropFilter: "blur(8px)",
            }}
          >
            {TRUST.map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-green" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
