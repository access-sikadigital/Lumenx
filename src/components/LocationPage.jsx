"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import Marquee from "@/components/Marquee";
import { SITE, OFFICES, TRUST } from "@/lib/site";
import { SERVICE_PAGES, serviceUrl } from "@/lib/services";
import { LOCATIONS, getLocation, artFor } from "@/lib/locations";

gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   Location hero.

   The art is keyed to the page's SERVICE, never its city: there is
   still no city-specific photography, so it is rendered decoratively
   (empty alt, aria-hidden) and nothing on the page claims the photo
   was taken there. The city watermark stays as the local signature.

   The scrim is two layers rather than one flat tint: a base that
   holds text legible at every width, plus a left-weighted horizontal
   gradient that lets the photo come through on the right, which is
   the half the copy was leaving empty.
   ================================================================ */
function TypoHero({ l }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".lh-mark", { opacity: 0, x: -60, duration: 1.6, ease: "power3.out" });
      gsap.from(".lh-copy > *", {
        y: 34, opacity: 0, duration: 0.95, stagger: 0.1, ease: "power3.out", delay: 0.15,
      });
      gsap.from(".lh-chip", {
        y: 16, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power3.out", delay: 0.6,
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="grain relative isolate overflow-hidden bg-blue text-white">
      {/* service-matched art, decorative only */}
      <Image
        src={artFor(l.service)}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        quality={90}
        className="lh-art -z-10 object-cover"
      />
      {/* base scrim: keeps the copy legible at every width, including mobile
          where the text runs the full width of the image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: "rgba(11,20,59,0.72)" }}
      />
      {/* left-weighted wash: solid behind the copy, thinning to the right so
          the photograph is actually visible in the space the copy leaves */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,20,59,0.94) 0%, rgba(11,20,59,0.88) 42%, rgba(11,20,59,0.42) 72%, rgba(11,20,59,0.22) 100%)",
        }}
      />

      <div aria-hidden="true" className="glow glow--solar right-[-18%] top-[-30%]" style={{ width: "min(780px, 72%)" }} />
      <div aria-hidden="true" className="glow glow--ember left-[-22%] bottom-[-38%]" style={{ width: "min(620px, 60%)" }} />

      {/* city watermark, dialled back so it sits under the photo rather than
          competing with it */}
      <span
        aria-hidden="true"
        className="lh-mark pointer-events-none absolute left-[-0.06em] bottom-[-0.18em] select-none whitespace-nowrap font-[family-name:var(--font-display)] font-extrabold leading-none"
        style={{
          fontSize: "clamp(7rem, 26vw, 24rem)",
          letterSpacing: "-0.045em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.055)",
        }}
      >
        {l.city}
      </span>

      <div className="shell page-hero-copy relative z-10">
        {/* breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] text-white/55">
            <li><Link href="/" className="transition-colors hover:text-yellow">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/locations" className="transition-colors hover:text-yellow">Service Areas</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white/70">{l.label}</li>
          </ol>
        </nav>

        <div className="lh-copy max-w-[62rem]">
          <p className="eyebrow mb-6 text-yellow">
            {l.service} · {l.city}
          </p>
          {/* Sized for two lines, not three or four. The longest headline in
              the set is 57 characters, so a 30ch measure splits every one of
              them across exactly two lines, and the type is capped at 4.6rem
              so 30ch still fits the shell on a wide screen. */}
          <h1
            className="max-w-[30ch] font-[family-name:var(--font-display)] font-extrabold"
            style={{
              fontSize: "clamp(1.95rem, 4.4vw, 4.6rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
            }}
          >
            {l.h1}
          </h1>
          <p className="t-lead mt-8 max-w-[56ch] text-white/72">{l.lead}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3.5">
            <Link href="/get-a-quote" className="btn btn-primary">
              <span>Get a quote</span>
            </Link>
            <a href={SITE.phoneHref} className="btn btn-ghost">
              <span>{SITE.phone}</span>
            </a>
          </div>
        </div>

        <ul className="mt-[clamp(2.5rem,4vw,3.5rem)] flex flex-wrap gap-2.5">
          {[`${l.office} office`, ...l.areas.slice(0, 3)].map((c) => (
            <li
              key={c}
              className="lh-chip rounded-full border border-white/18 bg-white/[0.04] px-4 py-2 text-[0.78rem] text-white/70"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ================================================================
   Local brief — the three things that actually change by location.
   ================================================================ */
function LocalBrief({ l }) {
  const root = useRef(null);

  const office = OFFICES.find((o) => o.state === l.office) || OFFICES[0];

  const cards = [
    { k: "Your distributor", v: l.distributor },
    { k: "Sun and season", v: l.climate },
    { k: "Roof stock here", v: l.roofs },
  ];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".lb-head > *", {
        y: 28, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".lb-rule", {
        scaleX: 0, transformOrigin: "left center", duration: 1.05, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".lb-grid", start: "top 86%" },
      });
      gsap.from(".lb-card", {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.11, ease: "power3.out",
        scrollTrigger: { trigger: ".lb-grid", start: "top 86%" },
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
        <div className="lb-head grid items-end gap-[clamp(1.5rem,3vw,4rem)] lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span aria-hidden="true" className="mb-7 block h-[3px] w-12 bg-ember" />
            <h2 className="t-h2 text-blue">What changes in {l.city}.</h2>
          </div>
          <p className="t-body text-ink lg:pb-2">
            Solar is not the same job in every postcode. These are the three things that genuinely
            differ here, and all three are handled out of our {office.city} office.
          </p>
        </div>

        <div className="lb-grid mt-[clamp(2.5rem,5vw,4rem)] grid gap-x-[clamp(1.5rem,3vw,3.5rem)] gap-y-11 md:grid-cols-3">
          {cards.map((c, i) => (
            <div key={c.k} className="relative border-t border-blue/12 pt-8">
              <span aria-hidden="true" className="lb-rule absolute left-0 top-[-1px] h-[2px] w-full bg-ember" />
              <div className="lb-card">
                <span className="numeral text-[0.68rem] tracking-[0.16em] text-ember">
                  0{i + 1}
                </span>
                <h3 className="t-h3 mt-4 text-blue">{c.k}</h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink">{c.v}</p>
              </div>
            </div>
          ))}
        </div>

        {/* office strip */}
        <div className="mt-[clamp(2.5rem,4vw,3.5rem)] grid gap-6 rounded-[22px] border border-blue/12 bg-cloud p-[clamp(1.4rem,2.4vw,2.25rem)] sm:grid-cols-[auto_1fr] sm:items-center">
          <div>
            <span className="block text-[0.66rem] uppercase tracking-[0.16em] text-ink-soft">
              Serving you from
            </span>
            <p className="mt-2 font-[family-name:var(--font-display)] text-[1.05rem] font-bold text-blue">
              {office.city}
            </p>
            <p className="mt-1 text-[0.86rem] leading-relaxed text-ink">{office.address}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 sm:justify-end">
            {TRUST.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-blue/15 bg-paper px-3.5 py-1.5 text-[0.74rem] text-ink"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Coverage — suburb list as a typographic index, plus a peak-sun
   figure rendered as the one piece of "data" on the page.
   ================================================================ */
function Coverage({ l }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".cv-head > *", {
        y: 26, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".cv-row", {
        y: 20, opacity: 0, duration: 0.6, stagger: 0.055, ease: "power3.out",
        scrollTrigger: { trigger: ".cv-list", start: "top 88%" },
      });
      gsap.from(".cv-dial", {
        scale: 0.86, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".cv-list", start: "top 88%" },
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
      <div aria-hidden="true" className="glow glow--ember left-[-12%] top-[-18%]" style={{ width: "min(620px, 52%)" }} />

      <div className="shell relative grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="cv-head">
            <p className="eyebrow mb-5 text-yellow">Where we go</p>
            <h2 className="t-h2 max-w-[20ch]">Areas we cover around {l.city}.</h2>
            <p className="t-body mt-6 max-w-[52ch] text-white/65">
              Not an exhaustive list. If your suburb is not here, send us your address and we will
              tell you straight away whether we cover it.
            </p>
          </div>

          <ul className="cv-list mt-[clamp(2.25rem,4vw,3rem)] grid gap-x-[clamp(1.5rem,3vw,3rem)] sm:grid-cols-2">
            {l.areas.map((a, i) => (
              <li
                key={a}
                className="cv-row flex items-baseline gap-4 border-b border-white/10 py-3.5"
              >
                <span className="numeral text-[0.66rem] text-yellow/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.95rem] text-white/80">{a}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* sun dial */}
        <div className="cv-dial lg:pt-[clamp(3rem,7vw,7rem)]">
          <div className="rounded-[24px] card-navy p-[clamp(1.5rem,2.6vw,2.5rem)]">
            <span className="block text-[0.66rem] uppercase tracking-[0.16em] text-white/55">
              {l.city}, daily average
            </span>
            <p className="numeral mt-4 text-[clamp(2.8rem,6vw,4.5rem)] leading-none text-yellow">
              {l.sun}
            </p>
            <p className="mt-2 text-[0.92rem] text-white/70">peak sun hours</p>
            <p className="mt-5 border-t border-white/12 pt-5 text-[0.8rem] leading-relaxed text-white/55">
              An approximate long-run average, useful for comparing one city against another. Your
              roof&rsquo;s actual yield depends on pitch, orientation and shading, which we model
              from your address rather than from a regional figure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   What we install here.
   ================================================================ */
function LocalServices({ l }) {
  const root = useRef(null);

  const items = l.services
    .map((s) => SERVICE_PAGES[s])
    .filter(Boolean)
    .map((p) => ({ page: p, image: p.hero.image, alt: p.hero.alt }));

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".ls-head > *", {
        y: 26, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 84%" },
      });
      gsap.from(".ls-card", {
        y: 34, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".ls-grid", start: "top 88%" },
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
        <div className="ls-head max-w-[42rem]">
          <span aria-hidden="true" className="mb-7 block h-[3px] w-12 bg-ember" />
          <h2 className="t-h2 text-blue">What we install in {l.city}.</h2>
          <p className="t-body mt-6 text-ink">
            The same accredited crews and the same warranty, whichever of these you are here for.
          </p>
        </div>

        <div className="ls-grid mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1rem,1.6vw,1.5rem)] sm:grid-cols-2 xl:grid-cols-4">
          {items.map(({ page, image, alt }) => (
            <Link
              key={page.slug}
              href={serviceUrl(page.slug)}
              className="ls-card group overflow-hidden rounded-[20px] border border-blue/12 bg-paper transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-blue/25"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  quality={90}
                />
              </div>
              <div className="p-[clamp(1.1rem,1.6vw,1.5rem)]">
                <h3 className="font-[family-name:var(--font-display)] text-[1.02rem] font-bold text-blue">
                  {page.label}
                </h3>
                <p className="mt-2 text-[0.87rem] leading-relaxed text-ink">{page.lead}</p>
                <span
                  aria-hidden="true"
                  className="mt-4 inline-block text-[0.8rem] font-semibold text-ember transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   Other areas.
   ================================================================ */
function OtherAreas({ current }) {
  const root = useRef(null);
  const others = LOCATIONS.filter((l) => l.slug !== current);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".oa-row", {
        y: 20, opacity: 0, duration: 0.6, stagger: 0.06, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 88%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="bg-white"
      style={{ paddingTop: "clamp(3.5rem, 8vh, 6rem)", paddingBottom: "clamp(3.5rem, 8vh, 6rem)" }}
    >
      <div className="shell">
        <p className="eyebrow mb-7 text-ember">Other areas we cover</p>
        <ul className="grid gap-x-[clamp(1.5rem,3vw,3rem)] sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug} className="oa-row border-b border-blue/10">
              <Link
                href={`/${o.slug}`}
                className="group flex items-center justify-between gap-4 py-4 transition-colors duration-300"
              >
                <span className="min-w-0 text-[0.95rem] text-blue transition-colors group-hover:text-ember">
                  {o.label}
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-ember/70 transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ================================================================
   FAQs are generated from this location's own facts, so each city
   page answers with its distributor, office and conditions rather
   than repeating one boilerplate block nine times.
   ================================================================ */
function localFaqs(l) {
  return [
    {
      q: `Do you actually install in ${l.city}?`,
      a: `Yes. ${l.city} is covered by our ${l.office} office and our own accredited crews, not a subcontractor we have never met. If your specific suburb sits outside our range we will tell you when you enquire rather than after you have paid a deposit.`,
    },
    {
      q: `Which electricity distributor do I deal with in ${l.city}?`,
      a: l.distributor + " You do not lodge it yourself. The connection application is part of the job.",
    },
    {
      q: `Is ${l.city} a good place for solar?`,
      a: `${l.climate} We will not tell you the answer is yes before we have looked at your roof and your bill.`,
    },
    {
      q: `How long does an installation take in ${l.city}?`,
      a: "Most residential installations are a single day on site. What sets the overall timeline is the pre-approval from your distributor, which we lodge as soon as your design is confirmed.",
    },
    {
      q: `What will it cost?`,
      a: `We do not publish prices, because a number that ignores your roof, your usage and your rebate eligibility is not a quote. Send us a recent bill and your address and we will give you a real figure in writing, with the rebate already deducted. You can also call us on ${SITE.phone}.`,
    },
  ];
}

/* ================= page ================= */
export default function LocationPage({ slug }) {
  const l = getLocation(slug);
  if (!l) return null;

  return (
    <>
      <TypoHero l={l} />
      <LocalBrief l={l} />
      <Coverage l={l} />
      <LocalServices l={l} />
      <Marquee />
      <Process />
      <Reviews />
      <Faq
        items={localFaqs(l)}
        heading={`${l.service} in ${l.city}, answered.`}
        lead="If your question is not here, call us. We would rather answer it now than have you guess."
      />
      <OtherAreas current={l.slug} />
      <CTA />
    </>
  );
}
