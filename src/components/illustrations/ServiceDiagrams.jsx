"use client";

import { Box, ENERGY, INK, Label, PAPER, Scene, STROKE, Sun, outline } from "./kit";

/**
 * The remaining service explainers, all drawn from the same kit: 2.5px navy
 * outline, flat fills, no gradients, colour only where it means an energy
 * source, and every word as live text.
 *
 * Three of them, and the framing matters as much as the drawing:
 *
 *   HeatPumpDiagram — shows the mechanism, because "it moves heat rather than
 *   making it" is the entire reason the running cost is low, and no amount of
 *   efficiency copy lands without it.
 *
 *   EvChargerDiagram — a comparison of charging speeds, framed as an ADD-ON
 *   to solar rather than a standalone trade, per the client brief.
 *
 *   VppDiagram — shows the exchange honestly: energy out at peak, credits
 *   back, and a reserve that stays in your battery. A VPP explainer that only
 *   shows the credits is an advertisement, not an explanation.
 */

/* ------------------------------------------------------------------ */
/* Heat pump: air in, heat concentrated, water warmed.                 */
/* ------------------------------------------------------------------ */
export function HeatPumpDiagram({ className = "" }) {
  return (
    <Scene
      viewBox="0 0 640 260"
      title="How a hot water heat pump works"
      desc="A fan draws warmth from the outside air. A compressor concentrates that heat. The heat moves into the water tank. It moves heat rather than generating it, which is why it uses far less power than an electric element."
      className={className}
    >
      <Sun x={64} y={48} />

      {/* 1 — fan draws air in */}
      <Box x={110} y={96} w={96} h={96} r={12}>
        <circle cx="48" cy="48" r="30" fill={PAPER} stroke={INK} strokeWidth={STROKE} />
        {[0, 90, 180, 270].map((a) => (
          <path
            key={a}
            d="M48 48 C56 34, 70 30, 74 40 C66 44, 56 48, 48 48 Z"
            fill={ENERGY.solar}
            stroke={INK}
            strokeWidth="2"
            transform={`rotate(${a} 48 48)`}
          />
        ))}
      </Box>

      {/* warm air arrows coming in */}
      {[112, 136, 160].map((y) => (
        <path key={y} d={`M${46} ${y} L96 ${y}`} stroke={ENERGY.solar} strokeWidth={STROKE} strokeLinecap="round" strokeDasharray="0.1 12" />
      ))}

      {/* 2 — compressor */}
      <Box x={258} y={112} w={78} h={64} r={10}>
        <path d="M18 40 L30 22 L42 40 L54 18" fill="none" stroke={ENERGY.solar} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      </Box>
      <path d="M206 144 L258 144" {...outline} />

      {/* 3 — tank */}
      <g transform="translate(400 72)">
        <rect x="0" y="0" width="92" height="140" rx="24" fill={PAPER} stroke={INK} strokeWidth={STROKE} />
        <rect x="12" y="62" width="68" height="66" rx="16" fill={ENERGY.solar} opacity="0.35" />
        <path d="M30 44 q10 -14 0 -26 M46 44 q10 -14 0 -26 M62 44 q10 -14 0 -26" {...outline} />
      </g>
      <path d="M336 144 L400 144" stroke={ENERGY.solar} strokeWidth={STROKE} strokeLinecap="round" />

      <Label x={158} y={216} size={11.5}>1 · Fan draws in warm air</Label>
      <Label x={297} y={216} size={11.5}>2 · Compressor concentrates it</Label>
      <Label x={446} y={232} size={11.5}>3 · Heat moves into the tank</Label>

      <Label x={320} y={252} size={11} weight={500} fill="#767C92">
        Run it in the middle of the day and that power comes from your own roof.
      </Label>
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* EV charging: three speeds, as an add-on to solar.                   */
/* ------------------------------------------------------------------ */
const CHARGE = [
  { label: "Powerpoint", kw: "2.4 kW", range: "about 14 km per hour", w: 18 },
  { label: "Wall charger", kw: "7 kW", range: "about 40 km per hour", w: 52 },
  { label: "Three-phase", kw: "11 kW+", range: "about 65 km per hour", w: 86 },
];

export function EvChargerDiagram({ className = "" }) {
  return (
    <div className={className}>
      <ul className="space-y-4">
        {CHARGE.map((c, i) => (
          <li key={c.label}>
            <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="text-[0.92rem] font-semibold text-blue">
                {c.label} <span className="font-normal text-ink-soft">· {c.kw}</span>
              </span>
              <span className="numeral text-[0.88rem]" style={{ color: ENERGY.solar }}>
                {c.range}
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-blue/[0.07]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${c.w}%`,
                  background: i === 0 ? ENERGY.idle : ENERGY.solar,
                }}
              />
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-[0.86rem] leading-relaxed text-ink">
        A wall charger adds range about three times faster than a powerpoint. Charge in daylight
        and the car runs on power you generated rather than power you bought.
      </p>
      <p className="mt-3 text-[0.78rem] leading-relaxed text-ink-soft">
        Example at 6 km per kWh. Three-phase needs a three-phase supply, and many cars accept up
        to 11kW, so your car&rsquo;s onboard charger sets the real speed as much as the charger
        on the wall does.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* VPP: what goes out, what comes back, what stays.                    */
/* ------------------------------------------------------------------ */
export function VppDiagram({ className = "" }) {
  return (
    <Scene
      viewBox="0 0 640 230"
      title="How a virtual power plant works"
      desc="At peak times you give the provider access to some of the energy stored in your battery. You receive credits or payments under their rules. A reserve stays in the battery for your own home."
      className={className}
    >
      {/* your battery */}
      <g transform="translate(70 62)">
        <rect x="0" y="0" width="86" height="110" rx="12" fill={PAPER} stroke={INK} strokeWidth={STROKE} />
        <rect x="30" y="-9" width="26" height="9" rx="3" fill={PAPER} stroke={INK} strokeWidth={STROKE} />
        {/* the reserve is drawn, not described: it is the part that does not leave */}
        <rect x="12" y="62" width="62" height="36" rx="6" fill={ENERGY.battery} />
        <rect x="12" y="14" width="62" height="42" rx="6" fill={ENERGY.battery} opacity="0.25" />
      </g>

      {/* provider */}
      <Box x={470} y={70} w={104} h={94} r={12}>
        <path d="M30 56 L46 26 L62 56 M24 70h56" fill="none" stroke={ENERGY.grid} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      </Box>

      {/* energy out at peak */}
      <path d="M160 96 L466 96" fill="none" stroke={ENERGY.battery} strokeWidth={STROKE} strokeLinecap="round" />
      <path className="nrg-dots" d="M160 96 L466 96" fill="none" stroke={ENERGY.battery} strokeWidth={STROKE + 2.5} strokeLinecap="round" strokeDasharray="0.1 16" />

      {/* credits back */}
      <path d="M466 142 L160 142" fill="none" stroke={ENERGY.grid} strokeWidth={STROKE} strokeLinecap="round" strokeDasharray="8 7" />

      <Label x={313} y={84} size={11.5} fill={ENERGY.battery}>Stored energy, at peak times</Label>
      <Label x={313} y={162} size={11.5} fill={ENERGY.grid}>Credits or payments back</Label>

      <Label x={113} y={196} size={11.5}>Your battery</Label>
      <Label x={522} y={186} size={11.5}>VPP provider</Label>

      <Label x={113} y={214} size={10.5} weight={500} fill="#767C92">
        A reserve stays for your home
      </Label>
    </Scene>
  );
}

/* ------------------------------------------------------------------ */
/* Eligibility results, as a legend. The four statuses the rebate      */
/* checker and every service page use, explained once.                 */
/* ------------------------------------------------------------------ */
const STATUSES = [
  { label: "Likely eligible", note: "Meets the basic rules", dot: ENERGY.battery },
  { label: "Check", note: "Depends on your details", dot: "#FFB120" },
  { label: "Not available", note: "Closed, or does not apply", dot: ENERGY.idle },
  { label: "Info", note: "Not a discount, never counted", dot: "#E8420A" },
];

export function EligibilityLegend({ className = "" }) {
  return (
    <ul className={`grid gap-2.5 sm:grid-cols-2 ${className}`}>
      {STATUSES.map((s) => (
        <li key={s.label} className="flex items-start gap-3 rounded-[14px] border border-blue/10 bg-paper px-4 py-3">
          <span aria-hidden="true" className="mt-[0.4rem] h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.dot }} />
          <span>
            <span className="block text-[0.9rem] font-semibold text-blue">{s.label}</span>
            <span className="mt-0.5 block text-[0.82rem] text-ink-soft">{s.note}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
