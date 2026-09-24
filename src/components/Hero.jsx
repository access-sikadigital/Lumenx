"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TRUST, SITE } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-media", { scale: 1.18, duration: 1.9, ease: "expo.out" }, 0)
        .from(".hero-rail", { opacity: 0, x: -20, duration: 0.8 }, 0.5)
        .from(".hero-eyebrow", { y: 18, opacity: 0, duration: 0.7 }, 0.2)
        .from(".hero-line-in", { yPercent: 116, duration: 1.2, stagger: 0.1 }, 0.3)
        .from(".hero-lead", { y: 24, opacity: 0, duration: 0.85 }, "-=0.65")
        .from(".hero-act", { y: 20, opacity: 0, duration: 0.7, stagger: 0.09 }, "-=0.55")
        .from(".hero-bar", { y: 40, opacity: 0, duration: 0.9 }, "-=0.55");

      gsap.to(".hero-img", {
        yPercent: 14,
        scale: 1.06,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-copy", {
        yPercent: -10,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="hero"
      /* Full-viewport only from md up. On phones the hero sizes to its own
         content, so the copy sits directly under the header instead of being
         centred in a tall box with dead space above it.
         min-h, not a fixed h: on short viewports a locked height clips the
         CTA row into the credential strip instead of letting the hero grow. */
      className="grain relative flex flex-col overflow-hidden bg-blue md:min-h-[100svh]"
    >
      {/* full-bleed media */}
      <div className="hero-media absolute inset-0">
        <div className="hero-img absolute inset-0">
          <Image
            src="/images/rooftop-home.webp"
            alt="Solar panels on a tiled roof against an evening sky"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue via-blue/88 to-blue/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue via-blue/20 to-blue/70" />
      </div>

      {/* sun glow */}
      <div
        aria-hidden="true"
        className="glow glow--solar right-[-10%] top-[6%] h-[40vw] w-[40vw]"
        style={{
          background: "radial-gradient(circle, rgba(255,177,32,.85), rgba(232,66,10,.5) 45%, transparent 72%)",
          animation: "sunpulse 7s ease-in-out infinite",
        }}
      />

      {/* logomark, kept low-right so it never collides with the headline */}
      <img
        src="/logos/logomark-ember.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-[58%] hidden w-[clamp(60px,5.5vw,110px)] opacity-80 xl:block"
        style={{ animation: "spin-slow 34s linear infinite" }}
      />

      {/* vertical rail */}
      <div className="hero-rail absolute left-[calc(var(--shell-pad)/2)] top-1/2 hidden -translate-y-1/2 xl:block">
        <span
          className="eyebrow whitespace-nowrap text-white/45"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Solar · Battery · EV · VIC &amp; NSW
        </span>
      </div>

      {/* Vertical padding lives on .hero-copy in globals.css so it can change
          at the md breakpoint — inline styles carry no media query. */}
      <div className="shell hero-copy relative z-10 flex flex-1 flex-col justify-center">
        <p className="hero-eyebrow eyebrow mb-[clamp(1rem,2vw,2rem)] text-yellow">
          Make the switch to solar
        </p>

        {/* max-w stops "future." running into the frame edge */}
        <h1 className="t-mega max-w-[16ch] text-white">
          <span className="line"><span className="hero-line-in block">Together, we build</span></span>
          <span className="line">
            <span className="hero-line-in block">
              a <span className="text-solar">brighter future.</span>
            </span>
          </span>
        </h1>

        {/* Single left-aligned column. The buttons used to sit far right on a
            justify-between row, which on a 1920 canvas put them a screen's
            width away from the headline they belong to. */}
        <div className="mt-[clamp(1.75rem,3vw,3rem)] flex flex-col items-start gap-[clamp(1.75rem,2.6vw,2.5rem)]">
          <p className="hero-lead t-lead max-w-[46ch] text-white/72">
            CEC-accredited solar, batteries and EV charging for homes and business across
            Victoria and New South Wales. Rebates handled, every install backed for 16 years.
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <Link href="/get-a-quote" className="hero-act btn btn-primary">
              <span>Get a Free Quote</span>
            </Link>
            <a href={SITE.phoneHref} className="hero-act btn btn-ghost text-white">
              <span>{SITE.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom credential bar. Hidden below md: on a phone the four
          credentials stack into four full-width rows and eat most of the
          first screen. They still appear in the mobile menu, the CTA and the
          footer, so nothing is lost. */}
      <div className="hero-bar relative z-10 hidden border-t border-white/12 bg-blue/35 backdrop-blur-sm md:block">
        <div className="shell flex items-center justify-between gap-6 py-4">
          <ul className="flex flex-wrap gap-x-[clamp(1rem,2.4vw,3rem)] gap-y-1 text-[0.66rem] uppercase tracking-[0.18em] text-white/55">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-green" />
                {t}
              </li>
            ))}
          </ul>
          <span className="hidden shrink-0 items-center gap-2 text-[0.66rem] uppercase tracking-[0.18em] text-white/40 md:flex">
            Scroll
            <span className="block h-6 w-px bg-white/30" style={{ animation: "float 1.8s ease-in-out infinite" }} />
          </span>
        </div>
      </div>
    </section>
  );
}
