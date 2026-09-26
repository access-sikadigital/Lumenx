"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import { SITE } from "@/lib/site";
import { FAQ_PAGE, faqGroups } from "@/lib/faq-groups";

gsap.registerPlugin(ScrollTrigger);

/* ----------------------------------------------------------------
   The library.

   Signature layout: a sticky topic index on the left that tracks the
   group you are reading, and accordion groups on the right. Only one
   answer is open at a time across the whole page, so the column never
   grows into an unreadable wall.
   ---------------------------------------------------------------- */
function Library() {
  const root = useRef(null);
  const groups = faqGroups();

  // "groupId:index" so opening a question in one group closes the other.
  const [open, setOpen] = useState(`${groups[0]?.id}:0`);
  const [active, setActive] = useState(groups[0]?.id);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".fl-group", {
        y: 28, opacity: 0, duration: 0.75, stagger: 0.07, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      // Highlight the index entry for whichever group is in view.
      groups.forEach((g) => {
        ScrollTrigger.create({
          trigger: `#faq-${g.id}`,
          start: "top 30%",
          end: "bottom 30%",
          onToggle: (self) => self.isActive && setActive(g.id),
        });
      });
    },
    { scope: root, dependencies: [] }
  );

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section
      ref={root}
      className="bg-white"
      style={{ paddingTop: "clamp(4rem, 9vh, 7rem)", paddingBottom: "clamp(4.5rem, 11vh, 9rem)" }}
    >
      <div className="shell grid gap-[clamp(2.5rem,4vw,5rem)] lg:grid-cols-[0.78fr_1.22fr]">
        {/* index */}
        <div className="lg:sticky lg:top-[14vh] lg:self-start">
          <div className="flex items-baseline gap-3">
            <span className="numeral text-[clamp(2.2rem,4vw,3.2rem)] leading-none text-ember">{total}</span>
            <span className="text-[0.8rem] uppercase tracking-[0.14em] text-ink-soft">questions</span>
          </div>

          <nav aria-label="FAQ topics" className="mt-8 border-t border-blue/12">
            <ul>
              {groups.map((g) => {
                const on = active === g.id;
                return (
                  <li key={g.id} className="border-b border-blue/10">
                    <a
                      href={`#faq-${g.id}`}
                      aria-current={on ? "true" : undefined}
                      className={`flex items-center justify-between gap-4 py-3 text-[0.9rem] transition-colors duration-300 ${
                        on ? "font-semibold text-ember" : "text-ink hover:text-blue"
                      }`}
                    >
                      <span className="min-w-0">{g.title}</span>
                      <span className="numeral shrink-0 text-[0.72rem] text-ink-soft">
                        {g.items.length}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-9 rounded-[20px] border border-blue/12 bg-cloud p-[clamp(1.2rem,1.8vw,1.75rem)]">
            <p className="text-[0.95rem] leading-relaxed text-ink">
              Not answered here? Ask us directly. We would rather have the conversation than let you
              guess.
            </p>
            <Link href="/get-a-quote" className="btn btn-ember btn-sm mt-5">
              <span>Ask a question</span>
            </Link>
            <a href={SITE.phoneHref} className="btn btn-sm btn-ghost btn-ghost-ink mt-3">
              <span>{SITE.phone}</span>
            </a>
          </div>
        </div>

        {/* groups */}
        <div>
          {groups.map((g) => (
            <section
              key={g.id}
              id={`faq-${g.id}`}
              className="fl-group scroll-mt-[calc(var(--header-h)+24px)] pb-[clamp(2.5rem,4vw,3.5rem)]"
            >
              <div className="mb-2 flex items-center gap-5">
                <h2 className="t-h3 shrink-0 text-blue">{g.title}</h2>
                <span aria-hidden="true" className="h-px flex-1 bg-blue/12" />
              </div>

              <div>
                {g.items.map((f, i) => {
                  const key = `${g.id}:${i}`;
                  const isOpen = open === key;
                  return (
                    <div key={f.q} className="border-b border-blue/12">
                      <h3>
                        <button
                          onClick={() => setOpen(isOpen ? "" : key)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between gap-6 py-[clamp(1rem,1.6vw,1.5rem)] text-left"
                        >
                          <span className="max-w-[34ch] text-[1rem] font-semibold leading-snug text-blue">
                            {f.q}
                          </span>
                          <span
                            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              isOpen ? "rotate-45 border-ember bg-ember text-white" : "border-blue/20 text-blue"
                            }`}
                          >
                            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                          </span>
                        </button>
                      </h3>
                      <div
                        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <p className="max-w-[62ch] pb-[clamp(1rem,1.6vw,1.5rem)] text-[0.95rem] leading-relaxed text-ink">
                            {f.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FaqLibraryPage() {
  return (
    <>
      <PageHero
        eyebrow={FAQ_PAGE.eyebrow}
        h1={FAQ_PAGE.h1}
        lead={FAQ_PAGE.lead}
        image={FAQ_PAGE.hero.image}
        imageAlt={FAQ_PAGE.hero.alt}
        chips={FAQ_PAGE.chips}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQ", href: "/faq" },
        ]}
      />
      <Library />
      <CTA />
    </>
  );
}
