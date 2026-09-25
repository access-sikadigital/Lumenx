// Signature sections — one per service page.
//
// The point of these is that they cannot be swapped between pages. A battery
// page gets a day/night storage cycle; an inverter page gets a three-way
// comparison; an EV page gets charge speeds. If a section would make sense on
// another service, it belongs in the shared template instead of here.
//
// Numbers policy: nothing invented. Where a figure appears it is either
// Lumenx's own published data or a widely-accepted physical rate, labelled as
// approximate. Illustrative diagrams say they are illustrative.

export const SIGNATURES = {
  /* Residential keeps the system-size cards as its signature (see
     `options` in services.js) — that data is Lumenx's own published pricing. */
  "residential-solar": { type: "sizes" },

  /* ---------------------------------------------------------------- */
  "commercial-solar": {
    type: "loadCurve",
    eyebrow: "Why commercial works",
    heading: "Your business runs when the sun is up.",
    lead: "That single fact is what makes commercial solar pay. A home exports most of its midday generation for a few cents. A business consumes it, offsetting power it would otherwise buy at full commercial rates.",
    caption: "Illustrative daily shape. Your real curve comes from your interval data, which is the first thing we ask for.",
    legend: [
      { key: "gen", label: "Solar generation", tone: "yellow" },
      { key: "demand", label: "Business demand", tone: "white" },
      { key: "overlap", label: "Self-consumed", tone: "green" },
    ],
    notes: [
      { title: "Self-consumption is the return", line: "Every kilowatt hour you use as you generate it is bought at zero, not sold at a feed-in rate." },
      { title: "Shape beats size", line: "A system matched to your load curve outperforms a larger one that exports the surplus." },
      { title: "Peak demand matters too", line: "On demand-based tariffs, shaving your peak can be worth as much as the energy saved." },
    ],
  },

  /* ---------------------------------------------------------------- */
  "solar-batteries": {
    type: "dayCycle",
    eyebrow: "A day with storage",
    heading: "Where your power comes from, hour by hour.",
    lead: "Without a battery, the two halves of your day are disconnected: you generate when you are out, and you buy when you get home. Storage joins them up.",
    caption: "Illustrative pattern for a household that uses most of its power after work. Yours depends on your usage and system size.",
    phases: [
      {
        time: "Early morning",
        title: "Grid tops you up",
        line: "Before the sun is high, whatever is left in the battery covers you, and the grid fills any gap.",
        source: "Battery + grid",
        tone: "ink",
      },
      {
        time: "Midday",
        title: "Solar runs the house",
        line: "Generation exceeds what you use. The house runs free and the surplus charges the battery instead of exporting.",
        source: "Solar",
        tone: "yellow",
      },
      {
        time: "Evening peak",
        title: "Battery takes over",
        line: "Cooking, heating, lights and the EV all land in the most expensive tariff window. This is where a battery earns its keep.",
        source: "Battery",
        tone: "ember",
      },
      {
        time: "Overnight",
        title: "Coasting on stored power",
        line: "Standby load, fridge and hot water run on what you banked, with the grid only picking up the remainder.",
        source: "Battery",
        tone: "green",
      },
    ],
    compare: {
      heading: "What changes",
      rows: [
        { label: "Midday surplus", without: "Exported at a low feed-in rate", with: "Stored for the evening" },
        { label: "Evening peak", without: "Bought at the highest tariff", with: "Drawn from your own battery" },
        { label: "Blackout", without: "Lights out with everyone else", with: "Essential circuits keep running" },
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  "solar-inverters": {
    type: "compare",
    eyebrow: "Which type",
    heading: "Three ways to convert, and when each one wins.",
    lead: "There is no universally best inverter, only the right one for your roof and your plans. Here is how the three approaches actually differ.",
    columns: [
      {
        name: "String",
        tag: "The standard choice",
        line: "One inverter handles the whole array. Simple, proven and the most cost-effective option by a clear margin.",
        rows: [
          { k: "Best for", v: "Simple, unshaded roofs on one orientation" },
          { k: "Battery ready", v: "Not without adding equipment later" },
          { k: "Shading", v: "One weak panel drags its whole string" },
          { k: "Cost", v: "Lowest" },
        ],
        pick: "Choose this if your roof is clean and storage is genuinely not in your plans.",
      },
      {
        name: "Hybrid",
        tag: "Battery ready",
        featured: true,
        line: "Does everything a string inverter does, and also charges and discharges a battery without extra hardware.",
        rows: [
          { k: "Best for", v: "Anyone who may add storage" },
          { k: "Battery ready", v: "Yes, built in" },
          { k: "Shading", v: "Same as string unless optimised" },
          { k: "Cost", v: "Moderate" },
        ],
        pick: "Choose this if a battery is anywhere on your horizon. Fitting it now costs less than replacing later.",
      },
      {
        name: "Optimised",
        tag: "Per-panel control",
        line: "Optimisers or microinverters work on each panel individually, so one shaded panel no longer limits its neighbours.",
        rows: [
          { k: "Best for", v: "Shaded or multi-orientation roofs" },
          { k: "Battery ready", v: "Depends on the pairing" },
          { k: "Shading", v: "Handled panel by panel" },
          { k: "Cost", v: "Highest" },
        ],
        pick: "Choose this if trees, chimneys or dormers shade part of the array through the day.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  "ev-chargers": {
    type: "speeds",
    eyebrow: "Charging speed",
    heading: "The difference between plugged in and actually charged.",
    lead: "A standard power point technically charges an EV. It just takes most of a weekend to do what a proper charger does overnight.",
    caption:
      "Approximate range added per hour for a typical EV using roughly 16kWh per 100km. Your car's onboard charger, battery state and the weather all change the real figure.",
    items: [
      {
        name: "Standard power point",
        power: "~2.4 kW",
        rangePerHour: 15,
        overnight: "About 120km in 8 hours",
        line: "The cable that came with the car. Fine in an emergency, impractical as your daily method.",
        tone: "ink",
      },
      {
        name: "7kW single-phase",
        power: "7 kW",
        rangePerHour: 43,
        overnight: "About 340km in 8 hours",
        line: "The right answer for most homes. Refills a normal day's driving several times over while you sleep.",
        tone: "yellow",
        featured: true,
      },
      {
        name: "22kW three-phase",
        power: "22 kW",
        rangePerHour: 135,
        overnight: "Full charge, most vehicles",
        line: "Only worth it if your supply is three-phase and your car can accept it. Many cannot.",
        tone: "ember",
      },
    ],
    footnote:
      "Most EVs cap their own AC charging below 22kW, so a three-phase charger does not always mean three-phase speed. We check your car before recommending one.",
  },

  /* ---------------------------------------------------------------- */
  "heat-pump-hot-water": {
    type: "cycle",
    eyebrow: "How it works",
    heading: "It moves heat. It does not make it.",
    lead: "That distinction is the whole reason a heat pump runs so cheaply. An electric element converts power into heat one to one. A heat pump uses a small amount of power to relocate heat that already exists in the air.",
    steps: [
      { n: "01", title: "Draw in ambient air", line: "A fan pulls outside air across an evaporator coil. Even cold air holds usable heat." },
      { n: "02", title: "Refrigerant absorbs it", line: "A refrigerant with a very low boiling point takes on that warmth and turns to gas." },
      { n: "03", title: "Compressor concentrates it", line: "Compressing the gas raises its temperature sharply. This is the only stage using meaningful power." },
      { n: "04", title: "Heat transfers to the tank", line: "The hot gas passes through a heat exchanger, warming your water, then cycles back to start again." },
    ],
    payoff: {
      title: "Then pair it with your roof",
      line: "Because the cycle can run whenever you schedule it, setting it for the middle of the day means the tank heats on solar you generated rather than power you bought. That is the cheapest hot water available to an Australian home.",
    },
  },

  /* ---------------------------------------------------------------- */
  "pool-heating": {
    type: "methods",
    eyebrow: "Two methods",
    heading: "Solar, heat pump, or both.",
    lead: "They solve the same problem differently. Solar is nearly free to run but follows the weather. A heat pump costs more to run but holds the temperature you asked for.",
    methods: [
      {
        name: "Solar pool heating",
        line: "Pool water is pumped through collectors on your roof and returned warmed by the sun.",
        marks: [
          { k: "Running cost", v: "Very low, the pump only", good: true },
          { k: "Temperature control", v: "Follows the weather", good: false },
          { k: "Works on cloudy days", v: "Limited", good: false },
          { k: "Needs roof area", v: "Yes, a decent amount", good: false },
          { k: "Season extension", v: "Extends summer", good: true },
        ],
      },
      {
        name: "Pool heat pump",
        line: "Draws warmth from the air and transfers it into the water, like a reverse-cycle unit for your pool.",
        marks: [
          { k: "Running cost", v: "Low, far below gas", good: true },
          { k: "Temperature control", v: "Holds a set temperature", good: true },
          { k: "Works on cloudy days", v: "Yes", good: true },
          { k: "Needs roof area", v: "No", good: true },
          { k: "Season extension", v: "Well into the shoulders", good: true },
        ],
        featured: true,
      },
    ],
    both: {
      title: "Most pools do best with both",
      line: "Solar carries the load whenever the sun is out, and the heat pump tops up on cool or overcast days. You get heat-pump reliability at close to solar running costs.",
    },
    cover: {
      title: "Before either, get a blanket",
      line: "The bulk of a pool's heat loss is evaporation from the surface. A cover is the cheapest heat retention you can buy and it cuts the load on whatever system you install. We will say so even though it is the smallest thing we sell.",
    },
  },

  /* ---------------------------------------------------------------- */
  "solar-packages": {
    type: "matrix",
    eyebrow: "Compare packages",
    heading: "What is in each package.",
    lead: "Both cover the entire job end to end. The only question is whether storage goes in now or later.",
    packages: [
      { name: "Solar + Inverter", tag: "The starting point" },
      { name: "Solar + Inverter + Battery", tag: "The complete setup", featured: true },
    ],
    rows: [
      { label: "System design against your roof and bill", a: true, b: true },
      { label: "Tier-1 solar panels", a: true, b: true },
      { label: "Correctly sized inverter", a: "String or hybrid", b: "Hybrid" },
      { label: "Battery storage", a: false, b: true },
      { label: "Blackout backup available", a: false, b: true },
      { label: "Mounting and all electrical work", a: true, b: true },
      { label: "Grid connection application", a: true, b: true },
      { label: "Federal STCs claimed", a: true, b: true },
      { label: "Federal battery rebate claimed", a: false, b: true },
      { label: "Monitoring configured", a: true, b: true },
      { label: "16-year workmanship warranty", a: true, b: true },
    ],
    note: "Adding a battery later is always possible, and we specify a battery-ready inverter either way. It simply costs less to do it once.",
  },

  /* ---------------------------------------------------------------- */
  "solar-inverter-replacement": {
    type: "symptoms",
    eyebrow: "Is it the inverter?",
    heading: "Five signs, and what each one usually means.",
    lead: "Most inverter faults announce themselves before they stop the system entirely. Here is how to read them, so you can tell us something useful when you call.",
    items: [
      {
        n: "01",
        sign: "An error code or red light on the display",
        means: "The inverter has detected a fault and shut itself down, or is running in a limited mode. The code itself tells us a lot, so photograph it before you call.",
        urgency: "Call now",
        tone: "ember",
      },
      {
        n: "02",
        sign: "Production well below what the weather should give",
        means: "Often a failing DC input or a dying capacitor. The system still runs, so it is easy to miss for months unless you check your monitoring.",
        urgency: "Check monitoring",
        tone: "yellow",
      },
      {
        n: "03",
        sign: "The system drops out in the middle of the day",
        means: "Usually overheating or a grid voltage issue. Peak generation is when the inverter works hardest, so that is when a marginal unit gives up.",
        urgency: "Call now",
        tone: "ember",
      },
      {
        n: "04",
        sign: "Unusually hot, or a fan that never stops",
        means: "Cooling is struggling. Sometimes it is just placement or dust, sometimes it is the beginning of the end. Worth inspecting either way.",
        urgency: "Book a check",
        tone: "yellow",
      },
      {
        n: "05",
        sign: "Nothing at all: no lights, no display",
        means: "Either the unit has failed completely or its isolator has tripped. Check the isolator first; if it trips again, stop and call rather than resetting repeatedly.",
        urgency: "Call now",
        tone: "ember",
      },
    ],
    note: "If your system is under ten years old, check the warranty before replacing anything. We will do that for you, and we would rather claim it than sell you a unit you are still covered for.",
  },

  /* ---------------------------------------------------------------- */
  "tesla-powerwall": {
    type: "methods",
    eyebrow: "Honest comparison",
    heading: "Powerwall, or something else?",
    lead: "We install both. The right answer depends on whether you are buying backup or buying cheaper evenings, and those are different purchases.",
    methods: [
      {
        name: "Tesla Powerwall",
        line: "Premium storage with the strongest backup capability and the most refined app in the category.",
        marks: [
          { k: "Blackout backup", v: "Best in class", good: true },
          { k: "Software and app", v: "Most refined", good: true },
          { k: "Cost per kWh stored", v: "Higher", good: false },
          { k: "Modular capacity", v: "Add whole units", good: false },
          { k: "Retrofits to existing solar", v: "Usually", good: true },
        ],
        featured: true,
      },
      {
        name: "Sungrow, BYD or Alpha ESS",
        line: "Strong value storage that does the core job of shifting daytime solar into the evening, for less per kilowatt hour.",
        marks: [
          { k: "Blackout backup", v: "Available, varies", good: true },
          { k: "Software and app", v: "Good, less polished", good: false },
          { k: "Cost per kWh stored", v: "Lower", good: true },
          { k: "Modular capacity", v: "Often stackable", good: true },
          { k: "Retrofits to existing solar", v: "Usually", good: true },
        ],
      },
    ],
    both: {
      title: "Which one we would actually recommend",
      line: "If riding out a blackout matters to you, Powerwall earns its premium. If your goal is simply to stop buying power at 6pm, a value battery usually reaches payback sooner. We model both on your consumption and show you the difference in writing.",
    },
    cover: {
      title: "Before either, check your inverter",
      line: "Whether a battery can be retrofitted at all depends on your existing inverter. If it is not battery-ready, the choice becomes a hybrid upgrade or an AC-coupled battery, and that changes the maths. We check first.",
    },
  },
};

export const getSignature = (slug) => SIGNATURES[slug] || null;
