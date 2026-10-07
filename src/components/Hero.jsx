"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TRUST, SITE } from "@/lib/site";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef(null);
  const { tr } = useLang();

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
          {/* A REAL Lumenx install, not stock. Swapped 4 October 2026: the
              previous image was a stock tiled roof, and the client asked for
              the hero to show actual work. This is a completed job at dusk
              in an Australian suburb, which also supplies the warm light the
              artificial glow used to fake. */}
          <Image
            src="/images/real-install-3.webp"
            alt="A completed Lumenx rooftop solar installation at dusk, overlooking an Australian suburb"
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

      {/* The abstract orange glow was removed on 4 October 2026 at the
          client's request. It was a 40vw radial gradient pulsing on a seven
          second loop over the top of the photograph, and it was doing two
          unhelpful things: inventing a light source the image did not have,
          and reading as the site's loudest element above the headline.

          The replacement photograph is a real install at dusk and carries its
          own warm light, so nothing was needed in its place. */}

      {/* Logomark, kept low-right so it never collides with the headline.
          Yellow rather than ember: it sits over the warm sunset image and the
          ember sun-pulse gradient behind it, so an ember mark had almost
          nothing to separate it from its own background. */}
      <img
        src="/logos/logomark-yellow.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-[58%] hidden w-[clamp(60px,5.5vw,110px)] opacity-80 xl:block"
        style={{ animation: "spin-slow 34s linear infinite" }}
      />

      {/* vertical rail */}
      <div className="hero-rail absolute left-[calc(var(--shell-pad)/2)] top-1/2 hidden -translate-y-1/2 xl:block">
        <span
          className="eyebrow whitespace-nowrap text-white/55"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Solar · Battery · EV · VIC &amp; NSW
        </span>
      </div>

      {/* Vertical padding lives on .hero-copy in globals.css so it can change
          at the md breakpoint — inline styles carry no media query. */}
      <div className="shell hero-copy relative z-10 flex flex-1 flex-col justify-center">
        {/* The tagline demoted to the small line ABOVE the headline, which is
            the client's instruction. It is a brand promise, not a proposition:
            as the h1 it told a visitor nothing about what Lumenx sells, and
            the page had no heading a search engine could match to solar. */}
        <p className="hero-eyebrow eyebrow mb-[clamp(1rem,2vw,2rem)] text-yellow">
          {tr("hero_eyebrow")}
        </p>

        {/* Reworded 7 October 2026 for search: the client's line ("Solar and
            batteries for lower bills and a more resilient home.") named no
            service a searcher types and no place. This keeps its promise of
            lower bills and adds "installers" and VIC & NSW. Three short lines
            so it still sits in three rows inside max-w-[18ch]. */}
        <h1 className="t-mega max-w-[18ch] text-white">
          <span className="line">
            <span className="hero-line-in block">{tr("hero_h1_a")}</span>
          </span>
          <span className="line">
            <span className="hero-line-in block">{tr("hero_h1_b")}</span>
          </span>
          <span className="line">
            <span className="hero-line-in block">{tr("hero_h1_c")}</span>
          </span>
        </h1>

        {/* Single left-aligned column. The buttons used to sit far right on a
            justify-between row, which on a 1920 canvas put them a screen's
            width away from the headline they belong to. */}
        <div className="mt-[clamp(1.75rem,3vw,3rem)] flex flex-col items-start gap-[clamp(1.75rem,2.6vw,2.5rem)]">
          <p className="hero-lead t-lead max-w-[46ch] text-white/72">
            {tr("hero_lead")}
          </p>

          {/* Three starting buttons, per the client brief. They are a WAY IN
              rather than three competing calls to action: each one opens the
              quote form with that service already chosen, so the first
              question the form would have asked is answered by the click that
              got you there. The phone sits underneath as the alternative for
              anyone who would rather talk. */}
          <div>
            <p className="mb-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/45">
              {tr("hero_start")}
            </p>

            {/* min-w on each button so the three read as ONE set of choices
                rather than three unrelated buttons of random width. Without
                it "Solar" is half the width of "Solar + battery" and the row
                looks like a mistake. They still grow for longer labels, they
                just cannot shrink below a common floor. */}
            <div className="flex flex-wrap items-center gap-3">
              {[
                { key: "hero_solar", slug: "solar" },
                { key: "hero_battery", slug: "battery" },
                { key: "hero_both", slug: "solar-battery" },
              ].map((s) => (
                <Link
                  key={s.slug}
                  href={`/get-a-quote?service=${s.slug}`}
                  className="hero-act btn btn-primary min-w-[clamp(9rem,13vw,11.5rem)] justify-center"
                >
                  <span>{tr(s.key)}</span>
                </Link>
              ))}
            </div>

            {/* The phone is a TEXT link, not a second pill.
                It was a small white button sitting directly under the first
                yellow one, which put two different button sizes and two
                different fills in the same corner and made the row look
                broken. As a text line it is still one tap on a phone, still
                unmistakably the number, and it stops competing with the three
                buttons it is meant to be an alternative to.

                It is deliberately NOT given .hero-act: that class is on the
                staggered button animation, and including it made the phone
                arrive last and on its own, which read as a fourth button that
                had fallen out of the row. */}
            <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[0.88rem] text-white/50">{tr("hero_prefer_talk")}</span>
              <a
                href={SITE.phoneHref}
                className="font-[family-name:var(--font-display)] text-[1.08rem] font-bold text-white underline-offset-[6px] transition-colors duration-300 hover:text-action hover:underline"
              >
                {SITE.phone}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom edge of the hero: just the scroll cue now. The accreditation
          chips used to sit on the left here, but they arrive before anyone has
          read the headline, so they read as clutter rather than reassurance.
          They still appear in the CTA, the footer and the quote pages, which
          is where the reassurance is actually wanted. */}
      <div className="hero-bar relative z-10 hidden border-t border-white/12 bg-blue/35 backdrop-blur-sm md:block">
        <div className="shell flex items-center justify-end gap-6 py-4">
          <span className="hidden shrink-0 items-center gap-2 text-[0.66rem] uppercase tracking-[0.18em] text-white/55 md:flex">
            Scroll
            <span className="block h-6 w-px bg-white/30" style={{ animation: "float 1.8s ease-in-out infinite" }} />
          </span>
        </div>
      </div>
    </section>
  );
}
