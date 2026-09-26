"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import { CONTACT } from "@/lib/contact";
import { SITE, OFFICES, TRUST } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  phone: (
    <path
      d="M4 4.5h4l1.3 3.9-2.1 1.3a10.5 10.5 0 0 0 4.8 4.8l1.3-2.1 3.9 1.3v4a1.3 1.3 0 0 1-1.4 1.3A15 15 0 0 1 2.7 5.9 1.3 1.3 0 0 1 4 4.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  email: (
    <>
      <rect x="2.5" y="4.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="m3.2 6 7.8 5 7.8-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </>
  ),
  form: (
    <>
      <rect x="4" y="2.8" width="14" height="16.4" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M7.5 8h7M7.5 11.5h7M7.5 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
};

/* ---------------- how to reach us ---------------- */
function Channels() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".ch-head > *", {
        y: 26, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".ch-rule", {
        scaleX: 0, transformOrigin: "left center", duration: 1.1, stagger: 0.14, ease: "power3.out",
        scrollTrigger: { trigger: ".ch-grid", start: "top 86%" },
      });
      gsap.from(".ch-card", {
        y: 34, opacity: 0, duration: 0.85, stagger: 0.13, ease: "power3.out",
        scrollTrigger: { trigger: ".ch-grid", start: "top 84%" },
      });
    },
    { scope: root }
  );

  const href = (k) =>
    k === "phone" ? SITE.quotePhoneHref : k === "email" ? `mailto:${SITE.email}` : "/get-a-quote";
  const value = (k) =>
    k === "phone" ? SITE.quotePhone : k === "email" ? SITE.email : "Start a quote";

  return (
    <section
      ref={root}
      className="bg-white"
      style={{ paddingTop: "clamp(4.5rem, 11vh, 9rem)", paddingBottom: "clamp(4.5rem, 11vh, 9rem)" }}
    >
      <div className="shell">
        <div className="ch-head">
          <span aria-hidden="true" className="mb-7 block h-[3px] w-12 bg-ember" />
          <h2 className="t-h2 max-w-[22ch] text-blue">Three ways in. Pick whichever suits.</h2>
          <p className="t-lead mt-7 max-w-[54ch] text-blue/80">
            They all reach the same team. The only difference is how fast you need an answer.
          </p>
        </div>

        <div className="ch-grid mt-[clamp(2.5rem,5vw,4rem)] grid gap-x-[clamp(1.5rem,3vw,3.5rem)] gap-y-10 md:grid-cols-3">
          {CONTACT.channels.map((c) => {
            const external = c.kind !== "form";
            const Tag = external ? "a" : Link;
            return (
              <div key={c.n} className="relative border-t border-blue/12 pt-8">
                <span aria-hidden="true" className="ch-rule absolute left-0 h-[2px] w-full bg-ember" style={{ top: "-1px" }} />
                <div className="ch-card">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ember/[0.08] text-ember">
                    <svg width="21" height="21" viewBox="0 0 22 22" aria-hidden="true">{ICONS[c.kind]}</svg>
                  </span>
                  <h3 className="t-h3 mt-6 text-blue">{c.label}</h3>
                  <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ember">{c.best}</p>
                  <p className="t-body mt-4 max-w-[36ch] text-ink">{c.line}</p>

                  <Tag
                    href={href(c.kind)}
                    className="group mt-7 inline-flex items-center gap-2.5 font-[family-name:var(--font-display)] text-[1.05rem] font-bold text-blue transition-colors duration-300 hover:text-ember"
                  >
                    {value(c.kind)}
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </Tag>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- offices + hours ---------------- */
function Offices() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".of-head > *", {
        y: 26, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".of-card", {
        y: 38, opacity: 0, duration: 0.85, stagger: 0.14, ease: "power3.out",
        scrollTrigger: { trigger: ".of-grid", start: "top 85%" },
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
      <div aria-hidden="true" className="glow glow--solar right-[-10%] top-[-15%]" style={{ width: "min(640px, 50%)" }} />

      <div className="shell relative">
        <div className="of-head">
          <p className="eyebrow mb-5 text-yellow">Where to find us</p>
          <h2 className="t-h2 max-w-[22ch]">Two offices, crews in both states.</h2>
        </div>

        <div className="of-grid mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1rem,1.5vw,1.5rem)] lg:grid-cols-3">
          {OFFICES.map((o) => (
            <a
              key={o.state}
              href={o.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="of-card group relative flex flex-col overflow-hidden rounded-[22px] card-navy p-[clamp(1.6rem,2.2vw,2.5rem)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5"
            >
              <span className="flex items-center gap-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-white/55">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-yellow" />
                {o.state}
              </span>
              <p className="t-h3 mt-5 max-w-[22ch]">{o.address}</p>
              <span className="mt-auto flex items-center gap-2 pt-8 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-yellow">
                Open in maps
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </span>
            </a>
          ))}

          {/* hours */}
          <div className="of-card flex flex-col rounded-[22px] card-navy p-[clamp(1.6rem,2.2vw,2.5rem)]">
            <span className="flex items-center gap-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-white/55">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-green" />
              Opening hours
            </span>
            <p className="t-h3 mt-5">{CONTACT.hours.days}</p>
            <p className="numeral mt-3 text-solar" style={{ fontSize: "clamp(1.5rem,2vw,2.1rem)" }}>
              {CONTACT.hours.time}
            </p>
            <p className="mt-auto pt-8 text-[0.86rem] leading-relaxed text-white/50">{CONTACT.hours.note}</p>
          </div>
        </div>

        <ul className="mt-[clamp(2.5rem,4vw,3.5rem)] flex flex-wrap gap-x-8 gap-y-3 border-t border-white/12 pt-8 text-[0.66rem] uppercase tracking-[0.14em] text-white/55">
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
export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={CONTACT.eyebrow}
        h1={CONTACT.h1}
        lead={CONTACT.lead}
        image={CONTACT.hero.image}
        imageAlt={CONTACT.hero.alt}
        chips={CONTACT.chips}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      <Channels />
      <Offices />
      <Faq
        items={CONTACT.faqs}
        heading="Before you call."
        lead="The questions we get asked most, answered so you do not have to ask them."
      />
      <CTA />
    </>
  );
}
