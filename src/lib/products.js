// Products hub.
//
// Brand membership per category is taken from what the service pages already
// say Lumenx installs — nothing here introduces a brand the rest of the site
// does not claim. If a brand is dropped from a service page, drop it here too.
//
// FACTUAL DISCIPLINE: no prices, no wattage or capacity claims for specific
// models, no efficiency percentages, no warranty terms attributed to a
// manufacturer. Those are the manufacturer's numbers to publish, they change
// with each product generation, and a stale spec on a retailer's site is a
// misleading claim. Everything here describes a category and names the brands
// we stock. Specifications belong in the written quote.

export const PRODUCTS_HUB = {
  seoTitle: "Solar Products | Panels, Inverters & Batteries | Lumenx",
  seoDescription:
    "The solar panels, inverters, batteries, EV chargers and hot water systems Lumenx installs, and how we choose what goes on your roof.",
  eyebrow: "Products",
  h1: "We do not sell one brand. We specify the right one.",
  lead: "A retailer tied to a single manufacturer will always find a reason it suits your roof. We are not, so the recommendation follows the job rather than the stock.",
  hero: {
    image: "/images/panels-closeup.webp",
    alt: "A close view of solar panel cells and framing",
  },
  chips: ["Tier-1 panels", "Multiple inverter platforms", "Rebate-eligible batteries"],

  intro: {
    heading: "How we choose what goes on your roof",
    body: [
      "Equipment selection is the part of a quote most people cannot compare, which is exactly why it is where corners get cut. Two quotes at the same price can carry very different hardware, and the difference does not show up for five years.",
      "We hold multiple brands in every category so the specification can follow the roof: shading pattern, orientation, roof type, how much you use and when, and whether storage is coming later. Where two options are genuinely close we tell you the trade-off instead of picking the one with the better margin.",
    ],
    points: [
      "Panels chosen for your roof's shading and orientation, not for stock levels",
      "Inverter platform chosen for whether a battery is coming later",
      "Every component Clean Energy Council approved and rebate-eligible",
      "Exact make and model written on your quote before you commit",
    ],
    image: "/images/real-install-2.webp",
    imageAlt: "A completed Lumenx solar installation on a residential roof",
  },

  categories: [
    {
      id: "panels",
      n: "01",
      title: "Solar panels",
      line: "The part that lasts longest and gets compared least.",
      body: "Panels are the component people assume are interchangeable. In practice the differences that matter are behaviour under partial shade, performance in heat, frame strength in high-wind areas, and whether the manufacturer will still exist to honour a twenty-five year warranty. We stock lightweight options for roofs that cannot take conventional weight.",
      brands: ["Jinko Solar", "Longi", "Risen", "Sunman", "Boss Solar"],
      href: "/residential-solar",
      hrefLabel: "Residential solar",
      image: "/images/panels-closeup.webp",
      imageAlt: "A close view of solar panel cells and framing",
    },
    {
      id: "inverters",
      n: "02",
      title: "Inverters",
      line: "The component most likely to need attention first.",
      body: "The inverter does the conversion, the monitoring and, if you add storage later, the coordination. It is also the component with the shortest life of the three, so its replacement cost and its parts availability matter more than its headline efficiency. String, hybrid and microinverter platforms each suit different roofs, and we will say which yours is.",
      brands: ["Sungrow", "GoodWe", "SolarEdge", "Delta"],
      href: "/solar-inverters",
      hrefLabel: "Solar inverters",
      image: "/images/svc-inverters.webp",
      imageAlt: "A wall-mounted solar inverter and isolators",
    },
    {
      id: "batteries",
      n: "03",
      title: "Home batteries",
      line: "Storage, sized to your evenings rather than your roof.",
      body: "A battery is not sized from your system size, it is sized from what you use after the sun goes down. The other decision is whether you want blackout backup, because that changes the wiring and the equipment rather than just the capacity. Every battery we install is eligible under the federal battery program.",
      brands: ["Sungrow", "Alpha ESS", "LG Energy Solution"],
      href: "/solar-batteries",
      hrefLabel: "Solar batteries",
      image: "/images/svc-batteries.webp",
      imageAlt: "Energy storage and inverter equipment mounted on a wall",
    },
    {
      id: "ev-chargers",
      n: "04",
      title: "EV chargers",
      line: "Charging the car off your own generation.",
      body: "Single-phase and three-phase wall units, with the option to prioritise your solar surplus over grid import. What decides the install is rarely the charger itself but your switchboard capacity, the cable run and where the car actually parks.",
      brands: ["Wallbox", "Delta", "GE"],
      href: "/ev-chargers",
      hrefLabel: "EV chargers",
      image: "/images/svc-ev-chargers.webp",
      imageAlt: "An electric vehicle charging from a wall-mounted unit",
    },
    {
      id: "hot-water",
      n: "05",
      title: "Hot water and pool heating",
      line: "The second biggest line on most energy bills.",
      body: "Heat pumps move heat rather than generating it, which is why they use a fraction of the electricity of a conventional element. The same technology applied to a pool extends the swimming season without the running cost of gas. Both pair well with solar because the heating cycle can be timed to your midday surplus.",
      brands: ["SensaHeat", "Supreme Heating", "Hayward"],
      href: "/heat-pump-hot-water",
      hrefLabel: "Heat pump hot water",
      image: "/images/svc-heat-pump.webp",
      imageAlt: "A heat pump hot water tank and plumbing in a plant room",
    },
  ],

  faqs: [
    {
      q: "Which brand of panel is best?",
      a: "There is no single answer, and any installer who gives you one without seeing your roof is selling what they have. Shading, orientation, roof type and wind rating all change the answer. We will tell you which we are proposing and why, in writing.",
    },
    {
      q: "Why do you not publish prices for each product?",
      a: "Because a component price is not a system price. What you pay depends on your roof, your switchboard, access, the size you need and your rebate eligibility. A per-panel figure would tell you almost nothing about your actual cost.",
    },
    {
      q: "Are these all eligible for the rebates?",
      a: "Yes. Everything we install is Clean Energy Council approved, which is a condition of both the federal programs and the Solar Victoria schemes. We confirm your eligibility and show the rebate deducted on your quote.",
    },
    {
      q: "Can I ask for a specific brand?",
      a: "Of course, and if it suits your roof we will quote it. If we think something else is a better fit we will say so and explain why, but the decision is yours.",
    },
    {
      q: "What happens if a manufacturer goes out of business?",
      a: "Their product warranty becomes difficult to claim, which is one of the reasons we are selective about who we stock. Our own 16-year workmanship warranty is ours to honour regardless, and it covers the installation rather than the hardware.",
    },
  ],
};
