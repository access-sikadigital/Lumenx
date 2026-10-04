"use client";

import { useEffect, useRef, useState } from "react";
import { LANGUAGES, LIVE_LANGUAGES, useLang } from "@/lib/i18n";

/**
 * Language switcher for the header.
 *
 * Languages that are built but not yet translated are rendered, disabled,
 * with the reason shown. That is deliberate: a Vietnamese speaker who can see
 * "Tiếng Việt — coming soon" learns something useful, whereas hiding it
 * entirely tells them nothing and makes the work invisible to the client too.
 *
 * With only English live the whole control collapses to nothing, so the
 * header is not carrying a menu with a single item. Flip `live` in
 * LANGUAGES once the translations are signed off and it appears.
 */
export default function LanguageSwitcher({ tone = "dark", className = "" }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  const dark = tone === "dark";

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Nothing to switch between yet.
  if (LIVE_LANGUAGES.length < 2) return null;

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Language: ${current.label}. Change language`}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.8rem] font-semibold transition-colors duration-300 ${
          dark
            ? "text-white/75 ring-1 ring-white/15 hover:text-white"
            : "text-ink ring-1 ring-blue/12 hover:text-blue"
        }`}
      >
        <span>{current.short}</span>
        <span aria-hidden="true" className={`text-[0.6rem] transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Language"
          className="absolute end-0 z-50 mt-2 min-w-[11rem] overflow-hidden rounded-[14px] border border-blue/10 bg-paper py-1.5 shadow-[0_18px_40px_-18px_rgba(11,20,59,0.5)]"
        >
          {LANGUAGES.map((l) => {
            const on = l.code === lang;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={on}
                  disabled={!l.live}
                  lang={l.htmlLang}
                  dir={l.dir}
                  onClick={() => {
                    if (!l.live) return;
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-start text-[0.88rem] transition-colors ${
                    l.live
                      ? on
                        ? "font-semibold text-blue"
                        : "text-ink hover:bg-cloud hover:text-blue"
                      : "cursor-not-allowed text-ink-soft/60"
                  }`}
                >
                  <span>{l.label}</span>
                  {!l.live && (
                    <span className="text-[0.64rem] uppercase tracking-[0.12em]">soon</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
