/**
 * Content localisation for the whole site.
 *
 * ============================================================================
 * THE PROBLEM THIS SOLVES
 * ============================================================================
 * lib/translations.js handles interface strings — buttons, nav, labels — by
 * key. That works for a hundred short strings. It does not work for the site's
 * actual CONTENT, which is 23,000 words living as plain English inside
 * lib/services.js, lib/locations.js, lib/calculators.js and the rest, read
 * directly by components as `SERVICE_PAGES[slug].intro.body[0]`.
 *
 * Rewriting every one of those strings into a `{en, zh, vi, ar}` object would
 * mean touching 21 content files and every component that reads them, and it
 * would make the English files unreadable.
 *
 * Instead: the English files stay exactly as they are, and each language gets
 * an OVERLAY file that mirrors only the parts it has translated. At render
 * time the overlay is deep-merged over the English. Anything the overlay does
 * not define falls through to English automatically.
 *
 * That means:
 *   - translating a page is pure data entry, no code changes;
 *   - a half-finished translation is always safe to ship;
 *   - the English source of truth is never duplicated or forked.
 *
 * ============================================================================
 * HOW TO TRANSLATE A PAGE
 * ============================================================================
 * Mirror the shape of the English object, including only what you translate:
 *
 *   // lib/i18n/zh/services.js
 *   export default {
 *     "residential-solar": {
 *       h1: "为您的家量身设计的太阳能系统",
 *       features: [{ title: "诚实选型" }],   // index 0 only; 1..5 stay English
 *     },
 *   };
 *
 * Arrays merge BY INDEX, so you can translate the first three of six list
 * items and the rest remain English rather than disappearing.
 */

import zhServices from "./zh/services";
import viServices from "./vi/services";
import arServices from "./ar/services";

/* Each language's overlays, grouped by the content file they override. Add a
   new group here when a new content area gets translated. */
const OVERLAYS = {
  zh: { services: zhServices },
  vi: { services: viServices },
  ar: { services: arServices },
};

/**
 * Deep-merge an overlay over a base.
 *
 * Rules, chosen so a partial translation can never produce a blank or a
 * broken page:
 *   - undefined, null and "" in the overlay mean "not translated" and fall
 *     through to the base. An empty string is treated as missing on purpose:
 *     it is what an unfinished entry looks like, and rendering it would blank
 *     a heading.
 *   - arrays merge element-wise, so partial lists work.
 *   - anything not an object or array replaces the base outright.
 */
function merge(base, over) {
  if (over === undefined || over === null || over === "") return base;

  if (Array.isArray(base)) {
    if (!Array.isArray(over)) return over;
    return base.map((item, i) => merge(item, over[i]));
  }

  if (base && typeof base === "object" && over && typeof over === "object") {
    const out = { ...base };
    for (const k of Object.keys(over)) out[k] = merge(base[k], over[k]);
    return out;
  }

  return over;
}

/**
 * Localise one content entry.
 *
 * @param group  which content area, e.g. "services"
 * @param key    the entry within it, e.g. "residential-solar". Pass null for
 *               a group that is a single object rather than a map.
 * @param base   the English object
 * @param lang   active language code
 */
export function localizeContent(group, key, base, lang) {
  if (!lang || lang === "en" || !base) return base;
  const groupOverlay = OVERLAYS[lang]?.[group];
  if (!groupOverlay) return base;
  const over = key == null ? groupOverlay : groupOverlay[key];
  if (!over) return base;
  return merge(base, over);
}

/**
 * How much of a group is translated, for the build report and for deciding
 * whether a language is ready to go live. Counts leaf strings rather than
 * keys, because a key holding an untranslated empty string is not progress.
 */
export function translationCoverage(group, base, lang) {
  if (lang === "en") return 1;
  const over = OVERLAYS[lang]?.[group];
  if (!over) return 0;

  let total = 0;
  let done = 0;
  const walk = (b, o) => {
    if (typeof b === "string") {
      if (b.trim().length > 12) {
        total += 1;
        if (typeof o === "string" && o.trim()) done += 1;
      }
      return;
    }
    if (Array.isArray(b)) {
      b.forEach((item, i) => walk(item, Array.isArray(o) ? o[i] : undefined));
      return;
    }
    if (b && typeof b === "object") {
      for (const k of Object.keys(b)) walk(b[k], o && typeof o === "object" ? o[k] : undefined);
    }
  };
  walk(base, over);
  return total === 0 ? 0 : done / total;
}
