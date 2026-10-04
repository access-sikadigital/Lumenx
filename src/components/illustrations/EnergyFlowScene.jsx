"use client";

import { useId, useState } from "react";
import { useLang } from "@/lib/i18n";
import {
  Battery,
  ENERGY,
  EnergyLine,
  House,
  INK,
  Inverter,
  Label,
  Moon,
  OpenSwitch,
  Pill,
  Scene,
  SolarPanel,
  Sun,
  Switchboard,
  Pylon,
} from "./kit";

/**
 * Energy flow: Day / Night / Blackout.
 *
 * The replacement for the old "How it works" section, which mixed product
 * photographs, a rendered house and line icons, and drew every arrow as the
 * same small navy line so nothing told you which way the energy was going or
 * where it came from.
 *
 * THE RULE THAT MAKES THIS WORK: the equipment never moves. Every component
 * below is placed at a fixed coordinate and rendered in all three modes. Only
 * the LINES, the STATUS and the EXPLANATION change. A reader switching from
 * Day to Blackout is therefore comparing two states of one picture instead of
 * reading three different pictures, which is the entire pedagogical point.
 *
 * No numbers appear anywhere in the scene. A figure beside a battery in a
 * diagram reads as a live meter reading, and this is an explainer, not
 * monitoring.
 */

/* Keys only. Every visible word in this scene is looked up at render time,
   so switching language relabels the diagram in place. Nothing here is baked
   into the artwork, which is the whole point of the client's "labels are live
   text" rule. */
const MODES = [
  { key: "day", labelKey: "ef_day", headKey: "ef_day_head", bodyKey: "ef_day_body" },
  { key: "night", labelKey: "ef_night", headKey: "ef_night_head", bodyKey: "ef_night_body" },
  { key: "blackout", labelKey: "ef_blackout", headKey: "ef_blackout_head", bodyKey: "ef_blackout_body" },
];

export default function EnergyFlowScene({ className = "" }) {
  const [mode, setMode] = useState("day");
  /* Bumping this remounts the animated paths, which restarts their CSS
     animation from zero. The dots run once for about seven seconds and then
     stop, so Replay is how you watch it again — and the control has to exist,
     because an animation that plays once and can never be replayed is worse
     than one that loops. */
  const [run, setRun] = useState(0);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const { tr } = useLang();
  const m = MODES.find((x) => x.key === mode) ?? MODES[0];

  // Changing mode is itself a replay: new lines, new run.
  const chooseMode = (key) => {
    setMode(key);
    setRun((n) => n + 1);
  };

  const day = mode === "day";
  const night = mode === "night";
  const blackout = mode === "blackout";

  /* Line states. Reading these four lines tells you the whole diagram:
     solar feeds the house, solar charges the battery, the battery feeds the
     house, the grid connects. Each is active only in the modes where that
     energy genuinely moves. */
  const solarToHouse = day ? "active" : "idle";
  const solarToBattery = day ? "active" : "idle";
  const batteryToHouse = night || blackout ? "active" : "standby";
  const gridLine = blackout ? "isolated" : night ? "active" : "active";

  return (
    <div className={className}>
      {/* ---------- mode tabs ---------- */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
      <div
        role="tablist"
        aria-label="Energy flow through the day"
        className="inline-flex rounded-full bg-cloud p-1 ring-1 ring-blue/10"
      >
        {MODES.map((x) => {
          const on = x.key === mode;
          return (
            <button
              key={x.key}
              id={`${uid}-tab-${x.key}`}
              role="tab"
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => chooseMode(x.key)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                e.preventDefault();
                const i = MODES.findIndex((y) => y.key === mode);
                const next = MODES[(i + (e.key === "ArrowRight" ? 1 : -1) + MODES.length) % MODES.length];
                chooseMode(next.key);
                document.getElementById(`${uid}-tab-${next.key}`)?.focus();
              }}
              className={`rounded-full px-5 py-2 text-[0.86rem] font-semibold transition-colors duration-300 ${
                on ? "bg-action text-blue" : "text-ink hover:text-blue"
              }`}
            >
              {tr(x.labelKey)}
            </button>
          );
        })}
      </div>

        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.82rem] font-semibold text-ink ring-1 ring-blue/12 transition-colors hover:text-blue"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13.5 8a5.5 5.5 0 1 1-1.9-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M13.5 1.5v3.2h-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {tr("ef_replay")}
        </button>
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${mode}`}
        className="grid items-start gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-[1.45fr_1fr]"
      >
        {/* ---------- the scene ---------- */}
        <div className="rounded-[22px] border border-blue/10 bg-[#FBF7EC] p-[clamp(0.75rem,1.6vw,1.5rem)]">
          <Scene key={`${mode}-${run}`} viewBox="0 0 640 380" title={tr("ef_heading")} desc={tr(m.bodyKey)}>
            {/* Sky. Sun by day, moon otherwise: the sun is not "off", it is
                not there, and an unlit sun icon reads as a fault. */}
            {day ? <Sun x={92} y={52} /> : <Moon x={92} y={52} />}

            {/* --- fixed equipment. Identical coordinates in every mode. --- */}
            <SolarPanel x={46} y={104} lit={day} />
            <Inverter x={214} y={116} on={!blackout || true} />
            <Battery x={214} y={236} level={day ? 0.85 : night ? 0.45 : 0.6} on />
            <Switchboard x={330} y={150} on />
            <House x={408} y={120} lit={!blackout} />
            <Pylon x={592} y={116} on={!blackout} />

            {/* --- energy lines --- */}

            {/* panels to inverter */}
            <EnergyLine
              d="M138 132 L214 146"
              source="solar"
              state={solarToHouse}
            />

            {/* inverter to switchboard, then into the home */}
            <EnergyLine
              d="M260 146 L330 170"
              source={day ? "solar" : night ? "battery" : "battery"}
              state={day || night || blackout ? "active" : "idle"}
            />
            <EnergyLine
              d="M370 168 L408 168"
              source={day ? "solar" : "battery"}
              state="active"
            />

            {/* inverter down to the battery (charging) */}
            <EnergyLine
              d="M237 176 L237 236"
              source="solar"
              state={solarToBattery}
            />

            {/* battery back up to the switchboard (discharging) */}
            <EnergyLine
              d="M254 265 L300 265 L330 192"
              source="battery"
              state={batteryToHouse}
              reverse
            />

            {/* Switchboard to grid.
                The SOURCE changes with the mode, and this is the detail that
                makes the whole legend honest. By day the energy on this line
                is surplus from the panels heading out, so it is drawn solar
                yellow: colour means where the energy came FROM, not which
                wire it happens to be on. At night the same wire carries grid
                energy inward, so it is blue. Getting this wrong would make
                the legend a decoration. */}
            <EnergyLine
              d="M370 182 L470 300 L592 300 L592 190"
              source={day ? "solar" : "grid"}
              state={gridLine}
              reverse={!day}
            />
            {blackout && <OpenSwitch x={520} y={300} />}

            {/* --- equipment names, then the status pill UNDER each one.
                   Name first, state second: the pill is an update on a thing
                   the reader has already identified. --- */}
            <Label x={92} y={178} size={11.5} weight={700} fill={INK}>
              {tr("ef_solar_panels")}
            </Label>
            <Pill x={92} y={200} text={day ? tr("ef_generating") : tr("ef_asleep")} tone={day ? "solar" : "idle"} />

            <Label x={237} y={108} size={11.5} weight={700}>
              {tr("ef_inverter")}
            </Label>

            <Label x={237} y={314} size={11.5} weight={700}>
              {tr("ef_battery")}
            </Label>
            <Pill x={237} y={336} text={day ? tr("ef_charging") : tr("ef_supplying")} tone="battery" />

            <Label x={352} y={142} size={11.5} weight={700}>
              {tr("ef_switchboard")}
            </Label>

            <Label x={470} y={256} size={11.5} weight={700}>
              {tr("ef_home")}
            </Label>

            <Label x={606} y={212} size={11.5} weight={700}>
              {tr("ef_grid")}
            </Label>
            <Pill
              x={530}
              y={332}
              text={blackout ? tr("ef_isolated") : day ? tr("ef_exporting") : tr("ef_importing")}
              tone={blackout ? "idle" : day ? "solar" : "grid"}
            />

            {/* Backup circuit callout, blackout only. This is the one thing a
                customer actually wants to know in an outage. */}
            {blackout && (
              <>
                <Label x={470} y={278} size={11} weight={500} fill={ENERGY.battery}>
                  {tr("ef_backup_on")}
                </Label>
                <Label x={470} y={294} size={11} weight={500} fill={ENERGY.idle}>
                  {tr("ef_other_off")}
                </Label>
              </>
            )}
          </Scene>
        </div>

        {/* ---------- explanation + legend ---------- */}
        <div>
          {/* aria-live, because switching tab changes this text and a screen
              reader user is not looking at the picture that changed with it. */}
          <div aria-live="polite">
            <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,2vw,1.6rem)] font-bold leading-snug text-blue">
              {tr(m.headKey)}
            </h3>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-ink">{tr(m.bodyKey)}</p>
          </div>

          <div className="mt-8 border-t border-blue/10 pt-6">
            <p className="mb-4 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              {tr("ef_legend_title")}
            </p>
            <ul className="space-y-2.5">
              {[
                ["solar", "ef_from_panels"],
                ["battery", "ef_from_battery"],
                ["grid", "ef_from_grid"],
                ["idle", "ef_not_in_use"],
              ].map(([k, key]) => (
                <li key={k} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-[3px] w-8 shrink-0 rounded-full"
                    style={{ background: ENERGY[k] }}
                  />
                  <span className="text-[0.88rem] text-ink">{tr(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-[0.78rem] leading-relaxed text-ink-soft">
            {tr("ef_not_live")}
          </p>
        </div>
      </div>
    </div>
  );
}
