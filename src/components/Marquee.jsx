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
 *
 * One component now serves every page. Service pages used to show a static row
 * of the four or five brands relevant to that service, which looked thin next
 * to the home page's moving row and made the range look smaller than it is.
 * They all show the full set, moving, so the proof is the same wherever you
 * land.
 *
 * `tone` switches it for a navy section: the logos are inverted to white
 * rather than left dark on dark.
 */
export default function Marquee({
  eyebrow = "Brands we install",
  tone = "light",
  bare = false,
  // Runs right-to-left by default. The brands row is meant to travel the
  // OPPOSITE way to the accreditation strip that sits above it, so the two
  // never read as one long band moving together. Pass reverse={false} for a
  // row that should run the other way.
  reverse = true,
  className = "",
}) {
  const row = [...BRANDS, ...BRANDS];
  const dark = tone === "dark";

  // `bare` drops the background, grain and glow, for when this sits inside a
  // section that already has them. Without it the products hub would paint the
  // grain twice and stack two glows in the same corner.
  const Tag = bare ? "div" : "section";
  const skin = bare
    ? ""
    : dark
      ? "grain relative overflow-hidden bg-blue"
      : "border-y border-blue/10 bg-white";

  return (
    <Tag className={`${skin} py-[clamp(2rem,3.5vw,3.5rem)] ${className}`}>
      {dark && !bare && (
        <div
          aria-hidden="true"
          className="glow glow--solar right-[-10%] top-[-70%]"
          style={{ width: "min(460px, 38%)" }}
        />
      )}

      <div className="shell relative mb-8">
        <div className="flex items-center gap-5">
          <span className={`eyebrow shrink-0 ${dark ? "text-yellow" : "text-ink-soft"}`}>
            {eyebrow}
          </span>
          <span className={`h-px flex-1 ${dark ? "bg-white/15" : "bg-blue/10"}`} />
        </div>
      </div>

      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul
          className={`marquee-track flex w-max items-center gap-[clamp(2.5rem,4vw,5rem)] pr-[clamp(2.5rem,4vw,5rem)] ${
            reverse
              ? "animate-[marquee-rev_52s_linear_infinite]"
              : "animate-[marquee_52s_linear_infinite]"
          }`}
        >
          {row.map((b, i) => (
            <li key={`${b.file}-${i}`} className="shrink-0">
              <img
                src={`/brands/${b.file}`}
                alt={i < BRANDS.length ? b.name : ""}
                aria-hidden={i >= BRANDS.length ? "true" : undefined}
                // Intrinsic dimensions, so the browser knows the aspect ratio
                // and reserves the right box BEFORE the file arrives. Without
                // them a not-yet-loaded logo is `width` wide and zero high, so
                // it holds its slot in the row while showing nothing, which is
                // what produced the blank gaps mid-marquee.
                width={b.iw}
                height={b.ih}
                // Not lazy: the row is animating, so every logo is on screen
                // within seconds anyway, and the whole set is about 250KB.
                // Lazy loading here only buys a visible hole.
                loading="eager"
                decoding="async"
                className={`block h-auto transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  dark
                    // On navy the logos still have to be knocked to white:
                    // Hayward, SensaHeat and Wallbox are pure black artwork
                    // and would be invisible, and several of the colour marks
                    // (GoodWe, Longi, Sunman, SolarEdge) sit under 30% luma.
                    ? "opacity-70 brightness-0 invert hover:opacity-100"
                    // Full colour on the pale ground. 13 of the 16 files are
                    // genuinely colour artwork; the greyscale was a CSS filter
                    // throwing that away.
                    : "opacity-95 hover:opacity-100"
                }`}
                // Height auto so the width attribute above does not fight the
                // rendered size; the attributes only supply the aspect ratio.
                style={{ width: `${b.w}px`, height: "auto" }}
              />
            </li>
          ))}
        </ul>
      </div>
    </Tag>
  );
}
