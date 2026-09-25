// Guide pages — a reusable shape for content pages that are not services.
// Currently the two rebate sub-pages.
//
// FACTUAL DISCIPLINE: same rule as /solar-rebates-victoria/. No dollar
// figures, percentages, income caps, property-value caps or closing dates.
// Those change, sometimes mid-year, and a stale one is a misleading claim
// under the CEC and NETCC codes Lumenx has signed. Everything here describes
// what a program does and routes the visitor to a confirmed eligibility check.

export const GUIDES = {
  "victorian-battery-rebate": {
    slug: "victorian-battery-rebate",
    label: "Victorian Battery Rebate",
    seoTitle: "Battery Rebate Victoria | Cheaper Home Batteries | Lumenx",
    seoDescription:
      "How the federal battery rebate and Victorian battery programs work, who qualifies, and how Lumenx applies them to your quote before you pay.",
    eyebrow: "Battery rebates",
    h1: "The rebate that changed the maths on home storage.",
    lead: "Batteries used to be a long payback. The federal Cheaper Home Batteries program, introduced in 2025, is the single biggest reason that is no longer true.",
    hero: {
      image: "/images/svc-batteries.webp",
      alt: "A wall-mounted inverter beneath a solar array",
    },
    chips: ["Federal + state programs", "Applied to your quote", "Eligibility checked first"],

    intro: {
      heading: "Two layers, and they can stack",
      body: [
        "There are two things people mean by a battery rebate in Victoria. The federal Cheaper Home Batteries program discounts eligible battery systems nationally at the point of installation. Separately, Solar Victoria runs state programs that may apply to eligible Victorian households on top.",
        "Whether both apply to you depends on your property, your circumstances and the equipment being installed, and state programs in particular run in limited rounds that open and close. That is why we check your position before quoting rather than after.",
      ],
      points: [
        "Federal program applies nationally to eligible battery installations",
        "Victorian programs may apply on top, subject to eligibility and timing",
        "Both are applied as a discount on your quote, not claimed back later",
        "We confirm what you qualify for in writing before you commit",
      ],
      image: "/images/real-install-1.webp",
      imageAlt: "Equipment installed by Lumenx on the exterior wall of a property",
    },

    steps: {
      eyebrow: "How it actually works",
      heading: "From enquiry to discount.",
      lead: "You do not lodge anything. The whole process runs through us as an accredited retailer.",
      items: [
        { n: "01", t: "We check your eligibility", d: "Against your address, your property circumstances and the specific battery being proposed. If you do not qualify, we tell you before you get attached to a number." },
        { n: "02", t: "It comes off the quote", d: "Your proposal shows the rebate as a deducted line, so the figure you compare against other quotes is the figure you actually pay." },
        { n: "03", t: "We lodge the paperwork", d: "Evidence, forms and compliance documentation are submitted by us as part of the installation process." },
        { n: "04", t: "You get written confirmation", d: "A record of exactly what was claimed on your behalf, so there is no ambiguity later." },
      ],
    },

    checklist: {
      heading: "What we will need from you",
      items: [
        "Your installation address",
        "A recent power bill, so we can size the battery to your evening usage",
        "Whether you already have solar, and roughly when it was installed",
        "Whether blackout backup matters to you, because it changes the specification",
      ],
    },

    faqs: [
      { q: "How much is the battery rebate worth?", a: "It depends on the battery, the installation and the program year, and the figures change. Rather than publish a number that may be out of date by the time you read it, we calculate your actual entitlement and show it as a deducted line on your quote." },
      { q: "Can I get the federal and Victorian rebates together?", a: "In some circumstances, yes. Some combinations are excluded and state programs run in limited rounds. This is exactly the sort of thing we check against your specific situation before quoting." },
      { q: "Do I need existing solar to qualify?", a: "Not necessarily for the federal battery program, though a battery without solar has very different economics. If you are starting from scratch we will model solar and storage together." },
      { q: "Do I claim it myself?", a: "No. We check eligibility, apply the discount and lodge the paperwork as an accredited retailer. You receive written confirmation of what was claimed." },
      { q: "What if the program closes before my install?", a: "State programs are released in rounds and can close. We tell you up front what your quote depends on, and if a program becomes unavailable we re-quote honestly rather than quietly absorbing the change." },
    ],
    related: [
      { label: "All Victorian rebates", href: "/solar-rebates-victoria", line: "Every program explained in one place." },
      { label: "Solar batteries", href: "/solar-batteries", line: "What storage does and whether it suits you." },
      { label: "Tesla Powerwall", href: "/solar-batteries/tesla-powerwall", line: "Compared honestly against the alternatives." },
    ],
  },

  "heat-pump-rebate-victoria": {
    slug: "heat-pump-rebate-victoria",
    label: "Heat Pump Rebate Victoria",
    seoTitle: "Heat Pump Rebate Victoria | Hot Water | Lumenx",
    seoDescription:
      "How Victorian Energy Upgrades and Solar Victoria rebates apply to heat pump hot water systems, and how Lumenx applies them to your quote.",
    eyebrow: "Heat pump rebates",
    h1: "Replacing gas or electric hot water is one of the cheapest upgrades you can make.",
    lead: "Hot water is usually the second largest line on a household energy bill, and the rebates available on heat pumps are among the most generous in Victoria.",
    hero: {
      image: "/images/svc-heat-pump.webp",
      alt: "A heat pump hot water tank and plumbing in a plant room",
    },
    chips: ["Victorian Energy Upgrades", "Applied at point of sale", "Replaces gas or electric"],

    intro: {
      heading: "Where the discount comes from",
      body: [
        "The main program is Victorian Energy Upgrades, which discounts efficient appliances through accredited providers rather than paying you back afterwards. Heat pump hot water is one of the categories it covers, specifically when replacing an existing electric or gas storage system.",
        "Solar Victoria also runs hot water programs for eligible households. Which of these applies to you depends on your property and circumstances, and the two do not always combine. We work out your actual position before quoting.",
      ],
      points: [
        "Delivered as a point-of-sale discount, not a cash-back claim",
        "Applies when replacing an existing electric or gas storage system",
        "Solar Victoria hot water programs may apply for eligible households",
        "Runs through us as an accredited provider, so you lodge nothing",
      ],
      image: "/images/pool-intro.webp",
      imageAlt: "A swimming pool beside a modern open-plan home",
    },

    steps: {
      eyebrow: "How it actually works",
      heading: "From old tank to discounted new one.",
      lead: "The rebate is administered through accredited providers, which means the discount is applied at the point of sale rather than claimed back by you later.",
      items: [
        { n: "01", t: "We check what you are replacing", d: "The program is built around replacing an existing electric or gas storage system, so what is there now determines what you qualify for." },
        { n: "02", t: "We confirm your eligibility", d: "Against your property and circumstances, and against the specific heat pump being proposed. Not every model qualifies." },
        { n: "03", t: "The discount comes off the price", d: "Your quote shows the rebate deducted, so the number you compare is the number you pay." },
        { n: "04", t: "We handle the compliance", d: "Decommissioning the old unit, the paperwork and the evidence trail are all part of the installation." },
      ],
    },

    checklist: {
      heading: "What we will need from you",
      items: [
        "Your installation address",
        "What you currently have: gas or electric storage, and roughly its age",
        "How many people live in the house, so the tank is sized correctly",
        "Whether you have solar, so we can time the heating cycle to your generation",
      ],
    },

    faqs: [
      { q: "How much is the heat pump rebate worth?", a: "It varies with the system, your circumstances and the program year. We confirm your actual entitlement and show it as a deducted line on your quote rather than publishing a figure that could be out of date." },
      { q: "Does my existing system have to be gas?", a: "No. The program is aimed at replacing existing electric or gas storage hot water. What you currently have affects what you qualify for, so tell us when you enquire." },
      { q: "Can I combine this with a solar rebate?", a: "Sometimes. Solar and hot water programs are administered separately and the combinations that are allowed change. We check your specific position before quoting." },
      { q: "Do I have to claim anything?", a: "No. Victorian Energy Upgrades is delivered through accredited providers, so the discount is applied at the point of sale and the compliance paperwork is ours." },
      { q: "Will a heat pump work in a Melbourne winter?", a: "Yes. Heat pumps extract warmth from air well below freezing and Melbourne winters are comfortably within operating range. Quality units include a boost element for the rare days it is needed." },
    ],
    related: [
      { label: "All Victorian rebates", href: "/solar-rebates-victoria", line: "Every program explained in one place." },
      { label: "Heat pump hot water", href: "/heat-pump-hot-water", line: "How it works and what it costs to run." },
      { label: "Pool heating", href: "/pool-heating", line: "The same technology, applied to a pool." },
    ],
  },
};

export const GUIDE_SLUGS = Object.keys(GUIDES);
export const getGuide = (slug) => GUIDES[slug] || null;
