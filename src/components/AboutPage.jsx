"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import { ABOUT } from "@/lib/about";
import { OFFICES } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- who we are ---------------- */
function Intro() {
  const root = useRef(null);
  const { intro } = ABOUT;
  const [lede, ...rest] = intro.body;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".ab-copy > *", {
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".ab-media", {
        y: 44,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
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
        <div className="ab-copy">
          <span aria-hidden="true" className="mb-7 block h-[3px] w-12 bg-ember" />
          <h2 className="t-h2 max-w-[22ch] text-blue">{intro.heading}</h2>
          <p className="t-lead mt-7 max-w-[54ch] text-blue/80">{lede}</p>
          {rest.map((p) => (
            <p key={p.slice(0, 30)} className="t-body mt-5 max-w-[60ch] text-ink">
              {p}
            </p>
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

        <div className="ab-media relative aspect-[4/5] overflow-hidden rounded-[24px] lg:mt-[clamp(2rem,5vw,5rem)]">
          <Image
            src={intro.image}
            alt={intro.imageAlt}
            fill
            sizes="(max-width:1024px) 100vw, 40vw"
            className="object-cover"
            quality={90}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- mission pillars ---------------- */
function Mission() {
  const root = useRef(null);
  const { mission } = ABOUT;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".ms-head > *", {
        y: 26,
        opacity: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      gsap.from(".ms-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ms-grid", start: "top 86%" },
      });
      gsap.from(".ms-card", {
        y: 34,
        opacity: 0,
        duration: 0.85,
        stagger: 0.13,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ms-grid", start: "top 84%" },
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
        className="glow glow--ember left-[-8%] top-[-12%]"
        style={{
          width: "min(620px, 48%)",
        }}
      />

      <div className="shell relative">
        <div className="ms-head">
          <p className="eyebrow mb-5 text-yellow">{mission.eyebrow}</p>
          <h2 className="t-h2 max-w-[24ch]">{mission.heading}</h2>
          <p className="t-body mt-6 max-w-[58ch] text-white/65">{mission.lead}</p>
        </div>

        <div className="ms-grid mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-x-[clamp(1.5rem,3vw,3.5rem)] gap-y-10 md:grid-cols-3">
          {mission.pillars.map((p) => (
            <div key={p.n} className="relative border-t border-white/12 pt-8">
              <span
                aria-hidden="true"
                className="ms-rule absolute left-0 h-[2px] w-full bg-yellow"
                style={{ top: "-1px" }}
              />
              <div className="ms-card">
                <span className="numeral block text-[0.7rem] tracking-[0.16em] text-yellow">{p.n}</span>
                <h3 className="t-h3 mt-5">{p.title}</h3>
                <p className="mt-4 max-w-[38ch] text-[0.95rem] leading-relaxed text-white/60">{p.line}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- accreditations ---------------- */
function Standards() {
  const root = useRef(null);
  const { standards } = ABOUT;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".sd-head > *", {
        y: 26,
        opacity: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".sd-row", {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".sd-list", start: "top 86%" },
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
      <div className="shell grid gap-[clamp(2.5rem,4vw,6rem)] lg:grid-cols-[0.85fr_1.15fr]">
        <div className="sd-head lg:sticky lg:top-[18vh] lg:self-start">
          <p className="eyebrow mb-5 text-ember">{standards.eyebrow}</p>
          <h2 className="t-h2 max-w-[18ch] text-blue">{standards.heading}</h2>
          <p className="t-body mt-6 max-w-[38ch] text-ink">{standards.lead}</p>
        </div>

        <div className="sd-list border-t border-blue/12">
          {standards.items.map((s, i) => (
            <div key={s.name} className="sd-row grid gap-x-6 gap-y-2 border-b border-blue/12 py-[clamp(1.5rem,2.2vw,2.25rem)] sm:grid-cols-[auto_1fr]">
              <span className="numeral text-[0.7rem] tracking-[0.16em] text-ember sm:pt-1.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="t-h3 text-blue">{s.name}</h3>
                <p className="t-body mt-2.5 max-w-[58ch] text-ink">{s.line}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- offices ---------------- */
function Offices() {
  const root = useRef(null);
  const { offices } = ABOUT;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".of-head > *", {
        y: 26,
        opacity: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".of-card", {
        y: 38,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".of-grid", start: "top 85%" },
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
        <div className="of-head">
          <p className="eyebrow mb-5 text-ember">{offices.eyebrow}</p>
          <h2 className="t-h2 max-w-[22ch] text-blue">{offices.heading}</h2>
          <p className="t-body mt-6 max-w-[58ch] text-ink">{offices.lead}</p>
        </div>

        <div className="of-grid mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1rem,1.5vw,1.5rem)] md:grid-cols-2">
          {OFFICES.map((o) => (
            <a
              key={o.state}
              href={o.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="of-card group relative flex flex-col overflow-hidden rounded-[22px] border border-blue/12 bg-cloud p-[clamp(1.6rem,2.4vw,2.75rem)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-blue/25 hover:bg-white hover:shadow-[0_28px_60px_-32px_rgba(11,20,59,0.35)]"
            >
              <span className="flex items-center gap-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-ink-soft">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-yellow" />
                {o.state}
              </span>
              <p className="t-h3 mt-5 max-w-[22ch] text-blue">{o.address}</p>
              <span className="mt-8 flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-ember">
                Open in maps
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[3px] w-0 bg-ember transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= page ================= */
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={ABOUT.eyebrow}
        h1={ABOUT.h1}
        lead={ABOUT.lead}
        image={ABOUT.hero.image}
        imageAlt={ABOUT.hero.alt}
        chips={ABOUT.chips}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />
      <Intro />
      <Mission />
      <Standards />
      <Offices />
      <Process />
      <Reviews />
      <Faq
        items={ABOUT.faqs}
        heading="About Lumenx, answered."
        lead="Anything else you want to know before you talk to us? Ask. We would rather answer it now."
      />
      <CTA />
    </>
  );
}
