"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { tr } from "@/lib/translations";

/**
 * Four languages: English, Simplified Chinese, Vietnamese, Arabic.
 *
 * All four are LIVE. The global interface and the home page are translated in
 * lib/translations.js; deeper pages fall back to English through `t()`, so
 * nothing ever renders blank.
 *
 * STILL REQUIRED BEFORE LAUNCH: the client brief asks for a native speaker or
 * NAATI-certified translator to review the translated text, and that has not
 * happened yet. Regulated wording — finance, credit, fees, rebates,
 * warranties, accreditation — has deliberately been left in English for that
 * reason, so nothing currently translated makes a regulated claim.
 */
export const LANGUAGES = [
  { code: "en", label: "English", short: "EN", dir: "ltr", htmlLang: "en-AU", live: true },
  { code: "zh", label: "中文", short: "中文", dir: "ltr", htmlLang: "zh-Hans", live: true },
  { code: "vi", label: "Tiếng Việt", short: "VI", dir: "ltr", htmlLang: "vi", live: true },
  { code: "ar", label: "العربية", short: "AR", dir: "rtl", htmlLang: "ar", live: true },
];

export const DEFAULT_LANG = "en";
export const LIVE_LANGUAGES = LANGUAGES.filter((l) => l.live);

const STORAGE_KEY = "lumenx.lang";
const LangCtx = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(DEFAULT_LANG);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      // A saved language that is no longer live falls back to English rather
      // than stranding someone on an empty translation.
      if (saved && LANGUAGES.some((l) => l.code === saved && l.live)) setLang(saved);
    } catch {
      /* storage blocked; English stands */
    }
  }, []);

  /**
   * The lang and dir attributes live on <html>, which this provider does not
   * own, so they are set imperatively. Both matter: `lang` is what a screen
   * reader uses to choose a voice and what the Noto font fallbacks key off,
   * and `dir` is what flips the entire layout for Arabic.
   */
  useEffect(() => {
    const def = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
    const root = document.documentElement;
    root.setAttribute("lang", def.htmlLang);
    root.setAttribute("dir", def.dir);
    // A hook for the one exception in the punch list: the energy-flow scene
    // stays left-to-right even in Arabic, because the diagram reads sun to
    // roof to home and mirroring it would reverse the direction of the
    // energy. See `.ltr-lock` in globals.css.
    root.dataset.lang = def.code;
    return () => {
      root.setAttribute("lang", "en-AU");
      root.setAttribute("dir", "ltr");
      delete root.dataset.lang;
    };
  }, [lang]);

  const value = useMemo(() => {
    const def = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
    return {
      lang,
      dir: def.dir,
      isRtl: def.dir === "rtl",
      label: def.label,
      setLang(next) {
        if (!LANGUAGES.some((l) => l.code === next && l.live)) return;
        setLang(next);
        try {
          window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* choice applies for this visit only */
        }
      },
      /**
       * Pick the right string from a `{ en, zh, vi, ar }` object, falling back
       * to English for anything not yet translated. Content can therefore be
       * translated piece by piece without any page breaking in between.
       */
      t(entry) {
        if (entry == null) return "";
        if (typeof entry === "string") return entry;
        return entry[lang] ?? entry[DEFAULT_LANG] ?? "";
      },
      /**
       * Look a key up in the shared dictionary. This is what components use:
       * `tr("hero_start")` rather than importing the dictionary and indexing
       * it themselves, so there is one place that decides what "missing
       * translation" means.
       */
      tr(key) {
        return tr(key, lang);
      },
    };
  }, [lang]);

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (ctx) {
    return ctx;
  }
  return {
    lang: DEFAULT_LANG,
    dir: "ltr",
    isRtl: false,
    label: "English",
    setLang() {},
    t: (entry) => (typeof entry === "string" ? entry : (entry?.[DEFAULT_LANG] ?? "")),
    tr: (key) => tr(key, DEFAULT_LANG),
  };
}
