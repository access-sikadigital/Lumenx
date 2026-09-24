"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import { REVIEWS_PAGE } from "@/lib/reviews";
import { REVIEWS, GOOGLE_REVIEWS, TRUST } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

function Stars({ n = 5, className = "" }) {
  return (
    <span className={`flex gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 20 20">
          <path
            fill="currentColor"
            d="M10 1.6l2.47 5.33 5.83.68-4.32 3.96 1.16 5.75L10 14.43l-5.14 2.89 1.16-5.75L1.7 7.61l5.83-.68L10 1.6z"
          />
        </svg>
      ))}
    </span>
  );
}

/* ---------------- why we don't curate ---------------- */
function Intro() {
  const root = useRef(null);
  const { intro } = REVIEWS_PAGE;
  const [lede, ...rest] = intro.body;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".rv-copy > *", {
        y: 30, opacity: 0, duration: 0.85, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".rv-media", {
        y: 44, opacity: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
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
      <div className="shell grid items-start gap-[clamp(2.5rem,5vw,6rem)] lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rv-copy">
          <span aria-hidden="true" className="mb-7 block h-[3px] w-12 bg-ember" />
          <h2 className="t-h2 max-w-[22ch] text-blue">{intro.heading}</h2>
          <p className="t-lead mt-7 max-w-[54ch] text-blue/80">{lede}</p>
          {rest.map((p) => (
            <p key={p.slice(0, 30)} className="t-body mt-5 max-w-[60ch] text-ink">{p}</p>
          ))}

          <ul className="mt-[clamp(2.25rem,3.5vw,3rem)] grid gap-x-[clamp(1.5rem,2.5vw,3rem)] gap-y-4 border-t border-blue/12 pt-8 sm:grid-cols-2">
            {intro.points.map((p) => (
              <li key={p} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green/15">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 6.2 4.8 8.5 9.5 3.8" stroke="#63b93b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[0.95rem] leading-relaxed text-ink">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rv-media relative aspect-[4/5] overflow-hidden rounded-[24px] lg:mt-[clamp(2rem,5vw,5rem)]">
          <Image src={intro.image} alt={intro.imageAlt} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- the wall ---------------- */
function Wall() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".wl-head > *", {
        y: 26, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".wl-card", {
        y: 36, opacity: 0, scale: 0.98, duration: 0.8, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".wl-grid", start: "top 85%" },
      });
    },
    { scope: root }
  );

  const rating = parseFloat(GOOGLE_REVIEWS.rating);
  const hasRating = Number.isFinite(rating) && rating > 0;
  const count = String(GOOGLE_REVIEWS.count || "").trim();
  const hasLink = GOOGLE_REVIEWS.url && GOOGLE_REVIEWS.url !== "#";

  return (
    <section
      ref={root}
      className="bg-cloud"
      style={{ paddingTop: "clamp(4.5rem, 11vh, 9rem)", paddingBottom: "clamp(4.5rem, 11vh, 9rem)" }}
    >
      <div className="shell">
        <div className="wl-head flex flex-wrap items-end justify-between gap-x-12 gap-y-7">
          <div>
            <p className="eyebrow mb-5 text-ember">In their words</p>
            <h2 className="t-h2 max-w-[20ch] text-blue">
              What people say <span className="text-solar">afterwards.</span>
            </h2>
          </div>

          {/* The rating summary only renders with real figures. An unverified
              score on a dedicated reviews page is the worst place to guess. */}
          {hasRating && (
            <div className="rounded-[20px] border border-blue/12 bg-paper px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="font-[family-name:var(--font-display)] text-[1.6rem] font-extrabold leading-none text-blue">
                  {GOOGLE_REVIEWS.rating}
                </span>
                <Stars className="text-yellow" />
              </div>
              <p className="mt-2 text-[0.72rem] uppercase tracking-[0.14em] text-ink-soft">
                Google Reviews{count ? ` · ${count} reviews` : ""}
              </p>
              {hasLink && (
                <a
                  href={GOOGLE_REVIEWS.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-[0.8rem] font-semibold text-ember underline underline-offset-4"
                >
                  Read them on Google
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          )}
        </div>

        <div className="wl-grid mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1rem,1.5vw,1.5rem)] md:grid-cols-2 xl:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="wl-card flex flex-col rounded-[20px] border border-blue/10 bg-paper p-[clamp(1.5rem,2vw,2.25rem)] transition-colors duration-500 hover:border-blue/20"
            >
              <Stars className="text-yellow" />
              <blockquote className="mt-5 flex-1 text-[clamp(0.98rem,0.95vw,1.12rem)] leading-relaxed text-blue/90">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-7 border-t border-blue/10 pt-5">
                <span className="block font-[family-name:var(--font-display)] text-[0.98rem] font-bold text-blue">
                  {r.name}
                </span>
                <span className="mt-1 block text-[0.8rem] text-ink-soft">{r.place}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-[clamp(2.5rem,4vw,3.5rem)] flex flex-wrap items-center gap-5 border-t border-blue/12 pt-8">
          <Link href="/get-a-quote" className="btn btn-ember">
            <span>Get a Free Quote</span>
          </Link>
          <p className="max-w-[44ch] text-[0.86rem] leading-relaxed text-ink-soft">
            Want to speak to a past customer with a system like yours? Ask, and we will arrange it.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- accreditation strip ---------------- */
function Accreditations() {
  return (
    <section className="grain relative overflow-hidden bg-blue text-white" style={{ paddingTop: "clamp(3rem, 6vh, 5rem)", paddingBottom: "clamp(3rem, 6vh, 5rem)" }}>
      <div aria-hidden="true" className="glow glow--ember left-[-8%] top-1/2 -translate-y-1/2" style={{ width: "min(560px, 40%)" }} />
      <div className="shell relative flex flex-wrap items-center justify-between gap-x-10 gap-y-5">
        <p className="t-h3 max-w-[24ch]">
          Reviews are one signal. <span className="text-solar">Accreditation is the other.</span>
        </p>
        <ul className="flex flex-wrap gap-x-7 gap-y-2.5 text-[0.66rem] uppercase tracking-[0.14em] text-white/50">
          {TRUST.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-green" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ================= page ================= */
export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow={REVIEWS_PAGE.eyebrow}
        h1={REVIEWS_PAGE.h1}
        lead={REVIEWS_PAGE.lead}
        image={REVIEWS_PAGE.hero.image}
        imageAlt={REVIEWS_PAGE.hero.alt}
        chips={REVIEWS_PAGE.chips}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Reviews", href: "/reviews" },
        ]}
      />
      <Intro />
      <Wall />
      <Accreditations />
      <Faq
        items={REVIEWS_PAGE.faqs}
        heading="About our reviews."
        lead="How we collect them, and what we do when a job does not go to plan."
      />
      <CTA />
    </>
  );
}
