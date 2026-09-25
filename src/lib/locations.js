// Location pages.
//
// IMAGES: deliberately none. A generic city skyline on a solar location page
// is filler that every competitor uses, and it tells a visitor nothing. These
// pages use a typographic hero instead. Replace `photo` with a REAL Lumenx
// install in that city as they become available — one genuine Geelong roof is
// worth more than any amount of Geelong stock.
//
// FACTS: distributors are named because they are stable and genuinely useful
// (they determine your connection application). Peak-sun-hour figures are
// approximate long-run averages and are labelled as such on the page — verify
// against Bureau of Meteorology data before treating them as precise.
//
// No pricing, no savings figures, no rebate amounts.

export const LOCATIONS_HUB = {
  seoTitle: "Service Areas | Solar Across Victoria & NSW | Lumenx",
  seoDescription:
    "Where Lumenx installs solar, batteries, EV charging and hot water: Melbourne, Geelong, Ballarat, Bendigo, Sydney and the surrounding regions.",
  eyebrow: "Service areas",
  h1: "Two offices, two states, crews who actually live there.",
  lead: "We install across Victoria and New South Wales. If your postcode is a four-hour round trip from both offices we will tell you, rather than quoting and hoping.",
  chips: ["Victoria & New South Wales", "Melbourne & Sydney offices", "Regional areas covered"],
};

export const LOCATIONS = [
  {
    slug: "solar-panels-melbourne",
    city: "Melbourne",
    label: "Solar Panels Melbourne",
    service: "Solar panels",
    seoTitle: "Solar Panels Melbourne | Install & Battery | Lumenx",
    seoDescription:
      "Local Melbourne solar installer. Solar Victoria authorised, 16-year workmanship warranty, rebates handled. Serving all Melbourne metro suburbs.",
    h1: "Solar panels in Melbourne, from an office in Maribyrnong.",
    lead: "Our head office is in Melbourne's inner west, which means our crews are local, not driving in from interstate for the day.",
    office: "Victoria, Head Office",
    distributor:
      "Melbourne is split across five distributors (CitiPower, Powercor, Jemena, United Energy and AusNet), and which one covers you changes the connection application. We identify yours from your address.",
    sun: "≈ 3.6",
    climate:
      "Melbourne's output is lower per kilowatt than northern capitals but far more consistent than people expect, and panels produce on overcast days. The bigger variable here is shading from mature street trees in the older suburbs.",
    roofs:
      "A lot of Melbourne stock is tiled with complex hip roofs, which means more orientations and often optimisers. Newer estates in the outer north and west are simpler and more affordable to fit.",
    areas: ["Inner west", "Northern suburbs", "Eastern suburbs", "Bayside", "South east", "Outer west", "Mornington Peninsula", "Yarra Valley"],
    services: ["residential-solar", "solar-batteries", "commercial-solar", "ev-chargers"],
  },
  {
    slug: "solar-panels-geelong",
    city: "Geelong",
    label: "Solar Panels Geelong",
    service: "Solar panels",
    seoTitle: "Solar Panels Geelong | Install & Rebates | Lumenx",
    seoDescription:
      "Solar panel installation across Geelong, Bellarine and the Surf Coast. Solar Victoria authorised, rebates handled, 16-year workmanship warranty.",
    h1: "Solar panels in Geelong and across the Bellarine.",
    lead: "Close enough to Melbourne that our crews cover it regularly, and coastal enough that corrosion and wind rating genuinely matter to the specification.",
    office: "Victoria, Head Office",
    distributor: "Geelong and the surrounding region are served by Powercor.",
    sun: "≈ 3.7",
    climate:
      "Slightly better irradiance than Melbourne and reliably windy, which keeps panels cool and marginally more efficient. Coastal salt exposure is the design factor here.",
    roofs:
      "A mix of older weatherboard and brick veneer through central Geelong, and newer estates out towards Armstrong Creek. Near the coast we specify appropriate mounting for wind region and corrosion.",
    areas: ["Central Geelong", "Newtown", "Belmont", "Armstrong Creek", "Ocean Grove", "Torquay", "Bellarine Peninsula", "Surf Coast"],
    services: ["residential-solar", "solar-batteries", "heat-pump-hot-water", "pool-heating"],
  },
  {
    slug: "solar-panels-bendigo",
    city: "Bendigo",
    label: "Solar Panels Bendigo",
    service: "Solar panels",
    seoTitle: "Solar Panels Bendigo | Install & Rebates | Lumenx",
    seoDescription:
      "Solar panel installation across Bendigo and central Victoria. Solar Victoria authorised, rebates handled, 16-year workmanship warranty.",
    h1: "Solar panels in Bendigo and central Victoria.",
    lead: "Central Victoria gets more sun than Melbourne and hotter summers, which changes both the payback and how the system should be specified.",
    office: "Victoria, Head Office",
    distributor: "Bendigo and central Victoria are served by Powercor.",
    sun: "≈ 3.9",
    climate:
      "Better irradiance than Melbourne and hot, dry summers. That means stronger generation, but also real heat derating on the hottest days, and inverter placement matters more here than it does on the coast.",
    roofs:
      "Generous roof areas on larger blocks, often with good northern aspect. Period homes in central Bendigo need more care with tile type and heritage considerations.",
    areas: ["Bendigo central", "Strathfieldsaye", "Kangaroo Flat", "Epsom", "Eaglehawk", "Castlemaine", "Heathcote", "Central Victoria"],
    services: ["residential-solar", "solar-batteries", "commercial-solar", "heat-pump-hot-water"],
  },
  {
    slug: "solar-panels-ballarat",
    city: "Ballarat",
    label: "Solar Panels Ballarat",
    service: "Solar panels",
    seoTitle: "Solar Panels Ballarat | Install & Rebates | Lumenx",
    seoDescription:
      "Solar panel installation across Ballarat and western Victoria. Solar Victoria authorised, rebates handled, 16-year workmanship warranty.",
    h1: "Solar panels in Ballarat and western Victoria.",
    lead: "Cold winters, decent summers and a lot of period housing. Ballarat systems are worth pairing with hot water and heating upgrades, because that is where the bill actually is.",
    office: "Victoria, Head Office",
    distributor: "Ballarat and western Victoria are served by Powercor.",
    sun: "≈ 3.6",
    climate:
      "Similar annual irradiance to Melbourne with colder winters. Panels perform well in the cold. It is the shorter winter days rather than the temperature that limits output.",
    roofs:
      "Significant heritage stock in central Ballarat where tile type and roof condition need checking first. Newer estates on the fringes are straightforward.",
    areas: ["Ballarat central", "Wendouree", "Sebastopol", "Alfredton", "Delacombe", "Buninyong", "Creswick", "Western Victoria"],
    services: ["residential-solar", "heat-pump-hot-water", "solar-batteries", "solar-packages"],
  },
  {
    slug: "solar-panels-sydney",
    city: "Sydney",
    label: "Solar Panels Sydney",
    service: "Solar panels",
    seoTitle: "Solar Panels Sydney | Install & Battery | Lumenx",
    seoDescription:
      "Solar panel installation across Sydney from our Market Street office. CEC-accredited installers, federal rebates handled, 16-year workmanship warranty.",
    h1: "Solar panels in Sydney, from an office on Market Street.",
    lead: "Sydney gets meaningfully more sun than Melbourne, which shortens payback, and it has its own distributors, approvals and roof stock to work around.",
    office: "New South Wales",
    distributor:
      "Sydney is covered mainly by Ausgrid and Endeavour Energy depending on where you are. Each has its own connection process, and we lodge whichever applies to you.",
    sun: "≈ 4.2",
    climate:
      "Noticeably stronger irradiance than Victoria, so the same system generates more and pays back sooner. Humidity and coastal exposure are the specification factors.",
    roofs:
      "Enormous variation, from terraces with almost no usable roof to large freestanding homes in the north and west. Heritage overlays are common in the inner suburbs.",
    areas: ["Sydney CBD", "Inner west", "Eastern suburbs", "North Shore", "Northern Beaches", "Parramatta", "Western Sydney", "Sutherland Shire"],
    services: ["residential-solar", "solar-batteries", "commercial-solar", "ev-chargers"],
  },
  {
    slug: "solar-batteries-melbourne",
    city: "Melbourne",
    label: "Solar Batteries Melbourne",
    service: "Solar batteries",
    seoTitle: "Solar Batteries Melbourne | Install & Rebate | Lumenx",
    seoDescription:
      "Home battery installation across Melbourne. Sungrow, BYD, AlphaESS and LG, with the federal battery rebate applied. Retrofits to existing solar.",
    h1: "Home batteries in Melbourne, sized to your evenings.",
    lead: "Melbourne households use most of their power after dark, which is exactly the gap a battery closes. It is also why the rebate changed the maths here more than most places.",
    office: "Victoria, Head Office",
    distributor:
      "Battery installations still need distributor notification, and Melbourne spans five of them. We handle whichever covers your address.",
    sun: "≈ 3.6",
    climate:
      "Melbourne's evening-heavy consumption pattern is what makes storage work here. The question is rarely whether a battery helps, but whether it helps enough to justify the cost at your usage.",
    roofs:
      "For retrofits the roof matters less than the switchboard and the existing inverter. We check both before quoting.",
    areas: ["Inner west", "Northern suburbs", "Eastern suburbs", "Bayside", "South east", "Outer west", "Mornington Peninsula", "Yarra Valley"],
    services: ["solar-batteries", "tesla-powerwall", "residential-solar", "solar-packages"],
  },
  {
    slug: "solar-batteries-sydney",
    city: "Sydney",
    label: "Solar Batteries Sydney",
    service: "Solar batteries",
    seoTitle: "Solar Batteries Sydney | Install & Rebate | Lumenx",
    seoDescription:
      "Home battery installation across Sydney. Sungrow, BYD, AlphaESS and LG, with the federal battery rebate applied. Retrofits to existing solar.",
    h1: "Home batteries in Sydney, and whether yours is worth it.",
    lead: "Sydney's stronger generation means more midday surplus to store, which usually makes the storage case better here than further south.",
    office: "New South Wales",
    distributor:
      "Battery installations need notification to Ausgrid or Endeavour Energy depending on your address. We lodge it as part of the job.",
    sun: "≈ 4.2",
    climate:
      "More generation means more surplus, and more surplus means a battery has more to work with. We still model it on your actual consumption before recommending one.",
    roofs:
      "For a retrofit the constraint is your existing inverter and switchboard rather than the roof. We check compatibility before quoting.",
    areas: ["Sydney CBD", "Inner west", "Eastern suburbs", "North Shore", "Northern Beaches", "Parramatta", "Western Sydney", "Sutherland Shire"],
    services: ["solar-batteries", "tesla-powerwall", "residential-solar", "solar-packages"],
  },
  {
    slug: "commercial-solar-melbourne",
    city: "Melbourne",
    label: "Commercial Solar Melbourne",
    service: "Commercial solar",
    seoTitle: "Commercial Solar Melbourne | Business Solar | Lumenx",
    seoDescription:
      "Commercial solar for Melbourne businesses. 20kW to 100kW+ systems, ROI modelled on your interval data, finance available.",
    h1: "Commercial solar for Melbourne businesses.",
    lead: "Melbourne businesses draw most of their power during daylight hours, which is precisely why commercial solar works better here than a residential system does.",
    office: "Victoria, Head Office",
    distributor:
      "Commercial connections have their own approval process and the requirements differ across Melbourne's five distributors. We prepare and manage the application.",
    sun: "≈ 3.6",
    climate:
      "Lower irradiance than the northern capitals, but commercial economics rest on self-consumption rather than peak generation, and that is about your load curve, not the weather.",
    roofs:
      "Industrial estates in the north, west and south east typically offer large unobstructed metal roofs, which are the quickest and most affordable to fit.",
    areas: ["Inner west", "Northern industrial", "Dandenong", "Laverton", "Campbellfield", "Braeside", "Truganina", "Melbourne metro"],
    services: ["commercial-solar", "solar-inverters", "ev-chargers", "solar-batteries"],
  },
  {
    slug: "ev-charger-installation-melbourne",
    city: "Melbourne",
    label: "EV Charger Installation Melbourne",
    service: "EV charging",
    seoTitle: "EV Charger Installation Melbourne | Lumenx",
    seoDescription:
      "Home and business EV charger installation across Melbourne. 7kW and 22kW units, solar-integrated, installed by licensed electricians.",
    h1: "EV charger installation across Melbourne.",
    lead: "The charger is the simple part. What decides the job is your switchboard, your supply and whether you want the car charging off your own solar.",
    office: "Victoria, Head Office",
    distributor:
      "Some installations need notification to your distributor, particularly three-phase units. We handle it where it applies.",
    sun: "≈ 3.6",
    climate:
      "If you have solar, charging off midday surplus is the single biggest factor in what home charging actually costs you. We configure for it.",
    roofs:
      "Not a roof job. The variables are switchboard capacity, cable run and where the car actually parks. We assess all three before quoting.",
    areas: ["Inner west", "Northern suburbs", "Eastern suburbs", "Bayside", "South east", "Outer west", "Mornington Peninsula", "Melbourne metro"],
    services: ["ev-chargers", "residential-solar", "solar-batteries", "commercial-solar"],
  },
];

export const LOCATION_SLUGS = LOCATIONS.map((l) => l.slug);
export const getLocation = (slug) => LOCATIONS.find((l) => l.slug === slug) || null;
