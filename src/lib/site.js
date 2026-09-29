// Single source of truth for Lumenx site content.
// Brand name is ALWAYS written "Lumenx" (capital L, lowercase x).
// Copy is original, written in the Lumenx voice: confident, warm, plain-spoken.

export const SITE = {
  name: "Lumenx",
  legalName: "Lumenx",
  tagline: "Together, we build a brighter future.",
  // Confirmed against the live site. Note the deliberate spelling split:
  // the DOMAIN is lumenex.com.au, the EMAIL is @lumenx.com.au.
  domain: "https://lumenex.com.au",
  email: "hello@lumenx.com.au",

  // Two live numbers, used the way the current site uses them: the 1800 in
  // blocks. Swap them here if that split is the wrong way round.
  // ONE number for the whole site. There used to be a second, separate
  // "quote" number used by the quote page, 404, thank-you, contact and the
  // page heroes. Split contact numbers are how a site ends up publishing a
  // line nobody answers, so there is now only this field.
  phone: "1800 577 319",
  phoneHref: "tel:1800577319",
};

// Primary navigation. URLs follow the SEO blueprint's recommended sitemap.
export const NAV = [
  { label: "Residential", href: "/residential-solar" },
  { label: "Commercial", href: "/commercial-solar" },
  { label: "Batteries", href: "/solar-batteries" },
  { label: "Inverters", href: "/solar-inverters" },
  { label: "EV Chargers", href: "/ev-chargers" },
  { label: "Rebates", href: "/solar-rebates-victoria" },
  { label: "About", href: "/about" },
];

// Google review badge.
// TODO before launch: replace `rating`, `count` and `url` with the real figures
// from the Lumenx Google Business Profile. These are public factual claims, so
// they must match the profile exactly.
export const GOOGLE_REVIEWS = {
  rating: "5.0",
  count: "",           // e.g. "128". Leave empty to hide the count.
  url: "#",            // e.g. the GBP "write a review" / profile link
};

// What you actually get when you ask for a quote. Used by the closing CTA.
// These restate the real differentiators rather than repeating the tagline.
export const CTA_PROMISES = [
  "A fixed, itemised price, not a range",
  "Every rebate you qualify for, applied for you",
  "A design built on your roof and your real usage",
  "No pushy sales visit, ever",
];

// Trust credentials shown across the site.
export const TRUST = [
  "Solar Victoria Authorised Retailer",
  "Clean Energy Council Member",
  "NETCC Signatory",
  "16-Year Workmanship Warranty",
];

// Core service cards (icons live in /public/icons).
// Every card links to a real hub page from the SEO blueprint's sitemap, so
// there are no cards here without a destination. "Monitoring & Support" was
// dropped as a card for that reason and folded into the residential page.
export const SERVICES = [
  {
    id: "residential-solar",
    n: "01",
    title: "Residential Solar",
    icon: "/icons/rooftop-solar.svg",
    image: "/images/svc-residential.webp",
    line: "Rooftop systems sized to your home and your bill, from 5kW to 15kW, with premium panels and a payback you can see on paper.",
    href: "/residential-solar",
    tone: "yellow",
  },
  {
    id: "commercial-solar",
    n: "02",
    title: "Commercial Solar",
    icon: "/icons/smart-grid.svg",
    image: "/images/svc-commercial.webp",
    line: "Cut the biggest line on your operating budget. Scalable 20kW to 100kW+ systems with real ROI modelling and finance options.",
    href: "/commercial-solar",
    tone: "blue",
  },
  {
    id: "solar-batteries",
    n: "03",
    title: "Solar Batteries",
    icon: "/icons/solar-battery.svg",
    image: "/images/svc-batteries.webp",
    line: "Store your daytime power and run on it after dark. Sungrow, Alpha ESS and LG, with the federal battery rebate applied for you.",
    href: "/solar-batteries",
    tone: "ember",
  },
  {
    id: "solar-inverters",
    n: "04",
    title: "Solar Inverters",
    icon: "/icons/energy-monitor.svg",
    image: "/images/svc-inverters.webp",
    line: "The brain of the system. Sungrow, GoodWe, SolarEdge and Delta, supplied, installed and replaced when an old one fails.",
    href: "/solar-inverters",
    tone: "green",
  },
  {
    id: "ev-chargers",
    n: "05",
    title: "EV Charging",
    icon: "/icons/ev-charging.svg",
    image: "/images/svc-ev-chargers.webp",
    line: "Charge at home on your own sunshine. 7kW and 22kW chargers installed and tuned to your solar and your tariff.",
    href: "/ev-chargers",
    tone: "yellow",
  },
  {
    id: "heat-pump-hot-water",
    n: "06",
    title: "Heat Pump Hot Water",
    icon: "/icons/clean-energy.svg",
    image: "/images/svc-heat-pump.webp",
    line: "The most affordable hot water you can run. High-efficiency heat pumps that pair with solar and unlock their own rebate.",
    href: "/heat-pump-hot-water",
    tone: "ember",
  },
  {
    id: "pool-heating",
    n: "07",
    title: "Pool Heating",
    icon: "/icons/clean-energy.svg",
    image: "/images/svc-pool-heating.webp",
    line: "Swim months longer for a fraction of the running cost. Heat pumps and solar pool heating from Hayward, Supreme and SensaHeat.",
    href: "/pool-heating",
    tone: "blue",
  },
  {
    id: "solar-packages",
    n: "08",
    title: "Solar Packages",
    icon: "/icons/rooftop-solar.svg",
    image: "/images/svc-packages.webp",
    line: "Panels, inverter and battery bundled at one fixed price, with every rebate already taken off before you see the number.",
    href: "/solar-packages",
    tone: "green",
  },
];


// Scroll-driven energy flow (home page). Each stage lights up in sequence.
export const ENERGY_FLOW = [
  {
    n: "01",
    label: "Sunlight",
    title: "Australian sun hits the roof",
    line: "Australia gets more solar radiation per square metre than any other continent. Tier-1 panels convert it into DC power, and they keep working on overcast days.",
    icon: "/icons/rooftop-solar.svg",
    // Was "Up to 7", which nothing on this site supports: the calculators put
    // the sunniest state (NT) at 5.8, and Lumenx installs in VIC and NSW.
    stat: "3.6 to 4.2",
    statLabel: "peak sun hours a day, VIC and NSW",
  },
  {
    n: "02",
    label: "Conversion",
    title: "Your inverter makes it usable",
    // Named Fronius, which is not in BRANDS and not something Lumenx installs.
    line: "A Sungrow, GoodWe or SolarEdge inverter turns that DC into the AC power your home actually runs on, and reports every watt.",
    icon: "/icons/energy-monitor.svg",
    stat: "98%",
    // "peak", because 98% is the best-case conversion figure, not the average.
    statLabel: "peak inverter efficiency",
  },
  {
    n: "03",
    label: "Storage",
    title: "Bank what you don't use",
    // Named Tesla and BYD, neither of which is in BRANDS.
    line: "Instead of exporting surplus for cents, a Sungrow, Alpha ESS or LG battery stores it, now far more affordable with the federal rebate.",
    icon: "/icons/solar-battery.svg",
    // 13.5kWh is one specific product's capacity, not a typical size.
    stat: "10 to 15kWh",
    statLabel: "common home battery size",
  },
  {
    n: "04",
    // "Independence" + "24/7 on your own power" claimed something the site's
    // own battery FAQ explicitly denies: a battery shifts solar into the
    // evening, it does not take a grid-connected home off the grid.
    label: "After dark",
    title: "Run the evening on your own power",
    line: "Evening load, hot water and EV charging run off power you made earlier in the day. A battery shifts your solar into the hours you actually use it.",
    icon: "/icons/ev-charging.svg",
    stat: "10kWh",
    statLabel: "a typical household evening",
  },
];

// How it works.
export const STEPS = [
  {
    n: "01",
    title: "Free quote & assessment",
    line: "Tell us your address and your latest bill. We design a system to your roof, your usage and your budget, with no pushy sales visit.",
    image: "/images/family-solar.webp",
    meta: "No obligation",
  },
  {
    n: "02",
    title: "Custom system design",
    line: "You get a clear proposal: panels, battery, inverter, real savings, payback and every rebate you qualify for, itemised.",
    image: "/images/panels-closeup.webp",
    meta: "Fixed pricing",
  },
  {
    n: "03",
    title: "Accredited installation",
    line: "Our CEC-accredited crews install to standard, tidy and on time, in Melbourne, Sydney and the surrounding regions.",
    image: "/images/installation.webp",
    meta: "Usually one day",
  },
  {
    n: "04",
    title: "Switch on & save",
    line: "We handle the paperwork, grid connection and rebates. You watch your bill drop from day one, backed for 16 years.",
    image: "/images/rooftop-home.webp",
    meta: "Backed 16 years",
  },
];

// Why Lumenx.
export const WHY = [
  {
    n: "01",
    title: "Accredited and accountable",
    line: "Solar Victoria Authorised Retailer, Clean Energy Council member and NETCC signatory. The people who quote it are the people who stand behind it.",
    image: "/images/installer-field.webp",
  },
  {
    n: "02",
    title: "Premium hardware only",
    line: "Tier-1 panels and inverters from Jinko Solar, Longi, Risen, Sungrow and GoodWe, matched with Sungrow, Alpha ESS and LG storage.",
    image: "/images/panels-closeup.webp",
  },
  {
    n: "03",
    title: "Rebates, handled for you",
    line: "Federal STCs, the federal battery rebate and Solar Victoria rebates applied and processed by us. You just see the lower price.",
    image: "/images/installation.webp",
  },
  {
    n: "04",
    title: "Backed for 16 years",
    line: "A 16-year workmanship warranty plus full manufacturer cover. Local crews in two states who answer the phone after the install too.",
    image: "/images/commercial-solar.webp",
  },
];

// Rebate programs. Deliberately qualitative: amounts change with system size,
// postcode and program year, so no dollar figures are claimed here.
export const REBATES = [
  {
    n: "01",
    name: "Federal STCs",
    line: "Small-scale Technology Certificates come off the price of every eligible solar system, scaled to its size and your location.",
  },
  {
    n: "02",
    name: "Federal Battery Rebate",
    line: "Officially the Cheaper Home Batteries program, introduced in 2025. It is the single biggest reason home storage now pays back faster.",
  },
  {
    n: "03",
    name: "Solar Victoria",
    line: "Rebates and interest-free loans for eligible Victorian households, including solar, battery and hot water programs.",
  },
];

// Headline stats / proof.
// Each figure carries a plain-language line, because a bare number tells a
// visitor nothing about why it matters to them.
export const STATS = [
  {
    value: "16",
    suffix: "yr",
    label: "Workmanship warranty",
    line: "Our own labour warranty, in writing, on every system we install.",
  },
  {
    value: "2",
    suffix: "",
    label: "States covered",
    line: "Offices and local crews in Melbourne and Sydney, plus the regions around them.",
  },
  {
    value: "100",
    suffix: "%",
    label: "CEC-accredited installs",
    line: "Every job signed off by a Clean Energy Council accredited installer.",
  },
  {
    // TODO before launch: this is a public claim about the Google rating and
    // must match the Lumenx Google Business Profile exactly. Confirm the real
    // rating (and ideally show the review count) or replace this stat.
    value: "5",
    suffix: "★",
    label: "Google-reviewed service",
    line: "Rated by the households and businesses we have already switched on.",
  },
];

// Panel / battery / inverter brands installed, as supplied by Lumenx.
// Logos live in /public/brands, trimmed of transparent margin and normalised
// to 120px tall so they can be optically balanced by width rather than height.
// `w` is the display width in px at the marquee's 30px logo height.
export const BRANDS = [
  { name: "Jinko Solar", file: "jinko-solar.webp", w: 90, iw: 360, ih: 120 },
  { name: "Longi", file: "longi.webp", w: 80, iw: 320, ih: 120 },
  { name: "Risen", file: "risen.webp", w: 99, iw: 397, ih: 120 },
  { name: "Sunman", file: "sunman.webp", w: 126, iw: 503, ih: 120 },
  { name: "Boss Solar", file: "boss-solar.webp", w: 117, iw: 469, ih: 120 },
  { name: "LG Energy Solution", file: "lg-energy-solution.webp", w: 210, iw: 966, ih: 120 },
  { name: "Alpha ESS", file: "alpha-ess.webp", w: 105, iw: 419, ih: 120 },
  { name: "Sungrow", file: "sungrow.webp", w: 128, iw: 511, ih: 120 },
  { name: "GoodWe", file: "goodwe.webp", w: 176, iw: 807, ih: 120 },
  { name: "SolarEdge", file: "solaredge.webp", w: 148, iw: 593, ih: 120 },
  { name: "Delta", file: "delta.webp", w: 97, iw: 389, ih: 120 },
  { name: "GE", file: "ge.webp", w: 34, iw: 120, ih: 120 },
  { name: "Wallbox", file: "wallbox.webp", w: 131, iw: 522, ih: 120 },
  { name: "Hayward", file: "hayward.webp", w: 168, iw: 768, ih: 120 },
  { name: "SensaHeat", file: "sensaheat.webp", w: 184, iw: 843, ih: 120 },
  { name: "Supreme Heating", file: "supreme-heating.webp", w: 82, iw: 328, ih: 120 },
];

// Real Google reviews, supplied 29 September 2026.
//
// VERBATIM. The wording is exactly as each reviewer wrote it, including their
// own typos, because editing a customer's words and still calling it their
// review is a misrepresentation. The only changes made are: surnames reduced
// to an initial (standard practice for displaying testimonials), a stray space
// before a comma removed, and a row of decorative asterisks dropped from the
// end of one review.
//
// `short` is an excerpt for the scrolling row, where the full text will not
// fit. Every excerpt ends on a sentence boundary and none of them changes the
// meaning of the review. The full text is what the /reviews page shows.
//
// Two of the ten reviews supplied carried a star rating but no written text,
// so they are not listed here: there is nothing to quote.
//
// `when` is relative to the capture date above and will drift. Refresh it, or
// swap to absolute months, when these are next updated.
export const REVIEWS = [
  {
    quote:
      "Lumenx were great to deal with and charged a reasonable price. My solar battery and panel install wasn\u2019t an easy job but the team were very friendly and consulted me on the little things as they went. The finished job looked great and is operating well. Do not go with the cheapest-priced installers out there as you will regret it, and these guys weren\u2019t on the expensive end either. Highly recommend going with Lumenx for your solar install.",
    short:
      "My solar battery and panel install wasn\u2019t an easy job but the team were very friendly and consulted me on the little things as they went. The finished job looked great and is operating well.",
    name: "Dean H.",
    when: "3 months ago",
  },
  {
    quote:
      "Where do I start. I had 10kw solar panel installed with a 42kwh battery fitted with these guys, and couldn\u2019t be happier. They turned up in time, very professional, friendly, but most importantly very neat and clean with their work. They had to remove old panels, and the state of the roof was so dirty, with pigeon poo as the were roosting under the panels and many broken tiles. They cleaned the roof thoroughly and replaced the broken tiles before fitting the new panels. After completing the work they spent the time with me explaining how the system works, and help me set it up on the mobile app. Also assured me to contact them with any questions anytime. I would highly recommend them to anyone with no hesitation to have these guys do there power system or any other works they do.",
    short:
      "They turned up in time, very professional, friendly, but most importantly very neat and clean with their work. After completing the work they spent the time with me explaining how the system works.",
    name: "Stelios K.",
    when: "5 months ago",
  },
  {
    quote:
      "Had solar and a battery installed by Lumenx fantastic experience. Smooth process, great communication, and high-quality work. Highly recommend!",
    short:
      "Had solar and a battery installed by Lumenx fantastic experience. Smooth process, great communication, and high-quality work.",
    name: "Mustafa M.",
    when: "6 months ago",
  },
  {
    quote:
      "Lumenx delivered exceptional service from start to finish. Their knowledgeable team provided clear explanations, and the installation was efficient and professional. The high-quality panels exceeded performance expectations, leading to noticeable savings on my electricity bill. I highly recommend lumenx for anyone considering solar energy.",
    short:
      "Their knowledgeable team provided clear explanations, and the installation was efficient and professional.",
    name: "Claudette T.",
    when: "2 years ago",
  },
  {
    quote:
      "Team was exceptional with delivering high quality service for my two builds. The service was top tier alongside their communication. Definitely recommend for any solar installations.",
    short:
      "Team was exceptional with delivering high quality service for my two builds. The service was top tier alongside their communication.",
    name: "Nuredin M.",
    when: "2 years ago",
  },
  {
    quote: "Great crew, great team fantastic to work with !",
    short: "Great crew, great team fantastic to work with !",
    name: "Johnny B.",
    when: "10 months ago",
  },
  {
    quote:
      "Lumenx exceeded their expectations with delivering highly great service. Definitely recommend for all your solar needs.",
    short:
      "Lumenx exceeded their expectations with delivering highly great service. Definitely recommend for all your solar needs.",
    name: "Suliman S.",
    when: "2 years ago",
  },
  {
    quote: "Extremely happy with the boys install of our batteries",
    short: "Extremely happy with the boys install of our batteries",
    name: "Ricky H.",
    when: "2 weeks ago",
  },
];

// FAQ (FAQPage schema-ready).
export const FAQS = [
  {
    q: "How much does a solar system cost in 2026?",
    a: "It depends on system size and whether you add a battery, but after federal STCs and Victorian rebates most homes land on a smaller number than they expect. We give you a fixed, itemised price with every rebate already applied, and the payback in years, in writing.",
  },
  {
    q: "What rebates can I get, and do you handle them?",
    a: "Yes, we apply them for you. That includes federal STCs on solar, the federal battery rebate, and Solar Victoria rebates where you qualify. You see the discounted price; we do the paperwork.",
  },
  {
    q: "Is a solar battery worth it now?",
    a: "For most households, yes. The 2025 federal battery rebate changed the maths. Storing your own daytime power to use at night now pays back faster than ever, and it keeps the essentials on during an outage. We'll model it on your real usage before you commit.",
  },
  {
    q: "How long does installation take?",
    a: "Most residential installs are done in a single day once your system is designed and approved. Battery and commercial jobs can take longer, and we give you the exact timeline in your proposal.",
  },
  {
    q: "Where does Lumenx install?",
    a: "Across Victoria and New South Wales, from our Melbourne (Maribyrnong) and Sydney offices, including the surrounding regional areas. Tell us your postcode and we'll confirm.",
  },
];

// Offices (real addresses supplied by Lumenx).
export const OFFICES = [
  {
    state: "Victoria, Head Office",
    city: "Melbourne",
    address: "Office 102/103C, 181 Rosamond Rd, Maribyrnong, VIC 3032",
    maps: "https://maps.google.com/?q=181+Rosamond+Rd+Maribyrnong+VIC+3032",
  },
  {
    state: "New South Wales",
    city: "Sydney",
    address: "Level 26, 44 Market Street, Sydney NSW 2000, Australia",
    maps: "https://maps.google.com/?q=44+Market+Street+Sydney+NSW+2000",
  },
];

// Build credit shown in the footer bottom bar.
export const CREDIT = {
  prefix: "Designed and developed by",
  label: "Sika Digital",
  href: "https://sikadigital.com",
};

export const FOOTER_LINKS = {
  Services: [
    { label: "Residential Solar", href: "/residential-solar" },
    { label: "Commercial Solar", href: "/commercial-solar" },
    { label: "Solar Batteries", href: "/solar-batteries" },
    { label: "Solar Inverters", href: "/solar-inverters" },
    { label: "EV Chargers", href: "/ev-chargers" },
    { label: "Heat Pump Hot Water", href: "/heat-pump-hot-water" },
    { label: "Pool Heating", href: "/pool-heating" },
    { label: "Solar Packages", href: "/solar-packages" },
  ],
  Company: [
    { label: "About Lumenx", href: "/about" },
    { label: "Solar Products", href: "/solar-products" },
    { label: "Solar System Sizes", href: "/solar-systems" },
    { label: "Solar Rebates Victoria", href: "/solar-rebates-victoria" },
    { label: "Service Areas", href: "/locations" },
    { label: "Guides & Resources", href: "/blog" },
    { label: "Calculators & Tools", href: "/tools" },
    { label: "FAQ", href: "/faq" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
    { label: "Get a Quote", href: "/get-a-quote" },
  ],
};

// Small print, rendered in the footer's bottom bar rather than as a link column.
export const LEGAL_LINKS = [{ label: "Privacy Policy", href: "/privacy-policy" }];

/**
 * Header navigation.
 *
 * The site outgrew a flat bar. Seven top-level links already overran the shell
 * below 1280px, and there are now forty-odd pages, so the bar is grouped into
 * four items, each opening a panel.
 *
 * The mobile menu renders the same structure as always-open sections rather
 * than an accordion: four taps to find anything is worse than one scroll, and
 * an accordion hides the very thing a menu exists to reveal.
 *
 * Every href here must resolve to a real route. The link checker in the verify
 * sweep fails the build-equivalent if one does not.
 */
export const NAV_GROUPS = [
  {
    label: "Services",
    href: "/residential-solar",
    columns: [
      {
        heading: "Solar",
        links: [
          { label: "Residential Solar", href: "/residential-solar", line: "Panels for homes" },
          { label: "Commercial Solar", href: "/commercial-solar", line: "20kW and up" },
          { label: "Solar Packages", href: "/solar-packages", line: "Panels, inverter, storage" },
          { label: "System Sizes", href: "/solar-systems", line: "5kW to 15kW compared" },
        ],
      },
      {
        heading: "Storage & power",
        links: [
          { label: "Solar Batteries", href: "/solar-batteries", line: "Shift solar to the evening" },
          { label: "Tesla Powerwall", href: "/solar-batteries/tesla-powerwall", line: "Compared honestly" },
          { label: "Solar Inverters", href: "/solar-inverters", line: "String, hybrid, micro" },
          { label: "Inverter Replacement", href: "/solar-inverter-replacement", line: "Repair or replace" },
        ],
      },
      {
        heading: "Electrify",
        links: [
          { label: "EV Chargers", href: "/ev-chargers", line: "Charge off your own solar" },
          { label: "Heat Pump Hot Water", href: "/heat-pump-hot-water", line: "Your second biggest bill" },
          { label: "Pool Heating", href: "/pool-heating", line: "Extend the season" },
          { label: "All Products", href: "/solar-products", line: "Every brand we install" },
        ],
      },
    ],
  },
  {
    label: "Rebates",
    href: "/solar-rebates-victoria",
    columns: [
      {
        heading: "Programs",
        links: [
          { label: "Solar Rebates Victoria", href: "/solar-rebates-victoria", line: "Every program in one place" },
          { label: "Battery Rebate", href: "/victorian-battery-rebate", line: "What changed in 2025" },
          { label: "Heat Pump Rebate", href: "/heat-pump-rebate-victoria", line: "Replacing gas or electric" },
        ],
      },
      {
        heading: "Check yours",
        links: [
          { label: "Eligibility Check", href: "/solar-rebate-eligibility", line: "Which programs apply to you" },
          { label: "Get a Quote", href: "/get-a-quote", line: "Confirmed in writing" },
        ],
      },
    ],
  },
  {
    label: "Tools",
    href: "/tools",
    columns: [
      {
        heading: "Calculators",
        links: [
          { label: "Savings Calculator", href: "/solar-savings-calculator", line: "Uses your own tariff" },
          { label: "System Size Calculator", href: "/solar-system-size-calculator", line: "What kW you need" },
          { label: "Battery Calculator", href: "/solar-battery-calculator", line: "Sized to your evenings" },
        ],
      },
      {
        heading: "Compare",
        links: [
          { label: "Payback Calculator", href: "/solar-payback-calculator", line: "Check any quote" },
          { label: "Feed-in Tariff Calculator", href: "/feed-in-tariff-calculator", line: "What exporting earns" },
          { label: "All Tools", href: "/tools", line: "Six, no email gate" },
        ],
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    columns: [
      {
        heading: "Lumenx",
        links: [
          { label: "About Us", href: "/about", line: "Who actually turns up" },
          { label: "Reviews", href: "/reviews", line: "What customers say" },
          { label: "Contact", href: "/contact", line: "Melbourne and Sydney" },
        ],
      },
      {
        heading: "Find out more",
        links: [
          { label: "Service Areas", href: "/locations", line: "Where we install" },
          { label: "Guides & Resources", href: "/blog", line: "Worth reading first" },
          { label: "FAQ", href: "/faq", line: "Every question, grouped" },
        ],
      },
    ],
  },
];
