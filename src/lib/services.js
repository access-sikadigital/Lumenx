// Service hub content.
//
// URLs, SEO titles, meta descriptions, H1s, target keywords and the required
// proof points all come from the LumenX SEO Blueprint (sheets 7 and 11).
//
// Factual discipline: the only dollar figures here are the average-yearly-
// No savings figures, no prices,
// payback periods or rebate amounts are invented — where a number belongs but
// is not confirmed, the copy asks for a quote instead.

export const SERVICE_PAGES = {
  /* ------------------------------------------------------------------ */
  "residential-solar": {
    slug: "residential-solar",
    label: "Residential Solar",
    seoTitle: "Residential Solar Panels Melbourne",
    seoDescription:
      "Quality residential solar for Victorian homes. Premium panels, SAA-accredited installation and every rebate handled. See system sizes and what suits your roof.",
    eyebrow: "Residential solar",
    h1: "Solar panels sized to your home, not a catalogue.",
    lead: "Most quotes start with a system and work backwards. We start with your roof, your bill and how your household actually uses power, then design around that.",
    hero: {
      image: "/images/svc-residential.webp",
      alt: "A family looking up at the solar panels on their roof",
    },
    chips: ["5kW to 15kW", "Solar Victoria authorised", "SAA-accredited installation"],

    intro: {
      heading: "A system built around your bill",
      body: [
        "A solar system that is too small leaves money on the roof. One that is too big exports power for a few cents a kilowatt hour that you paid a lot more to generate. The right size sits between the two, and it depends on when your household actually draws power.",
        "We read your last bill, look at your roof's orientation, pitch and shading, and size the system to match. You get a fixed, itemised proposal showing panel count, output, expected yearly savings and every rebate applied before the number you pay.",
      ],
      points: [
        "Panel layout modelled on your actual roof, not a generic template",
        "Tier-1 panels from Jinko Solar, Longi, Risen, Sunman and Boss Solar",
        "Federal STCs and Solar Victoria rebates claimed for you",
        "Monitoring set up before we leave, so you can see every kilowatt",
      ],
      image: "/images/real-install-3.webp",
      imageAlt: "Solar panels installed by Lumenx on a rooftop at dusk",
    },

    features: [
      { title: "Honest sizing", line: "We will tell you when a smaller system is the better buy. Oversizing is the most common way households lose money on solar." },
      { title: "Fixed, itemised pricing", line: "One number, broken down line by line, with rebates already deducted. No ranges and no revisions after the deposit." },
      { title: "SAA-accredited install", line: "Every job is signed off by an SAA-accredited installer, tidy and usually done in a single day." },
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
      { q: "What warranty do I get?", a: "The manufacturer's own warranties, listed on your quote against the exact models supplied, with product cover and performance cover shown separately. Panels run up to a 25-year performance warranty and batteries carry a 10-year product warranty." },
    ],
    related: ["solar-batteries", "solar-packages", "inverter-repair"],
  },

  /* ------------------------------------------------------------------ */
  "commercial-solar": {
    slug: "commercial-solar",
    label: "Commercial Solar",
    seoTitle: "Commercial Solar Melbourne | Business Solar",
    seoDescription:
      "Cut business energy costs with commercial solar. Tailored 20kW to 100kW+ systems, clear ROI modelling, finance and rebates. Talk to Lumenx.",
    eyebrow: "Commercial solar",
    h1: "Turn your largest overhead into a fixed cost.",
    lead: "Energy is one of the few operating costs you can permanently reduce with a single capital decision. We model it properly before you commit a cent.",
    hero: {
      image: "/images/svc-commercial.webp",
      alt: "Aerial view of a commercial roof covered in solar panels",
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
      imageAlt: "Two solar inverters mounted on a wall with cabling below",
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
    related: ["solar-batteries", "inverter-repair", "ev-chargers"],
  },

  /* ------------------------------------------------------------------ */
  "solar-batteries": {
    slug: "solar-batteries",
    label: "Solar Batteries",
    seoTitle: "Solar Batteries Melbourne: Sungrow, Alpha ESS, LG",
    seoDescription:
      "Store your solar and cut bills with a home battery. Sungrow, Alpha ESS and LG Energy Solution, with the federal battery rebate applied. Free quote.",
    eyebrow: "Solar batteries",
    h1: "Stop exporting power for cents and buying it back for dollars.",
    lead: "Without storage, most households export the bulk of what they generate at a low feed-in rate, then buy power back at peak prices after dark. A battery closes that gap.",
    hero: {
      image: "/images/svc-batteries.webp",
      alt: "A wall-mounted inverter beneath a solar array",
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
      imageAlt: "A Lumenx van outside a home with a completed rooftop solar system",
    },

    features: [
      { title: "Honest modelling first", line: "We run your consumption against your generation and show you the case. If storage does not stack up for your household, we will tell you." },
      { title: "Rebates claimed for you", line: "The federal battery rebate and any applicable Victorian program are applied to your quote and the paperwork is ours." },
      { title: "Blackout backup", line: "Configure essential circuits (fridge, lights, internet, a power point or two) to keep running when the grid goes down." },
      { title: "Works with existing solar", line: "Most systems can be retrofitted. Where your current inverter will not take a battery, we will price both paths honestly." },
      { title: "Scalable capacity", line: "Several of the systems we fit are modular, so you can add capacity later rather than buying for a future you are guessing at." },
      { title: "Monitored from your phone", line: "See charge, discharge, solar generation and grid draw in real time, and know exactly what the battery is saving you." },
    ],

    brands: ["Sungrow", "Alpha ESS", "LG Energy Solution", "GoodWe", "SolarEdge"],
    showRebates: true,

    faqs: [
      { q: "Is a solar battery worth it?", a: "For most households with existing solar and meaningful evening usage, yes. The 2025 federal rebate substantially changed the payback. If you use most of your power during the day, the case is weaker. We model it on your real usage before you commit." },
      { q: "What size battery do I need?", a: "It depends on how much power you use after sunset. A common starting point is enough capacity to cover your evening and overnight load, which for many homes lands somewhere around 10 to 13kWh, but we size it from your bill rather than a default." },
      { q: "Will it keep my power on in a blackout?", a: "With backup configured, yes, for selected essential circuits. Not every battery and inverter combination supports it, and whole-home backup needs a larger system, so tell us up front if outage protection is a priority." },
      { q: "Can I add a battery to solar I already have?", a: "Usually. It depends on your existing inverter. If it is battery-ready, the retrofit is straightforward; if not, we will quote both a hybrid inverter upgrade and an AC-coupled battery so you can compare." },
      { q: "How long does a battery last?", a: "Manufacturer warranties typically run around ten years, usually expressed as a throughput or retained-capacity guarantee rather than a flat term. We will show you the specific warranty on whichever model we recommend." },
    ],
    related: ["tesla-powerwall", "residential-solar", "battery-for-existing-solar"],
  },


  /* ------------------------------------------------------------------ */
  "ev-chargers": {
    slug: "ev-chargers",
    label: "EV Chargers",
    seoTitle: "EV Charger Installation Melbourne",
    seoDescription:
      "Charge at home with a certified EV charger installation. Wallbox, SolarEdge and Delta, solar-integrated, with fixed pricing. Get a free quote.",
    eyebrow: "EV charging",
    h1: "Charge the car on power you already made.",
    lead: "A home charger turns your roof into the cheapest fuel you will ever buy. Set up properly, it waits for your solar surplus instead of pulling from the grid at peak rates.",
    hero: {
      image: "/images/svc-ev-chargers.webp",
      alt: "A man holding a charging cable beside an electric car at home",
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
      imageAlt: "An electrician working inside a home switchboard",
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
    seoTitle: "Heat Pump Hot Water Systems Melbourne",
    seoDescription:
      "Cut hot water running costs with a heat pump system. Efficient, solar-friendly, with the VEU rebate handled. Supply and installation. Free quote.",
    eyebrow: "Heat pump hot water",
    h1: "Hot water is usually the second biggest number on your bill.",
    lead: "Electric resistance and gas storage systems both burn energy to make heat. A heat pump moves heat instead, which is why it runs on a fraction of the power.",
    hero: {
      image: "/images/svc-heat-pump.webp",
      alt: "A heat pump hot water tank and plumbing in a plant room",
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
      imageAlt: "Equipment installed by Lumenx on the exterior wall of a property",
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
    seoTitle: "Pool Heating Melbourne: Heat Pumps & Solar",
    seoDescription:
      "Extend your swim season with efficient pool heating. Heat pumps and solar pool heating from Hayward, Supreme Heating and SensaHeat. Free quote.",
    eyebrow: "Pool heating",
    h1: "Most Melbourne pools get used for about ten weeks a year.",
    lead: "Heating changes that. The question is only which method suits your pool, your roof and how far into the shoulder seasons you actually want to swim.",
    hero: {
      image: "/images/svc-pool-heating.webp",
      alt: "Aerial view of a house with a swimming pool and rooftop solar",
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
      image: "/images/pool-intro.webp",
      imageAlt: "A swimming pool beside a modern open-plan home",
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
    seoTitle: "Solar & Battery Packages Melbourne",
    seoDescription:
      "Solar, inverter and battery bundled at one fixed price with every rebate already applied. See what is included in each Lumenx package.",
    eyebrow: "Solar packages",
    h1: "One price, everything included, rebates already off.",
    lead: "Buying the parts separately usually costs more and always takes longer. A package bundles the design, the hardware and the install into a single fixed number.",
    hero: {
      image: "/images/svc-packages.webp",
      alt: "Two installers fitting solar panels on a rooftop at sunset",
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
      imageAlt: "A family playing together in a field outside their home",
    },

    features: [
      { title: "Solar and inverter", line: "The standard package. Tier-1 panels, a correctly sized inverter, full install and every rebate applied." },
      { title: "Solar, inverter and battery", line: "The complete setup. A hybrid inverter and storage fitted at the same time, which costs less than retrofitting later." },
      { title: "Fixed, itemised price", line: "Broken down line by line so you can see exactly what each component costs. No ranges, no post-deposit revisions." },
      { title: "Rebates pre-applied", line: "Federal STCs and the battery rebate come off before you see the number, and we file the paperwork." },
      { title: "One install visit", line: "Panels, inverter, battery and commissioning handled together rather than spread across separate trips." },
      { title: "Warranties in your name", line: "Every manufacturer warranty on the panels, inverter and battery is registered to you, with product and performance cover listed separately." },
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
    related: ["residential-solar", "solar-batteries", "inverter-repair"],
  },


  /* ------------------------------------------------------------------ */
  "tesla-powerwall": {
    slug: "tesla-powerwall",
    label: "Tesla Powerwall",
    seoTitle: "Tesla Powerwall Installation Melbourne",
    seoDescription:
      "Tesla Powerwall supplied and installed across Victoria and New South Wales, with the federal battery rebate applied and backup configured.",
    eyebrow: "Tesla Powerwall",
    h1: "The battery most people have heard of, fitted by people who fit a lot of them.",
    lead: "Powerwall is a strong product with a loyal following. It is also not automatically the right one for your house, and we will say so if it is not.",
    hero: {
      image: "/images/product-powerwall.webp",
      alt: "A home with an electric vehicle charging in the driveway",
    },
    chips: ["Federal rebate applied", "Whole-home backup capable", "Retrofits existing solar"],

    intro: {
      heading: "What Powerwall is genuinely good at",
      body: [
        "Powerwall's reputation rests on two things: the backup is excellent, and the software is the most polished in the category. If keeping the house running through an outage matters to you, it is a serious contender.",
        "It is not the cheapest kilowatt hour of storage you can buy, and for a household that just wants to shift daytime solar into the evening, something less expensive often does the same job. We will model both against your usage and show you the difference rather than steering you to whichever we would prefer to sell.",
      ],
      points: [
        "Sized against your real evening and overnight consumption",
        "Backup circuits planned before installation, not after",
        "Federal battery rebate applied to the quote and claimed for you",
        "Retrofits to most existing solar systems",
      ],
      image: "/images/svc-batteries.webp",
      imageAlt: "A wall-mounted inverter beneath a solar array",
    },

    features: [
      { title: "Honest comparison", line: "We will show you Powerwall against the alternatives on your own numbers. Sometimes it wins, sometimes it does not." },
      { title: "Backup done properly", line: "Which circuits stay live in an outage is a decision made at design time. We plan it with you rather than defaulting." },
      { title: "Rebate handled", line: "The federal battery rebate is deducted from your quote and the paperwork is ours." },
      { title: "Works with existing solar", line: "Most systems can be retrofitted. Where yours cannot, we will price the alternatives honestly." },
      { title: "Accredited installation", line: "Battery installation is regulated work with specific standards for placement and protection. Every install meets them." },
      { title: "Monitoring from day one", line: "Configured and demonstrated before we leave, so you can see charge, discharge and grid draw in real time." },
    ],

    brands: ["Sungrow", "Alpha ESS", "LG Energy Solution"],
    showRebates: true,

    faqs: [
      { q: "Is a Powerwall worth it?", a: "For households that want reliable blackout backup and polished software, often yes. For households that only want to shift daytime solar into the evening, a less expensive battery frequently does the same job. We model both on your usage before you decide." },
      { q: "Will it run my whole house in a blackout?", a: "It is capable of whole-home backup, but whether yours will depends on your loads and how the switchboard is configured. Large loads like ducted air conditioning may need to be excluded. We work this out at design stage." },
      { q: "Can I add one to solar I already have?", a: "Usually yes. It depends on your existing inverter and switchboard. We check both before quoting and tell you if anything else needs to change." },
      { q: "What rebate applies?", a: "The federal battery rebate applies to eligible installations, and Victorian programs may apply on top depending on your circumstances. We confirm your position in writing before you commit." },
      { q: "How long does installation take?", a: "Typically a day for the battery itself. If the switchboard needs work or backup circuits are being reconfigured, allow longer. We give you the exact scope in the proposal." },
    ],
    related: ["solar-batteries", "solar-packages", "residential-solar"],
  },

  /* ==================================================================
     Added 4 October 2026 for the restructured services menu.
     ================================================================== */

  /* ------------------------------------------------------------------ */
  "battery-for-existing-solar": {
    slug: "battery-for-existing-solar",
    label: "Battery for Existing Solar",
    seoTitle: "Add a Battery to Existing Solar | Melbourne & Sydney",
    seoDescription:
      "Already have solar? We check your inverter, switchboard and usage, then add storage sized to your evenings. The federal battery discount applied for you.",
    eyebrow: "Battery retrofit",
    h1: "You already have the panels. This is the other half.",
    lead: "Adding storage to an existing system is a different job to installing both at once, and it starts with what is already on your wall.",
    hero: {
      image: "/images/svc-batteries.webp",
      alt: "A home battery installed on an exterior wall",
    },
    chips: ["Any inverter brand", "Federal discount applied", "Sized to your evenings"],

    intro: {
      heading: "What has to be checked first",
      body: [
        "Your existing inverter decides the shape of the job. Some can take a battery directly. Some need a second, AC-coupled unit beside them. Some are old enough that replacing them is the cheaper answer. None of that can be guessed from the outside, which is why the quote form asks for your inverter brand and model.",
        "The federal battery discount requires eligible solar, which you already have, so a retrofit is usually the cleanest way to qualify. We size the battery to the power you actually use after dark rather than to the largest unit that will fit on the wall.",
      ],
      points: [
        "We check your current inverter, switchboard and usage before quoting",
        "Hybrid or AC-coupled, whichever your existing system actually needs",
        "The federal battery discount comes off the price, applied by us",
        "Backup circuits chosen with you at design time, not after the install",
      ],
      image: "/images/real-install-1.webp",
      imageAlt: "Battery and inverter equipment installed on a wall",
    },

    features: [
      { title: "Your inverter decides the job", line: "Tell us the brand and model and we can quote far faster, and far more accurately, than from a photo of the roof." },
      { title: "Hybrid or AC-coupled", line: "If your inverter cannot take storage directly, an AC-coupled battery sits alongside it. Both are normal; one is cheaper for you." },
      { title: "Sized to your evenings", line: "The discount tapers above 14kWh, so the biggest battery is rarely the best-value one. We size it to what you draw after dark." },
      { title: "Backup you choose", line: "You pick which circuits stay live in an outage at design stage, so nobody is surprised on the day it matters." },
      { title: "No need to replace the panels", line: "A retrofit uses the array you already paid for. We only raise replacing anything if it is genuinely at end of life." },
      { title: "One visit where possible", line: "Battery, any inverter change and the switchboard work handled together rather than spread across trips." },
    ],

    brands: ["Sungrow", "Alpha ESS", "LG Energy Solution"],
    showRebates: true,

    faqs: [
      { q: "Will my existing inverter work with a battery?", a: "Sometimes directly, sometimes with an AC-coupled battery beside it, and occasionally it is cheaper to replace it. It depends entirely on the brand, model and age. Send us those three things and we can tell you before anyone visits." },
      { q: "Why do you ask for my inverter brand and model?", a: "Because it decides the whole shape of the quote. Without it we are guessing at whether you need a hybrid unit, an AC-coupled battery or an inverter replacement, and those are very different numbers." },
      { q: "Do I still get the federal battery discount?", a: "Yes. The discount requires eligible solar to be installed or installed at the same time, and yours already is. The battery itself still has to be on the approved list." },
      { q: "How big a battery should I add?", a: "Enough to cover what you use between sunset and bed, plus whatever you want running in an outage. Since 1 May 2026 the discount tapers above 14kWh and again above 28kWh, so oversizing costs more per kilowatt hour than it used to." },
      { q: "Can I add backup circuits to a system that did not have them?", a: "Usually, yes. It depends on your switchboard and which circuits you want covered. We work that out at design stage and show you exactly what will and will not stay on." },
    ],
    related: ["solar-batteries", "inverter-repair", "service-health-check"],
  },

  /* ------------------------------------------------------------------ */
  "inverter-repair": {
    slug: "inverter-repair",
    label: "Inverter Repair",
    seoTitle: "Solar Inverter Repair & Replacement | Melbourne & Sydney",
    seoDescription:
      "Faulty, failed or ageing solar inverter? We test, repair or replace, update firmware and the app, and give you a written report. Any brand, any installer.",
    eyebrow: "Inverter repair",
    h1: "The thing that fails first, fixed properly.",
    lead: "An inverter is the hardest-working part of a solar system and the one most likely to stop. Repair is often possible; replacement is sometimes smarter. We tell you which.",
    hero: {
      image: "/images/svc-inverter-replacement.webp",
      alt: "A solar inverter mounted on an exterior wall",
    },
    chips: ["Any brand", "Repair or replace", "Written report"],

    intro: {
      heading: "Repair, replace, or leave it alone",
      body: [
        "Panels routinely outlast the inverter attached to them. When yours starts faulting, the honest question is whether a repair buys you years or months, and that depends on the fault, the age and whether parts still exist for the model.",
        "We test the panels, isolators, wiring, inverter and battery, then tell you plainly which of the three answers applies. If replacement is the right call, it is also the moment to decide whether to go battery-ready, because doing it twice costs more than doing it once.",
      ],
      points: [
        "We test the whole system, not just the box that is complaining",
        "Repair where parts and age support it, replacement where they do not",
        "Firmware and monitoring app updated and demonstrated before we leave",
        "A written report, with any further work quoted rather than assumed",
      ],
      image: "/images/real-install-2.webp",
      imageAlt: "An installer working on solar equipment at a property",
    },

    features: [
      { title: "Any brand, any installer", line: "We work on systems we installed and systems we did not. You do not need to find whoever put it in." },
      { title: "Diagnosis before quoting", line: "We find the actual fault first. Replacing an inverter that was not the problem is an expensive way to not fix anything." },
      { title: "Battery-ready if you replace", line: "If the unit is being changed anyway, a hybrid inverter costs little more now and saves a second job later." },
      { title: "Firmware and app", line: "Updated and working before we leave, because an inverter you cannot monitor is one that fails quietly next time." },
      { title: "A written report", line: "What we found, what we did, and anything else worth watching, in writing rather than mentioned at the van." },
      { title: "Warranty claims handled", line: "If the unit is still in its manufacturer warranty, we deal with the claim rather than leaving it with you." },
    ],

    brands: ["Sungrow", "GoodWe", "SolarEdge", "Delta"],
    showRebates: false,

    faqs: [
      { q: "How do I know if my inverter has failed?", a: "The usual signs are a red or flashing fault light, no output on a sunny day, the monitoring app showing nothing or showing zeros, or an error code on the display. Any of those is worth a call before it becomes a longer outage." },
      { q: "Is it cheaper to repair or replace?", a: "It depends on the fault, the age and whether parts are still made. A five-year-old unit with a known fault is often worth repairing. A twelve-year-old one with no parts available is not. We tell you which you have." },
      { q: "Do you work on systems you did not install?", a: "Yes, most of this work is on other people's installations. We will tell you honestly what we find, including when the original work was done well." },
      { q: "Will I lose my rebate if I replace the inverter?", a: "A like-for-like replacement generally does not create new certificates, and it does not take away the discount already applied to the original install. If you add capacity at the same time, that part may qualify. We check before quoting." },
      { q: "How long will I be without solar?", a: "Usually a day or less once the part is on hand. The waiting time is normally parts availability rather than labour, and we tell you that timeline up front." },
    ],
    related: ["service-health-check", "battery-for-existing-solar", "residential-solar"],
  },

  /* ------------------------------------------------------------------ */
  "service-health-check": {
    slug: "service-health-check",
    label: "Service & Health Check",
    seoTitle: "Solar System Service & Health Check | Melbourne & Sydney",
    seoDescription:
      "A full test of your solar system: panels, isolators, wiring, inverter and battery, with a written report. For systems we installed and systems installed by others.",
    eyebrow: "Service and health check",
    h1: "Find out what your system is actually doing.",
    lead: "Most solar faults are quiet. Output drifts down, one string stops, a breaker trips and nothing tells you. A health check is how you find that before the bill does.",
    hero: {
      image: "/images/real-install-3.webp",
      alt: "Solar panels on a rooftop being inspected",
    },
    chips: ["Any system", "Written report", "Ours or someone else's"],

    intro: {
      heading: "What gets checked",
      body: [
        "A solar system has no dashboard warning light. A failed isolator, a disconnected string or a degraded panel will not announce itself; it just quietly produces less, and most households do not notice until a quarterly bill is higher than it should be.",
        "We test the panels, isolators, wiring, inverter and battery, check the monitoring is actually reporting, and give you a written report of what we found. Anything that needs work is quoted separately, so the check itself is a diagnosis rather than a sales visit.",
      ],
      points: [
        "Panels, isolators, wiring, inverter and battery all tested",
        "Monitoring and firmware checked, updated and demonstrated",
        "A written report of what was found, not a verbal summary",
        "Further work quoted separately, never assumed",
      ],
      image: "/images/installer-field.webp",
      imageAlt: "An installer inspecting equipment on site",
    },

    features: [
      { title: "For any system", line: "Ours or someone else's. A system installed by a company that no longer exists is one of the more common reasons people call." },
      { title: "Diagnosis, not a sales visit", line: "The report says what we found. Anything that needs doing is quoted separately so you can take it elsewhere if you want." },
      { title: "Safety first", line: "DC isolators are the single most common failure point on Australian roofs, and a failed one is a fire risk rather than a performance problem." },
      { title: "Performance against expectation", line: "We compare what the system is producing with what it should produce, which is how quiet degradation gets caught." },
      { title: "Monitoring restored", line: "If the app stopped reporting months ago, that gets fixed, because it is your early warning for everything else." },
      { title: "Before you sell, or after you buy", line: "A health check is worth having when a house with solar on it changes hands in either direction." },
    ],

    brands: ["Sungrow", "GoodWe", "SolarEdge", "Alpha ESS", "LG Energy Solution"],
    showRebates: false,

    faqs: [
      { q: "How often should a solar system be checked?", a: "Every two to three years for most systems, and sooner if output has dropped, the monitoring has stopped reporting, or the system is over about eight years old. Battery systems benefit from a slightly shorter interval." },
      { q: "Will you service a system you did not install?", a: "Yes. A good share of this work is on other companies' installations, including ones where the original installer is no longer trading." },
      { q: "What if you find something wrong?", a: "You get it in the report with a separate quote for the fix. There is no obligation to have us do that work, and we would rather you got a second opinion than felt cornered." },
      { q: "Is a health check worth it if nothing seems wrong?", a: "Often, yes, because the faults that matter most are the ones that do not announce themselves. A failed DC isolator is a safety issue long before it is a performance one." },
      { q: "Do you check the battery too?", a: "Yes, where one is fitted: state of health, charge and discharge behaviour, and whether the backup circuits still do what they were set up to do." },
    ],
    related: ["inverter-repair", "battery-for-existing-solar", "residential-solar"],
  },

  /* ------------------------------------------------------------------ */
  "heating-and-cooling": {
    slug: "heating-and-cooling",
    label: "Heating & Cooling",
    seoTitle: "Reverse-Cycle Heating & Cooling | Melbourne & Sydney",
    seoDescription:
      "Reverse-cycle split systems installed by ARCtick-licensed technicians. Run them on your own solar in daylight and cut the biggest seasonal load in the house.",
    eyebrow: "Heating and cooling",
    h1: "The cheapest heating you can run on your own power.",
    lead: "A reverse-cycle system moves heat rather than making it, which is why it costs a fraction of what resistive heating does. Run it in daylight and it costs less again.",
    hero: {
      image: "/images/svc-heat-pump.webp",
      alt: "A reverse-cycle split system unit mounted on a wall",
    },
    chips: ["ARCtick-licensed", "Runs on your solar", "Heating and cooling"],

    intro: {
      heading: "Why it pairs with solar",
      body: [
        "A reverse-cycle system is a heat pump. In winter it moves heat from the outside air into your house; in summer it moves it the other way. Because it is moving heat rather than generating it, it delivers several units of heating for every unit of electricity it draws.",
        "That electricity is the point. Heating and cooling is usually the largest seasonal load in a house, and it runs hardest in the middle of the day in summer, which is exactly when your panels are producing most. Pairing the two is the difference between a system that pays for itself and one that just exports cheaply.",
      ],
      points: [
        "Installed by ARCtick-licensed technicians, which is a legal requirement",
        "Sized to the room and the construction, not to a catalogue number",
        "Scheduled to run on daylight solar where your routine allows",
        "Existing gas or electric systems decommissioned properly",
      ],
      image: "/images/pool-intro.webp",
      imageAlt: "A home interior with climate control",
    },

    features: [
      { title: "ARCtick-licensed", line: "Refrigerant handling is licensed work in Australia. Anyone installing a split system without that licence is working illegally." },
      { title: "Sized to the room", line: "An undersized unit runs flat out and never gets there; an oversized one short-cycles and wastes power. Both are common and both are avoidable." },
      { title: "Timed to your solar", line: "Pre-cooling or pre-heating during daylight uses power you generated rather than power you bought." },
      { title: "Replaces gas", line: "Moving off gas heating removes a standing supply charge as well as the usage, which is often the larger saving." },
      { title: "One trade, one visit", line: "If solar, hot water and climate are all being looked at, they get planned together rather than as three separate jobs." },
      { title: "Incentives checked", line: "Efficiency upgrade schemes cover eligible replacements in both states. We check what applies before quoting." },
    ],

    brands: ["Sungrow", "GoodWe"],
    showRebates: true,

    faqs: [
      { q: "Is reverse-cycle cheaper than gas heating?", a: "In most Victorian and NSW homes, yes, and the gap widens once you remove the gas supply charge. A reverse-cycle system delivers several units of heat per unit of electricity, where gas delivers less than one." },
      { q: "Can I run it on solar?", a: "Through the day, largely yes, especially for cooling, which peaks when your panels do. Evening heating will draw from the grid or from a battery unless you pre-heat during daylight." },
      { q: "What is ARCtick and why does it matter?", a: "It is the licence required in Australia to handle refrigerant. Installation by an unlicensed person is illegal, voids the manufacturer warranty and is not something any insurer will look kindly on." },
      { q: "Do I need one unit per room?", a: "Not necessarily. A single well-placed split system can serve an open-plan area. Separate bedrooms usually need their own, or a ducted system. We size it on the layout rather than on room count." },
      { q: "Is there a rebate?", a: "Victorian Energy Upgrades and the NSW Energy Savings Scheme both cover eligible efficient replacements, generally where you are replacing an existing system. We confirm what applies to you in writing." },
    ],
    related: ["heat-pump-hot-water", "residential-solar", "solar-batteries"],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_PAGES);
export const getService = (slug) => SERVICE_PAGES[slug] || null;

// Slugs that live at a nested URL rather than the site root.
export const NESTED_SERVICE_URLS = {
  "tesla-powerwall": "/solar-batteries/tesla-powerwall",
};
export const serviceUrl = (slug) => NESTED_SERVICE_URLS[slug] || `/${slug}`;
