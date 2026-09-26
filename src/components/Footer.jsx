import Link from "next/link";
import { SITE, FOOTER_LINKS, OFFICES, TRUST, CREDIT, LEGAL_LINKS } from "@/lib/site";
import { LOCATIONS } from "@/lib/locations";
import { CALCULATORS, REBATE_CHECK } from "@/lib/calculators";

/**
 * Site footer.
 *
 * The previous version opened with its own CTA band ("Ready to build a
 * brighter future?" plus a quote button) sitting immediately beneath the CTA
 * section's near-identical ask, so visitors met the same request twice in a
 * row. That band is gone: the CTA section is the single close, and the footer
 * does what a footer is for.
 *
 * It was also three columns across a 1920 canvas, which left the offices
 * stranded from the link lists with a chasm between them. Now four columns,
 * weighted so the content-heavy ones get the room.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-blue text-white/70">
      {/* soft solar glow */}
      <div
        aria-hidden="true"
        className="glow glow--solar -right-40 -top-40 h-[560px] w-[560px]"
      />

      <div
        className="shell relative"
        style={{ paddingTop: "clamp(3.5rem, 7vh, 6rem)", paddingBottom: "clamp(2rem, 4vh, 3rem)" }}
      >
        <div className="ft-grid grid gap-x-10 gap-y-14">
          {/* brand + direct contact */}
          <div>
            <img
              src="/logos/lumenx-tagline-white.svg"
              alt="Lumenx, Sustainable Energy"
              className="h-10 w-auto md:h-12"
            />
            <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-white/55">
              Solar, batteries and EV charging across Victoria and New South Wales. Accredited
              installs, rebates handled, backed for sixteen years.
            </p>

            <div className="mt-8">
              <span aria-hidden="true" className="block h-px w-10 bg-ember" />
              <a
                href={SITE.phoneHref}
                className="mt-5 block font-[family-name:var(--font-display)] text-xl font-semibold text-white transition-colors duration-500 hover:text-yellow"
              >
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-1.5 block text-sm text-yellow transition-colors duration-500 hover:text-white"
              >
                {SITE.email}
              </a>
            </div>
          </div>

          {/* link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p className="eyebrow mb-6 text-white/55">{heading}</p>
              <ul className="space-y-3.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="ft-link text-sm text-white/70 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* offices */}
          <div>
            <p className="eyebrow mb-6 text-white/55">Our offices</p>
            <ul className="space-y-6">
              {OFFICES.map((o) => (
                <li key={o.state}>
                  <p className="flex items-center gap-2.5 text-sm font-semibold text-white">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-yellow" />
                    {o.state}
                  </p>
                  <a
                    href={o.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block max-w-[30ch] pl-[1rem] text-sm leading-relaxed text-white/60 transition-colors duration-500 hover:text-white"
                  >
                    {o.address}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Areas and tools as dense internal-link rows rather than two more
            columns, so the four-column grid above keeps its proportions. */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="eyebrow mb-5 text-white/55">Areas we cover</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {LOCATIONS.map((l) => (
              <li key={l.slug}>
                <Link href={`/${l.slug}`} className="ft-link text-sm text-white/60 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="eyebrow mb-5 text-white/55">Free calculators</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {[...CALCULATORS, REBATE_CHECK].map((t) => (
              <li key={t.slug}>
                <Link href={`/${t.slug}`} className="ft-link text-sm text-white/60 hover:text-white">
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* credential strip */}
        <ul
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-[0.66rem] uppercase tracking-[0.14em] text-white/55"
        >
          {TRUST.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-green" />
              {t}
            </li>
          ))}
        </ul>

        {/* bottom bar */}
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/[0.07] pt-8 text-xs text-white/55 md:flex-row md:items-center">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-5">
            <p>© {new Date().getFullYear()} Lumenx. Sustainable Energy. All rights reserved.</p>
            <span aria-hidden="true" className="hidden h-3 w-px bg-white/15 md:block" />
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="underline decoration-white/20 underline-offset-4 transition-colors duration-500 hover:text-white hover:decoration-white/50"
              >
                {l.label}
              </Link>
            ))}
            <span aria-hidden="true" className="hidden h-3 w-px bg-white/15 md:block" />
            <p>
              {CREDIT.prefix}{" "}
              <a
                href={CREDIT.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white/70 underline decoration-white/20 underline-offset-4 transition-colors duration-500 hover:text-yellow hover:decoration-yellow/50"
              >
                {CREDIT.label}
              </a>
            </p>
          </div>
          <p className="text-white/55">{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
