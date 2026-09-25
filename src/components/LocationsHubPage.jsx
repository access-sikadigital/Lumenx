"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import { SITE, OFFICES, TRUST } from "@/lib/site";
import { LOCATIONS, LOCATIONS_HUB } from "@/lib/locations";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- hero ---------------- */
function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".lhh-copy > *", {
        y: 34, opacity: 0, duration: 0.95, stagger: 0.1, ease: "power3.out",
      });
      gsap.from(".lhh-chip", {
        y: 16, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.5,
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="grain relative isolate overflow-hidden bg-blue text-white">
      <div aria-hidden="true" className="glow glow--solar right-[-18%] top-[-28%]" style={{ width: "min(760px, 70%)" }} />
      <div aria-hidden="true" className="glow glow--ember left-[-20%] bottom-[-36%]" style={{ width: "min(600px, 58%)" }} />

      <div className="shell page-hero-copy relative z-10">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] text-white/45">
            <li><Link href="/" className="transition-colors hover:text-yellow">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white/70">Service Areas</li>
          </ol>
        </nav>

        <div className="lhh-copy max-w-[46rem]">
          <p className="eyebrow mb-6 text-yellow">{LOCATIONS_HUB.eyebrow}</p>
          <h1 className="t-h1">{LOCATIONS_HUB.h1}</h1>
          <p className="t-lead mt-8 max-w-[52ch] text-white/70">{LOCATIONS_HUB.lead}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3.5">
            <Link href="/get-a-quote" className="btn btn-primary">
              <span>Check my address</span>
            </Link>
            <a href={SITE.phoneHref} className="btn btn-ghost text-white">
              <span>{SITE.phone}</span>
            </a>
          </div>
        </div>

        <ul className="mt-[clamp(2.5rem,4vw,3.5rem)] flex flex-wrap gap-2.5">
          {LOCATIONS_HUB.chips.map((c) => (
            <li
              key={c}
              className="lhh-chip rounded-full border border-white/18 bg-white/[0.04] px-4 py-2 text-[0.78rem] text-white/70"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Two offices, each with the pages it serves. This is the signature
   section: the hub is organised by who actually turns up, not by an
   alphabetical list of postcodes.
   ---------------------------------------------------------------- */
function Offices() {
  const root = useRef(null);

  const groups = OFFICES.map((o) => ({
    office: o,
    pages: LOCATIONS.filter((l) => l.office === o.state),
  }));

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".ofh-col", {
        y: 36, opacity: 0, duration: 0.9, stagger: 0.14, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 84%" },
      });
      gsap.from(".ofh-row", {
        y: 18, opacity: 0, duration: 0.55, stagger: 0.05, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
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
        <div className="max-w-[42rem]">
          <span aria-hidden="true" className="mb-7 block h-[3px] w-12 bg-ember" />
          <h2 className="t-h2 text-blue">Pick the closest office.</h2>
          <p className="t-body mt-6 text-ink">
            Every installation below is done by our own accredited crews out of one of these two
            offices. If you are between them, ask us and we will tell you which one covers you.
          </p>
        </div>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(2rem,3.5vw,3.5rem)] lg:grid-cols-2">
          {groups.map(({ office, pages }) => (
            <div
              key={office.state}
              className="ofh-col rounded-[24px] border border-blue/12 bg-cloud p-[clamp(1.5rem,2.6vw,2.5rem)]"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2 border-b border-blue/12 pb-6">
                <div>
                  <span className="block text-[0.66rem] uppercase tracking-[0.16em] text-ink-soft">
                    {office.state}
                  </span>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.35rem,2vw,1.85rem)] font-bold text-blue">
                    {office.city}
                  </p>
                </div>
                <a
                  href={office.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.8rem] font-semibold text-ember transition-opacity hover:opacity-70"
                >
                  View on map →
                </a>
              </div>

              <p className="mt-5 text-[0.88rem] leading-relaxed text-ink">{office.address}</p>

              <ul className="mt-7">
                {pages.map((p) => (
                  <li key={p.slug} className="ofh-row border-b border-blue/10">
                    <Link
                      href={`/${p.slug}`}
                      className="group flex items-center justify-between gap-4 py-3.5"
                    >
                      <span className="min-w-0">
                        <span className="block text-[0.95rem] text-blue transition-colors group-hover:text-ember">
                          {p.label}
                        </span>
                        <span className="mt-0.5 block text-[0.8rem] text-ink-soft">
                          {p.areas.slice(0, 3).join(" · ")}
                        </span>
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
          ))}
        </div>

        <ul className="mt-[clamp(2.5rem,4vw,3.5rem)] flex flex-wrap gap-2.5">
          {TRUST.map((t) => (
            <li
              key={t}
              className="rounded-full border border-blue/15 bg-paper px-4 py-2 text-[0.76rem] text-ink"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   Sun comparison across every area we cover. One honest chart that
   explains why the same system pays back faster in some cities.
   ---------------------------------------------------------------- */
function SunCompare() {
  const root = useRef(null);

  // De-duplicate by city — Melbourne has four pages but one climate.
  const cities = [];
  for (const l of LOCATIONS) {
    if (!cities.some((c) => c.city === l.city)) {
      cities.push({ city: l.city, sun: l.sun, num: parseFloat(l.sun.replace(/[^\d.]/g, "")) });
    }
  }
  const max = Math.max(...cities.map((c) => c.num));

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".sc-head > *", {
        y: 26, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".sc-bar", {
        scaleX: 0, transformOrigin: "left center", duration: 1.15, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".sc-list", start: "top 86%" },
      });
      gsap.from(".sc-row", {
        y: 20, opacity: 0, duration: 0.6, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: ".sc-list", start: "top 86%" },
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
      <div aria-hidden="true" className="glow glow--solar right-[-10%] top-[-16%]" style={{ width: "min(620px, 50%)" }} />

      <div className="shell relative">
        <div className="sc-head max-w-[40rem]">
          <p className="eyebrow mb-5 text-yellow">Sun by city</p>
          <h2 className="t-h2">The same panels do not produce the same power.</h2>
          <p className="t-body mt-6 text-white/65">
            Approximate daily peak sun hours, averaged across the year. It is why an identical
            system pays back sooner in Sydney than in Ballarat, and why we size from your address
            rather than from a template.
          </p>
        </div>

        <ul className="sc-list mt-[clamp(2.5rem,5vw,4rem)] space-y-[clamp(1rem,1.6vw,1.5rem)]">
          {cities.map((c) => (
            <li key={c.city} className="sc-row">
              <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                <span className="font-[family-name:var(--font-display)] text-[clamp(1rem,1.4vw,1.2rem)] font-bold">
                  {c.city}
                </span>
                <span className="numeral text-[0.95rem] text-yellow">{c.sun} hrs</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
                <div
                  className="sc-bar h-full rounded-full"
                  style={{
                    width: `${(c.num / max) * 100}%`,
                    background: "linear-gradient(90deg, #e8420a 0%, #ffb120 100%)",
                  }}
                />
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-[clamp(2rem,3vw,2.5rem)] max-w-[56ch] border-t border-white/12 pt-6 text-[0.8rem] leading-relaxed text-white/45">
          Long-run regional averages, shown for comparison only. Your own yield depends on roof
          pitch, orientation and shading, which we model properly before quoting.
        </p>
      </div>
    </section>
  );
}

const HUB_FAQS = [
  {
    q: "Do you cover my suburb?",
    a: "If it is within reach of our Melbourne or Sydney office, almost certainly. The city pages list the main areas we work in, but they are not exhaustive. Send us your address and we will confirm either way before you spend any time on a quote.",
  },
  {
    q: "Do you use your own installers or subcontractors?",
    a: "Our own accredited crews. That is the reason we are careful about how far we travel. A warranty is only worth something if the people who honour it can get back to your roof.",
  },
  {
    q: "Are the rebates different in New South Wales?",
    a: "Yes. The federal programs apply nationally, but the state programs differ, and Solar Victoria schemes are Victorian only. We check what applies at your address and show it as a deducted line on your quote.",
  },
  {
    q: "Is there a travel charge for regional areas?",
    a: "Anything that affects your price appears on your quote before you commit. We do not add charges after the fact, and if a location is genuinely too far to service properly we say so rather than quoting anyway.",
  },
  {
    q: "Which office will I be dealing with?",
    a: `Whichever one covers your address: Melbourne for Victoria, Sydney for New South Wales. Either way you can reach us on ${SITE.phone} or at ${SITE.email}.`,
  },
];

export default function LocationsHubPage() {
  return (
    <>
      <Hero />
      <Offices />
      <SunCompare />
      <Process />
      <Reviews />
      <Faq
        items={HUB_FAQS}
        heading="Coverage, answered."
        lead="If your area is not listed, ask. We would rather tell you no than waste your time."
      />
      <CTA />
    </>
  );
}
