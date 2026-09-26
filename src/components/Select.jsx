"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Branded select.
 *
 * A native <select> renders its option list with operating-system chrome: a
 * system blue highlight, a system font, square corners and no control over
 * spacing. On a page built in cream, navy and ember it reads as a piece of
 * someone else's interface dropped into the card.
 *
 * So this is a real listbox rather than a restyled native control, and it
 * carries the keyboard behaviour a native select has, which is the part that
 * is usually dropped when people rebuild one:
 *
 *   Space / Enter / Arrow    open, and select the active option when open
 *   Arrow up / down          move through options
 *   Home / End               first and last
 *   A printable character    jump to the next option starting with it
 *   Escape                   close and keep the current value
 *   Tab                      close and move on
 *
 * Focus stays on the trigger and the active option is announced through
 * aria-activedescendant, which avoids moving focus into a popup and having to
 * trap and restore it.
 *
 * `meta` is an optional second line per option. The city select uses it to
 * show each city's peak sun hours, so the number that drives the calculation
 * is visible at the point the choice is made rather than buried in the
 * assumptions further down the page.
 */
export default function Select({
  id,
  value,
  options,
  onChange,
  meta,
  name,
  placeholder,
  required,
  invalid,
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => Math.max(0, options.indexOf(value)));
  const root = useRef(null);
  const listRef = useRef(null);
  const typed = useRef({ buf: "", at: 0 });
  const empty = value === "" || value == null;

  // Close when the click lands anywhere else. mousedown rather than click, so
  // the panel is gone before the other control receives its own event.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (root.current && !root.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Opening always starts from the current value, not from wherever the
  // highlight was left last time.
  useEffect(() => {
    if (open) setActive(Math.max(0, options.indexOf(value)));
  }, [open, value, options]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    // With no scroll container on the list this only nudges the page when an
    // option sits below the fold during arrow-key navigation. inline:"nearest"
    // stops it ever scrolling sideways.
    listRef.current
      .querySelector(`[data-i="${active}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [open, active]);

  const commit = (i) => {
    onChange(options[i]);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    const last = options.length - 1;

    if (e.key === "Escape") {
      if (open) { e.preventDefault(); setOpen(false); }
      return;
    }
    if (e.key === "Tab") { setOpen(false); return; }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      setActive((i) => (e.key === "ArrowDown" ? Math.min(last, i + 1) : Math.max(0, i - 1)));
      return;
    }
    if (e.key === "Home" && open) { e.preventDefault(); setActive(0); return; }
    if (e.key === "End" && open) { e.preventDefault(); setActive(last); return; }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open) commit(active);
      else setOpen(true);
      return;
    }

    // Type-ahead. The buffer resets after a second of no typing, so "b" then a
    // pause then "b" steps through the b's rather than searching for "bb".
    if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const now = Date.now();
      const t = typed.current;
      t.buf = now - t.at > 1000 ? e.key : t.buf + e.key;
      t.at = now;

      const q = t.buf.toLowerCase();
      const from = open ? active : options.indexOf(value);
      const order = [...options.slice(from + 1), ...options.slice(0, from + 1)];
      const hit = order.find((o) => o.toLowerCase().startsWith(q));
      if (hit) {
        const i = options.indexOf(hit);
        if (open) setActive(i);
        else onChange(hit);
      }
    }
  };

  const listId = `${id}-listbox`;

  const border = invalid
    ? "border-ember/70"
    : open
      ? "border-ember ring-2 ring-ember/20"
      : "border-blue/15 hover:border-blue/30";

  return (
    <div ref={root} className="relative">
      {/* The trigger is a button, so a plain form would not submit anything.
          This carries the value into FormData exactly as the native control
          would have, which keeps the quote form's server contract unchanged. */}
      {name && <input type="hidden" name={name} value={empty ? "" : value} required={required} />}

      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        aria-invalid={invalid || undefined}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={`flex w-full items-center justify-between gap-3 rounded-[14px] border bg-paper px-4 py-3.5 text-left text-[0.95rem] outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ember/20 ${border} ${
          empty ? "text-ink-soft" : "text-blue"
        }`}
      >
        {/* Wraps rather than truncates. The longest option, "Australian Capital
            Territory (ACT)", needs about 263px and the control has roughly 150px
            at a 320px viewport; truncating would cut the state code off the end,
            which is the part that identifies it fastest. */}
        <span className="min-w-0">{empty ? placeholder || "Select an option" : value}</span>
        <svg
          width="11"
          height="7"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 text-ink-soft transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "rotate-180 text-ember" : ""
          }`}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 origin-top transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1.5 opacity-0"
        }`}
      >
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label="Options"
          tabIndex={-1}
          // No height cap: every option is visible at once and the list never
          // scrolls. Safe because the longest list here is the eight states and
          // territories, which is a fixed, small set. If a much longer list is
          // ever passed in, this is the line that needs revisiting.
          className="overflow-x-hidden rounded-[16px] border border-blue/12 bg-paper p-1.5 shadow-[0_26px_50px_-24px_rgba(11,20,59,0.42)]"
        >
          {options.map((o, i) => {
            const selected = o === value;
            const isActive = i === active;
            return (
              <li key={o}>
                <div
                  id={`${id}-opt-${i}`}
                  data-i={i}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => commit(i)}
                  className={`flex cursor-pointer items-start justify-between gap-3 rounded-[11px] px-3 py-2.5 transition-colors duration-150 ${
                    isActive ? "bg-ember/[0.09]" : ""
                  }`}
                >
                  <span className="flex min-w-0 items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className={`mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200 ${
                        selected ? "bg-ember" : isActive ? "bg-blue/25" : "bg-transparent"
                      }`}
                    />
                    <span
                      className={`min-w-0 text-[0.93rem] leading-snug ${
                        selected ? "font-semibold text-ember" : "text-blue"
                      }`}
                    >
                      {o}
                    </span>
                  </span>
                  {meta && (
                    <span className="numeral mt-[0.15rem] shrink-0 text-[0.76rem] text-ink-soft">{meta(o)}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
