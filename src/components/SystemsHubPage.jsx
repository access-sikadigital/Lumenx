"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";
import { SizeLadder } from "@/components/SystemSizePage";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import { SYSTEMS_HUB } from "@/lib/systems";

gsap.registerPlugin(ScrollTrigger);

function Intro() {
  const root = useRef(null);
  const { intro } = SYSTEMS_HUB;
  const [lede, ...rest] = intro.body;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".sh-copy > *", {
        y: 30, opacity: 0, duration: 0.85, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
      gsap.from(".sh-media", {
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
        <div className="sh-copy">
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

        <div className="sh-media relative aspect-[4/5] overflow-hidden rounded-[24px] lg:mt-[clamp(2rem,5vw,5rem)]">
          <Image src={intro.image} alt={intro.imageAlt} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

export default function SystemsHubPage() {
  return (
    <>
      <PageHero
        eyebrow={SYSTEMS_HUB.eyebrow}
        h1={SYSTEMS_HUB.h1}
        lead={SYSTEMS_HUB.lead}
        image={SYSTEMS_HUB.hero.image}
        imageAlt={SYSTEMS_HUB.hero.alt}
        chips={SYSTEMS_HUB.chips}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solar Systems", href: "/solar-systems" },
        ]}
      />
      <Intro />
      <SizeLadder current={null} />
      <Process />
      <Reviews />
      <Faq
        items={SYSTEMS_HUB.faqs}
        heading="Sizing, answered."
        lead="Send us a recent bill and we will tell you which size is actually right for your household."
      />
      <CTA />
    </>
  );
}
