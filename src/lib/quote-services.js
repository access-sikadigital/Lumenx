// The services a visitor can ask about, and the slugs that link to them.
//
// This is the list the punch list's new menu is built from: eight services
// plus Commercial as a separate, highlighted item. Pool heating is NOT a menu
// service any more — it lives here as a quote-form option only, which is
// exactly where the client asked for it to go.
//
// `slug` is what the hero buttons and every service page pass in ?service=,
// so a click that already said "battery" never asks the question again.

export const QUOTE_SERVICES = [
  {
    slug: "solar-battery",
    label: "Solar + battery",
    line: "The complete setup, installed together",
    icon: "/icons/solar-battery.svg",
    scope: "residential",
  },
  {
    slug: "battery-existing-solar",
    label: "Battery for existing solar",
    line: "You already have panels",
    icon: "/icons/power-storage.svg",
    scope: "residential",
  },
  {
    slug: "solar",
    label: "Solar only",
    line: "Panels and an inverter",
    icon: "/icons/rooftop-solar.svg",
    scope: "residential",
  },
  {
    slug: "battery",
    label: "Battery",
    line: "Storage sized to your evenings",
    icon: "/icons/solar-battery.svg",
    scope: "residential",
  },
  {
    slug: "inverter-repair",
    label: "Inverter repair",
    line: "Faulty, failed or ageing",
    icon: "/icons/energy-monitor.svg",
    scope: "residential",
  },
  {
    slug: "heat-pump",
    label: "Hot water heat pump",
    line: "Replacing gas or electric",
    icon: "/icons/clean-energy.svg",
    scope: "residential",
  },
  {
    slug: "heating-cooling",
    label: "Heating & cooling",
    line: "Reverse-cycle split systems",
    icon: "/icons/smart-grid.svg",
    scope: "residential",
  },
  {
    slug: "ev-charger",
    label: "EV charger",
    line: "Charge on your own solar",
    icon: "/icons/ev-charging.svg",
    scope: "residential",
  },
  {
    slug: "health-check",
    label: "Service & health check",
    line: "Any system, ours or not",
    icon: "/icons/energy-monitor.svg",
    scope: "residential",
  },
  {
    // Off the menu, on the form. The client's instruction exactly: there is
    // real demand for it, but not enough to carry a page of its own.
    slug: "pool-heating",
    label: "Pool heating",
    line: "Extend the swimming season",
    icon: "/icons/sunrays.svg",
    scope: "residential",
  },
  {
    slug: "commercial",
    label: "Commercial",
    line: "30kW to 1MW, ROI modelled",
    icon: "/icons/smart-grid.svg",
    scope: "commercial",
  },
];

export const SERVICE_SLUGS = QUOTE_SERVICES.map((s) => s.slug);

/** Resolve a ?service= value to a slug we recognise, or null. */
export function resolveServiceSlug(value) {
  if (!value) return null;
  const v = String(value).toLowerCase();
  return SERVICE_SLUGS.includes(v) ? v : null;
}

export function labelForSlug(slug) {
  return QUOTE_SERVICES.find((s) => s.slug === slug)?.label ?? slug;
}
