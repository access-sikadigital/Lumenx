// Solar system size pages: /solar-systems/ hub + five size pages.
//
// NUMBERS POLICY — read before editing:
//
// • Panel counts, inverter sizing and roof area are ARITHMETIC, not claims.
//   Panel count = round(kW ÷ 0.44) using the 440W panels Lumenx quotes with.
//   Roof area ≈ 2.0 m² per panel, which is the footprint of a standard
//   1.76 × 1.13 m module. Both are labelled approximate on the page.
//
// • NO savings or price figures appear anywhere on this site. Panel counts
//   and roof areas are arithmetic from 440W modules; everything financial
//   belongs in the written quote, where it is calculated against the
//   customer's own bill rather than quoted as an average.
//
// • No prices anywhere. Every page routes to a quote instead.

export const SYSTEMS_HUB = {
  seoTitle: "Solar System Sizes & Prices | 5kW to 15kW | Lumenx",
  seoDescription:
    "Compare solar system sizes from 5kW to 15kW: panel counts, roof space and which household each one suits. Get a fixed, itemised quote from Lumenx.",
  eyebrow: "System sizes",
  h1: "How big a system do you actually need?",
  lead: "The honest answer depends on how much power you use and when you use it, not on how much roof you have. Here is what each size looks like in practice.",
  hero: {
    image: "/images/page-solar-systems.webp",
    alt: "Aerial view of a building roof covered with solar panels",
  },
  chips: ["5kW to 15kW", "440W tier-1 panels", "Sized from your bill"],

  intro: {
    heading: "Bigger is not automatically better",
    body: [
      "It is tempting to fill the roof. But every kilowatt you install beyond what you actually consume gets exported at a feed-in rate that is a fraction of what you pay to buy power back. Past a certain point you are paying for panels that subsidise the grid.",
      "The right size is the one that covers your daytime consumption with a sensible margin, sized against a real bill rather than a rule of thumb. These pages show you what each size physically involves. The sizing itself still comes from your usage.",
    ],
    points: [
      "Panel counts and roof space for every size we install",
      "Which household each size genuinely suits",
      "440W tier-1 panels as standard across the range",
      "Sized against your bill before anything is quoted",
    ],
    image: "/images/sys-large.webp",
    imageAlt: "Aerial view of a large home with a full rooftop solar array",
  },

  faqs: [
    {
      q: "What size solar system do I need?",
      a: "It depends on your daily consumption and when it happens. A household using around 20kWh a day with most of it in daylight is usually well served by 6.6kW; heavy air conditioning, a pool or an EV typically pushes that to 10kW or more. We size it from your actual bill rather than guessing.",
    },
    {
      q: "How much roof space does each size need?",
      a: "Roughly 2 square metres per panel, so a 6.6kW system with 15 panels needs about 30m² of usable roof, and a 15kW system about 68m². Usable means unshaded, structurally sound and on an orientation worth installing to.",
    },
    {
      q: "Can I start small and add panels later?",
      a: "You can, but it is rarely the cheaper path. Adding to an existing array often means a second inverter or a replacement, plus a second lot of installation and paperwork. If you expect your usage to grow, it is usually better to size for that now.",
    },
    {
      q: "Does a bigger system always save more?",
      a: "No. Beyond your actual consumption the extra generation is exported at a low feed-in rate, so the marginal return drops sharply. We will tell you when a smaller system is the better financial decision.",
    },
    {
      q: "What panels do you use?",
      a: "Tier-1 440W modules across the range, from JA Solar, Jinko, Trina, Longi, Risen and Sunman depending on availability and what suits your roof. The specific model is named in your quote, not left vague.",
    },
  ],
};

// panels = round(kW / 0.44); roofArea = panels × 2.0 m²
export const SYSTEM_SIZES = [
  {
    slug: "5kw",
    kw: "5kW",
    kwNum: 5,
    seoTitle: "5kW Solar System | Size, Panels & Savings | Lumenx",
    seoDescription:
      "A 5kW solar system suits smaller households and units. See panel count, roof space needed and who it suits. Free, itemised quote from Lumenx.",
    h1: "A 5kW system, and the household it actually suits.",
    lead: "The smallest system we generally recommend installing. Right for a unit, a townhouse or a low-consumption household, and genuinely wrong for anyone with ducted air conditioning.",
    image: "/images/sys-small.webp",
    imageAlt: "A small house with solar panels on a pitched roof",
    panels: 12,
    inverter: "5kW",
    roofArea: "≈ 24 m²",
    suits: "Units, townhouses and smaller households",
    profile:
      "Typically a one to two person household with modest daytime consumption, no pool and no electric vehicle. If that describes you, a bigger system mostly exports power at a low feed-in rate rather than saving you more.",
    consider: [
      "Good fit if your quarterly bill is at the lower end and nobody is home midday",
      "Marginal if you run ducted heating or cooling, look at 6.6kW instead",
      "Still worth specifying a battery-ready inverter if storage is on your horizon",
    ],
  },
  {
    slug: "6-6kw",
    kw: "6.6kW",
    kwNum: 6.6,
    seoTitle: "6.6kW Solar System | Panels, Savings & Price | Lumenx",
    seoDescription:
      "The 6.6kW system is Australia's most common size. See panel count, roof space and who it suits. Free quote from Lumenx.",
    h1: "6.6kW is the most common system in Australia. Usually for good reason.",
    lead: "It pairs with a 5kW inverter, which is the largest most distributors approve without additional application, and it covers a typical family's daytime usage.",
    image: "/images/sys-small.webp",
    imageAlt: "A house with a row of solar panels against a clear sky",
    panels: 15,
    inverter: "5kW",
    roofArea: "≈ 30 m²",
    suits: "The typical three to four person household",
    profile:
      "The default recommendation for a standard family home with ordinary daytime consumption. It is popular because the economics are reliably good, not because it is a compromise.",
    consider: [
      "Pairs with a 5kW inverter, which most distributors approve without extra steps",
      "Comfortable on a standard suburban roof with one good orientation",
      "Step up to 10kW if you have a pool, ducted air conditioning or an EV",
    ],
  },
  {
    slug: "10kw",
    kw: "10.4kW",
    kwNum: 10.4,
    seoTitle: "10kW Solar System | Panels, Savings & Price | Lumenx",
    seoDescription:
      "A 10kW solar system suits larger homes with air conditioning, a pool or an EV. See panel count, roof space and who it suits. Free quote from Lumenx.",
    h1: "10kW is where larger households stop leaving money on the roof.",
    lead: "Once you are running ducted air conditioning, a pool pump or charging a car at home, 6.6kW stops covering your daytime load and the extra capacity starts paying for itself.",
    image: "/images/sys-large.webp",
    imageAlt: "A large home with a densely panelled roof seen from above",
    panels: 23,
    inverter: "10kW",
    roofArea: "≈ 46 m²",
    suits: "Larger homes, pools, ducted systems and EVs",
    profile:
      "The most common upgrade from 6.6kW, and the size where adding a battery starts to make obvious sense because there is genuine surplus to store.",
    consider: [
      "Needs a three-phase supply, or single-phase approval from your distributor",
      "Pairs well with a battery, because there is real midday surplus to store",
      "Usually needs two roof orientations or a large single plane",
    ],
  },
  {
    slug: "13-2kw",
    kw: "13.2kW",
    kwNum: 13.2,
    seoTitle: "13.2kW Solar System | Size, Panels & Output | Lumenx",
    seoDescription:
      "A 13.2kW solar system suits high-consumption homes and small business premises. See panel count and roof space needed. Free quote from Lumenx.",
    h1: "13.2kW, for houses that use power like small businesses.",
    lead: "High-consumption households, home businesses and properties running multiple large loads through the day. At this size the design matters more than the headline number.",
    image: "/images/sys-large.webp",
    imageAlt: "Aerial view of a large roof fully covered with solar panels",
    panels: 30,
    inverter: "10kW or 13kW",
    roofArea: "≈ 60 m²",
    suits: "High-consumption homes and small premises",
    profile:
      "Usually a large household running air conditioning, a pool, hot water and vehicle charging, or a home that doubles as a workplace. Three-phase supply is common at this size.",
    consider: [
      "Three-phase supply is typical, and distributor approval is a real step",
      "Often spread across more than one roof plane or orientation",
      "Worth modelling against a battery from the outset at this generation level",
    ],
  },
  {
    slug: "15kw",
    kw: "15kW",
    kwNum: 15,
    seoTitle: "15kW Solar System | Size, Panels & Savings | Lumenx",
    seoDescription:
      "A 15kW solar system suits small businesses and very large homes. See panel count, roof space and who it suits. Free quote from Lumenx.",
    h1: "15kW is where residential ends and commercial thinking begins.",
    lead: "The largest system we fit under a residential design. Past this point the right approach is a commercial assessment based on your load profile rather than your roof.",
    image: "/images/sys-large.webp",
    imageAlt: "A large building roof covered in solar panels",
    panels: 34,
    inverter: "15kW",
    roofArea: "≈ 68 m²",
    suits: "Small business premises and very large homes",
    profile:
      "Small commercial sites, large rural properties and homes with exceptional consumption. At this scale self-consumption during working hours is what makes the return, which is why it is often a business rather than a household.",
    consider: [
      "Three-phase supply required, with a full distributor application",
      "If this is for a business, our commercial assessment models it properly",
      "Needs substantial unshaded roof, often across several planes",
    ],
  },
];

export const SIZE_SLUGS = SYSTEM_SIZES.map((s) => s.slug);
export const getSize = (slug) => SYSTEM_SIZES.find((s) => s.slug === slug) || null;
