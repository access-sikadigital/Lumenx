// Service hub content.
//
// URLs, SEO titles, meta descriptions, H1s, target keywords and the required
// proof points all come from the LumenX SEO Blueprint (sheets 7 and 11).
//
// Factual discipline: the only dollar figures here are the average-yearly-
// savings numbers Lumenx already publishes on lumenex.com.au. No prices,
// payback periods or rebate amounts are invented — where a number belongs but
// is not confirmed, the copy asks for a quote instead.

export const SERVICE_PAGES = {
  /* ------------------------------------------------------------------ */
  "residential-solar": {
    slug: "residential-solar",
    label: "Residential Solar",
    seoTitle: "Residential Solar Panels Melbourne | Lumenx",
    seoDescription:
      "Quality residential solar for Victorian homes. Premium panels, a 16-year workmanship warranty and every rebate handled. See system sizes and savings.",
    eyebrow: "Residential solar",
    h1: "Solar panels sized to your home, not a catalogue.",
    lead: "Most quotes start with a system and work backwards. We start with your roof, your bill and how your household actually uses power, then design around that.",
    hero: {
      image: "/images/svc-residential.webp",
      alt: "A family outside their home with rooftop solar installed by Lumenx",
    },
    chips: ["5kW to 15kW", "Solar Victoria authorised", "16-year workmanship warranty"],

    intro: {
      heading: "A system built around your bill",
      body: [
        "A solar system that is too small leaves money on the roof. One that is too big exports power for a few cents a kilowatt hour that you paid a lot more to generate. The right size sits between the two, and it depends on when your household actually draws power.",
        "We read your last bill, look at your roof's orientation, pitch and shading, and size the system to match. You get a fixed, itemised proposal showing panel count, output, expected yearly savings and every rebate applied before the number you pay.",
      ],
      points: [
        "Panel layout modelled on your actual roof, not a generic template",
        "Tier-1 panels from JA Solar, Jinko, Trina, Longi and SunPower",
        "Federal STCs and Solar Victoria rebates claimed for you",
        "Monitoring set up before we leave, so you can see every kilowatt",
      ],
      image: "/images/real-install-3.webp",
      imageAlt: "Lumenx installers fitting solar panels on a Melbourne rooftop",
    },

    // Savings figures are Lumenx's own published averages from lumenex.com.au.
    options: {
      heading: "Choose your system size",
      note: "Average yearly savings as published by Lumenx. Your figure depends on your usage, tariff and roof.",
      items: [
        {
          size: "6.6 kW",
          best: "Perfect for small homes",
          value: "$1,900",
          valueLabel: "average yearly savings",
          specs: ["15 × 440W panels", "1 × 5kW inverter"],
        },
        {
          size: "10.4 kW",
          best: "Perfect for large homes",
          value: "$2,700",
          valueLabel: "average yearly savings",
          specs: ["23 × 440W panels", "1 × 10kW inverter"],
          featured: true,
        },
        {
          size: "15 kW",
          best: "Perfect for businesses",
          value: "$3,700",
          valueLabel: "average yearly savings",
          specs: ["34 × 440W panels", "1 × 15kW inverter"],
        },
      ],
    },

    features: [
      { title: "Honest sizing", line: "We will tell you when a smaller system is the better buy. Oversizing is the most common way households lose money on solar." },
      { title: "Fixed, itemised pricing", line: "One number, broken down line by line, with rebates already deducted. No ranges and no revisions after the deposit." },
      { title: "CEC-accredited install", line: "Every job is signed off by a Clean Energy Council accredited installer, tidy and usually done in a single day." },
      { title: "Rebates handled", line: "Federal STCs and Solar Victoria paperwork are filed by us. You see the discounted price, not the admin." },
      { title: "Battery-ready by default", line: "If storage is on your horizon, we specify an inverter that will take a battery later without replacing it." },
      { title: "Support after switch-on", line: "Monitoring, performance checks and a local team that still answers the phone two years in." },
    ],

    brands: ["Jinko Solar", "Longi", "Risen", "Sunman", "Sungrow", "GoodWe", "SolarEdge"],
    showRebates: true,

    faqs: [
      { q: "What size solar system do I need?", a: "It depends on your daily usage and when you use it, not just your roof size. As a rough guide, a 6.6kW system suits most smaller households, while homes with air conditioning, a pool or an EV usually need 10kW or more. We size it from your actual bill rather than guessing." },
      { q: "How long does installation take?", a: "Most residential installs are completed in a single day once the system is designed and approved. We confirm the exact date in your proposal and turn up when we say we will." },
      { q: "Will solar work on my roof?", a: "Most roofs are suitable. North-facing pitches produce the most, but east and west split arrays work well for households that use power in the morning and evening. Heavy shading is the main limiting factor, and we will tell you honestly if your roof is a poor candidate." },
      { q: "Do I need a battery straight away?", a: "No. Plenty of households start with panels and add storage later. We will specify a battery-ready inverter so that upgrade does not mean replacing equipment you just bought." },
      { q: "What warranty do I get?", a: "A 16-year Lumenx workmanship warranty on the installation, plus the manufacturer's own product and performance warranties on panels, inverter and battery." },
    ],
    related: ["solar-batteries", "solar-packages", "solar-inverters"],
  },

  /* ------------------------------------------------------------------ */
  "commercial-solar": {
    slug: "commercial-solar",
    label: "Commercial Solar",
    seoTitle: "Commercial Solar Melbourne | Business Solar | Lumenx",
    seoDescription:
      "Cut business energy costs with commercial solar. Tailored 20kW to 100kW+ systems, clear ROI modelling, finance and rebates. Talk to Lumenx.",
    eyebrow: "Commercial solar",
    h1: "Turn your largest overhead into a fixed cost.",
    lead: "Energy is one of the few operating costs you can permanently reduce with a single capital decision. We model it properly before you commit a cent.",
    hero: {
      image: "/images/svc-commercial.webp",
      alt: "Engineer inspecting a commercial rooftop solar array",
    },
    chips: ["20kW to 100kW+", "ROI modelled on your load", "Finance available"],

    intro: {
      heading: "Numbers first, panels second",
      body: [
        "A commercial system only makes sense if the arithmetic does. We start from your interval data and tariff structure, not a rule of thumb, and show you the payback period, the internal rate of return and what happens to it if energy prices move.",
        "Because most businesses draw power during daylight hours, commercial solar typically self-consumes far more of what it generates than a home system does. That is what makes the return work, and it is why sizing to your load curve matters more than filling the roof.",
      ],
      points: [
        "Modelled against your actual interval data and tariff",
        "Roof structural assessment before anything is specified",
        "Instant asset write-off and finance options explained",
        "Staged installs to avoid disrupting trading hours",
      ],
      image: "/images/svc-inverters.webp",
      imageAlt: "Technician maintaining a commercial solar power installation",
    },

    features: [
      { title: "Real ROI modelling", line: "Payback, IRR and lifetime saving, built from your consumption data and shown before you sign anything." },
      { title: "Sized to your load curve", line: "Matched to when your business actually draws power, so you self-consume rather than export at a low tariff." },
      { title: "Structural sign-off", line: "Roof capacity assessed and documented before specification, not discovered on install day." },
      { title: "Minimal disruption", line: "Works staged around your trading hours, with switchboard changeovers scheduled outside them where possible." },
      { title: "Monitoring and reporting", line: "Per-system reporting you can hand straight to your accountant or sustainability report." },
      { title: "Scalable design", line: "Specified so a second stage can be added as your load grows, without replacing the first." },
    ],

    brands: ["Jinko Solar", "Longi", "Risen", "Sungrow", "GoodWe", "SolarEdge", "Delta"],
    showRebates: false,

    faqs: [
      { q: "What size commercial system will I need?", a: "Anywhere from 20kW for a small warehouse or office to well over 100kW for manufacturing or cold storage. The right size comes from your interval data, which shows exactly when and how much power you draw. We request it as the first step." },
      { q: "What payback should I expect?", a: "It varies with your tariff, your daytime consumption and the system size, so we will not quote a generic figure. We model it from your own data and show you the assumptions behind it, so you can test them yourself." },
      { q: "Can we finance the system?", a: "Yes. Finance and operating-lease structures are available, and for many businesses the repayments sit below the energy saving from day one. We will walk through the options alongside an outright purchase." },
      { q: "Will installation disrupt trading?", a: "Rarely. Most of the work happens on the roof while you operate normally. The switchboard connection needs a short shutdown, and we schedule that outside your trading hours wherever the site allows." },
      { q: "Do you handle the grid application?", a: "Yes. Commercial connections need distributor approval and the requirements differ by network. We prepare and lodge the application and manage it through to approval." },
    ],
    related: ["solar-batteries", "solar-inverters", "ev-chargers"],
  },

  /* ------------------------------------------------------------------ */
  "solar-batteries": {
    slug: "solar-batteries",
    label: "Solar Batteries",
    seoTitle: "Solar Batteries Melbourne — Sungrow, BYD, LG | Lumenx",
    seoDescription:
      "Store your solar and cut bills with a home battery. Sungrow, BYD, AlphaESS and LG Energy Solution, with the federal battery rebate applied. Free quote.",
    eyebrow: "Solar batteries",
    h1: "Stop exporting power for cents and buying it back for dollars.",
    lead: "Without storage, most households export the bulk of what they generate at a low feed-in rate, then buy power back at peak prices after dark. A battery closes that gap.",
    hero: {
      image: "/images/svc-batteries.webp",
      alt: "Technician inspecting solar panels connected to a home battery system",
    },
    chips: ["Federal rebate applied", "Blackout backup available", "Retrofits existing solar"],

    intro: {
      heading: "The maths changed in 2025",
      body: [
        "Home storage used to be a long payback proposition. The federal Cheaper Home Batteries program changed that, and for households with an existing solar system and decent evening consumption, storage now pays back considerably faster than it did.",
        "It still is not right for everyone. If you use most of your power during daylight hours, a battery adds less than you would expect. We model your usage against your generation before recommending one, and we will say so if the case is weak.",
      ],
      points: [
        "Sized from your evening and overnight consumption",
        "Retrofits to most existing solar systems",
        "Backup circuits available to keep essentials running in an outage",
        "Federal battery rebate and any Victorian program claimed for you",
      ],
      image: "/images/real-install-2.webp",
      imageAlt: "Battery and inverter installation completed by the Lumenx team",
    },

    features: [
      { title: "Honest modelling first", line: "We run your consumption against your generation and show you the case. If storage does not stack up for your household, we will tell you." },
      { title: "Rebates claimed for you", line: "The federal battery rebate and any applicable Victorian program are applied to your quote and the paperwork is ours." },
      { title: "Blackout backup", line: "Configure essential circuits — fridge, lights, internet, a power point or two — to keep running when the grid goes down." },
      { title: "Works with existing solar", line: "Most systems can be retrofitted. Where your current inverter will not take a battery, we will price both paths honestly." },
      { title: "Scalable capacity", line: "Several of the systems we fit are modular, so you can add capacity later rather than buying for a future you are guessing at." },
      { title: "Monitored from your phone", line: "See charge, discharge, solar generation and grid draw in real time, and know exactly what the battery is saving you." },
    ],

    brands: ["Sungrow", "Alpha ESS", "LG Energy Solution", "GoodWe", "SolarEdge"],
    showRebates: true,

    faqs: [
      { q: "Is a solar battery worth it?", a: "For most households with existing solar and meaningful evening usage, yes — the 2025 federal rebate substantially changed the payback. If you use most of your power during the day, the case is weaker. We model it on your real usage before you commit." },
      { q: "What size battery do I need?", a: "It depends on how much power you use after sunset. A common starting point is enough capacity to cover your evening and overnight load, which for many homes lands somewhere around 10 to 13kWh, but we size it from your bill rather than a default." },
      { q: "Will it keep my power on in a blackout?", a: "With backup configured, yes — for selected essential circuits. Not every battery and inverter combination supports it, and whole-home backup needs a larger system, so tell us up front if outage protection is a priority." },
      { q: "Can I add a battery to solar I already have?", a: "Usually. It depends on your existing inverter. If it is battery-ready, the retrofit is straightforward; if not, we will quote both a hybrid inverter upgrade and an AC-coupled battery so you can compare." },
      { q: "How long does a battery last?", a: "Manufacturer warranties typically run around ten years, usually expressed as a throughput or retained-capacity guarantee rather than a flat term. We will show you the specific warranty on whichever model we recommend." },
    ],
    related: ["residential-solar", "solar-inverters", "solar-packages"],
  },

  /* ------------------------------------------------------------------ */
  "solar-inverters": {
    slug: "solar-inverters",
    label: "Solar Inverters",
    seoTitle: "Solar Inverters Melbourne — Fronius, Sungrow | Lumenx",
    seoDescription:
      "Choose the right solar inverter. Fronius, Sungrow, GoodWe and SolarEdge, string and hybrid. Supply, installation and replacement. Free quote.",
    eyebrow: "Solar inverters",
    h1: "The component that decides how well your solar actually performs.",
    lead: "Panels get the attention, but the inverter is what converts, manages and reports everything your system does. It is also the part most likely to need replacing first.",
    hero: {
      image: "/images/svc-inverters.webp",
      alt: "Solar inverter being serviced at an installation",
    },
    chips: ["String and hybrid", "All major brands serviced", "Replacement and upgrade"],

    intro: {
      heading: "String, hybrid or micro",
      body: [
        "A string inverter is the standard choice and the most cost-effective for a simple, unshaded roof. A hybrid inverter does the same job but can also charge and discharge a battery, which is what makes it the sensible pick if storage is anywhere in your plans.",
        "Microinverters and optimisers work per panel rather than per string, which helps on complex roofs where shading or multiple orientations would otherwise drag the whole array down to its weakest panel. They cost more, so they are worth it on the roofs that need them and not on the ones that do not.",
      ],
      points: [
        "Sized correctly to your array, not undersized to shave the quote",
        "Hybrid specified when a battery is in your plans",
        "Optimisers only where shading genuinely warrants them",
        "Monitoring configured and demonstrated before we leave",
      ],
      image: "/images/panels-closeup.webp",
      imageAlt: "Close detail of solar panels feeding a Lumenx inverter installation",
    },

    features: [
      { title: "Right type for your roof", line: "String, hybrid or optimised, chosen on the merits of your roof and plans rather than on what we happen to stock." },
      { title: "Replacement service", line: "Inverters usually fail before panels do. We replace and upgrade all major brands, generally without touching the array." },
      { title: "Battery-ready specification", line: "If storage is on the horizon, a hybrid now avoids paying twice later. We will show you the difference in cost." },
      { title: "Properly sized", line: "Undersizing the inverter to trim a quote clips your output on the best days. We size it to the array." },
      { title: "Full monitoring setup", line: "Configured, connected to your network and demonstrated on your phone before the job is signed off." },
      { title: "Warranty supported", line: "Manufacturer warranty registered for you, and we handle the claim if anything goes wrong." },
    ],

    brands: ["Sungrow", "GoodWe", "SolarEdge", "Delta", "Alpha ESS"],
    showRebates: false,

    faqs: [
      { q: "How long does a solar inverter last?", a: "Typically ten to fifteen years, which is shorter than the panels, so most systems need at least one inverter replacement in their lifetime. Warranties commonly run five to ten years with extensions available." },
      { q: "What are the signs my inverter is failing?", a: "Error codes on the display, the system dropping out during the day, monitoring showing production well below normal for the conditions, or an inverter that is unusually hot or noisy. If you are seeing any of these, get it checked before it stops entirely." },
      { q: "String or hybrid inverter?", a: "If a battery is anywhere in your plans, a hybrid is usually the cheaper path overall because it avoids replacing the inverter later. If you are confident you will never add storage, a quality string inverter does the job for less." },
      { q: "Can I replace just the inverter?", a: "Yes, in most cases the array stays exactly as it is and only the inverter is swapped. We will check compatibility with your existing panel strings first and tell you if anything else needs to change." },
      { q: "Do I need optimisers?", a: "Only if your roof needs them. They help on arrays with shading or multiple orientations, where one underperforming panel would otherwise drag down its whole string. On a clean, single-orientation roof they add cost without adding output." },
    ],
    related: ["solar-batteries", "residential-solar", "commercial-solar"],
  },

  /* ------------------------------------------------------------------ */
  "ev-chargers": {
    slug: "ev-chargers",
    label: "EV Chargers",
    seoTitle: "EV Charger Installation Melbourne | Lumenx",
    seoDescription:
      "Charge at home with a certified EV charger installation. Wallbox, SolarEdge and Delta, solar-integrated, with fixed pricing. Get a free quote.",
    eyebrow: "EV charging",
    h1: "Charge the car on power you already made.",
    lead: "A home charger turns your roof into the cheapest fuel you will ever buy. Set up properly, it waits for your solar surplus instead of pulling from the grid at peak rates.",
    hero: {
      image: "/images/svc-ev-chargers.webp",
      alt: "Electric vehicle charging at a home wall charger",
    },
    chips: ["7kW and 22kW", "Solar-integrated charging", "Certified electricians"],

    intro: {
      heading: "A charger is an electrical job, not an appliance",
      body: [
        "The unit on the wall is the easy part. What determines whether the install goes smoothly is your switchboard: its spare capacity, whether it needs an upgrade, the cable run to where the car parks, and what your distributor allows on your connection.",
        "We check all of that before quoting, so the number you get is the number you pay. And if you have solar, we configure the charger to prioritise your surplus, which is the difference between charging cheaply and simply charging at home.",
      ],
      points: [
        "Switchboard capacity assessed before we quote",
        "Single-phase 7kW or three-phase 22kW, matched to your supply",
        "Solar-aware charging so the car soaks up your surplus",
        "Installed and certified by licensed electricians",
      ],
      image: "/images/installation.webp",
      imageAlt: "Lumenx electrician completing a home electrical installation",
    },

    features: [
      { title: "Solar-integrated", line: "Configured to charge from surplus generation first, so you use your own power rather than importing at peak." },
      { title: "7kW or 22kW", line: "Single-phase suits most homes and adds plenty of range overnight. Three-phase 22kW is there if your supply and car support it." },
      { title: "Switchboard checked first", line: "Capacity and protection assessed before the quote, so an upgrade is priced up front rather than sprung on you." },
      { title: "Tidy cable runs", line: "Routed and finished properly, including through garages, along eaves or underground to a carport." },
      { title: "Scheduled charging", line: "Set it to run on your off-peak window or your solar window, and leave it to manage itself." },
      { title: "Certified and compliant", line: "Installed by licensed electricians with a certificate of electrical safety issued on completion." },
    ],

    brands: ["Wallbox", "SolarEdge", "Delta", "GE"],
    showRebates: false,

    faqs: [
      { q: "How fast will a home charger charge my EV?", a: "A 7kW single-phase charger adds roughly 40km of range per hour for most vehicles, which comfortably refills a typical daily commute overnight. A 22kW three-phase unit is faster, but only if both your supply and your car support three-phase charging." },
      { q: "Do I need a switchboard upgrade?", a: "Sometimes. It depends on your board's age, spare capacity and existing protection. We assess it before quoting, so if an upgrade is needed it appears in the original price rather than as a variation later." },
      { q: "Can the charger run off my solar?", a: "Yes. Solar-aware chargers can prioritise surplus generation, so the car charges on what your roof is producing rather than importing from the grid. It is the single biggest factor in what home charging actually costs you." },
      { q: "Can I install an EV charger without solar?", a: "Absolutely. Plenty of customers start with the charger and add solar later. Scheduled charging on an off-peak tariff still beats public fast charging on cost." },
      { q: "Will it work with my car?", a: "The chargers we install use the Type 2 connector, which is the standard for every EV sold new in Australia. If you drive an older import with a different connector, tell us and we will confirm compatibility first." },
    ],
    related: ["residential-solar", "solar-batteries", "commercial-solar"],
  },

  /* ------------------------------------------------------------------ */
  "heat-pump-hot-water": {
    slug: "heat-pump-hot-water",
    label: "Heat Pump Hot Water",
    seoTitle: "Heat Pump Hot Water Systems Melbourne | Lumenx",
    seoDescription:
      "Cut hot water running costs with a heat pump system. Efficient, solar-friendly, with the VEU rebate handled. Supply and installation. Free quote.",
    eyebrow: "Heat pump hot water",
    h1: "Hot water is usually the second biggest number on your bill.",
    lead: "Electric resistance and gas storage systems both burn energy to make heat. A heat pump moves heat instead, which is why it runs on a fraction of the power.",
    hero: {
      image: "/images/svc-heat-pump.webp",
      alt: "Heat pump hot water system installed at a home",
    },
    chips: ["VEU rebate handled", "Pairs with solar", "Replaces gas or electric"],

    intro: {
      heading: "Why a heat pump costs so little to run",
      body: [
        "A heat pump works like a refrigerator in reverse. Rather than generating heat directly, it extracts warmth from the surrounding air and transfers it into the tank. Because moving heat takes far less energy than creating it, the same hot water costs a fraction of what a conventional electric element uses.",
        "It also pairs unusually well with solar. Run the heating cycle in the middle of the day on your own generation and your hot water becomes close to free, which is exactly how we configure it when there are panels on the roof.",
      ],
      points: [
        "Replaces an existing gas or electric storage system",
        "Timed to run on your solar generation window",
        "Victorian Energy Upgrades rebate applied and processed by us",
        "Sized to your household, not just swapped like for like",
      ],
      image: "/images/real-install-1.webp",
      imageAlt: "Lumenx installation work completed at a Victorian property",
    },

    features: [
      { title: "Far lower running cost", line: "Moving heat rather than making it is what drives the saving, and it is the reason the payback on a swap is usually short." },
      { title: "Rebate handled", line: "The Victorian Energy Upgrades rebate is applied to your quote and the paperwork is filed by us." },
      { title: "Solar-timed operation", line: "Set the heating cycle to run on your midday surplus so the tank fills on power you generated." },
      { title: "Sized to your household", line: "Tank capacity matched to how many people actually live there, rather than copying whatever was there before." },
      { title: "Gas disconnection", line: "Moving off gas entirely? We coordinate the changeover so you are not left without hot water in between." },
      { title: "Full installation", line: "Removal and disposal of the old unit, new tank, plumbing, electrical and commissioning, all in one visit." },
    ],

    brands: ["SensaHeat", "Supreme Heating"],
    showRebates: true,

    faqs: [
      { q: "How much can a heat pump save on hot water?", a: "Heat pumps use substantially less electricity than a conventional electric storage system to deliver the same hot water, because they move heat rather than generate it. The exact saving depends on your household size, tariff and what you are replacing, so we will work it out against your current bill." },
      { q: "Does it work in a Melbourne winter?", a: "Yes. Heat pumps extract warmth from ambient air well below freezing, and Melbourne winters are comfortably within operating range. Efficiency does drop in cold weather, and quality units include a boost element for the rare days it is needed." },
      { q: "Is it noisy?", a: "There is a fan and compressor, so it makes some noise while running, roughly comparable to an outdoor air conditioning unit. Placement matters, and we will site it away from bedrooms and neighbouring windows." },
      { q: "What rebate is available?", a: "Victorian Energy Upgrades offers a rebate on qualifying heat pump hot water systems, and the amount varies with the system and your circumstances. We confirm your eligibility and apply it to the quote, so the price you see is the price after the rebate." },
      { q: "Can I replace a gas hot water system with one?", a: "Yes, and it is one of the most common reasons people call us. We handle the changeover, including decommissioning the gas unit, and coordinate the timing so you are not without hot water." },
    ],
    related: ["residential-solar", "pool-heating", "solar-packages"],
  },

  /* ------------------------------------------------------------------ */
  "pool-heating": {
    slug: "pool-heating",
    label: "Pool Heating",
    seoTitle: "Pool Heating Melbourne — Heat Pumps & Solar | Lumenx",
    seoDescription:
      "Extend your swim season with efficient pool heating. Heat pumps and solar pool heating from Hayward, Supreme Heating and SensaHeat. Free quote.",
    eyebrow: "Pool heating",
    h1: "Most Melbourne pools get used for about ten weeks a year.",
    lead: "Heating changes that. The question is only which method suits your pool, your roof and how far into the shoulder seasons you actually want to swim.",
    hero: {
      image: "/images/svc-pool-heating.webp",
      alt: "Home swimming pool with rooftop solar in the background",
    },
    chips: ["Heat pump or solar", "Season extension", "Hayward and Supreme Heating"],

    intro: {
      heading: "Solar pool heating or a heat pump?",
      body: [
        "Solar pool heating circulates your pool water through collectors on the roof, where the sun warms it directly. It costs very little to run because the only energy used is the pump, but it works when the sun is out and needs enough suitable roof area to do its job.",
        "A pool heat pump works like a reverse-cycle air conditioner for your pool, drawing warmth from the air. It costs more to run than solar but it holds a set temperature regardless of the weather and extends the season considerably further at both ends. For many pools the right answer is both.",
      ],
      points: [
        "Sized on your pool volume, surface area and how it is sheltered",
        "Solar collectors matched to available roof area and orientation",
        "Heat pumps for reliable temperature into the shoulder seasons",
        "Pairs with rooftop solar to bring running costs down further",
      ],
      image: "/images/rooftop-home.webp",
      imageAlt: "Victorian home with rooftop solar panels installed by Lumenx",
    },

    features: [
      { title: "Season extension", line: "Comfortable swimming well beyond the short window an unheated Melbourne pool gives you." },
      { title: "Low running cost", line: "Solar heating uses little more than the pump. A heat pump moves heat rather than making it, so it runs far cheaper than gas." },
      { title: "Runs on your solar", line: "With panels on the roof, a pool heat pump can run largely on your own daytime generation." },
      { title: "Sized to your pool", line: "Volume, surface area, shelter and your target temperature all change the specification. We measure rather than estimate." },
      { title: "Covers and controls", line: "A blanket is the cheapest heat retention there is. We will tell you if it should come before any heating at all." },
      { title: "Complete installation", line: "Plumbing, electrical, controller and commissioning, set up and demonstrated before we leave." },
    ],

    brands: ["Hayward", "Supreme Heating", "SensaHeat"],
    showRebates: false,

    faqs: [
      { q: "Solar pool heating or a heat pump?", a: "Solar is cheapest to run and ideal if you have suitable roof area and mainly want to extend summer. A heat pump costs more to run but holds a set temperature whatever the weather and stretches the season much further. Many pools end up with both, using solar as the primary and the heat pump to top up." },
      { q: "How much longer can I swim?", a: "It depends on the method, your target temperature and how sheltered the pool is, so we will not promise a number blind. Heating extends the season meaningfully at both ends, and a pool blanket materially improves whatever system you choose." },
      { q: "How much does pool heating cost to run?", a: "Solar pool heating is close to free beyond the circulation pump. A heat pump uses considerably less energy than gas for the same heat. We will estimate running cost against your pool size and tariff as part of the quote." },
      { q: "Do I need a pool cover as well?", a: "It is the single most effective thing you can do. Most heat loss is evaporation from the surface, so a blanket keeps warmth in overnight and cuts the load on whatever heating you install. We recommend one regardless of the system." },
      { q: "Can pool heating run off my solar panels?", a: "A pool heat pump can, yes, and it is a good match because it runs during the day when your system is generating. Solar pool heating is a separate roof-mounted system and does not use your electrical solar at all beyond the pump." },
    ],
    related: ["heat-pump-hot-water", "residential-solar", "solar-packages"],
  },

  /* ------------------------------------------------------------------ */
  "solar-packages": {
    slug: "solar-packages",
    label: "Solar Packages",
    seoTitle: "Solar & Battery Packages Melbourne | Lumenx",
    seoDescription:
      "Solar, inverter and battery bundled at one fixed price with every rebate already applied. See what is included in each Lumenx package.",
    eyebrow: "Solar packages",
    h1: "One price, everything included, rebates already off.",
    lead: "Buying the parts separately usually costs more and always takes longer. A package bundles the design, the hardware and the install into a single fixed number.",
    hero: {
      image: "/images/svc-packages.webp",
      alt: "Installers fitting a complete solar and battery package",
    },
    chips: ["Fixed pricing", "Rebates pre-applied", "Single install visit"],

    intro: {
      heading: "What a package actually includes",
      body: [
        "Every Lumenx package covers the full job: system design against your roof and bill, tier-1 panels, a correctly sized inverter, mounting, all electrical work, grid connection paperwork, rebate claims and monitoring configured before we leave.",
        "The two common shapes are solar with an inverter, and solar with an inverter and battery. Bundling the battery in from the start is usually cheaper than adding it later, because the hybrid inverter goes in once and the install happens in a single visit.",
      ],
      points: [
        "Design, hardware, installation and paperwork in one price",
        "Federal STCs and battery rebate deducted before you see the figure",
        "Solar plus inverter, or solar plus inverter plus battery",
        "Everything commissioned and demonstrated in one visit",
      ],
      image: "/images/family-solar.webp",
      imageAlt: "A family at home with a complete Lumenx solar and battery system",
    },

    features: [
      { title: "Solar and inverter", line: "The standard package. Tier-1 panels, a correctly sized inverter, full install and every rebate applied." },
      { title: "Solar, inverter and battery", line: "The complete setup. A hybrid inverter and storage fitted at the same time, which costs less than retrofitting later." },
      { title: "Fixed, itemised price", line: "Broken down line by line so you can see exactly what each component costs. No ranges, no post-deposit revisions." },
      { title: "Rebates pre-applied", line: "Federal STCs and the battery rebate come off before you see the number, and we file the paperwork." },
      { title: "One install visit", line: "Panels, inverter, battery and commissioning handled together rather than spread across separate trips." },
      { title: "Backed 16 years", line: "The Lumenx workmanship warranty covers the whole installation, not just the parts you can see." },
    ],

    brands: ["Jinko Solar", "Longi", "Sungrow", "GoodWe", "Alpha ESS", "LG Energy Solution"],
    showRebates: true,

    faqs: [
      { q: "Is a package cheaper than buying separately?", a: "Usually, yes. The design, install and paperwork happen once rather than repeatedly, and bundling a battery in from the start avoids paying for an inverter twice. We will price both ways if you want to compare." },
      { q: "What is included in the price?", a: "System design, panels, inverter, mounting hardware, all electrical work, grid connection application, rebate claims and monitoring setup. The quote itemises each line so nothing is hidden in a lump sum." },
      { q: "Can I add a battery to a package later?", a: "Yes, and we will specify a battery-ready inverter so that upgrade does not mean replacing equipment. It is still generally cheaper to include storage from the outset if you know you want it." },
      { q: "Are the rebates already taken off?", a: "Yes. Federal STCs and, where you qualify, the battery rebate are deducted before the figure you see. You pay the discounted price and we handle the claim." },
      { q: "How long from quote to switch-on?", a: "Once you approve the design, the timeline is mostly grid connection approval, which varies by distributor. The install itself is usually a single day. We give you the expected dates in the proposal." },
    ],
    related: ["residential-solar", "solar-batteries", "solar-inverters"],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_PAGES);
export const getService = (slug) => SERVICE_PAGES[slug] || null;
