// The /faq/ page.
//
// Questions are pulled from the data the rest of the site already uses, so the
// FAQ page cannot drift out of step with the service pages. The only content
// defined here is the grouping, the intro copy, and a small set of questions
// that belong to no single service page.

import { FAQS } from "@/lib/site";
import { SERVICE_PAGES } from "@/lib/services";
import { SYSTEMS_HUB } from "@/lib/systems";
import { GUIDES } from "@/lib/guides";

export const FAQ_PAGE = {
  seoTitle: "Solar FAQ | Panels, Batteries, Rebates & Install | Lumenx",
  seoDescription:
    "Straight answers on solar panels, batteries, inverters, rebates, installation and warranties, from a Solar Victoria authorised retailer.",
  eyebrow: "Frequently asked",
  h1: "Everything people ask us before they commit.",
  lead: "Grouped by topic, answered without the sales gloss. If yours is not here, call us and we will answer it properly rather than sending a brochure.",
  hero: {
    image: "/images/installer-field.webp",
    alt: "An accredited installer working on a rooftop solar array",
  },
  chips: ["No jargon", "No pricing games", "Answered in writing"],
};

// Questions that sit above any one service: how we work, what we charge for,
// what happens after the install.
const WORKING_WITH_US = [
  {
    q: "Why will you not give me a price over the phone?",
    a: "Because any number we gave you would be wrong. Your cost depends on your roof, your switchboard, access, the size you actually need and what rebates you qualify for. We would rather spend twenty minutes getting it right than quote a figure we then have to revise.",
  },
  {
    q: "Do you use your own installers?",
    a: "Yes. Our own Clean Energy Council accredited crews do the work, which is the only reason a 16-year workmanship warranty means anything. If the people who install it are not the people who stand behind it, the warranty is a piece of paper.",
  },
  {
    q: "What does the 16-year workmanship warranty actually cover?",
    a: "Our work: the mounting, the wiring, the sealing, the compliance. The panels, inverter and battery carry their own manufacturer warranties on top, which we set out on your quote so you can see both.",
  },
  {
    q: "How long does the whole process take?",
    a: "The installation itself is usually a single day for a residential system. The timeline is set by the pre-approval from your electricity distributor, which we lodge as soon as your design is confirmed.",
  },
  {
    q: "What happens if something goes wrong after the install?",
    a: "You call us, not a call centre in another state. Monitoring means we can often diagnose a fault before you notice a change in your bill.",
  },
  {
    q: "Do you sell my details to other companies?",
    a: "No. We use what you give us to quote and, if you go ahead, to install and lodge your rebate. Nothing else.",
  },
];

/**
 * Topic groups for the FAQ page.
 *
 * Each group draws from the source of truth for that subject, so an answer
 * edited on a service page changes here too. Duplicates across sources are
 * removed by question text.
 */
export function faqGroups() {
  const raw = [
    { id: "general", title: "Solar, generally", items: FAQS },
    { id: "working-with-us", title: "Working with Lumenx", items: WORKING_WITH_US },
    { id: "residential", title: "Residential solar", items: SERVICE_PAGES["residential-solar"]?.faqs },
    { id: "sizing", title: "System sizing", items: SYSTEMS_HUB.faqs },
    { id: "batteries", title: "Batteries and storage", items: SERVICE_PAGES["solar-batteries"]?.faqs },
    { id: "inverters", title: "Inverters", items: SERVICE_PAGES["solar-inverters"]?.faqs },
    { id: "commercial", title: "Commercial solar", items: SERVICE_PAGES["commercial-solar"]?.faqs },
    { id: "ev-chargers", title: "EV charging", items: SERVICE_PAGES["ev-chargers"]?.faqs },
    { id: "hot-water", title: "Hot water and pool heating", items: SERVICE_PAGES["heat-pump-hot-water"]?.faqs },
    { id: "rebates", title: "Rebates and eligibility", items: GUIDES["victorian-battery-rebate"]?.faqs },
  ];

  const seen = new Set();
  return raw
    .map((g) => ({
      ...g,
      items: (g.items || []).filter((f) => {
        const key = f.q.trim().toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }),
    }))
    .filter((g) => g.items.length > 0);
}

/** Flat list, for the page's single FAQPage schema block. */
export function allFaqs() {
  return faqGroups().flatMap((g) => g.items);
}
