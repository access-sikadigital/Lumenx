// Finance offers and the per-service "from" prices.
//
// ============================================================================
// EVERY NUMBER IN THIS FILE IS A PUBLIC CLAIM ABOUT CREDIT.
// ============================================================================
// Two gates stand in front of this content, and both are off by default:
//
//   1. BRIGHTE_APPROVED — the punch list requires Brighte to approve the page
//      and the wording before release. Until someone has that approval in
//      writing, set this false and the finance page and strip stay hidden.
//
//   2. NSW_PROGRAM_ACCESS — the NSW Home Energy Saver Loan route only turns on
//      once Lumenx program access is confirmed. Advertising a loan we cannot
//      actually originate is worse than not mentioning it.
//
// The `from` prices are null until Lumenx supplies them. Nothing renders a
// price while it is null: the UI shows the finance line alone rather than
// "from $0" or "from $TBC". A placeholder price on a live site is exactly the
// kind of claim this whole punch list exists to stop.

export const BRIGHTE_APPROVED = false;
export const NSW_PROGRAM_ACCESS = false;

/**
 * Brighte 0% Interest Payment Plan.
 *
 * These terms are AS PUBLISHED, April 2026, and are reproduced from the
 * client brief. They are facts about someone else's credit product, so they
 * are stated plainly with a `checked` date and are not rounded, softened or
 * summarised. If Brighte changes them, this object changes; nothing else
 * should hold a copy of these figures.
 */
export const BRIGHTE = {
  name: "Brighte 0% Interest Payment Plan",
  states: ["VIC", "NSW"],
  tag: "0% interest",
  checked: "April 2026",
  amountMin: 1000,
  amountMax: 60000,
  termMin: "6 months",
  termMax: "10 years",
  fees: [
    { k: "Establishment fee", v: "$75, one off" },
    { k: "Account fee", v: "$2.30 per week" },
    { k: "Late fee", v: "$4.99, capped at $49.90 a year" },
  ],
  eligibility: [
    "You are the property owner, or have the owner's consent",
    "You pass Brighte's own credit assessment",
    "The equipment is installed by an approved Brighte vendor, which we are",
  ],
  disclaimer:
    "Brighte is the credit provider, not Lumenx. Approval, the amount and the term are Brighte's decision and are subject to their credit assessment. Fees apply as listed. This is general information, not credit advice, and you should read Brighte's terms before applying.",
};

/**
 * NSW Home Energy Saver Loan.
 *
 * Labelled "0% interest – NSW only" wherever it appears, and hidden entirely
 * when Victoria is selected, because a Victorian reader cannot apply for it.
 * It is a LOAN. It reduces nothing; it changes when you pay.
 */
export const NSW_LOAN = {
  name: "NSW Home Energy Saver Loan",
  states: ["NSW"],
  tag: "0% interest – NSW only",
  checked: null,
  note: "A loan, not a discount. The amount is repaid over the term.",
  eligibility: [
    "The property is in New South Wales",
    "You meet the program's household eligibility criteria",
    "The products installed are on the program's eligible list",
  ],
  disclaimer:
    "Offered under a New South Wales Government program and subject to that program's rules and the lender's assessment. Program terms change; each claim links to the official program page with the date it was last checked.",
};

/**
 * Offers available in a given state, in the order they should be shown, with
 * the gates applied. Call this rather than reading BRIGHTE or NSW_LOAN
 * directly, so no component can accidentally render an ungated offer.
 */
export function offersFor(stateCode) {
  const out = [];
  if (BRIGHTE_APPROVED && BRIGHTE.states.includes(stateCode)) out.push(BRIGHTE);
  if (NSW_PROGRAM_ACCESS && NSW_LOAN.states.includes(stateCode)) out.push(NSW_LOAN);
  return out;
}

/**
 * "From $X after incentives", per service.
 *
 * NULL UNTIL LUMENX SUPPLIES THE FIGURE. Each one must be a real, currently
 * achievable installed price with the incentives already deducted, and it
 * needs a `checked` date because a price that drifts out of date is a
 * misleading claim under exactly the codes Lumenx is signed to.
 *
 * `note` is what sits under the number. Keep it specific: "after federal
 * STCs, 6.6kW on a single-storey tile roof" is a price someone can rely on,
 * "from $X" on its own is not.
 */
export const SERVICE_PRICING = {
  "residential-solar": { from: null, note: null, checked: null },
  "solar-batteries": { from: null, note: null, checked: null },
  "battery-for-existing-solar": { from: null, note: null, checked: null },
  "inverter-repair": { from: null, note: null, checked: null },
  "service-health-check": { from: null, note: null, checked: null },
  "heat-pump-hot-water": { from: null, note: null, checked: null },
  "heating-and-cooling": { from: null, note: null, checked: null },
  "ev-chargers": { from: null, note: null, checked: null },
  "service-health-check": { from: null, note: null, checked: null },
};

export function priceFor(slug) {
  const p = SERVICE_PRICING[slug];
  if (!p || p.from == null) return null;
  return p;
}

/** Australian dollars, no cents: these are whole-dollar installed prices. */
export function money(n) {
  if (n == null) return null;
  return `$${Number(n).toLocaleString("en-AU", { maximumFractionDigits: 0 })}`;
}
