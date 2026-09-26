"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";
import ServiceSignature from "@/components/ServiceSignature";
import Process from "@/components/Process";
import RebatesBand from "@/components/RebatesBand";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import Marquee from "@/components/Marquee";
import { SERVICES } from "@/lib/site";
import { SERVICE_PAGES, serviceUrl } from "@/lib/services";

gsap.registerPlugin(ScrollTrigger);

const reveal = (sel, trigger, vars = {}) =>
  gsap.from(sel, {
    y: 30,
    opacity: 0,
    duration: 0.85,
    stagger: 0.09,
    ease: "power3.out",
    scrollTrigger: { trigger, start: "top 82%" },
    ...vars,
  });

/* ---------------- intro: editorial feature ----------------
   Was a heading, two identical paragraphs, a tick list and a 4:3 photo — the
   most generic split on the internet, and identical on all eight pages.
   Now: typographic hierarchy (lede set larger than the body), the points as a
   numbered grid under drawn ember rules rather than a checklist, a portrait
   image offset down the page with a badge overlapping its corner, and the
   column order alternating per service so no two consecutive pages read the
   same way. */
function Intro({ intro, badge, flip, tone }) {
  const root = useRef(null);
  const [lede, ...rest] = intro.body;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      reveal(".si-copy > *", root.current);
      gsap.from(".si-media", {
        y: 44,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      gsap.from(".si-badge", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.35,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      gsap.from(".si-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".si-points", start: "top 88%" },
      });
      gsap.from(".si-point", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".si-points", start: "top 88%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className={tone === "cloud" ? "bg-cloud" : "bg-white"}
      style={{ paddingTop: "clamp(4.5rem, 11vh, 9rem)", paddingBottom: "clamp(4.5rem, 11vh, 9rem)" }}
    >
      <div className="shell grid items-start gap-[clamp(2.5rem,5vw,6rem)] lg:grid-cols-[1.15fr_0.85fr]">
        {/* copy */}
        <div className={`si-copy ${flip ? "lg:order-2" : ""}`}>
          <span aria-hidden="true" className="mb-7 block h-[3px] w-12 bg-ember" />
          <h2 className="t-h2 max-w-[22ch] text-blue">{intro.heading}</h2>

          <p className="t-lead mt-7 max-w-[52ch] text-blue/80">{lede}</p>
          {rest.map((p) => (
            <p key={p.slice(0, 32)} className="t-body mt-5 max-w-[58ch] text-ink">
              {p}
            </p>
          ))}

          <div className="si-points mt-[clamp(2.5rem,4vw,3.5rem)] grid gap-x-[clamp(1.5rem,2.5vw,3rem)] gap-y-9 sm:grid-cols-2">
            {intro.points.map((p, i) => (
              <div key={p} className="relative border-t border-blue/12 pt-6">
                <span
                  aria-hidden="true"
                  className="si-rule absolute left-0 h-[2px] w-9 bg-ember"
                  style={{ top: "-1px" }}
                />
                <div className="si-point">
                  <span className="numeral block text-[0.68rem] tracking-[0.16em] text-ember">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 max-w-[32ch] text-[0.97rem] leading-relaxed text-ink">{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* media */}
        <div className={`relative ${flip ? "lg:order-1" : ""} lg:mt-[clamp(2rem,5vw,5rem)]`}>
          <div className="si-media relative aspect-[4/5] overflow-hidden rounded-[24px]">
            <Image
              src={intro.image}
              alt={intro.imageAlt}
              fill
              sizes="(max-width:1024px) 100vw, 40vw"
              className="object-cover"
              quality={90}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "linear-gradient(0deg, rgba(11,20,59,.45) 0%, transparent 45%)" }}
            />
          </div>

          {badge && (
            <div className="si-badge absolute bottom-6 left-6 right-6 rounded-[16px] bg-white/95 p-4 backdrop-blur-sm sm:right-auto sm:max-w-[74%]">
              <p className="text-[0.6rem] uppercase tracking-[0.16em] text-ink-soft">Included</p>
              <p className="mt-1.5 font-[family-name:var(--font-display)] text-[1rem] font-bold leading-snug text-blue">
                {badge}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- what's included ---------------- */
function Features({ items }) {
  const root = useRef(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      reveal(".sf-card", ".sf-grid", { y: 38, scale: 0.98 });
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
        <p className="eyebrow mb-5 text-ember">What you get</p>
        <h2 className="t-h2 max-w-[16ch] text-blue">
          Included as standard.
        </h2>

        <div className="sf-grid mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1rem,1.5vw,1.5rem)] sm:grid-cols-2 xl:grid-cols-3">
          {items.map((f, i) => (
            <article
              key={f.title}
              className="sf-card group relative flex flex-col overflow-hidden rounded-[20px] border border-blue/10 bg-white transition-colors duration-500 hover:border-blue/20"
              style={{ padding: "clamp(1.5rem, 1.8vw, 2.2rem)" }}
            >
              <span
                className="numeral leading-none"
                style={{
                  fontSize: "clamp(1.4rem,1.8vw,2rem)",
                  color: "rgba(232,66,10,0.10)",
                  WebkitTextStroke: "1.5px rgba(232,66,10,0.8)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="t-h3 mt-6 text-blue">{f.title}</h3>
              <p className="t-body mt-3 text-ink">{f.line}</p>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[3px] w-0 bg-ember transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- brands ----------------
   Was a static row of just the four or five brands tagged to this service.
   Next to the home page's moving row it looked thin, and it made the range
   look smaller than it is. It is now the same marquee the home page uses,
   with the full set, so the proof reads the same wherever you land. */
function Brands() {
  return <Marquee eyebrow="Tier-1 hardware we install" />;
}

/* ---------------- related services ---------------- */
function Related({ slugs, current }) {
  // Fall back to the service page's own hero when a slug has no home-page
  // card — the sub-service pages (Powerwall, inverter replacement) are not in
  // SERVICES, and without this they would silently vanish from related lists.
  const items = slugs
    .map((s) => {
      const page = SERVICE_PAGES[s];
      if (!page || s === current) return null;
      const card = SERVICES.find((x) => x.id === s);
      return {
        page,
        image: card?.image || page.hero.image,
        title: card?.title || page.label,
        line: card?.line || page.lead,
      };
    })
    .filter(Boolean);
  if (items.length === 0) return null;

  return (
    <section className="bg-cloud" style={{ paddingTop: "clamp(4rem, 9vh, 7rem)", paddingBottom: "clamp(4rem, 9vh, 7rem)" }}>
      <div className="shell">
        <div className="mb-[clamp(2rem,3.5vw,3rem)] flex flex-wrap items-end justify-between gap-6">
          <h2 className="t-h2 max-w-[16ch] text-blue">
            Works well with this.
          </h2>
          <Link href="/#services" className="btn btn-sm btn-ghost btn-ghost-ink">
            <span>All services</span>
          </Link>
        </div>

        <div className="grid gap-[clamp(1rem,1.5vw,1.5rem)] md:grid-cols-3">
          {items.map(({ page, image, title, line }) => (
            <Link
              key={page.slug}
              href={serviceUrl(page.slug)}
              className="group relative flex flex-col overflow-hidden rounded-[20px] border border-blue/10 bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-blue/20 hover:shadow-[0_28px_60px_-32px_rgba(11,20,59,0.45)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue/55 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-[clamp(1.4rem,1.7vw,2rem)]">
                <h3 className="t-h3 text-blue">{title}</h3>
                <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-ink">{line}</p>
                <span className="mt-6 flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-ember">
                  Explore
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= section order, varied per service =================
   Eight pages running the same sequence reads as a template no matter how
   good the sections are. Each page leads with whatever its visitor most
   needs: batteries and heat pumps open with the explainer because the
   question is "how does this even work"; commercial and inverters set up the
   context first because the question is "which one, and is it worth it".
   Unlisted slugs fall back to DEFAULT_ORDER. */
const DEFAULT_ORDER = ["intro", "signature", "features", "brands", "process", "rebates", "reviews", "faq", "related", "cta"];

const ORDERS = {
  // Sizes and prices are the reason people land here, so they come early.
  "residential-solar": ["intro", "signature", "features", "brands", "process", "rebates", "reviews", "faq", "related", "cta"],
  // The economic case has to land before anything else.
  "commercial-solar": ["intro", "signature", "features", "brands", "reviews", "process", "faq", "related", "cta"],
  // "What does a battery actually do all day" is the first question.
  "solar-batteries": ["signature", "intro", "features", "brands", "rebates", "process", "reviews", "faq", "related", "cta"],
  // Context first, then the three-way choice.
  "solar-inverters": ["intro", "signature", "features", "brands", "process", "reviews", "faq", "related", "cta"],
  "ev-chargers": ["intro", "signature", "features", "brands", "process", "reviews", "faq", "related", "cta"],
  // The mechanism is the sell: it explains the running cost.
  "heat-pump-hot-water": ["signature", "intro", "features", "brands", "rebates", "process", "reviews", "faq", "related", "cta"],
  "pool-heating": ["intro", "signature", "features", "brands", "process", "reviews", "faq", "related", "cta"],
  "solar-packages": ["intro", "signature", "features", "brands", "rebates", "process", "reviews", "faq", "related", "cta"],
  // Someone here has a broken system; the symptom checker goes first.
  "solar-inverter-replacement": ["signature", "intro", "features", "brands", "process", "faq", "related", "cta"],
  // The comparison is the whole question on a single-product page.
  "tesla-powerwall": ["intro", "signature", "features", "rebates", "brands", "process", "reviews", "faq", "related", "cta"],
};

/* ================= page ================= */
export default function ServicePage({ slug }) {
  const s = SERVICE_PAGES[slug];
  if (!s) return null;

  const order = ORDERS[slug] || DEFAULT_ORDER;

  // Alternate which side the intro image sits on, so consecutive services do
  // not read as the same page with the words swapped.
  const flip = Object.keys(SERVICE_PAGES).indexOf(slug) % 2 === 1;

  const render = (key, i) => {
    switch (key) {
      case "intro": {
        // Features is cloud; if it follows immediately, keep the intro white
        // so the two sections do not merge into one flat band.
        const tone = order[i + 1] === "features" ? "white" : flip ? "cloud" : "white";
        return <Intro key={key} intro={s.intro} badge={s.chips?.[0]} flip={flip} tone={tone} />;
      }
      case "features":
        return <Features key={key} items={s.features} />;
      // Every page's signature is a section built specifically for that
      // service. Residential used to show size-and-price cards here; the site
      // no longer publishes savings or price figures anywhere, so it gets the
      // same treatment as the rest.
      case "signature":
        return <ServiceSignature key={key} slug={slug} />;
      case "brands":
        return <Brands key={key} />;
      case "process":
        return <Process key={key} />;
      case "rebates":
        return s.showRebates ? <RebatesBand key={key} /> : null;
      case "reviews":
        return <Reviews key={key} />;
      case "faq":
        return (
          <Faq
            key={key}
            items={s.faqs}
            heading={`${s.label}, answered.`}
            lead="Still unsure? Send us your address and a recent bill, and you'll get honest numbers, not a hard sell."
          />
        );
      case "related":
        return <Related key={key} slugs={s.related} current={s.slug} />;
      case "cta":
        return <CTA key={key} />;
      default:
        return null;
    }
  };

  return (
    <>
      <PageHero
        eyebrow={s.eyebrow}
        h1={s.h1}
        lead={s.lead}
        image={s.hero.image}
        imageAlt={s.hero.alt}
        chips={s.chips}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: s.label, href: `/${s.slug}` },
        ]}
      />
      {order.map(render)}
    </>
  );
}
