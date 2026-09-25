"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import { SITE } from "@/lib/site";
import { BLOG_HUB, GUIDE_CARDS, postsByDate } from "@/lib/blog";

gsap.registerPlugin(ScrollTrigger);

/* ----------------------------------------------------------------
   Guide library — the signature layout.

   One oversized featured card leading a staggered grid, rather than
   a uniform three-across of identical tiles. The featured card is
   the rebates guide because that is the page most visitors need
   first, and the grid below is ordered by topic rather than date,
   since none of this content is news.
   ---------------------------------------------------------------- */
function Library() {
  const root = useRef(null);
  const featured = GUIDE_CARDS.find((g) => g.featured);
  const rest = GUIDE_CARDS.filter((g) => !g.featured);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".gl-feature", {
        y: 44, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".gl-card", {
        y: 34, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: ".gl-grid", start: "top 88%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="bg-white"
      style={{ paddingTop: "clamp(4rem, 9vh, 7rem)", paddingBottom: "clamp(4.5rem, 11vh, 9rem)" }}
    >
      <div className="shell">
        <div className="mb-[clamp(2.5rem,4vw,3.5rem)] flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div className="max-w-[36rem]">
            <span aria-hidden="true" className="mb-7 block h-[3px] w-12 bg-ember" />
            <h2 className="t-h2 text-blue">Start here.</h2>
          </div>
          <p className="max-w-[34ch] text-[0.95rem] leading-relaxed text-ink">
            Six pages that cover almost everything people ask us. Each one is maintained rather than
            replaced.
          </p>
        </div>

        {/* featured */}
        {featured && (
          <Link
            href={featured.href}
            className="gl-feature group relative grid overflow-hidden rounded-[26px] border border-blue/12 bg-cloud transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-blue/25 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[22rem]">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                sizes="(max-width:1024px) 100vw, 52vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              />
            </div>
            <div className="flex flex-col justify-center p-[clamp(1.5rem,3vw,3rem)]">
              <span className="eyebrow mb-5 text-ember">{featured.topic}</span>
              <h3 className="t-h3 max-w-[22ch] text-blue">{featured.title}</h3>
              <p className="mt-5 max-w-[46ch] text-[0.97rem] leading-relaxed text-ink">
                {featured.line}
              </p>
              <span
                aria-hidden="true"
                className="mt-7 inline-flex items-center gap-2.5 text-[0.9rem] font-semibold text-ember"
              >
                <span className="border-b border-ember/30 pb-0.5 transition-colors group-hover:border-ember">
                  Read the guide
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </span>
            </div>
          </Link>
        )}

        {/* grid */}
        <div className="gl-grid mt-[clamp(1rem,1.6vw,1.5rem)] grid gap-[clamp(1rem,1.6vw,1.5rem)] sm:grid-cols-2 xl:grid-cols-3">
          {rest.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="gl-card group flex flex-col overflow-hidden rounded-[22px] border border-blue/12 bg-paper transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-blue/25"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={g.image}
                  alt={g.imageAlt}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
              </div>
              <div className="flex flex-1 flex-col p-[clamp(1.2rem,1.8vw,1.6rem)]">
                <span className="mb-3.5 block text-[0.64rem] uppercase tracking-[0.16em] text-ember">
                  {g.topic}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold leading-snug text-blue">
                  {g.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-ink">{g.line}</p>
                <span
                  aria-hidden="true"
                  className="mt-5 inline-block text-[0.82rem] font-semibold text-ember transition-transform duration-300 group-hover:translate-x-1.5"
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

/* ----------------------------------------------------------------
   Why there is no weekly post. Honest editorial note rather than a
   fake "coming soon" placeholder.
   ---------------------------------------------------------------- */
function EditorialNote() {
  const root = useRef(null);
  const { intro } = BLOG_HUB;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".en-copy > *", {
        y: 28, opacity: 0, duration: 0.85, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 84%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="grain relative overflow-hidden bg-blue text-white"
      style={{ paddingTop: "clamp(4rem, 9vh, 7rem)", paddingBottom: "clamp(4rem, 9vh, 7rem)" }}
    >
      <div aria-hidden="true" className="glow glow--ember right-[-12%] top-[-20%]" style={{ width: "min(580px, 50%)" }} />

      <div className="shell relative grid gap-[clamp(2rem,4vw,5rem)] lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow mb-5 text-yellow">Editorial note</p>
          <h2 className="t-h3 max-w-[20ch]">{intro.heading}</h2>
        </div>
        <div className="en-copy">
          {intro.body.map((p) => (
            <p key={p.slice(0, 30)} className="max-w-[62ch] text-[0.98rem] leading-[1.8] text-white/70 [&:not(:first-child)]:mt-5">
              {p}
            </p>
          ))}
          <p className="mt-8 border-t border-white/12 pt-7 text-[0.92rem] leading-relaxed text-white/55">
            If there is something you want explained that is not covered here, ask us and we will
            answer it directly. Call {SITE.phone} or email{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="break-words text-yellow underline decoration-yellow/30 underline-offset-4 transition-colors hover:decoration-yellow"
            >
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Articles. Renders only when real posts exist, so an empty blog
   never ships an empty section.
   ---------------------------------------------------------------- */
function Articles() {
  const posts = postsByDate();
  if (posts.length === 0) return null;

  return (
    <section
      className="bg-cloud"
      style={{ paddingTop: "clamp(4rem, 9vh, 7rem)", paddingBottom: "clamp(4rem, 9vh, 7rem)" }}
    >
      <div className="shell">
        <div className="mb-[clamp(2.5rem,4vw,3.5rem)] max-w-[36rem]">
          <span aria-hidden="true" className="mb-7 block h-[3px] w-12 bg-ember" />
          <h2 className="t-h2 text-blue">Latest articles.</h2>
        </div>

        <div className="grid gap-[clamp(1rem,1.6vw,1.5rem)] sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-[22px] border border-blue/12 bg-paper transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-blue/25"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
              </div>
              <div className="flex flex-1 flex-col p-[clamp(1.2rem,1.8vw,1.6rem)]">
                <div className="mb-3.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.64rem] uppercase tracking-[0.16em] text-ember">
                  <span>{p.topic}</span>
                  {p.readMins && (
                    <>
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ember/40" />
                      <span className="text-ink-soft">{p.readMins} min read</span>
                    </>
                  )}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold leading-snug text-blue">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-ink">{p.excerpt}</p>
                <time
                  dateTime={p.date}
                  className="mt-5 block text-[0.78rem] text-ink-soft"
                >
                  {new Date(p.date).toLocaleDateString("en-AU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BlogHubPage() {
  return (
    <>
      <PageHero
        eyebrow={BLOG_HUB.eyebrow}
        h1={BLOG_HUB.h1}
        lead={BLOG_HUB.lead}
        image={BLOG_HUB.hero.image}
        imageAlt={BLOG_HUB.hero.alt}
        chips={BLOG_HUB.chips}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/blog" },
        ]}
      />
      <Library />
      <Articles />
      <EditorialNote />
      <CTA />
    </>
  );
}
