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
  // the header and footer on every page, the 1300 on quote and contact
  // blocks. Swap them here if that split is the wrong way round.
  phone: "1800 577 319",
  phoneHref: "tel:1800577319",
  quotePhone: "1300 123 456",
  quotePhoneHref: "tel:1300123456",
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
    line: "Store your daytime power and run on it after dark. Sungrow, BYD, AlphaESS and LG, with the federal battery rebate applied for you.",
    href: "/solar-batteries",
    tone: "ember",
  },
  {
    id: "solar-inverters",
    n: "04",
    title: "Solar Inverters",
    icon: "/icons/energy-monitor.svg",
    image: "/images/svc-inverters.webp",
    line: "The brain of the system. Fronius, Sungrow, GoodWe and SolarEdge, supplied, installed and replaced when an old one fails.",
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
    line: "We get more sun than almost anywhere on earth. Tier-1 panels convert it into DC power, and it keeps working on overcast days.",
    icon: "/icons/rooftop-solar.svg",
    stat: "Up to 7",
    statLabel: "peak sun hours a day",
  },
  {
    n: "02",
    label: "Conversion",
    title: "Your inverter makes it usable",
    line: "A Fronius, Sungrow or GoodWe inverter turns that DC into the AC power your home actually runs on, and reports every watt.",
    icon: "/icons/energy-monitor.svg",
    stat: "98%",
    statLabel: "inverter efficiency",
  },
  {
    n: "03",
    label: "Storage",
    title: "Bank what you don't use",
    line: "Instead of exporting surplus for cents, a Tesla, Sungrow or BYD battery stores it, now far more affordable with the federal rebate.",
    icon: "/icons/solar-battery.svg",
    stat: "13.5kWh",
    statLabel: "typical home battery",
  },
  {
    n: "04",
    label: "Independence",
    title: "Run the house after dark",
    line: "Evening load, hot water and EV charging all run off power you already made. That's when the bill really drops.",
    icon: "/icons/ev-charging.svg",
    stat: "24/7",
    statLabel: "on your own power",
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
    line: "Tier-1 panels and inverters from JA Solar, Jinko, Trina, SunPower, Fronius and Sungrow, matched with Tesla, Sungrow and BYD storage.",
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
  { name: "Jinko Solar", file: "jinko-solar.webp", w: 90 },
  { name: "Longi", file: "longi.webp", w: 80 },
  { name: "Risen", file: "risen.webp", w: 99 },
  { name: "Sunman", file: "sunman.webp", w: 126 },
  { name: "Boss Solar", file: "boss-solar.webp", w: 117 },
  { name: "LG Energy Solution", file: "lg-energy-solution.webp", w: 210 },
  { name: "Alpha ESS", file: "alpha-ess.webp", w: 105 },
  { name: "Sungrow", file: "sungrow.webp", w: 128 },
  { name: "GoodWe", file: "goodwe.webp", w: 176 },
  { name: "SolarEdge", file: "solaredge.webp", w: 148 },
  { name: "Delta", file: "delta.webp", w: 97 },
  { name: "GE", file: "ge.webp", w: 34 },
  { name: "Wallbox", file: "wallbox.webp", w: 131 },
  { name: "Hayward", file: "hayward.webp", w: 168 },
  { name: "SensaHeat", file: "sensaheat.webp", w: 184 },
  { name: "Supreme Heating", file: "supreme-heating.webp", w: 82 },
];

// Testimonials (placeholders, swap for real Google reviews before launch).
export const REVIEWS = [
  {
    quote:
      "Quote to switch-on was painless. They handled the rebate, the paperwork and the grid connection, and our bill dropped the first month.",
    name: "Rebecca M.",
    place: "Maribyrnong, VIC",
  },
  {
    quote:
      "Added a Powerwall to our existing panels. The team explained exactly what we'd save and hit every date they promised.",
    name: "James & Priya",
    place: "Parramatta, NSW",
  },
  {
    quote:
      "We put solar across two warehouses. The ROI modelling was honest and the crews were in and out with zero fuss.",
    name: "D. Nguyen",
    place: "Commercial client, Geelong",
  },
  {
    quote:
      "No pressure, no inflated savings claims. They showed me the real numbers on my own bill and let me decide.",
    name: "Alan T.",
    place: "Werribee, VIC",
  },
  {
    quote:
      "The EV charger and solar were installed together and set up to charge off our own power. Exactly what we wanted.",
    name: "Sophie L.",
    place: "Bendigo, VIC",
  },
  {
    quote:
      "Two years on and they still pick up the phone. The monitoring app means I can see what the system is doing daily.",
    name: "Marcus R.",
    place: "Liverpool, NSW",
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
    address: "Office 102/103C, 181 Rosamond Rd, Maribyrnong, VIC 3032",
    maps: "https://maps.google.com/?q=181+Rosamond+Rd+Maribyrnong+VIC+3032",
  },
  {
    state: "New South Wales",
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
  // TODO: these five routes do not exist yet. They are the next batch in the
  // blueprint (rebates hub, then the company pages). Until they are built
  // they will 404, so either ship those pages or trim this list first.
  Company: [
    { label: "About Lumenx", href: "/about" },
    { label: "Solar Rebates Victoria", href: "/solar-rebates-victoria" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
    { label: "Get a Quote", href: "/get-a-quote" },
  ],
};
