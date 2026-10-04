"use client";

import EnergyFlowScene from "@/components/illustrations/EnergyFlowScene";
import { Reveal } from "@/components/ui/Reveal";
import { useLang } from "@/lib/i18n";

/**
 * "How it works" on the home page.
 *
 * REPLACED, 4 October 2026. The previous version was four cards on a navy
 * band, each with a stage number, a headline, a line of copy and a statistic.
 * It had three problems the client was right about:
 *
 *   1. It mixed product photographs, a rendered house and flat line icons in
 *      one explanation, so it never read as a single diagram.
 *   2. Every connection was drawn as the same small navy line, which meant
 *      the picture could not say where energy came from or which way it went.
 *   3. It carried figures ("98% peak inverter efficiency", "10kWh") beside
 *      equipment, which reads as a live meter rather than as an explainer.
 *
 * What replaced it is one house, drawn once, shown in three states. The
 * equipment never moves between them; only the lines, the status and the
 * explanation change. The whole thing is live text over flat SVG, so it
 * translates and it reads aloud.
 *
 * ENERGY_FLOW in lib/site.js is no longer used by this component. It is left
 * in place because the four stage descriptions are good copy and are likely
 * to be wanted elsewhere; delete it once that is settled.
 */
export default function EnergyFlow() {
  const { tr } = useLang();

  return (
    <section
      className="bg-white"
      style={{
        paddingTop: "clamp(4rem, 10vh, 8rem)",
        paddingBottom: "clamp(4rem, 10vh, 8rem)",
      }}
    >
      <div className="shell">
        <Reveal className="max-w-[46rem]">
          <p className="eyebrow mb-5 text-ember">{tr("ef_eyebrow")}</p>
          <h2 className="t-h2 text-blue">{tr("ef_heading")}</h2>
          <p className="t-body mt-6 max-w-[52ch] text-ink">
            {tr("ef_lead")}
          </p>
        </Reveal>

        <Reveal className="mt-[clamp(2.5rem,5vw,4rem)]">
          <EnergyFlowScene />
        </Reveal>
      </div>
    </section>
  );
}
