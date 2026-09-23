// About page content.
//
// Adapted from lumenex.com.au/about, rewritten into the voice used across the
// rest of this site: specific and plain rather than superlative. The live copy
// leans on claims like "one of the fastest growing solar companies in
// Australia" and "industry frontrunners", which cannot be substantiated and
// read as filler. What survives is the substance — the model, the standards
// and the mission pillars.
//
// Deliberately NOT carried over:
//   • The four stat counters. Every one renders as 0 on the live site
//     (0+ years, 0K projects, 0K+ MWh, 0K panels), so there are no real
//     figures to use and inventing them is not an option.
//   • The team grid. The live page lists "Al Pacino — Engineer" and
//     "Amber Heard — Technician", which are demo-template placeholders.

export const ABOUT = {
  seoTitle: "About Lumenx | Solar Company Melbourne & Sydney",
  seoDescription:
    "Lumenx is a Solar Victoria authorised retailer and Clean Energy Council member installing solar, batteries and EV charging across Victoria and New South Wales.",
  eyebrow: "Who we are",
  h1: "A solar company that would rather be trusted than be the biggest.",
  lead: "We install solar, batteries, EV charging, hot water and pool heating across Victoria and New South Wales — and we would rather quote you honestly and lose the job than sell you a system you did not need.",
  hero: {
    image: "/images/real-install-2.webp",
    alt: "Lumenx installation team completing a rooftop solar system",
  },
  chips: ["Solar Victoria Authorised Retailer", "Clean Energy Council Member", "NETCC Signatory"],

  intro: {
    heading: "Accessible solar, done properly",
    body: [
      "Lumenx exists to make solar something an ordinary household or business can actually act on. Not a decision that takes three quotes, a spreadsheet and a suspicion that someone is marking up the rebate. One design built on your roof and your bill, one fixed price with the rebates already deducted, one accredited crew who turn up when they said they would.",
      "That approach shapes everything else. We size systems from consumption data rather than roof area, we tell people when a smaller system is the better buy, and we say plainly when a battery or a pool heater does not stack up for them yet. It costs us jobs. It is also the reason customers come back for the second and third one.",
    ],
    points: [
      "Fixed, itemised quotes with every rebate already applied",
      "CEC-accredited installers on every job, in both states",
      "Rebate paperwork filed by us, not left with you",
      "A 16-year workmanship warranty on the installation itself",
    ],
    image: "/images/real-install-1.webp",
    imageAlt: "A completed Lumenx solar and battery installation",
  },

  // The three pillars are Lumenx's own, from the live About page.
  mission: {
    eyebrow: "Our mission",
    heading: "Three things we are actually trying to do.",
    lead: "Every solar company says it wants a greener future. These are the specific commitments underneath that, and the ones we can be measured against.",
    pillars: [
      {
        n: "01",
        title: "Empowerment",
        line: "Put people in control of their own energy. That means explaining the trade-offs in plain language and handing over a system the owner understands, monitors and can make decisions about — not a black box on the roof.",
      },
      {
        n: "02",
        title: "Sustainability",
        line: "Move households and businesses off fossil-fuelled power, gas hot water and petrol wherever the numbers support it. Every system installed is a permanent reduction, not an offset bought elsewhere.",
      },
      {
        n: "03",
        title: "Impact",
        line: "Make the change worth making financially, because that is what drives adoption at scale. Quality hardware, honest pricing and real payback do more for emissions than good intentions do.",
      },
    ],
  },

  standards: {
    eyebrow: "How we are held to it",
    heading: "The accreditations are not decoration.",
    lead: "Each of these carries obligations that can be enforced against us, which is precisely the point of having them.",
    items: [
      {
        name: "Solar Victoria Authorised Retailer",
        line: "Required to offer Solar Victoria rebates, and conditional on meeting their code of conduct on sales, pricing and installation standards.",
      },
      {
        name: "Clean Energy Council Member",
        line: "Bound by the CEC's approved retailer commitments covering advertising, contracts, warranties and complaint handling.",
      },
      {
        name: "NETCC Signatory",
        line: "Signed up to the New Energy Tech Consumer Code, which governs how new energy technology is sold and serviced in Australia.",
      },
      {
        name: "16-Year Workmanship Warranty",
        line: "Our own commitment on the installation, separate from and additional to the manufacturer warranties on the hardware.",
      },
    ],
  },

  offices: {
    eyebrow: "Where we work",
    heading: "Two offices, two states, local crews in both.",
    lead: "Victoria and New South Wales, including the regional areas around each. If you are not sure whether your postcode is covered, ask — we would rather tell you no than send a truck four hours each way.",
  },

  faqs: [
    {
      q: "Where does Lumenx install?",
      a: "Across Victoria and New South Wales, from our Maribyrnong and Sydney offices, including the surrounding regional areas. Tell us your postcode and we will confirm before going any further.",
    },
    {
      q: "Are you accredited?",
      a: "Yes. Lumenx is a Solar Victoria Authorised Retailer, a Clean Energy Council member and a NETCC signatory, and every installation is signed off by a CEC-accredited installer.",
    },
    {
      q: "Do you use subcontractors?",
      a: "Installations are carried out by CEC-accredited installers working to our standards, and the workmanship warranty is ours regardless of who holds the drill. You deal with Lumenx for the life of the system.",
    },
    {
      q: "What happens after the install?",
      a: "Monitoring is configured and demonstrated before we leave, the rebate paperwork is filed by us, and the 16-year workmanship warranty covers the installation. If something looks wrong on the monitoring, call us.",
    },
    {
      q: "Why should I choose Lumenx over a cheaper quote?",
      a: "Sometimes you should not, and we will say so. What we will not do is win on price by undersizing the inverter, quoting a range that moves after the deposit, or leaving the rebate claim with you. Compare the itemised lines, not the headline number.",
    },
  ],
};
