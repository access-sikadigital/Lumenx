"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GOOGLE_REVIEWS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * Google branding assets, both optional, both auto-detected.
 *
 * Save either file into /public/logos/ and the badge picks it up on the next
 * reload with no code change. Neither is bundled: these are Google's
 * trademarks, so the badge has to carry Google's real artwork rather than a
 * redrawn copy, which would breach their brand guidelines and read as fake.
 *
 *   google-reviews.png  a wide "Google Reviews" lockup. Takes priority, and
 *                       because such lockups already contain their own star
 *                       row the badge drops its own. PNG, JPG or SVG all work
 *                       and a white background is fine: the card is white.
 *
 *   google-g.svg        just the full-colour Google "G". Used when there is
 *                       no lockup. Pairs with the badge's own "Google
 *                       Reviews" text and star row, which is the arrangement
 *                       Google's own guidelines describe.
 *
 * Sources: Google's Brand Resource Center (about.google/brand-resource-center)
 * or the marketing kit inside your Google Business Profile.
 */
const GOOGLE_LOCKUP_SRC = "/logos/google-reviews.png";
const GOOGLE_MARK_SRC = "/logos/google-g.svg";

function Star({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={className} width="13" height="13" aria-hidden="true">
      <path
        fill="currentColor"
        d="M10 1.6l2.47 5.33 5.83.68-4.32 3.96 1.16 5.75L10 14.43l-5.14 2.89 1.16-5.75L1.7 7.61l5.83-.68L10 1.6z"
      />
    </svg>
  );
}

/**
 * Sticky Google review badge.
 *
 * Appears once the hero has scrolled past, pins to the bottom left, and steps
 * aside when the footer arrives so it never sits on top of the contact
 * details. Dismissible, because a permanent overlay on someone's screen
 * should always be closeable.
 */
export default function ReviewBadge() {
  const root = useRef(null);
  const [pastHero, setPastHero] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  // true once an asset 404s, i.e. that file has not been added yet
  const [markMissing, setMarkMissing] = useState(false);
  const [lockupMissing, setLockupMissing] = useState(false);

  useGSAP(() => {
    const triggers = [];

    const hero = document.getElementById("hero");
    if (hero) {
      triggers.push(
        ScrollTrigger.create({
          trigger: hero,
          start: "bottom 65%",
          onEnter: () => setPastHero(true),
          onLeaveBack: () => setPastHero(false),
        })
      );
    } else {
      // Inner pages have no hero: fall back to a plain scroll threshold.
      const onScroll = () => setPastHero(window.scrollY > 420);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      triggers.push({ kill: () => window.removeEventListener("scroll", onScroll) });
    }

    const footer = document.querySelector("footer");
    if (footer) {
      triggers.push(
        ScrollTrigger.create({
          trigger: footer,
          start: "top bottom-=60",
          onEnter: () => setAtFooter(true),
          onLeaveBack: () => setAtFooter(false),
        })
      );
    }

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const rating = parseFloat(GOOGLE_REVIEWS.rating);
  const hasRating = Number.isFinite(rating) && rating > 0;
  const pct = hasRating ? Math.max(0, Math.min(100, (rating / 5) * 100)) : 0;
  const hasLink = GOOGLE_REVIEWS.url && GOOGLE_REVIEWS.url !== "#";
  const count = String(GOOGLE_REVIEWS.count || "").trim();

  const useLockup = !lockupMissing;

  // The lockup is self-contained, so it can carry the badge on its own. The
  // text layout has nothing to show without a rating.
  if (!useLockup && !hasRating) return null;

  const shown = pastHero && !atFooter && !dismissed;

  const label = hasRating
    ? `Rated ${GOOGLE_REVIEWS.rating} out of 5 on Google${count ? ` from ${count} reviews` : ""}`
    : "Google Reviews";

  // Exact partial fill: grey row underneath, gold row clipped to the rating.
  const stars = (
    <span className="relative inline-flex">
      <span className="flex gap-[2px] text-mist">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="shrink-0" />
        ))}
      </span>
      <span
        className="absolute inset-y-0 left-0 flex gap-[2px] overflow-hidden text-yellow"
        style={{ width: `${pct}%` }}
        aria-hidden="true"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="shrink-0" />
        ))}
      </span>
    </span>
  );

  const rating2dp = (
    <span className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold leading-none text-blue">
      {GOOGLE_REVIEWS.rating}
    </span>
  );

  // Lockup layout: artwork only. The lockup already carries the wordmark and
  // its star row, so the card is sized to the image and nothing else.
  const inner = useLockup ? (
    <img
      src={GOOGLE_LOCKUP_SRC}
      alt={label}
      className="block"
      // White behind the artwork as well as on the card: the PNG has a
      // transparent background, so without this the cream body colour shows
      // through wherever the logo is see-through.
      // Shrinks on the narrowest phones so the badge never takes half the
      // screen: 120px at 320px wide, 148px from ~435px up.
      style={{
        width: "clamp(120px, 34vw, 148px)",
        height: "auto",
        backgroundColor: "#fff",
      }}
      onError={() => setLockupMissing(true)}
    />
  ) : (
    <>
      {/* White background, never tinted: Google's guidelines require the
          full-colour G unmodified on white or black, with clear space. */}
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white ring-1 ring-blue/10">
        {!markMissing ? (
          <img
            src={GOOGLE_MARK_SRC}
            alt="Google"
            width="20"
            height="20"
            className="h-5 w-5"
            onError={() => setMarkMissing(true)}
          />
        ) : (
          <Star className="text-yellow" />
        )}
      </span>

      <span className="min-w-0">
        <span className="flex items-center gap-2">
          {rating2dp}
          {stars}
        </span>
        <span className="mt-1.5 block truncate text-[0.66rem] uppercase tracking-[0.12em] text-ink-soft">
          Google Reviews{count ? ` · ${count}` : ""}
        </span>
      </span>
    </>
  );

  // Image-only card: even padding all round, close button out on the corner
  // so it does not eat into it.
  //
  // Background is set to true white rather than the bg-white utility, because
  // --color-white in this design system is the brand cream (#faf7f1). Against
  // the lockup's own white that reads as a seam, and Google's guidelines call
  // for their marks on white.
  const cardClass = `rounded-2xl ring-1 ring-blue/10 transition-shadow duration-500 ${
    useLockup ? "block overflow-hidden p-3" : "flex items-center gap-3 bg-white py-3 pl-3 pr-9"
  }`;

  return (
    <div
      ref={root}
      className="pointer-events-none fixed bottom-0 left-0 z-40"
      style={{
        paddingLeft: "clamp(0.85rem, 2vw, 1.75rem)",
        paddingBottom: "max(clamp(0.85rem, 2vw, 1.75rem), env(safe-area-inset-bottom))",
      }}
    >
      <div
        className="pointer-events-auto relative"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "none" : "translate3d(-14px, 14px, 0) scale(0.95)",
          visibility: shown ? "visible" : "hidden",
          transition:
            "opacity .55s var(--ease-brand), transform .55s var(--ease-brand), visibility .55s",
          boxShadow: "0 18px 44px -18px rgba(11,20,59,.45)",
          borderRadius: "1rem",
        }}
      >
        {hasLink ? (
          <a
            href={GOOGLE_REVIEWS.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label}. Opens Google reviews in a new tab.`}
            className={`${cardClass} hover:shadow-lg`}
            style={useLockup ? { backgroundColor: "#fff" } : undefined}
          >
            {inner}
          </a>
        ) : (
          <div
            className={cardClass}
            aria-label={label}
            role="img"
            style={useLockup ? { backgroundColor: "#fff" } : undefined}
          >
            {inner}
          </div>
        )}

        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss the Google reviews badge"
          className={
            useLockup
              ? "absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-white text-ink-soft shadow-md ring-1 ring-blue/10 transition-colors duration-300 hover:text-blue"
              : "absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full text-ink-soft transition-colors duration-300 hover:bg-cloud hover:text-blue"
          }
        >
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path
              d="M1 1l8 8M9 1l-8 8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
