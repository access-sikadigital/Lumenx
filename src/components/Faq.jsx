"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQS } from "@/lib/site";

/**
 * Accordion FAQ with FAQPage schema.
 *
 * Defaults to the home page's questions; service pages pass their own set so
 * each URL carries FAQ schema specific to that page rather than repeating the
 * site-wide list, which search engines treat as duplication.
 */
export default function Faq({
  items = FAQS,
  heading = "Questions, answered.",
  lead = "Still unsure? Send us your address and a recent bill, and you'll get honest numbers, not a hard sell.",
}) {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-white py-[clamp(5rem,12vh,10rem)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <div className="shell grid gap-[clamp(2.5rem,4vw,6rem)] lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-[16vh] lg:self-start">
          <p className="eyebrow mb-5 text-ember">FAQ</p>
          <h2 className="t-h1 text-blue">{heading}</h2>
          <p className="t-body mt-6 max-w-[34ch] text-ink">{lead}</p>
          <Link href="/get-a-quote" className="btn btn-ember mt-8">
            <span>Get a Free Quote</span>
          </Link>
        </div>

        <div className="border-t border-blue/12">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-blue/12">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-8 py-[clamp(1.25rem,2vw,2rem)] text-left"
                >
                  <span className="t-h3 max-w-[26ch] text-blue">{f.q}</span>
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "rotate-45 border-ember bg-ember text-white" : "border-blue/20 text-blue"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="t-body max-w-[62ch] pb-[clamp(1.25rem,2vw,2rem)] text-ink">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
