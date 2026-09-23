import { BRANDS } from "@/lib/site";

/**
 * Supplier logo marquee.
 *
 * Previously the brand names were set as text, which read as a typographic
 * list rather than as proof of who Lumenx actually installs. These are the
 * real supplier logos.
 *
 * Every logo is pre-trimmed of transparent margin and normalised to the same
 * pixel height, then sized by WIDTH here. Height-matching alone makes a tall
 * square mark like GE tower over a long wordmark like LG Energy Solution, so
 * each width is set to optically balance the row instead.
 */
export default function Marquee() {
  const row = [...BRANDS, ...BRANDS];

  return (
    <section className="border-b border-blue/10 bg-white py-[clamp(2rem,3.5vw,3.5rem)]">
      <div className="shell mb-8">
        <div className="flex items-center gap-5">
          <span className="eyebrow shrink-0 text-ink-soft">Tier-1 hardware we install</span>
          <span className="h-px flex-1 bg-blue/10" />
        </div>
      </div>

      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex w-max animate-[marquee_52s_linear_infinite] items-center gap-[clamp(2.5rem,4vw,5rem)] pr-[clamp(2.5rem,4vw,5rem)]">
          {row.map((b, i) => (
            <li key={`${b.file}-${i}`} className="shrink-0">
              <img
                src={`/brands/${b.file}`}
                alt={i < BRANDS.length ? b.name : ""}
                aria-hidden={i >= BRANDS.length ? "true" : undefined}
                loading="lazy"
                decoding="async"
                className="block h-auto opacity-55 grayscale transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-100 hover:grayscale-0"
                style={{ width: `${b.w}px` }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
