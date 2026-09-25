// Blog / knowledge hub.
//
// ============================================================================
// THERE ARE NO POSTS YET, AND NONE HAVE BEEN INVENTED.
// ============================================================================
// A blog hub padded with fabricated articles is the worst thing you can put on
// a site like this: it is thin content in Google's eyes, and any claim inside a
// made-up article becomes a claim Lumenx has published. So POSTS is empty.
//
// The hub still earns its URL, because the site already contains genuine
// explanatory content — the rebate guides, the sizing pages, the products page,
// the FAQ. GUIDE_CARDS below points at that real material.
//
// When real articles exist, add them to POSTS in this shape and the hub, the
// sitemap and the "latest" section pick them up automatically:
//
//   {
//     slug: "how-to-read-your-power-bill",
//     title: "How to read your power bill before you get a solar quote",
//     excerpt: "One sentence.",
//     topic: "Bills & usage",
//     date: "2026-10-02",        // ISO, used for sorting and datePublished
//     readMins: 6,
//     image: an existing file under public/images
//     imageAlt: what is actually in that image
//     body: [ "paragraph", "paragraph" ],
//   }
//
// Adding a post also needs a route at src/app/blog/[slug]/page.jsx. That route
// does not exist yet — deliberately, so an empty blog cannot generate URLs.

export const BLOG_HUB = {
  seoTitle: "Solar Guides & Resources | Lumenx",
  seoDescription:
    "Plain-English guides to solar rebates, system sizing, batteries and equipment in Victoria and New South Wales, from a Solar Victoria authorised retailer.",
  eyebrow: "Guides & resources",
  h1: "The things worth understanding before you sign anything.",
  lead: "Not content marketing. These are the questions that decide whether a solar quote is good or bad, written out properly so you can judge ours against anyone else's.",
  hero: {
    image: "/images/family-solar.webp",
    alt: "A home with rooftop solar in afternoon light",
  },
  chips: ["No sales pitch", "Written by installers", "Updated as programs change"],

  intro: {
    heading: "Why there is no drip of weekly blog posts here",
    body: [
      "Most solar company blogs exist to catch search traffic, not to be read. They rehash the same five topics every quarter and go stale the moment a rebate changes, which is worse than useless because a visitor cannot tell which page is current.",
      "We would rather maintain a small number of pages properly. Each of the guides below is the primary page for its subject on this site, it is dated, and it is updated when the underlying program changes rather than being replaced with a fresh post that says almost the same thing.",
    ],
  },
};

/**
 * The real explanatory content on this site. Every one of these is a page that
 * exists — there are no placeholder destinations here.
 */
export const GUIDE_CARDS = [
  {
    topic: "Rebates",
    title: "Every Victorian solar rebate, explained",
    line: "Which programs exist, who qualifies, and how they come off your quote rather than being claimed back later.",
    href: "/solar-rebates-victoria",
    image: "/images/rooftop-home.webp",
    imageAlt: "Solar panels on a suburban home's roof",
    featured: true,
  },
  {
    topic: "Rebates",
    title: "The battery rebate and what it changed",
    line: "Storage used to be a long payback. The federal program is the single biggest reason that is no longer true.",
    href: "/victorian-battery-rebate",
    image: "/images/svc-batteries.webp",
    imageAlt: "Energy storage and inverter equipment mounted on a wall",
  },
  {
    topic: "Rebates",
    title: "Heat pump hot water rebates",
    line: "Hot water is usually the second largest line on a household bill, and it carries some of the most generous discounts available.",
    href: "/heat-pump-rebate-victoria",
    image: "/images/svc-heat-pump.webp",
    imageAlt: "A heat pump hot water tank and plumbing in a plant room",
  },
  {
    topic: "Sizing",
    title: "What size system do I actually need?",
    line: "5kW through 15kW compared side by side, with panel counts and roof space worked out rather than guessed.",
    href: "/solar-systems",
    image: "/images/page-solar-systems.webp",
    imageAlt: "A large rooftop solar array seen from above",
  },
  {
    topic: "Equipment",
    title: "How we choose what goes on your roof",
    line: "The part of a quote most people cannot compare, which is exactly where corners get cut.",
    href: "/solar-products",
    image: "/images/panels-closeup.webp",
    imageAlt: "A close view of solar panel cells and framing",
  },
  {
    topic: "Everything else",
    title: "The full question list",
    line: "Every question we are regularly asked, grouped by topic, from warranties to what happens in a blackout.",
    href: "/faq",
    image: "/images/installer-field.webp",
    imageAlt: "An accredited installer working on a rooftop solar array",
  },
];

/** Real articles. Empty until real ones are written. */
export const POSTS = [];

export const postsByDate = () =>
  [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
