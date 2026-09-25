// Solar rebates hub content.
//
// URL, SEO title, meta and H1 from the SEO Blueprint (sheets 3, 7 and 11).
//
// FACTUAL DISCIPLINE — read before editing:
// Rebate amounts, eligibility thresholds (income caps, property value caps,
// installation dates) and program budgets change, sometimes mid-year. Nothing
// here states a dollar figure, a percentage or a cut-off, because publishing a
// stale one is worse than publishing none: it is a misleading claim under the
// CEC and NETCC codes Lumenx is signed to. Every program is described by what
// it does and who it broadly applies to, and the page's job is to get the
// visitor to a confirmed eligibility check.

export const REBATES_PAGE = {
  seoTitle: "Solar & Battery Rebates Victoria | Lumenx",
  seoDescription:
    "Every Victorian solar and battery rebate explained in plain English: federal STCs, the federal battery rebate, Solar Victoria and Victorian Energy Upgrades.",
  eyebrow: "Rebates",
  h1: "Four rebate programs. Most people qualify for more than one.",
  lead: "They stack, they change, and each has its own paperwork. We check every one you qualify for, claim them, and take them off your quote before you see the price.",
  hero: {
    image: "/images/svc-packages.webp",
    alt: "Two installers fitting solar panels on a rooftop at sunset",
  },
  chips: ["Eligibility checked for you", "Applied before you pay", "Paperwork filed by us"],

  intro: {
    heading: "You should never have to chase a rebate",
    body: [
      "The rebate system in Victoria is genuinely complicated. There are federal programs and state programs, they cover different equipment, they have separate eligibility rules, and several of them changed in the last two years. Most people are not sure what they qualify for, and a fair number never claim something they were entitled to.",
      "Our position is simple: that is our job, not yours. We check every program against your property and your install, apply what you qualify for as a discount on the quote, and lodge the paperwork ourselves. You see one price, already reduced.",
    ],
    points: [
      "Every program checked against your address and equipment",
      "Discounts applied to the quote, not claimed back later",
      "Forms, evidence and lodgement handled by us",
      "Written confirmation of what was claimed on your behalf",
    ],
    image: "/images/real-install-3.webp",
    imageAlt: "Solar panels installed by Lumenx on a rooftop at dusk",
  },

  // Qualitative only — see the note at the top of this file.
  programs: [
    {
      n: "01",
      name: "Federal STCs",
      full: "Small-scale Technology Certificates",
      level: "Federal",
      line: "The long-running national scheme. Eligible solar systems generate certificates based on system size and your location's solar zone, and retailers discount them off the price up front.",
      applies: "Solar systems",
      note: "The value per certificate moves with the market, and the scheme steps down over time.",
    },
    {
      n: "02",
      name: "Federal Battery Rebate",
      full: "Cheaper Home Batteries",
      level: "Federal",
      line: "Introduced in 2025, this is the single biggest reason home storage now pays back faster than it used to. It discounts eligible battery systems at the point of installation.",
      applies: "Home batteries",
      note: "Eligibility depends on the battery and the installation meeting program requirements.",
    },
    {
      n: "03",
      name: "Solar Victoria",
      full: "Solar Homes Program",
      level: "Victoria",
      line: "The state program, offering rebates and in some cases interest-free loans to eligible Victorian households across solar, battery and hot water categories.",
      applies: "Solar, battery, hot water",
      note: "Has household eligibility criteria and limited release rounds, so timing matters.",
    },
    {
      n: "04",
      name: "Victorian Energy Upgrades",
      full: "VEU program",
      level: "Victoria",
      line: "A separate Victorian scheme that discounts efficient appliances, most relevantly heat pump hot water systems replacing electric or gas storage.",
      applies: "Heat pump hot water",
      note: "Delivered as a discount through accredited providers rather than a cash-back claim.",
    },
  ],

  // Signature section: which programs touch which purchase.
  matrix: {
    eyebrow: "What applies to what",
    heading: "Which rebates touch your job.",
    lead: "Rebates attach to equipment, not to customers, so what you qualify for depends on what you are installing. This is the general shape of it.",
    columns: ["Solar", "Battery", "Hot water"],
    rows: [
      { name: "Federal STCs", marks: [true, false, false] },
      { name: "Federal Battery Rebate", marks: [false, true, false] },
      { name: "Solar Victoria", marks: ["Varies", "Varies", "Varies"] },
      { name: "Victorian Energy Upgrades", marks: [false, false, true] },
    ],
    note: "Indicative only. Each program sets its own eligibility, and state programs in particular open and close in rounds. We confirm your actual position in writing before you commit to anything.",
  },

  faqs: [
    {
      q: "How much are the rebates worth?",
      a: "It depends on the program, your system, your location and when you install, and the figures change, sometimes mid-year. Rather than publish a number that might be out of date by the time you read it, we calculate your actual entitlement and show it as a line on your quote.",
    },
    {
      q: "Do the rebates stack?",
      a: "Several of them do. A solar and battery installation can attract both federal STCs and the federal battery rebate, and Victorian programs may apply on top depending on your circumstances. Some combinations are excluded, which is exactly the sort of thing we check before quoting.",
    },
    {
      q: "Do I have to claim anything myself?",
      a: "No. We check eligibility, apply the discounts to your quote and lodge the paperwork. You get written confirmation of what was claimed on your behalf.",
    },
    {
      q: "Am I eligible?",
      a: "Most Victorian households qualify for something, but the state programs in particular have criteria around your property and circumstances, and they run in limited rounds. Send us your address and what you are considering and we will confirm your position before you commit.",
    },
    {
      q: "What happens if a rebate runs out before my install?",
      a: "State programs are released in rounds and can close. We tell you up front what your quote depends on, and if a program you were relying on becomes unavailable we will re-quote honestly rather than quietly absorb the change.",
    },
  ],
};
