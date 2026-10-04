"use client";

/**
 * The Lumenx illustration kit.
 *
 * One style for every explainer on the site, taken from the Lumenx
 * illustration canvas:
 *
 *   - 2.5px navy outline, nothing thinner and nothing thicker
 *   - flat fills: no gradients, no photo cut-outs, no drop shadows
 *   - COLOUR MEANS ENERGY SOURCE, and nothing else. A line is coloured for
 *     where its energy came from, never for decoration.
 *   - equipment never moves between modes. Only lines, status and labels
 *     change, so a reader comparing Day with Blackout is looking at the same
 *     house rather than re-reading a new picture.
 *   - every word is live text in the DOM, never baked into the artwork, so it
 *     can be translated and read aloud.
 *
 * Everything here is pure SVG with no library. These drawings sit on marketing
 * pages that must stay fast, and a diagramming dependency would cost more than
 * the drawings do.
 */

/* Energy-source palette. These four are the whole vocabulary: if a new line
   needs a fifth colour, the diagram is trying to say something the kit was
   not designed to say, and the fix is to simplify the diagram. */
export const ENERGY = {
  solar: "#E3A008",
  battery: "#13876A",
  grid: "#2F63B5",
  idle: "#AEB4C4",
};

export const INK = "#0B143B";
export const ROOF = "#24346E";
export const CREAM = "#FBF7EC";
export const PAPER = "#FFFFFF";
export const ACTION = "#F8C646";

/** The one stroke width in the kit. */
export const STROKE = 2.5;

export const outline = {
  fill: "none",
  stroke: INK,
  strokeWidth: STROKE,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/**
 * An energy line.
 *
 * `state` is the whole semantic:
 *   active   — energy is moving now. Coloured by source, dots travelling.
 *   standby  — the path exists and is available, but nothing is flowing.
 *   idle     — connected, nothing moving, and not expected to.
 *   isolated — deliberately broken, drawn with the open-switch marker.
 *
 * The travelling dots are a CSS animation on stroke-dashoffset rather than a
 * JS loop: it runs on the compositor, costs nothing, and stops dead under
 * prefers-reduced-motion without any code to handle that case.
 */
export function EnergyLine({
  d,
  source = "grid",
  state = "idle",
  label,
  dur = 7,
  reverse = false,
}) {
  const active = state === "active";
  const isolated = state === "isolated";
  const colour = active ? ENERGY[source] : state === "standby" ? ENERGY.idle : ENERGY.idle;

  return (
    <g aria-hidden="true">
      {/* The track. Always drawn, so the circuit is legible even when nothing
          is flowing: a reader can see that the path EXISTS and is simply not
          in use, which is the point the Night and Blackout modes are making. */}
      <path
        d={d}
        fill="none"
        stroke={colour}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={isolated ? "7 7" : undefined}
        opacity={active ? 1 : 0.55}
      />

      {/* Travelling dots, only while energy is actually moving. */}
      {active && (
        <path
          className={`nrg-dots ${reverse ? "nrg-dots--rev" : ""}`}
          d={d}
          fill="none"
          stroke={ENERGY[source]}
          strokeWidth={STROKE + 2.5}
          strokeLinecap="round"
          strokeDasharray="0.1 16"
          style={{ animationDuration: `${dur}s` }}
        />
      )}

      {label}
    </g>
  );
}

/**
 * The open-switch marker for an isolated line. In a blackout the grid line is
 * not merely inactive, it is physically disconnected, and a dashed line alone
 * does not say that.
 */
export function OpenSwitch({ x, y, rotate = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} aria-hidden="true">
      <circle r="4" cx="-11" cy="0" fill={PAPER} stroke={INK} strokeWidth={STROKE} />
      <circle r="4" cx="11" cy="0" fill={PAPER} stroke={INK} strokeWidth={STROKE} />
      <path d="M-8 -1.5 L8 -11" {...outline} />
    </g>
  );
}

/**
 * A piece of equipment. Fixed position by contract: the same component is
 * rendered at the same coordinates in every mode, and only `on` changes.
 */
export function Box({ x, y, w, h, r = 8, on = true, fill = PAPER, children }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x={0}
        y={0}
        width={w}
        height={h}
        rx={r}
        fill={fill}
        stroke={INK}
        strokeWidth={STROKE}
        opacity={on ? 1 : 0.45}
      />
      {children}
    </g>
  );
}

/**
 * A text label.
 *
 * `data-rtl-text` is what lets an Arabic reader get right-to-left TEXT inside
 * a diagram that itself stays left-to-right. See `.ltr-lock` in globals.css:
 * the drawing must not mirror, because the energy would appear to flow
 * backwards, but the words still have to read correctly.
 */
export function Label({ x, y, children, size = 13, weight = 600, fill = INK, anchor = "middle" }) {
  return (
    <text
      x={x}
      y={y}
      data-rtl-text=""
      textAnchor={anchor}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      fontFamily="var(--font-display)"
    >
      {children}
    </text>
  );
}

/** A status pill: "on", "off", "Generating". Small, flat, outlined. */
export function Pill({ x, y, text, tone = "idle" }) {
  const colour = ENERGY[tone] ?? ENERGY.idle;
  const w = Math.max(34, text.length * 6.6 + 18);
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x={-w / 2}
        y={-10}
        width={w}
        height={20}
        rx={10}
        fill={PAPER}
        stroke={colour}
        strokeWidth={2}
      />
      <circle cx={-w / 2 + 11} cy={0} r={3} fill={colour} />
      <text
        x={6}
        y={4}
        data-rtl-text=""
        textAnchor="middle"
        fontSize={10.5}
        fontWeight={700}
        fill={INK}
        fontFamily="var(--font-display)"
      >
        {text}
      </text>
    </g>
  );
}

/**
 * The frame every illustration sits in.
 *
 * `title` and `desc` are a real accessible name and description, not alt
 * text bolted on afterwards: these diagrams carry meaning that a sighted
 * reader gets from the picture, so a screen reader has to be given the same
 * meaning in words. Each scene supplies a `desc` that changes with its mode,
 * which is the text alternative per mode the punch list asks for.
 */
export function Scene({ viewBox, title, desc, children, className = "" }) {
  const id = title.replace(/\W+/g, "-").toLowerCase();
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-labelledby={`${id}-t ${id}-d`}
      // ltr-lock: the scene never mirrors, in any language.
      className={`ltr-lock block h-auto w-full ${className}`}
    >
      <title id={`${id}-t`}>{title}</title>
      <desc id={`${id}-d`}>{desc}</desc>
      {children}
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Equipment. Drawn once, reused by every scene, always at the size  */
/* the scene places them at.                                         */
/* ---------------------------------------------------------------- */

export function SolarPanel({ x, y, lit = false }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width="92" height="56" rx="4" fill={lit ? ENERGY.solar : ROOF} stroke={INK} strokeWidth={STROKE} />
      <path d="M0 18.7h92M0 37.3h92M30.7 0v56M61.3 0v56" stroke={INK} strokeWidth="1.6" opacity="0.65" />
    </g>
  );
}

export function Inverter({ x, y, on = true }) {
  return (
    <Box x={x} y={y} w={46} h={60} on={on}>
      <path d="M12 22 L23 22 L18 32 L28 32" fill="none" stroke={on ? ENERGY.solar : ENERGY.idle} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="23" cy="46" r="3.5" fill={on ? ENERGY.battery : ENERGY.idle} />
    </Box>
  );
}

export function Battery({ x, y, level = 0.6, on = true }) {
  const inner = 44 * Math.max(0, Math.min(1, level));
  return (
    <Box x={x} y={y} w={40} h={58} on={on}>
      <rect x="13" y="-6" width="14" height="6" rx="2" fill={PAPER} stroke={INK} strokeWidth={STROKE} />
      <rect x="7" y={7 + (44 - inner)} width="26" height={inner} rx="3" fill={on ? ENERGY.battery : ENERGY.idle} />
    </Box>
  );
}

export function Switchboard({ x, y, on = true }) {
  return (
    <Box x={x} y={y} w={40} h={50} on={on}>
      <path d="M10 14h20M10 24h20M10 34h20" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    </Box>
  );
}

export function House({ x, y, lit = true }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 44 L62 0 L124 44" fill={ROOF} stroke={INK} strokeWidth={STROKE} strokeLinejoin="round" />
      <rect x="12" y="44" width="100" height="74" rx="6" fill={CREAM} stroke={INK} strokeWidth={STROKE} />
      <rect x="34" y="62" width="26" height="24" rx="3" fill={lit ? ACTION : PAPER} stroke={INK} strokeWidth={2} />
      <rect x="72" y="62" width="26" height="24" rx="3" fill={lit ? ACTION : PAPER} stroke={INK} strokeWidth={2} />
      <rect x="52" y="94" width="22" height="24" rx="2" fill={PAPER} stroke={INK} strokeWidth={2} />
    </g>
  );
}

export function Pylon({ x, y, on = true }) {
  const c = on ? INK : ENERGY.idle;
  return (
    <g transform={`translate(${x} ${y})`} opacity={on ? 1 : 0.5}>
      <path d="M14 0 L0 74 M14 0 L28 74 M5 26h18 M2 50h24" fill="none" stroke={c} strokeWidth={STROKE} strokeLinecap="round" />
      <path d="M2 12h24" fill="none" stroke={c} strokeWidth={STROKE} strokeLinecap="round" />
    </g>
  );
}

export function Sun({ x, y, out = false }) {
  const c = out ? ENERGY.idle : ENERGY.solar;
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden="true">
      <circle r="17" fill={out ? PAPER : ENERGY.solar} stroke={c} strokeWidth={STROKE} />
      {!out &&
        [0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <path
            key={a}
            d="M0 -25 L0 -31"
            stroke={ENERGY.solar}
            strokeWidth={STROKE}
            strokeLinecap="round"
            transform={`rotate(${a})`}
          />
        ))}
    </g>
  );
}

export function Moon({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden="true">
      <path
        d="M6 -16 A17 17 0 1 0 6 16 A13 13 0 1 1 6 -16 Z"
        fill={PAPER}
        stroke={INK}
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
    </g>
  );
}
