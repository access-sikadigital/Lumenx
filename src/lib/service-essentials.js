// What every service page has to answer, in the order the client specified:
//
//   1. who it suits, in one line
//   2. one explainer illustration
//   3. "from $X after incentives", with 0% finance beside it
//   4. the incentives that apply to THAT service, in the reader's state
//   5. a quote button that opens the form with the service already chosen
//
// Everything below is that mapping. The prices themselves live in
// lib/finance.js and are null until Lumenx supplies them; nothing here
// invents one.
//
// `incentives` deliberately describes each program by WHAT IT DOES and what
// it is conditional on, never by an amount. Amounts change mid-year, a stale
// figure on a website is a misleading claim, and every one of these is
// confirmed in writing on the quote instead.

export const SERVICE_ESSENTIALS = {
  "residential-solar": {
    suits: "Homeowners with daytime usage and a roof that gets sun for most of the day.",
    illustration: "energy-flow",
    quoteSlug: "solar",
    priceKey: "residential-solar",
    incentives: {
      federal: [
        {
          name: "Small-scale Technology Certificates",
          line: "A discount on eligible solar at the point of sale, sized by system and location.",
          status: "likely",
        },
      ],
      VIC: [
        {
          name: "Solar Victoria solar panel rebate",
          line: "Household eligibility and limited rounds apply. You confirm eligibility before install.",
          status: "check",
        },
        {
          name: "Solar Victoria solar loan",
          line: "Optional and separate from the rebate. A loan, repaid over its term, not a discount.",
          status: "note",
        },
      ],
      NSW: [
        {
          name: "NSW programs",
          line: "Confirmed against your property when we quote. Federal certificates apply either way.",
          status: "check",
        },
      ],
    },
  },

  "solar-batteries": {
    suits: "Homes already using a good share of their power after dark, or wanting backup circuits in an outage.",
    illustration: "energy-flow",
    quoteSlug: "battery",
    priceKey: "solar-batteries",
    incentives: {
      federal: [
        {
          name: "Cheaper Home Batteries",
          line: "Requires eligible solar installed, or installed at the same time. Since 1 May 2026 the discount tapers above 14kWh and again above 28kWh.",
          status: "likely",
        },
      ],
      VIC: [
        {
          name: "Solar Victoria battery loan",
          line: "Closed to new applications. Victorian battery support now runs through the federal program.",
          status: "unlikely",
        },
      ],
      NSW: [
        {
          name: "NSW VPP battery incentive",
          line: "For a battery that joins an approved virtual power plant. Joining is a separate contract with the provider.",
          status: "check",
        },
      ],
    },
  },



  "heat-pump-hot-water": {
    suits: "Households replacing gas or electric storage hot water, especially with solar already on the roof.",
    illustration: "heat-pump",
    quoteSlug: "heat-pump",
    priceKey: "heat-pump-hot-water",
    incentives: {
      federal: [
        {
          name: "Small-scale Technology Certificates",
          line: "Hot water heat pumps earn certificates in their own right, discounted at the point of sale.",
          status: "likely",
        },
      ],
      VIC: [
        {
          name: "Victorian Energy Upgrades",
          line: "Discounts an eligible heat pump when it replaces an existing gas or electric storage system. Delivered through accredited providers.",
          status: "likely",
        },
      ],
      NSW: [
        {
          name: "Energy Savings Scheme",
          line: "Discounts hot water upgrades through accredited providers, on the same replace-an-existing-system basis.",
          status: "likely",
        },
      ],
    },
  },

  "ev-chargers": {
    suits: "EV owners who want to charge at home during the day on their own solar. An add-on to solar and battery rather than a trade on its own.",
    illustration: "ev",
    quoteSlug: "ev-charger",
    priceKey: "ev-chargers",
    incentives: {
      federal: [
        {
          name: "No federal charger discount",
          line: "Chargers do not attract certificates. Presented as an add-on to solar and battery rather than a standalone trade.",
          status: "unlikely",
        },
      ],
      VIC: [],
      NSW: [],
    },
  },

  "pool-heating": {
    suits: "Pool owners wanting a longer swimming season without a large running cost.",
    illustration: "process",
    quoteSlug: "pool-heating",
    priceKey: null,
    incentives: { federal: [], VIC: [], NSW: [] },
  },

  "solar-packages": {
    suits: "Anyone who would rather compare complete systems than price components separately.",
    illustration: "energy-flow",
    quoteSlug: "solar-battery",
    priceKey: "residential-solar",
    incentives: {
      federal: [
        {
          name: "Certificates and battery discount together",
          line: "A package with eligible solar and a battery can attract both. They are itemised separately on your quote.",
          status: "likely",
        },
      ],
      VIC: [
        {
          name: "Solar Victoria solar panel rebate",
          line: "Household eligibility and limited rounds apply.",
          status: "check",
        },
      ],
      NSW: [],
    },
  },

  "tesla-powerwall": {
    suits: "Households comparing one specific battery against the alternatives we install.",
    illustration: "backup",
    vpp: true,
    quoteSlug: "battery",
    priceKey: "solar-batteries",
    incentives: {
      federal: [
        {
          name: "Cheaper Home Batteries",
          line: "Requires eligible solar installed or installed at the same time, and the battery must be on the approved list.",
          status: "likely",
        },
      ],
      VIC: [],
      NSW: [
        {
          name: "NSW VPP battery incentive",
          line: "For a battery that joins an approved virtual power plant.",
          status: "check",
        },
      ],
    },
  },

  "battery-for-existing-solar": {
    suits: "Homes that already have panels and want to stop exporting the surplus for cents.",
    illustration: "energy-flow",
    quoteSlug: "battery-existing-solar",
    priceKey: "battery-for-existing-solar",
    incentives: {
      federal: [
        {
          name: "Cheaper Home Batteries",
          line: "Your existing solar is what makes this one apply. The battery must be on the approved list, and since 1 May 2026 the discount tapers above 14kWh and again above 28kWh.",
          status: "likely",
        },
      ],
      VIC: [
        {
          name: "Solar Victoria battery loan",
          line: "Closed to new applications. Victorian battery support now runs through the federal program.",
          status: "unlikely",
        },
      ],
      NSW: [
        {
          name: "NSW VPP battery incentive",
          line: "For a battery that joins an approved virtual power plant. Joining is a separate contract with the provider.",
          status: "check",
        },
      ],
    },
  },

  "inverter-repair": {
    suits: "Anyone whose inverter is faulting, has failed, or is old enough to be worth replacing deliberately.",
    illustration: "process",
    quoteSlug: "inverter-repair",
    priceKey: "inverter-repair",
    incentives: {
      federal: [
        {
          name: "Certificates on a replacement",
          line: "A like-for-like inverter swap generally does not create new certificates. Adding capacity at the same time can. We check before quoting.",
          status: "unlikely",
        },
      ],
      VIC: [],
      NSW: [],
    },
  },

  "service-health-check": {
    suits: "Any solar owner whose output has drifted, whose monitoring stopped, or whose system is over about eight years old.",
    illustration: "process",
    quoteSlug: "health-check",
    priceKey: "service-health-check",
    incentives: {
      federal: [
        {
          name: "No rebate for servicing",
          line: "Maintenance does not attract a rebate in any state. This is priced as the job it is.",
          status: "unlikely",
        },
      ],
      VIC: [],
      NSW: [],
    },
  },

  "heating-and-cooling": {
    suits: "Households replacing gas or resistive electric heating, or adding cooling that can run on daytime solar.",
    illustration: "heat-pump",
    quoteSlug: "heating-cooling",
    priceKey: "heating-and-cooling",
    incentives: {
      federal: [],
      VIC: [
        {
          name: "Victorian Energy Upgrades",
          line: "Discounts an eligible efficient system when it replaces an existing one, delivered through accredited providers.",
          status: "likely",
        },
      ],
      NSW: [
        {
          name: "Energy Savings Scheme",
          line: "Covers eligible heating and cooling upgrades on the same replace-an-existing-system basis.",
          status: "likely",
        },
      ],
    },
  },

  "commercial-solar": {
    suits: "Businesses using most of their power during the working day, from 30kW to 1MW.",
    illustration: "commercial",
    quoteSlug: "commercial",
    priceKey: null,
    incentives: {
      federal: [
        {
          name: "Small-scale Technology Certificates",
          line: "Up to 100kW now, expanding to 1MW from 1 October 2026 once the regulations are made. Re-check before relying on it.",
          status: "check",
        },
        {
          name: "Instant asset write-off",
          line: "A tax treatment, not a discount. Talk to your accountant about how it applies to you.",
          status: "note",
        },
      ],
      VIC: [
        {
          name: "VEU commercial and industrial solar",
          line: "Covers 30 to 200kW systems. Delivered through accredited providers.",
          status: "check",
        },
      ],
      NSW: [
        {
          name: "Batteries for Businesses Incentive",
          line: "From 1 September 2026 for SMEs at 20 to 200kWh, and C&I above 200kWh. Stacks with the federal program.",
          status: "check",
        },
      ],
    },
  },
};

export function essentialsFor(slug) {
  return SERVICE_ESSENTIALS[slug] ?? null;
}
