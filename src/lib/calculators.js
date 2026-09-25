// Calculators.
//
// ============================================================================
// THE RULE THAT SHAPES EVERY ONE OF THESE
// ============================================================================
// Lumenx does not publish prices, and no pricing assumption has been invented
// here. So none of these tools tells a visitor what solar costs, and none of
// them produces a savings figure out of thin air.
//
// Instead every dollar input comes from the VISITOR'S OWN paperwork:
//
//   • usage tariff and feed-in rate      -> printed on their electricity bill
//   • quarterly kWh or quarterly spend   -> printed on their electricity bill
//   • system price, for payback          -> a quote they have already received
//
// The calculators do arithmetic on those numbers. That makes them genuinely
// useful (nobody else does the maths for you) and factually defensible (every
// input is the visitor's, and every assumption is named on the page).
//
// The one thing that is ours rather than theirs is the generation estimate, and
// it uses exactly two documented assumptions, both surfaced on every page:
//
//   1. Peak sun hours per city  -> the same approximate long-run averages used
//      on the location pages. Labelled approximate everywhere they appear.
//   2. Performance ratio 0.80   -> the conventional derating for inverter
//      losses, cabling, temperature, soiling and orientation. Industry standard,
//      and stated plainly rather than buried.
//
// The rebate tool is deliberately an ELIGIBILITY CHECKER, not a dollar
// estimator, because rebate amounts change mid-year and a stale figure is a
// misleading claim under the CEC and NETCC codes Lumenx has signed.
// ============================================================================

export const PERFORMANCE_RATIO = 0.8;
export const PANEL_WATTS = 440;
export const M2_PER_PANEL = 2.0;

/** Approximate daily peak sun hours. Matches src/lib/locations.js. */
export const SUN_HOURS = [
  { city: "Melbourne", hours: 3.6 },
  { city: "Geelong", hours: 3.7 },
  { city: "Ballarat", hours: 3.6 },
  { city: "Bendigo", hours: 3.9 },
  { city: "Sydney", hours: 4.2 },
];

export const sunFor = (city) =>
  (SUN_HOURS.find((s) => s.city === city) || SUN_HOURS[0]).hours;

/** Annual generation in kWh for a system size in a given city. */
export const annualKwh = (kw, city) =>
  kw * sunFor(city) * 365 * PERFORMANCE_RATIO;

export const panelsFor = (kw) => Math.max(1, Math.round(kw / (PANEL_WATTS / 1000)));
export const roofAreaFor = (kw) => Math.round(panelsFor(kw) * M2_PER_PANEL);

const money = (n) =>
  "$" + Math.round(n).toLocaleString("en-AU");
const kwh = (n) => Math.round(n).toLocaleString("en-AU") + " kWh";
// Kept short on purpose: this string lands in the display-size headline, and a
// long one overflows the results panel at 320px.
const yrs = (n) =>
  !isFinite(n) || n <= 0 ? "n/a" : n >= 100 ? "100+ years" : n.toFixed(1) + " years";

const CITY_OPTIONS = SUN_HOURS.map((s) => s.city);

/* Shared input definitions, so the same field means the same thing everywhere. */
const F = {
  city: {
    key: "city",
    label: "Closest city",
    type: "select",
    options: CITY_OPTIONS,
    default: "Melbourne",
    // Shown beside each option in the list, so the number that drives the
    // whole calculation is visible at the moment the choice is made.
    meta: (city) => `${sunFor(city)} hrs`,
    help: "Sets the peak sun hours used in the generation estimate.",
  },
  kw: {
    key: "kw",
    label: "System size",
    type: "number",
    unit: "kW",
    default: 6.6,
    min: 1,
    max: 100,
    step: 0.1,
    help: "If you are not sure yet, try the system size calculator first.",
  },
  usageRate: {
    key: "usageRate",
    label: "What you pay for power",
    type: "number",
    unit: "c/kWh",
    default: "",
    min: 1,
    max: 200,
    step: 0.1,
    required: true,
    help: "On your bill, usually called the usage or consumption rate.",
  },
  fitRate: {
    key: "fitRate",
    label: "Your feed-in tariff",
    type: "number",
    unit: "c/kWh",
    default: "",
    min: 0,
    max: 100,
    step: 0.1,
    required: true,
    help: "On your bill, the rate you are credited for power you export.",
  },
  dayShare: {
    key: "dayShare",
    label: "Power you use during daylight hours",
    type: "range",
    unit: "%",
    default: 35,
    min: 5,
    max: 95,
    step: 5,
    help: "Working from home, a pool pump or ducted cooling pushes this up. Out all day pushes it down.",
  },
  quarterKwh: {
    key: "quarterKwh",
    label: "Your quarterly usage",
    type: "number",
    unit: "kWh",
    default: "",
    min: 1,
    max: 100000,
    step: 1,
    required: true,
    help: "On your bill, the total kWh for the billing period. Use kWh, not dollars, if it is printed.",
  },
};

/* ============================================================================
   1. Savings estimator
   ========================================================================= */
const savings = {
  slug: "solar-savings-calculator",
  label: "Solar Savings Calculator",
  nav: "Savings",
  seoTitle: "Solar Savings Calculator | Use Your Own Bill | Lumenx",
  seoDescription:
    "Work out what a solar system would be worth to you using the tariff and feed-in rate printed on your own electricity bill. No invented prices.",
  eyebrow: "Calculator",
  h1: "What solar would actually be worth on your bill.",
  lead: "Most savings calculators pick their own electricity price and hand you a big number. This one uses the rates printed on your bill, so the answer is about your household rather than an average one.",
  chips: ["Uses your own tariff", "No price assumptions", "Shows the working"],
  cta: "Get this quoted properly",
  inputs: [F.city, F.kw, F.usageRate, F.fitRate, F.dayShare],

  compute(v) {
    const gen = annualKwh(v.kw, v.city);
    const self = gen * (v.dayShare / 100);
    const exported = gen - self;
    const offset = (self * v.usageRate) / 100;
    const credit = (exported * v.fitRate) / 100;
    const total = offset + credit;

    return {
      headline: money(total),
      headlineLabel: "estimated benefit in year one",
      rows: [
        { k: "Generated over a year", v: kwh(gen) },
        { k: "Used in your home", v: kwh(self) },
        { k: "Exported to the grid", v: kwh(exported) },
        { k: "Bill offset from what you use", v: money(offset), strong: true },
        { k: "Credit for what you export", v: money(credit), strong: true },
        { k: "Per quarter, on average", v: money(total / 4) },
      ],
      note:
        v.usageRate > v.fitRate
          ? `Every kilowatt hour you use yourself instead of exporting is worth ${((v.usageRate - v.fitRate) / 100).toFixed(2)} dollars more to you. That is why timing matters as much as system size.`
          : "Your feed-in rate is at or above your usage rate, which is unusual. Double check both figures on your bill.",
    };
  },

  assumptions: [
    "Generation uses your city's approximate long-run peak sun hours and a performance ratio of 0.80, the conventional allowance for inverter losses, cabling, temperature, soiling and orientation.",
    "It assumes an unshaded, reasonably north-facing roof. Shading or a poor orientation reduces the figure, sometimes substantially.",
    "It is a year-one estimate. Panels degrade slowly and tariffs change, so later years will differ.",
    "It does not include the daily supply charge, which you pay whether or not you have solar.",
  ],
  faqs: [
    {
      q: "Why does this not tell me the payback period?",
      a: "Because that needs a price, and we do not publish one. If you already have a quote, put its figure into the payback calculator and it will do the rest.",
    },
    {
      q: "Where do I find my usage rate and feed-in tariff?",
      a: "Both are on your electricity bill, usually on the page that breaks down the charges. The usage rate is in cents per kWh, and the feed-in tariff is the credit you get for exported power.",
    },
    {
      q: "How accurate is this?",
      a: "It is arithmetic on real inputs, which makes it far more honest than a calculator that guesses your tariff. It is still an estimate: your roof's pitch, orientation and shading are not in it. We model those properly when we quote.",
    },
  ],
  related: ["solar-system-size-calculator", "solar-payback-calculator", "feed-in-tariff-calculator"],
};

/* ============================================================================
   2. System size calculator
   ========================================================================= */
const sizing = {
  slug: "solar-system-size-calculator",
  label: "Solar System Size Calculator",
  nav: "System size",
  seoTitle: "Solar System Size Calculator | What kW Do I Need? | Lumenx",
  seoDescription:
    "Work out what size solar system suits your usage, in kW, panel count and roof space. Based on the kWh on your own bill.",
  eyebrow: "Calculator",
  h1: "What size system does your house actually need?",
  lead: "Oversize it and you export power for a few cents. Undersize it and you keep buying at full price. This works backwards from the usage on your bill.",
  chips: ["Sized from your usage", "Panel count and roof area", "Two honest answers"],
  cta: "Have this sized properly",
  inputs: [
    F.city,
    F.quarterKwh,
    F.dayShare,
    {
      key: "roofM2",
      label: "Usable north-facing roof space",
      type: "number",
      unit: "m²",
      default: "",
      min: 0,
      max: 2000,
      step: 1,
      help: "Optional. Leave blank if you do not know. Rough guess is fine.",
    },
  ],

  compute(v) {
    const annual = v.quarterKwh * 4;
    const daily = annual / 365;
    const perKw = sunFor(v.city) * 365 * PERFORMANCE_RATIO;

    const coverDay = (annual * (v.dayShare / 100)) / perKw;
    const coverAll = annual / perKw;

    const roofCap = v.roofM2 > 0 ? (v.roofM2 / M2_PER_PANEL) * (PANEL_WATTS / 1000) : null;
    const capped = roofCap !== null && coverAll > roofCap;
    const recommend = capped ? Math.min(coverAll, roofCap) : coverAll;

    const rows = [
      { k: "Your usage over a year", v: kwh(annual) },
      { k: "Average per day", v: kwh(daily) },
      { k: "To cover daytime usage only", v: coverDay.toFixed(1) + " kW" },
      { k: "To cover total usage across the year", v: coverAll.toFixed(1) + " kW", strong: true },
      { k: "Panels at that size", v: `${panelsFor(recommend)} × ${PANEL_WATTS}W` },
      { k: "Roof space needed", v: `about ${roofAreaFor(recommend)} m²` },
    ];
    if (roofCap !== null) {
      rows.splice(4, 0, { k: "Most your roof will fit", v: roofCap.toFixed(1) + " kW" });
    }

    return {
      headline: recommend.toFixed(1) + " kW",
      headlineLabel: capped ? "the most your roof will take" : "a sensible starting size",
      rows,
      note: capped
        ? "Your usage would justify a larger system than your roof will hold. Storage or load shifting is usually the better next move here."
        : "The honest answer is usually between these two numbers. Sizing to total usage costs more up front but exports the surplus; sizing to daytime usage exports almost nothing. Which is right depends on your feed-in tariff and whether a battery is coming.",
    };
  },

  assumptions: [
    `Panel count assumes ${PANEL_WATTS}W modules and roughly ${M2_PER_PANEL} m² of roof per panel, including spacing.`,
    "Generation uses your city's approximate peak sun hours and a performance ratio of 0.80.",
    "It assumes unshaded, reasonably north-facing roof space. Complex or shaded roofs fit less and produce less.",
    "Quarterly usage is multiplied by four. If your summer and winter quarters differ a lot, use an average quarter rather than your worst one.",
  ],
  faqs: [
    {
      q: "My bill only shows dollars, not kWh.",
      a: "Look again on the charges breakdown page, where the kWh for the period is almost always printed. If it genuinely is not there, divide your usage charge by your usage rate in cents and multiply by 100.",
    },
    {
      q: "Should I size to my daytime usage or my total usage?",
      a: "It depends on your feed-in tariff and whether you plan to add a battery. A low feed-in tariff and no battery plans argues for the smaller number. A battery, an electric car or a pool argues for the larger one.",
    },
    {
      q: "Is bigger always better?",
      a: "No. Beyond the point where you consume it or store it, extra generation earns only your feed-in rate, which is usually a fraction of what you pay. That is the whole reason sizing matters.",
    },
  ],
  related: ["solar-savings-calculator", "solar-battery-calculator", "solar-payback-calculator"],
};

/* ============================================================================
   3. Battery calculator
   ========================================================================= */
const battery = {
  slug: "solar-battery-calculator",
  label: "Solar Battery Calculator",
  nav: "Battery size",
  seoTitle: "Solar Battery Size Calculator | How Many kWh? | Lumenx",
  seoDescription:
    "Work out what size home battery suits your evening usage, and whether your solar system is big enough to charge it.",
  eyebrow: "Calculator",
  h1: "How much battery do your evenings actually need?",
  lead: "A battery is not sized from your roof, it is sized from what you use after dark. This checks both halves: what you need to store, and whether your solar can fill it.",
  chips: ["Sized from evening usage", "Checks your solar can fill it", "No price guesswork"],
  cta: "Get storage quoted",
  inputs: [
    F.city,
    F.quarterKwh,
    {
      key: "eveningShare",
      label: "Power you use outside daylight hours",
      type: "range",
      unit: "%",
      default: 60,
      min: 10,
      max: 95,
      step: 5,
      help: "For most households this is the bigger share. Evening cooking, heating, TV and hot water all land here.",
    },
    { ...F.kw, label: "Your solar system size", help: "Existing or planned. This is what has to charge the battery." },
    {
      key: "dod",
      label: "Usable depth of discharge",
      type: "range",
      unit: "%",
      default: 90,
      min: 60,
      max: 100,
      step: 5,
      help: "Most lithium batteries publish a usable figure around 90 percent of nameplate.",
    },
  ],

  compute(v) {
    const annual = v.quarterKwh * 4;
    const dailyUse = annual / 365;
    const evening = dailyUse * (v.eveningShare / 100);
    const nameplate = evening / (v.dod / 100);

    const dailyGen = annualKwh(v.kw, v.city) / 365;
    const surplus = dailyGen - (dailyUse - evening);
    const canFill = surplus >= evening;

    return {
      headline: nameplate.toFixed(1) + " kWh",
      headlineLabel: "nameplate capacity to cover a typical evening",
      rows: [
        { k: "Your usage per day", v: kwh(dailyUse) },
        { k: "Used outside daylight", v: kwh(evening), strong: true },
        { k: "Usable capacity needed", v: evening.toFixed(1) + " kWh" },
        { k: "Nameplate at that depth of discharge", v: nameplate.toFixed(1) + " kWh", strong: true },
        { k: "Your solar generates per day", v: kwh(dailyGen) },
        { k: "Surplus available to charge it", v: kwh(Math.max(0, surplus)) },
      ],
      note: canFill
        ? "Your solar generates enough daytime surplus to fill a battery this size on an average day. Winter days will fall short, which is normal and why a battery does not take you off grid."
        : "Your solar does not produce enough daytime surplus to fill a battery this size on an average day, so it would rarely reach full charge. Either a smaller battery or more panels is the better spend.",
    };
  },

  assumptions: [
    "Daily usage is your quarterly kWh divided evenly across the year. Real usage swings with the season, and winter is when storage is tightest.",
    "Generation uses your city's approximate peak sun hours and a performance ratio of 0.80.",
    "It assumes the battery cycles once a day. Round-trip efficiency losses of a few percent are not modelled.",
    "It does not size for blackout backup. Backup changes the wiring and the equipment, not just the capacity, so tell us if it matters to you.",
  ],
  faqs: [
    {
      q: "Does this tell me whether a battery is worth it?",
      a: "Not on its own, because that needs a price. It tells you what size you would need and whether your solar can actually fill it, which are the two questions people get wrong before price even comes up.",
    },
    {
      q: "Why does depth of discharge matter?",
      a: "Because a battery's nameplate capacity is not all usable. Most manufacturers publish a usable figure, and it is the usable figure that has to cover your evening.",
    },
    {
      q: "Will a battery get me off the grid?",
      a: "Realistically, no. Going off grid needs several days of storage and a much larger array, and for a grid-connected home it is rarely the sensible spend. A battery shifts your solar into the evening, which is a different and much better value proposition.",
    },
  ],
  related: ["solar-system-size-calculator", "solar-savings-calculator", "solar-rebate-eligibility"],
};

/* ============================================================================
   4. Payback calculator, driven by a quote the visitor already holds
   ========================================================================= */
const payback = {
  slug: "solar-payback-calculator",
  label: "Solar Payback Calculator",
  nav: "Payback",
  seoTitle: "Solar Payback Calculator | Check Any Quote | Lumenx",
  seoDescription:
    "Enter the price on a solar quote you have already received and see its real payback period, using the tariffs on your own bill.",
  eyebrow: "Calculator",
  h1: "Check the payback on a quote you have already been given.",
  lead: "We will not invent a price to make this look good. Put in the figure from any quote, ours or someone else's, and this tells you what it actually pays back at your tariffs.",
  chips: ["Works on any quote", "Your tariffs, your numbers", "Compare quotes fairly"],
  cta: "Get a quote to compare",
  inputs: [
    {
      key: "price",
      label: "The price on your quote",
      type: "number",
      unit: "$",
      default: "",
      min: 1,
      max: 1000000,
      step: 1,
      required: true,
      help: "The figure you would actually pay, after any rebate has been deducted.",
    },
    F.city,
    F.kw,
    F.usageRate,
    F.fitRate,
    F.dayShare,
  ],

  compute(v) {
    const gen = annualKwh(v.kw, v.city);
    const self = gen * (v.dayShare / 100);
    const exported = gen - self;
    const annual = (self * v.usageRate) / 100 + (exported * v.fitRate) / 100;
    const years = annual > 0 ? v.price / annual : Infinity;

    return {
      headline: yrs(years),
      headlineLabel: "simple payback at these figures",
      rows: [
        { k: "Price you entered", v: money(v.price) },
        { k: "Benefit per year", v: money(annual), strong: true },
        { k: "Simple payback", v: yrs(years), strong: true },
        { k: "Net position after 10 years", v: money(annual * 10 - v.price) },
        { k: "Net position after 15 years", v: money(annual * 15 - v.price) },
        { k: "Net position after 25 years", v: money(annual * 25 - v.price) },
      ],
      note:
        years > 12
          ? "A payback beyond about twelve years is worth questioning. Either the price is high for the size, the system is bigger than your usage justifies, or your feed-in tariff is doing too much of the work. Any of those is worth a second quote."
          : "This is a simple payback: it does not discount future money, and it assumes your tariffs hold. Treat it as a way to compare quotes against each other rather than as a precise forecast.",
    };
  },

  assumptions: [
    "Simple payback, with no discounting of future cash flows and no allowance for tariff changes.",
    "Generation uses your city's approximate peak sun hours and a performance ratio of 0.80.",
    "Panel degradation is not modelled. Most manufacturers warrant around 0.5 percent loss a year, so later years produce slightly less.",
    "It assumes the price you entered is the price after any rebate. If your quote shows the rebate separately, subtract it first.",
    "Inverter replacement toward the end of the period is not included.",
  ],
  faqs: [
    {
      q: "Why do you not just tell me your price?",
      a: "Because a price that ignores your roof, your switchboard, your access and your rebate eligibility is not a quote, it is bait. We will give you a real figure in writing once we know those things.",
    },
    {
      q: "Can I use this on a competitor's quote?",
      a: "Yes, and we would encourage it. If a quote looks poor against your own tariffs, that is worth knowing before you sign, whoever wrote it.",
    },
    {
      q: "What is a reasonable payback?",
      a: "It varies with your usage pattern and tariffs, which is exactly why we would rather you calculated yours than read an average off a website. What we will say is that a very long payback usually means the system is not matched to the household.",
    },
  ],
  related: ["solar-savings-calculator", "solar-system-size-calculator", "solar-rebate-eligibility"],
};

/* ============================================================================
   5. Feed-in tariff calculator
   ========================================================================= */
const feedIn = {
  slug: "feed-in-tariff-calculator",
  label: "Feed-in Tariff Calculator",
  nav: "Feed-in tariff",
  seoTitle: "Feed-in Tariff Calculator | What Exporting Earns | Lumenx",
  seoDescription:
    "See what your exported solar actually earns at your feed-in tariff, and what each exported kilowatt hour costs you compared with using it.",
  eyebrow: "Calculator",
  h1: "What your exported power is really worth.",
  lead: "Feed-in tariffs have fallen a long way. This shows what yours earns, and what you give up every time a kilowatt hour leaves your roof instead of running something in your house.",
  chips: ["The export gap, quantified", "Your own rates", "Shows what to shift"],
  cta: "Talk about self-consumption",
  inputs: [F.city, F.kw, F.dayShare, F.usageRate, F.fitRate],

  compute(v) {
    const gen = annualKwh(v.kw, v.city);
    const self = gen * (v.dayShare / 100);
    const exported = gen - self;
    const credit = (exported * v.fitRate) / 100;
    const gap = Math.max(0, v.usageRate - v.fitRate) / 100;
    const forgone = exported * gap;
    const perTenPct = gen * 0.1 * gap;

    return {
      headline: money(credit),
      headlineLabel: "export credit over a year",
      rows: [
        { k: "Generated over a year", v: kwh(gen) },
        { k: "Exported", v: kwh(exported) },
        { k: "Credited at your feed-in tariff", v: money(credit), strong: true },
        { k: "Gap between using and exporting", v: (gap * 100).toFixed(1) + " c/kWh" },
        { k: "Value left on the table by exporting", v: money(forgone), strong: true },
        { k: "Worth of shifting 10% more to daytime", v: money(perTenPct) },
      ],
      note:
        gap > 0
          ? `Shifting load into daylight is worth ${(gap * 100).toFixed(1)} cents for every kilowatt hour you move. Running the dishwasher, the pool pump and hot water during the day, or storing the surplus, is where the real money is.`
          : "Your feed-in tariff matches or exceeds your usage rate, which is unusual. If that is right, exporting costs you nothing, but check both figures on your bill.",
    };
  },

  assumptions: [
    "Generation uses your city's approximate peak sun hours and a performance ratio of 0.80.",
    "It uses a single flat usage rate. If you are on time-of-use pricing, the gap between using and exporting varies through the day and is usually wider at peak.",
    "Some retailers pay a tiered feed-in tariff that drops after a daily threshold. If yours does, this will be optimistic.",
    "It does not model a battery. Storage is the other way to close the same gap.",
  ],
  faqs: [
    {
      q: "Why has my feed-in tariff dropped?",
      a: "Because so much solar now exports in the middle of the day that wholesale prices in those hours have collapsed, and in some periods go negative. Feed-in tariffs follow that. It is the main reason self-consumption and storage now matter more than system size.",
    },
    {
      q: "Should I stop exporting?",
      a: "No. Export credit is still money, and the alternative is throwing the generation away. The point is that using or storing that power is worth considerably more, so it is worth shifting what you reasonably can.",
    },
    {
      q: "What is the easiest load to shift?",
      a: "Hot water, by a distance, because a heat pump can be scheduled to run in the middle of the day. After that, pool pumps, dishwashers, washing machines and charging an electric car.",
    },
  ],
  related: ["solar-savings-calculator", "solar-battery-calculator", "solar-payback-calculator"],
};

export const CALCULATORS = [savings, sizing, battery, payback, feedIn];
export const CALCULATOR_SLUGS = CALCULATORS.map((c) => c.slug);
export const getCalculator = (slug) => CALCULATORS.find((c) => c.slug === slug) || null;

/* ============================================================================
   Tools hub
   ========================================================================= */
export const TOOLS_HUB = {
  seoTitle: "Solar Calculators & Tools | Lumenx",
  seoDescription:
    "Free solar calculators that run on the numbers from your own bill: savings, system size, battery size, payback and feed-in tariff, plus a rebate eligibility check.",
  eyebrow: "Tools",
  h1: "Calculators that use your numbers, not ours.",
  lead: "Every solar site has a savings calculator that picks its own electricity price and produces a flattering answer. These ask for the rates on your bill instead, and they show every assumption they make.",
  hero: {
    image: "/images/family-solar.webp",
    alt: "A home with rooftop solar in afternoon light",
  },
  chips: ["Free, no email required", "Runs on your own bill", "Assumptions shown"],

  intro: {
    heading: "Why ours look different to everyone else's",
    body: [
      "A solar savings calculator has one job people actually care about, and almost all of them fail it: they guess your electricity price. Guess high and the savings look enormous. Guess your feed-in tariff generously and exporting looks lucrative. Neither tells you anything about your house.",
      "So none of these ask for your email before showing a result, none of them invent a system price, and the payback tool works on a quote you already hold rather than a number we made up. Where we do assume something, such as peak sun hours or the standard 0.80 performance ratio, it is printed on the page next to the answer.",
    ],
    points: [
      "No email gate. The result appears as you type",
      "Every dollar input comes from your bill or your quote",
      "Assumptions listed on every calculator, not buried",
      "The rebate tool checks eligibility rather than guessing an amount",
    ],
    image: "/images/real-install-3.webp",
    imageAlt: "A completed Lumenx installation on a residential rooftop",
  },

  faqs: [
    {
      q: "Do I have to give you my email to see a result?",
      a: "No. Nothing here is gated. The calculators run in your browser and the numbers you type are not sent to us.",
    },
    {
      q: "How accurate are these?",
      a: "The arithmetic is exact. The inputs are yours, which is what makes them worth more than an average. The one estimate is generation, which uses your city's approximate peak sun hours and the standard performance ratio, and assumes an unshaded roof with reasonable orientation.",
    },
    {
      q: "Why is there no price calculator?",
      a: "Because a price that ignores your roof, your switchboard, your access and your rebate eligibility would be fiction. We give you a real, itemised figure in writing once we know those things.",
    },
    {
      q: "Can I use these on a quote from another company?",
      a: "Yes. The payback calculator is built for exactly that. If a quote looks poor at your own tariffs, you are better off knowing before you sign.",
    },
  ],
};

/* ============================================================================
   6. Rebate eligibility checker.
   Deliberately not a dollar estimator. See the note at the top of this file.
   ========================================================================= */
export const REBATE_CHECK = {
  slug: "solar-rebate-eligibility",
  label: "Rebate Eligibility Check",
  nav: "Rebate eligibility",
  seoTitle: "Solar Rebate Eligibility Check | VIC & NSW | Lumenx",
  seoDescription:
    "Find out which solar, battery and hot water rebate programs may apply to you in Victoria or New South Wales, and what is needed to claim them.",
  eyebrow: "Eligibility check",
  h1: "Which rebate programs apply to you?",
  lead: "This tells you which programs are worth pursuing and what each one needs. It does not put a dollar figure on them, because those change through the year and a stale number is worse than no number.",
  chips: ["Programs, not guesses", "Victoria and New South Wales", "Confirmed in writing"],

  questions: [
    {
      key: "state",
      label: "Where is the property?",
      options: ["Victoria", "New South Wales"],
      default: "Victoria",
    },
    {
      key: "propertyType",
      label: "What kind of property?",
      options: ["Owner occupied home", "Rental property", "Business premises"],
      default: "Owner occupied home",
    },
    {
      key: "installing",
      label: "What are you looking at installing?",
      options: ["Solar panels", "A home battery", "Heat pump hot water", "Solar and a battery together"],
      default: "Solar panels",
    },
    {
      key: "existingSolar",
      label: "Do you already have solar?",
      options: ["No", "Yes"],
      default: "No",
    },
    {
      key: "replacing",
      label: "What heats your water now?",
      options: ["Gas storage", "Electric storage", "Already a heat pump", "Not applicable"],
      default: "Not applicable",
    },
  ],

  /**
   * Returns the programs worth pursuing. Every entry describes what a program
   * DOES and what it needs. None of them names an amount.
   */
  evaluate(a) {
    const out = [];
    const wantsSolar = a.installing === "Solar panels" || a.installing === "Solar and a battery together";
    const wantsBattery = a.installing === "A home battery" || a.installing === "Solar and a battery together";
    const wantsHeatPump = a.installing === "Heat pump hot water";

    if (wantsSolar) {
      out.push({
        name: "Federal small-scale renewable energy scheme",
        status: "likely",
        line: "Applies nationally to eligible new solar installations and is delivered as a discount at the point of sale rather than claimed back later. We assign the certificates on your behalf.",
        needs: ["A Clean Energy Council accredited installer", "Approved panels and inverter", "Your installation address"],
      });
    }

    if (wantsBattery) {
      out.push({
        name: "Federal Cheaper Home Batteries program",
        status: "likely",
        line: "Applies nationally to eligible battery installations, introduced in 2025, and is the main reason storage economics changed. Applied as a discount on your quote.",
        needs: ["An approved, eligible battery", "Accredited installation", "Your installation address"],
      });
    }

    if (a.state === "Victoria" && wantsSolar && a.propertyType !== "Business premises") {
      out.push({
        name: "Solar Victoria solar panel programs",
        status: "check",
        line: "Solar Victoria runs programs for eligible Victorian households, including separate streams for rental properties. These run in limited rounds that open and close, and eligibility depends on your circumstances.",
        needs: ["A Solar Victoria authorised retailer, which we are", "Eligibility confirmation against your property and circumstances", "An open program round"],
      });
    }

    if (a.state === "Victoria" && a.propertyType === "Rental property") {
      out.push({
        name: "Solar for rentals stream",
        status: "check",
        line: "Victoria runs a separate stream for rental properties, which involves both the landlord and the tenant. Worth asking about specifically rather than assuming the standard program applies.",
        needs: ["Landlord consent", "Tenant agreement", "Eligibility confirmation"],
      });
    }

    if (wantsHeatPump && (a.replacing === "Gas storage" || a.replacing === "Electric storage")) {
      out.push({
        name: a.state === "Victoria" ? "Victorian Energy Upgrades, hot water" : "Energy savings scheme, hot water",
        status: "likely",
        line: `Efficiency upgrade schemes discount heat pump hot water through accredited providers when you are replacing an existing ${a.replacing.toLowerCase()} system. It comes off the price rather than being claimed back.`,
        needs: ["An existing electric or gas storage system being replaced", "An eligible heat pump model", "Decommissioning of the old unit, which we handle"],
      });
    }

    if (wantsHeatPump && a.replacing === "Already a heat pump") {
      out.push({
        name: "Hot water upgrade schemes",
        status: "unlikely",
        line: "These schemes are built around replacing an existing electric or gas storage system. Replacing a heat pump with another heat pump generally does not qualify, though a failed unit is worth asking about.",
        needs: ["Confirmation of what is currently installed"],
      });
    }

    if (wantsBattery && a.existingSolar === "No" && a.installing === "A home battery") {
      out.push({
        name: "Worth knowing before you go further",
        status: "note",
        line: "A battery without solar has very different economics, because there is no free surplus to store. If you are starting from scratch it is usually worth modelling solar and storage together.",
        needs: ["A recent bill, so we can model both options side by side"],
      });
    }

    if (a.propertyType === "Business premises") {
      out.push({
        name: "Business and commercial programs",
        status: "check",
        line: "Commercial installations sit under different programs to households, and the federal certificate scheme treats larger systems differently again. Worth a conversation rather than a checklist.",
        needs: ["Your interval data if you have it", "Site details and roof type"],
      });
    }

    return out;
  },

  faqs: [
    {
      q: "Why will you not tell me how much I will get?",
      a: "Because the amounts change, sometimes mid-year, and state programs run in limited rounds. A figure published on a website goes stale quietly, and a stale rebate figure is a misleading claim. We confirm your actual entitlement and show it as a deducted line on your quote.",
    },
    {
      q: "Do I lodge any of this myself?",
      a: "No. We check eligibility, apply the discount and lodge the paperwork as an accredited retailer. You get written confirmation of what was claimed on your behalf.",
    },
    {
      q: "Can programs be combined?",
      a: "Sometimes. Some combinations are specifically excluded and the rules change. This is exactly the sort of thing we check against your circumstances before quoting.",
    },
    {
      q: "What if a program closes before my installation?",
      a: "State programs are released in rounds and can close. We tell you up front what your quote depends on, and if a program becomes unavailable we re-quote honestly rather than absorbing the change quietly.",
    },
  ],
  related: ["solar-savings-calculator", "solar-system-size-calculator", "solar-battery-calculator"],
};

export const ALL_TOOL_SLUGS = [...CALCULATOR_SLUGS, REBATE_CHECK.slug];
