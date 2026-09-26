import { GOOGLE_REVIEWS } from "@/lib/site";

function Stars({ className = "" }) {
  return (
    <div className={`flex gap-0.5 text-yellow ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Google review trust badge.
 * `variant="dark"` sits on the navy hero, `"light"` on pale sections.
 *
 * The mark is the real four-colour Google "G", from the asset supplied for
 * this project — not a redrawn one. Google's logo is a trademark with
 * published brand guidelines, so it is used as issued rather than
 * reconstructed, recoloured or restyled.
 *
 * It carries transparency and reads correctly on both the cream and the navy
 * ground, so it needs no white chip behind it.
 */
export default function GoogleRating({ variant = "dark", className = "" }) {
  const { rating, count, url } = GOOGLE_REVIEWS;
  const dark = variant === "dark";

  const inner = (
    <>
      <img
        src="/logos/google-g.png"
        alt="Google"
        width={144}
        height={144}
        loading="lazy"
        decoding="async"
        className="block h-[26px] w-[26px] shrink-0"
      />

      <span className="leading-tight">
        <span className="flex items-center gap-2">
          <Stars />
          <span className={`font-semibold ${dark ? "text-white" : "text-blue"}`}>{rating}</span>
        </span>
        <span className={`mt-0.5 block text-[0.72rem] ${dark ? "text-white/55" : "text-ink-soft"}`}>
          {count ? `Rated by ${count} Google reviews` : "Rated on Google Reviews"}
        </span>
      </span>
    </>
  );

  const base = `inline-flex items-center gap-3 rounded-full border px-3 py-2.5 transition-colors ${
    dark
      ? "border-white/15 bg-white/[0.06] backdrop-blur-sm hover:bg-white/10"
      : "border-blue/12 bg-white hover:bg-cloud"
  } ${className}`;

  const label = `Rated ${rating} out of 5 on Google Reviews`;

  if (url && url !== "#") {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={base} aria-label={label}>
        {inner}
      </a>
    );
  }
  return (
    <div className={base} aria-label={label} role="img">
      {inner}
    </div>
  );
}
