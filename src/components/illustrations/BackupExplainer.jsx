"use client";

import { ENERGY } from "./kit";

/**
 * Backup, and kW versus kWh.
 *
 * This is the single most misunderstood thing a battery customer deals with,
 * and the confusion is expensive: someone expects their whole house to run
 * through a blackout, discovers on the day that it does not, and the install
 * is a complaint rather than a referral.
 *
 * The explanation splits the two units apart and gives each its own half:
 *   kW  is POWER   — how much can run at the same time.
 *   kWh is ENERGY  — how long it lasts.
 *
 * The example figures are a worked illustration, labelled as such, not a
 * promise about anyone's system. Real runtime depends on the battery, the
 * reserve, the weather and the inverter's output limit, and the copy says so
 * rather than burying it.
 */

const POWER = [
  { label: "Backup circuits", kw: 0.55, tone: ENERGY.battery },
  { label: "+ Air conditioning", kw: 2.5, tone: ENERGY.solar },
  { label: "+ Oven", kw: 2.4, tone: ENERGY.grid },
];

const LIMIT = 5; // kW, a typical single-phase battery output limit
const TOTAL = POWER.reduce((a, b) => a + b.kw, 0);

const RUNTIME = [
  { label: "Backup circuits only", draw: "0.55 kW", hours: "about 19 hours", pct: 100 },
  { label: "Add air conditioning", draw: "3.05 kW", hours: "about 3.5 hours", pct: 18 },
];

const CIRCUITS = [
  { label: "Fridge", on: true },
  { label: "Lights", on: true },
  { label: "Wi-Fi and modem", on: true },
  { label: "Air conditioning", on: false },
  { label: "Oven and cooktop", on: false },
  { label: "EV charger", on: false },
];

export default function BackupExplainer({ className = "" }) {
  return (
    <div className={className}>
      <div className="grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-2">
        {/* ---------------- kW: how much at once ---------------- */}
        <section className="rounded-[22px] border border-blue/10 bg-[#FBF7EC] p-[clamp(1.2rem,2.2vw,2rem)]">
          <p className="numeral text-[2rem] leading-none text-blue">kW</p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.05rem] font-bold text-blue">
            Power: how much can run at once
          </h3>

          <ul className="mt-6 space-y-3.5">
            {POWER.map((p) => (
              <li key={p.label}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <span className="text-[0.88rem] text-ink">{p.label}</span>
                  <span className="numeral text-[0.88rem] text-blue">{p.kw} kW</span>
                </div>
                {/* The bar is the argument: three appliances that each look
                    modest add up past the limit line, and you can see it. */}
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-blue/[0.07]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(p.kw / (LIMIT + 1.2)) * 100}%`, background: p.tone }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="relative mt-5 border-t border-dashed border-blue/30 pt-3">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[0.82rem] font-semibold text-blue">Battery output limit</span>
              <span className="numeral text-[0.88rem] text-blue">{LIMIT} kW</span>
            </div>
          </div>

          <p className="mt-5 text-[0.88rem] leading-relaxed text-ink">
            Everything at once is about{" "}
            <strong className="text-blue">{TOTAL.toFixed(2)} kW</strong>, over the battery&rsquo;s
            output. The backup circuits on their own sit well inside it.
          </p>
        </section>

        {/* ---------------- kWh: how long it lasts ---------------- */}
        <section className="rounded-[22px] border border-blue/10 bg-[#FBF7EC] p-[clamp(1.2rem,2.2vw,2rem)]">
          <p className="numeral text-[2rem] leading-none text-blue">kWh</p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.05rem] font-bold text-blue">
            Energy: how long it lasts
          </h3>

          <ul className="mt-6 space-y-5">
            {RUNTIME.map((r) => (
              <li key={r.label}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <span className="text-[0.88rem] text-ink">{r.label}</span>
                  <span className="numeral text-[0.88rem] text-blue">{r.draw}</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-blue/[0.07]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${r.pct}%`, background: ENERGY.battery }}
                  />
                </div>
                <p className="mt-1.5 text-[0.82rem] font-semibold text-green-ink">{r.hours}</p>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[0.8rem] leading-relaxed text-ink-soft">
            Worked example on a 13.5kWh usable battery with 20% held in reserve. Losses, weather
            and your inverter&rsquo;s limits change the real runtime, and your quote models it on
            your own usage.
          </p>
        </section>
      </div>

      {/* ---------------- what stays on ---------------- */}
      <section className="mt-[clamp(1rem,2vw,1.5rem)] rounded-[22px] border border-blue/10 bg-blue p-[clamp(1.2rem,2.2vw,2rem)] text-white">
        <h3 className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold">
          In a blackout
        </h3>
        <p className="mt-2 max-w-[58ch] text-[0.9rem] leading-relaxed text-white/65">
          You choose the backup circuits with us at design time, before anything is installed.
          This is a typical choice, not a fixed list.
        </p>

        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {CIRCUITS.map((c) => (
            <li
              key={c.label}
              className="flex items-center justify-between gap-3 rounded-[14px] border border-white/12 bg-white/[0.04] px-4 py-3"
            >
              <span className={`text-[0.88rem] ${c.on ? "text-white" : "text-white/45"}`}>
                {c.label}
              </span>
              <span
                className="rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-[0.1em]"
                style={{
                  background: c.on ? `${ENERGY.battery}26` : "rgba(255,255,255,0.06)",
                  color: c.on ? "#5FD2AE" : "rgba(255,255,255,0.45)",
                }}
              >
                {c.on ? "On" : "Off"}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
