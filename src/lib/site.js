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
  { label: "Inverter Repair", href: "/inverter-repair" },
  { label: "EV Chargers", href: "/ev-chargers" },
  { label: "Rebates", href: "/solar-rebates-victoria" },
  { label: "About", href: "/about" },
];

// Google review badge.
//
// BLOCKED ON LUMENX (punch list, Priority 1). Every one of these is a public
// factual claim and must match the Google Business Profile exactly:
//   - `rating` and `count` must be the live figures, shown with `checked`
//     beside them so the reader knows how current they are.
//   - `url` must be the real Google Business Profile.
//   - each review in REVIEWS needs its own `url` to that review on Google.
// Until the profile URL arrives, `url` stays null and the UI renders the badge
// as plain text rather than as a dead link.
export const GOOGLE_REVIEWS = {
  rating: "5.0",
  count: "",           // e.g. "128". Leave empty to hide the count.
  url: null,           // the Google Business Profile URL
  checked: null,       // e.g. "2 October 2026" — the date the figures were read
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
/**
 * Accreditations, shown as the real logos rather than as a row of text.
 *
 * `w`/`h` are the intrinsic pixel dimensions of each file, so an <img> can
 * declare them and reserve the right box before the file arrives. All four are
 * normalised to a 160px source height, which is why h is constant: sizing by
 * HEIGHT is what keeps a 3:1 wordmark and a 1:1 circular badge looking like
 * they belong in the same row.
 *
 * The supplied artwork had four different backgrounds (plain white, a
 * transparency checkerboard baked into a jpg, a solid cyan disc, and a
 * transparent png). They are all knocked back to transparency here and then
 * sat on a white chip in the UI, so the row is consistent on any ground.
 *
 * NETCC: the supplied artwork reads "Approved Seller", so that is the wording
 * used EVERYWHERE on the site. "Signatory" is a different status and the two
 * were previously mixed, which is exactly the kind of inconsistency an
 * accreditation body reads as a misrepresentation. One wording only.
 *
 * The "16-Year Workmanship Warranty" badge was removed on 4 October 2026 along
 * with every other 16-year claim (client instruction, punch list Priority 1).
 * The artwork file is left in /public/accreditations so it can be restored if
 * the claim is ever substantiated, but nothing renders it.
 */
export const TRUST = [
  { label: "Solar Victoria Authorised Retailer", file: "solar-victoria.webp", w: 480, h: 160, scale: 1 },
  { label: "Clean Energy Council Member", file: "clean-energy-council.webp", w: 330, h: 160, scale: 1 },
  // Circular marks get a 1.42x optical correction. At a shared height a 3:1
  // wordmark lays down 2700px of ink and a 1:1 disc only 900px, and the disc
  // has to fit its text INSIDE that circle, so matching heights leaves the
  // badges unreadable. Optical weight is the thing to match, not raw height.
  { label: "NETCC Approved Seller", file: "netcc.webp", w: 160, h: 160, scale: 1.42 },
];

/**
 * Manufacturer warranties, which replaced the 16-year workmanship claim.
 *
 * These are the manufacturer's own warranties, not a Lumenx promise, so each
 * one is deliberately written as a RANGE or a ceiling ("up to") rather than a
 * single number: it varies by brand and model, and the exact figure belongs in
 * the written quote for the hardware actually being supplied.
 *
 * Product cover and performance cover are listed separately on purpose. They
 * are different things with different terms, and collapsing them into one
 * number is the misrepresentation the punch list is asking us to stop making.
 *
 * `doc` is the manufacturer's own warranty document. Left null until Lumenx
 * supplies the URLs; the UI renders the row as plain text when there is no
 * link rather than inventing one.
 */
export const WARRANTIES = [
  {
    item: "Solar panels",
    product: "Up to 15-year product warranty",
    performance: "Up to 25-year performance warranty",
    doc: null,
  },
  {
    item: "Batteries",
    product: "10-year product warranty",
    performance: "Retained-capacity warranty over the same term",
    doc: null,
  },
  {
    item: "Inverters",
    product: "5 to 10-year product warranty, extendable by most brands",
    performance: null,
    doc: null,
  },
];

// Core service cards (icons live in /public/icons).
// Every card links to a real hub page from the SEO blueprint's sitemap, so
// there are no cards here without a destination. "Monitoring & Support" was
// dropped as a card for that reason and folded into the residential page.
/**
 * The home page "What we do" grid.
 *
 * REBUILT 4 October 2026 to match the restructured menu: the same eight
 * services, in the same order the client specified, then Commercial.
 *
 * It previously still listed the old twelve-service set, including "Solar
 * Inverters" and "Pool Heating". That was the most visible half-finished
 * thing on the site: the navigation had been restructured but the grid
 * underneath it had not, so the home page and the menu disagreed about what
 * Lumenx sells.
 *
 * Pool heating is off this grid for the same reason it is off the menu. It is
 * a quote-form option now.
 */
export const SERVICES = [
  {
    id: "solar-packages",
    n: "01",
    title: "Solar + Battery",
    icon: "/icons/solar-battery.svg",
    image: "/images/svc-packages.webp",
    line: "The complete setup, installed in one visit. Panels, inverter and storage at one fixed price with every incentive already deducted.",
    href: "/solar-packages",
    tone: "yellow",
  },
  {
    id: "battery-for-existing-solar",
    n: "02",
    title: "Battery for Existing Solar",
    icon: "/icons/power-storage.svg",
    image: "/images/svc-batteries.webp",
    line: "Already have panels? We check your inverter, switchboard and usage, then add storage sized to your evenings.",
    href: "/battery-for-existing-solar",
    tone: "green",
  },
  {
    id: "residential-solar",
    n: "03",
    title: "Solar Only",
    icon: "/icons/rooftop-solar.svg",
    image: "/images/svc-residential.webp",
    line: "Rooftop systems sized to your home and your bill, from 5kW to 15kW, with a battery-ready inverter so storage can come later.",
    href: "/residential-solar",
    tone: "blue",
  },
  {
    id: "inverter-repair",
    n: "04",
    title: "Inverter Repair",
    icon: "/icons/energy-monitor.svg",
    image: "/images/svc-inverter-replacement.webp",
    line: "The part that fails first. We test, repair or replace it, any brand, on systems we installed and systems we did not.",
    href: "/inverter-repair",
    tone: "ember",
  },
  {
    id: "heat-pump-hot-water",
    n: "05",
    title: "Hot Water Heat Pumps",
    icon: "/icons/clean-energy.svg",
    image: "/images/svc-heat-pump.webp",
    line: "Your second biggest bill. High-efficiency heat pumps that pair with solar and unlock their own rebate.",
    href: "/heat-pump-hot-water",
    tone: "yellow",
  },
  {
    id: "heating-and-cooling",
    n: "06",
    title: "Heating & Cooling",
    icon: "/icons/smart-grid.svg",
    image: "/images/svc-pool-heating.webp",
    line: "Reverse-cycle split systems installed by ARCtick-licensed technicians. Run them in daylight on your own power.",
    href: "/heating-and-cooling",
    tone: "blue",
  },
  {
    id: "ev-chargers",
    n: "07",
    title: "EV Chargers",
    icon: "/icons/ev-charging.svg",
    image: "/images/svc-ev-chargers.webp",
    line: "An add-on to solar and battery rather than a trade on its own. Charge in the day and the car runs on your own sunshine.",
    href: "/ev-chargers",
    tone: "green",
  },
  {
    id: "service-health-check",
    n: "08",
    title: "Service & Health Check",
    icon: "/icons/solar-panel.svg",
    image: "/images/svc-inverters.webp",
    line: "Most solar faults are quiet. We test the panels, isolators, wiring, inverter and battery, and give you a written report.",
    href: "/service-health-check",
    tone: "ember",
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
    line: "Our SAA-accredited installers install to standard, tidy and on time, in Melbourne, Sydney and the surrounding regions.",
    image: "/images/installation.webp",
    meta: "Usually one day",
  },
  {
    n: "04",
    title: "Switch on & save",
    line: "We handle the paperwork, grid connection and rebates. You watch your bill drop from day one, with every manufacturer warranty registered in your name.",
    image: "/images/rooftop-home.webp",
    meta: "Warranties registered",
  },
];

// Why Lumenx.
export const WHY = [
  {
    n: "01",
    title: "Accredited and accountable",
    line: "Solar Victoria Authorised Retailer, Clean Energy Council member and NETCC Approved Seller. The people who quote it are the people who stand behind it.",
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
    title: "Warranties that are the manufacturer's",
    line: "Panels carry up to a 25-year performance warranty and batteries a 10-year product warranty, registered in your name. Local crews in two states who answer the phone after the install too.",
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
    // Rewritten 4 Oct 2026. The old line ("the single biggest reason home
    // storage now pays back faster") ignored the 1 May 2026 changes and read
    // as a blanket payback promise. The discount now scales differently, so
    // the honest message is about sizing the battery correctly, not speed.
    line: "Officially the Cheaper Home Batteries program. Since 1 May 2026 the certificate factor is lower and tapers above 14kWh and again above 28kWh, so the discount rewards a battery sized to your evenings rather than the biggest one you can fit.",
  },
  {
    n: "03",
    name: "Solar Victoria",
    // The old line bundled "interest-free loans" with battery, which Solar
    // Victoria does not offer. Rebate and loan are now separate claims, and
    // the loan is described as a loan.
    line: "Rebates for eligible Victorian households across solar and hot water. An optional solar loan is available separately: it is a loan to be repaid, not a discount.",
  },
];

// Headline stats / proof.
// Each figure carries a plain-language line, because a bare number tells a
// visitor nothing about why it matters to them.
export const STATS = [
  {
    // Replaced the 16-year workmanship figure on 4 Oct 2026. This one is the
    // MANUFACTURER's warranty, which is a checkable fact rather than a claim
    // about ourselves, and 10 years is the standard product term across the
    // batteries actually listed in BRANDS.
    value: "10",
    suffix: "yr",
    label: "Battery product warranty",
    line: "The manufacturer's product warranty on the batteries we install, registered in your name.",
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
    label: "SAA-accredited installs",
    line: "Every job signed off by an SAA-accredited installer.",
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
    a: "It depends on how much power you actually use after dark, and the answer changed on 1 May 2026. The federal discount is smaller than it was and tapers above 14kWh and again above 28kWh, so an oversized battery now attracts proportionally less support. The battery that pays for itself is the one sized to your evening usage, not the largest one that fits. We model it on your real usage and show you the numbers before you commit.",
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
    { label: "Inverter Repair", href: "/inverter-repair" },
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
/**
 * SERVICES MENU, rebuilt 4 October 2026 to the client's specified order.
 *
 * Eight services, then Commercial as a separate, highlighted item. The old
 * menu carried twelve, which is more choices than anyone can hold, and
 * several of them were not really separate decisions: "Solar Inverters" and
 * "Inverter Replacement" are one job, and "Solar Packages" and "System Sizes"
 * are two ways of asking the same question.
 *
 * Two things moved OFF the menu on purpose:
 *   - Pool heating is now a quote-form option. There is real demand for it
 *     and not enough to justify a menu slot competing with solar.
 *   - EV chargers and VPP are framed as add-ons to solar and battery rather
 *     than standalone trades, because that is how they are actually sold.
 */
export const NAV_GROUPS = [
  {
    labelKey: "nav_services",
    label: "Services",
    href: "/solar-packages",
    columns: [
      {
        heading: "Solar & storage",
        links: [
          { label: "Solar + Battery", href: "/solar-packages", line: "The complete setup" },
          { label: "Battery for Existing Solar", href: "/battery-for-existing-solar", line: "You already have panels" },
          { label: "Solar Only", href: "/residential-solar", line: "Panels and an inverter" },
          { label: "Solar Batteries", href: "/solar-batteries", line: "Sized to your evenings" },
        ],
      },
      {
        heading: "Service & repair",
        links: [
          { label: "Inverter Repair", href: "/inverter-repair", line: "Faulty, failed or ageing" },
          { label: "Service & Health Check", href: "/service-health-check", line: "Any system, ours or not" },
          { label: "Tesla Powerwall", href: "/solar-batteries/tesla-powerwall", line: "Compared honestly" },
          { label: "All Products", href: "/solar-products", line: "Every brand we install" },
        ],
      },
      {
        heading: "Electrify the rest",
        links: [
          { label: "Hot Water Heat Pumps", href: "/heat-pump-hot-water", line: "Your second biggest bill" },
          { label: "Heating & Cooling", href: "/heating-and-cooling", line: "Reverse-cycle split systems" },
          { label: "EV Chargers", href: "/ev-chargers", line: "An add-on to solar + battery" },
          { label: "System Sizes", href: "/solar-systems", line: "5kW to 15kW compared" },
        ],
      },
    ],
  },
  {
    // Highlighted and separate, because a business buyer is a different
    // reader with a different decision, not a ninth residential service.
    labelKey: "nav_commercial",
    label: "Commercial",
    href: "/commercial-solar",
    highlight: true,
  },
  {
    labelKey: "nav_rebates",
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
    labelKey: "nav_tools",
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
    labelKey: "nav_company",
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
