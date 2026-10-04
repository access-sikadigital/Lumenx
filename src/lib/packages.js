// Package tabs: Solar + inverter, Battery only, Solar + battery.
// Three tiers each: Silver, Gold, Platinum.
//
// ============================================================================
// EVERY FIELD BELOW IS NULL UNTIL LUMENX SUPPLIES IT.
// ============================================================================
// The client brief asks for real product photos and specs on these cards, and
// the release checklist requires models, prices and photos to be confirmed
// against current stock before launch. So this file ships as a structure with
// nothing in it, and the UI renders a card as "ask us" rather than inventing a
// model number or a price.
//
// That is the whole point: a package card is the most specific promise on the
// site. "6.6kW Jinko with a Sungrow inverter, $4,990 installed" is a claim
// about stock we hold and a price we will honour. Filling it with plausible
// placeholder data would be the single easiest way for this site to publish
// something false.
//
// TO POPULATE: for each tier, set `panel`, `inverter`, `battery` (where it
// applies), `size`, `price`, `priceNote`, `checked` and `photo`. Photos must
// be the EXACT model, shot on the same cream background at the same scale, as
// the illustration canvas specifies — a stock photo of a different panel is
// the same problem in picture form.

export const PACKAGE_TABS = [
  {
    key: "solar",
    label: "Solar + inverter",
    line: "Panels and an inverter. Battery-ready, so storage can be added later without replacing anything.",
  },
  {
    key: "battery",
    label: "Battery only",
    line: "For homes that already have solar. We check your existing inverter before quoting.",
  },
  {
    key: "solar-battery",
    label: "Solar + battery",
    line: "Both installed together, which costs less than doing it in two visits.",
  },
];

export const TIERS = ["Silver", "Gold", "Platinum"];

/* The quote-form service each tab maps to, so "Choose" carries the decision
   through instead of dropping the reader on a blank form. */
export const TAB_QUOTE_SLUG = {
  solar: "solar",
  battery: "battery-existing-solar",
  "solar-battery": "solar-battery",
};

const emptyTier = (tier) => ({
  tier,
  size: null,
  panel: null,
  inverter: null,
  battery: null,
  price: null,
  priceNote: null,
  checked: null,
  photo: null,
  highlights: [],
});

export const PACKAGES = {
  solar: TIERS.map(emptyTier),
  battery: TIERS.map(emptyTier),
  "solar-battery": TIERS.map(emptyTier),
};

/** True once a tier has enough real data to be shown as a product. */
export function isPopulated(p) {
  return Boolean(p && p.panel && p.size);
}

export function packagesFor(tab) {
  return PACKAGES[tab] ?? [];
}
