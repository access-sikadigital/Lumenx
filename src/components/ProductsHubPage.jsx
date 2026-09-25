"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import { BRANDS } from "@/lib/site";
import { PRODUCTS_HUB } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- intro ---------------- */
function Intro() {
  const root = useRef(null);
  const { intro } = PRODUCTS_HUB;
  const [lede, ...rest] = intro.body;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".ph-copy > *", {
        y: 30, opacity: 0, duration: 0.85, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".ph-media", {
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
        <div className="ph-copy">
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

        <div className="ph-media relative aspect-[4/5] overflow-hidden rounded-[24px] lg:mt-[clamp(2rem,5vw,5rem)]">
          <Image src={intro.image} alt={intro.imageAlt} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Category ledger — the signature section.

   Each category is a full-width editorial row: oversized numeral,
   copy on one side, image on the other, and the brands we actually
   stock in that category set out as real logos underneath. Rows
   alternate side, so scrolling the hub reads as a catalogue rather
   than a grid of identical tiles.
   ---------------------------------------------------------------- */
function CategoryLedger() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray(".cl-row").forEach((row) => {
        gsap.from(row.querySelectorAll(".cl-copy > *"), {
          y: 30, opacity: 0, duration: 0.85, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 80%" },
        });
        gsap.from(row.querySelector(".cl-media"), {
          y: 44, opacity: 0, duration: 1.05, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 80%" },
        });
        gsap.from(row.querySelectorAll(".cl-logo"), {
          y: 16, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 68%" },
        });
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
        <div className="max-w-[40rem]">
          <p className="eyebrow mb-5 text-ember">The range</p>
          <h2 className="t-h2 text-blue">Five categories, and what actually separates them.</h2>
        </div>

        <div className="mt-[clamp(3rem,6vw,5rem)] space-y-[clamp(3.5rem,7vw,7rem)]">
          {PRODUCTS_HUB.categories.map((c, i) => {
            const flip = i % 2 === 1;
            const logos = BRANDS.filter((b) => c.brands.includes(b.name));

            return (
              <article
                key={c.id}
                id={c.id}
                className="cl-row grid items-start gap-[clamp(2rem,4vw,4.5rem)] border-t border-blue/12 pt-[clamp(2rem,3vw,3rem)] lg:grid-cols-2"
              >
                <div className={`cl-copy ${flip ? "lg:order-2" : ""}`}>
                  <span className="numeral text-[0.7rem] tracking-[0.16em] text-ember">{c.n}</span>
                  <h3 className="t-h3 mt-4 text-blue">{c.title}</h3>
                  <p className="t-lead mt-4 max-w-[34ch] text-blue/75">{c.line}</p>
                  <p className="mt-5 max-w-[52ch] text-[0.95rem] leading-relaxed text-ink">{c.body}</p>

                  <Link
                    href={c.href}
                    className="group mt-7 inline-flex items-center gap-2.5 text-[0.9rem] font-semibold text-ember"
                  >
                    <span className="border-b border-ember/30 pb-0.5 transition-colors group-hover:border-ember">
                      {c.hrefLabel}
                    </span>
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </Link>

                  {logos.length > 0 && (
                    <div className="mt-[clamp(1.75rem,2.5vw,2.5rem)] border-t border-blue/10 pt-7">
                      <span className="mb-6 block text-[0.64rem] uppercase tracking-[0.16em] text-ink-soft">
                        What we stock
                      </span>
                      <ul className="flex flex-wrap items-center gap-x-[clamp(1.75rem,3vw,3rem)] gap-y-7">
                        {logos.map((b) => (
                          <li key={b.file} className="cl-logo">
                            <img
                              src={`/brands/${b.file}`}
                              alt={b.name}
                              loading="lazy"
                              decoding="async"
                              className="block h-auto max-w-full opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
                              style={{ width: `min(${Math.round(b.w * 1.15)}px, 62vw)` }}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div
                  className={`cl-media relative aspect-[4/3] overflow-hidden rounded-[24px] ${
                    flip ? "lg:order-1" : ""
                  }`}
                >
                  <Image
                    src={c.image}
                    alt={c.imageAlt}
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Every brand, once, as a closing statement.
   ---------------------------------------------------------------- */
function AllBrands() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".ab-logo", {
        y: 18, opacity: 0, duration: 0.55, stagger: 0.04, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 86%" },
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
      <div aria-hidden="true" className="glow glow--solar right-[-10%] top-[-18%]" style={{ width: "min(600px, 50%)" }} />

      <div className="shell relative">
        <div className="mb-[clamp(2.5rem,4vw,3.5rem)] max-w-[38rem]">
          <p className="eyebrow mb-5 text-yellow">Every brand we install</p>
          <h2 className="t-h2">Sixteen names, one warranty.</h2>
          <p className="t-body mt-6 text-white/65">
            Whichever hardware ends up on your roof, the installation is covered by our own 16-year
            workmanship warranty. That part does not change with the brand.
          </p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-[clamp(2rem,3.5vw,4rem)] gap-y-9">
          {BRANDS.map((b) => (
            <li key={b.file} className="ab-logo">
              <img
                src={`/brands/${b.file}`}
                alt={b.name}
                loading="lazy"
                decoding="async"
                className="block h-auto max-w-full opacity-45 brightness-0 invert transition duration-500 hover:opacity-90"
                style={{ width: `min(${Math.round(b.w * 1.15)}px, 62vw)` }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function ProductsHubPage() {
  return (
    <>
      <PageHero
        eyebrow={PRODUCTS_HUB.eyebrow}
        h1={PRODUCTS_HUB.h1}
        lead={PRODUCTS_HUB.lead}
        image={PRODUCTS_HUB.hero.image}
        imageAlt={PRODUCTS_HUB.hero.alt}
        chips={PRODUCTS_HUB.chips}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/solar-products" },
        ]}
      />
      <Intro />
      <CategoryLedger />
      <AllBrands />
      <Process />
      <Reviews />
      <Faq
        items={PRODUCTS_HUB.faqs}
        heading="Equipment, answered."
        lead="Ask us what we are proposing and why. It goes on your quote in writing either way."
      />
      <CTA />
    </>
  );
}
