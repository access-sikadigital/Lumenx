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
 */
export default function GoogleRating({ variant = "dark", className = "" }) {
  const { rating, count, url } = GOOGLE_REVIEWS;
  const dark = variant === "dark";

  const inner = (
    <>
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-[family-name:var(--font-display)] text-lg font-bold ${
          dark ? "bg-white/12 text-white" : "bg-blue/8 text-blue"
        }`}
        aria-hidden="true"
      >
        G
      </span>
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

  const base = `inline-flex items-center gap-3 rounded-full border px-4 py-2.5 transition-colors ${
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
