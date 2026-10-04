import { TRUST } from "@/lib/site";

/**
 * Accreditation logos.
 *
 * Every one sits on a white chip on purpose. The four pieces of artwork arrive
 * with different grounds, aspect ratios and colour: two are dark-text wordmarks
 * that vanish on navy, one is a cyan disc, one is a gold-and-navy badge.
 * Normalising the CONTAINER rather than the artwork is what lets them share a
 * row without recolouring anyone's logo, which accreditation bodies generally
 * forbid.
 *
 * Sizing is per-logo, not shared. Matching raw height made the round badges a
 * third of the visual weight of the wordmarks: at the same height a 3:1
 * wordmark lays down about 2700px of ink and a 1:1 disc only 900, and the disc
 * has to fit its text inside that circle. Each entry carries its own optical
 * scale so they read as peers.
 *
 * `spread` stretches the row to fill its container, for the places that were
 * leaving most of the width empty: the chips become equal columns and the
 * logos sit centred and large inside them.
 */
export default function TrustBadges({ size = "md", spread = false, className = "" }) {
  // Cap height for the WORDMARKS; the discs scale up from it via t.scale.
  const h = size === "sm" ? 44 : size === "lg" ? 76 : 58;
  const pad = spread ? "px-4 py-4" : size === "sm" ? "px-3 py-2.5" : "px-4 py-3";

  /* Column count follows TRUST.length rather than being hard-coded.
     The row was written for four accreditations; removing the 16-year
     warranty badge left a fourth column with nothing in it, which reads as a
     missing logo rather than as a deliberate set of three. Deriving it means
     the row stays correct whether Lumenx adds the SAA mark later or drops
     another one. */
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4" }[TRUST.length] ?? "sm:grid-cols-4";

  return (
    <ul
      className={
        // w-full so the grid still fills the row even when a parent is a flex
        // container, where a grid would otherwise size to its own content.
        spread
          // The last-child:nth-child(odd) pair handles an ODD count in the
          // two-column mobile grid: the orphan spans both columns instead of
          // sitting half-width against empty space. Reset at sm, where the
          // real column count takes over.
          ? `grid w-full grid-cols-2 items-stretch gap-[clamp(0.6rem,1.1vw,1.1rem)] [&>li:last-child:nth-child(odd)]:col-span-2 ${cols} sm:[&>li:last-child:nth-child(odd)]:col-span-1 ${className}`
          : `flex flex-wrap items-center gap-[clamp(0.6rem,1vw,0.9rem)] ${className}`
      }
    >
      {TRUST.map((t) => (
        <li key={t.file} className={spread ? "min-w-0" : ""}>
          <span
            className={`flex items-center justify-center rounded-[14px] bg-paper ring-1 ring-blue/10 ${pad} ${
              spread ? "h-full w-full" : ""
            }`}
          >
            <img
              src={`/accreditations/${t.file}`}
              alt={t.label}
              width={t.w}
              height={t.h}
              loading="lazy"
              decoding="async"
              className="block w-auto max-w-full"
              style={{ height: `${Math.round(h * (t.scale ?? 1))}px` }}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}
