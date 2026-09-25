"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { NAV_GROUPS, SITE, TRUST } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(null); // which desktop panel is open
  const [section, setSection] = useState(NAV_GROUPS[0].label); // which mobile group is expanded
  const root = useRef(null);
  const tl = useRef(null);
  const closeTimer = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the menu, and keep the scrollbar's width reserved so
  // the layout underneath does not jump sideways as it opens.
  useEffect(() => {
    if (!open) return;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close on navigation, so neither menu survives a route change.
  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  // Reopening the menu starts from the first group rather than wherever the
  // last visit was left.
  useEffect(() => {
    if (!open) setSection(NAV_GROUPS[0].label);
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // A short grace period on leave: without it, the diagonal mouse path from a
  // trigger to the panel below passes over a gap and slams the panel shut.
  const hold = (label) => {
    clearTimeout(closeTimer.current);
    setMenu(label);
  };
  const release = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 160);
  };

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(".mm-sheet", { yPercent: -101 });
      gsap.set([".mm-group", ".mm-meta"], { yPercent: 0, opacity: 1 });

      if (reduce) {
        tl.current = gsap
          .timeline({ paused: true })
          .to(".mm-sheet", { yPercent: 0, duration: 0.001 });
        return;
      }

      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "power4.inOut" } })
        // two sheets wipe down, the ember one a beat ahead of the navy
        .to(".mm-sheet--accent", { yPercent: 0, duration: 0.62 }, 0)
        .to(".mm-sheet--base", { yPercent: 0, duration: 0.62 }, 0.09)
        // group headings rise out of their masks
        .from(
          ".mm-line",
          { yPercent: 118, duration: 0.72, stagger: 0.07, ease: "power3.out" },
          0.42
        )
        .from(
          ".mm-meta",
          { y: 22, opacity: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" },
          0.62
        );
    },
    { scope: root }
  );

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) t.play();
    else t.reverse();
  }, [open]);

  const solid = scrolled || menu;

  return (
    <header
      ref={root}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid && !open
          ? "bg-blue/92 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md"
          : "bg-transparent"
      }`}
      onMouseLeave={release}
    >
      <div className="shell flex h-[72px] items-center justify-between md:h-20">
        <Link href="/" aria-label="Lumenx home" className="relative z-30 flex items-center">
          <img
            src="/logos/lumenx-fullcolor-white.svg"
            alt="Lumenx"
            className="h-7 w-auto md:h-8"
          />
        </Link>

        {/* Desktop nav starts at xl. Four grouped triggers rather than a flat
            list: the site has forty-odd pages and a flat bar stopped fitting
            the shell a long time before that. */}
        <nav className="hidden items-center gap-7 xl:flex 2xl:gap-9" aria-label="Main">
          {NAV_GROUPS.map((g) => {
            const on = menu === g.label;
            return (
              <div key={g.label} onMouseEnter={() => hold(g.label)} onFocus={() => hold(g.label)}>
                <Link
                  href={g.href}
                  aria-expanded={on}
                  className="group relative flex items-center gap-1.5 py-2 text-[0.95rem] font-medium text-white/85 transition-colors hover:text-white"
                >
                  {g.label}
                  <svg
                    width="9"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    aria-hidden="true"
                    className={`mt-px transition-transform duration-300 ${on ? "rotate-180" : ""}`}
                  >
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] bg-yellow transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      on ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 xl:flex">
          {/* Same ghost treatment as the hero, so the phone reads as an equal
              action rather than a label beside a button. */}
          <a href={SITE.phoneHref} className="btn btn-sm btn-ghost text-white">
            <span>{SITE.phone}</span>
          </a>
          <Link href="/get-a-quote" className="btn btn-sm btn-primary">
            <span>Get a Free Quote</span>
          </Link>
        </div>

        {/* toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="relative z-30 -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] xl:hidden"
        >
          <span
            className={`h-[2px] w-6 bg-white transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-white transition-all duration-300 ${
              open ? "scale-x-0 opacity-0" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-white transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* ---------------- desktop dropdown panels ---------------- */}
      {NAV_GROUPS.map((g) => {
        const on = menu === g.label;
        return (
          <div
            key={g.label}
            inert={!on}
            onMouseEnter={() => hold(g.label)}
            className={`absolute inset-x-0 top-full hidden origin-top xl:block ${
              on ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <div
              className={`shell transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                on ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
              }`}
            >
              <div className="grain relative overflow-hidden rounded-b-[24px] border-x border-b border-white/10 bg-blue-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
                <div
                  aria-hidden="true"
                  className="glow glow--solar right-[-8%] top-[-60%]"
                  style={{ width: "min(420px, 34%)" }}
                />

                <div
                  className="relative grid gap-x-[clamp(1.5rem,3vw,3.5rem)] gap-y-9 p-[clamp(1.75rem,2.6vw,2.75rem)]"
                  style={{ gridTemplateColumns: `repeat(${g.columns.length}, minmax(0, 1fr))` }}
                >
                  {g.columns.map((col) => (
                    <div key={col.heading}>
                      <p className="mb-5 border-b border-white/10 pb-3 text-[0.64rem] uppercase tracking-[0.16em] text-yellow/80">
                        {col.heading}
                      </p>
                      <ul className="space-y-1">
                        {col.links.map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              onClick={() => setMenu(null)}
                              className="group block rounded-[12px] px-3 py-2.5 transition-colors duration-300 hover:bg-white/[0.06]"
                            >
                              <span className="block text-[0.92rem] font-medium text-white transition-colors group-hover:text-yellow">
                                {l.label}
                              </span>
                              <span className="mt-0.5 block text-[0.78rem] text-white/45">{l.line}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* ---------------- mobile menu ---------------- */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        // inert, not just pointer-events-none: pointer-events does not remove
        // the links from the tab order, so a closed menu would otherwise trap
        // keyboard users in a few dozen invisible links. React 19 takes a real
        // boolean here; the empty-string form is the pre-19 spelling.
        inert={!open}
        className={`fixed inset-0 z-20 xl:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* ember sheet leads, navy sheet lands on top of it */}
        <div className="mm-sheet mm-sheet--accent absolute inset-0 bg-ember" aria-hidden="true" />
        {/* overflow-x must be clipped explicitly. The glow below is inset with
            a negative offset so it bleeds past the right edge; with only
            overflow-y set, the computed overflow-x becomes auto, the sheet
            turns into a horizontally scrollable box ~135px wider than the
            viewport, and the menu renders scrolled right, which reads as the
            whole content being cut off down the left. */}
        <div className="mm-sheet mm-sheet--base grain absolute inset-0 overflow-y-auto overflow-x-hidden bg-blue">
          <div
            aria-hidden="true"
            className="glow glow--solar right-[-30%] top-[-18%]"
            style={{ width: "min(560px, 90%)" }}
          />

          <div
            className="shell relative flex min-h-full flex-col"
            style={{ paddingTop: "calc(var(--header-h) + 2rem)", paddingBottom: "2rem" }}
          >
            {/* Collapsible sections, one open at a time. Thirty-odd links
                laid out flat turned the menu into a long scroll where the
                last two groups were never seen. The panel animates on
                grid-template-rows rather than height, so it does not need a
                measured pixel value and still transitions. */}
            <nav className="flex flex-col" aria-label="Main">
              {NAV_GROUPS.map((g, i) => {
                const expanded = section === g.label;
                const links = g.columns.flatMap((c) => c.links);
                const panelId = `mm-panel-${i}`;

                return (
                  <section key={g.label} className="mm-group border-t border-white/10 first:border-t-0">
                    {/* The mask carries the font-size so .line's descender
                        allowance (0.16em) scales with the display type rather
                        than the 16px it would otherwise inherit, which is what
                        clips descenders at display sizes. */}
                    <span className="line block" style={{ fontSize: "clamp(1.35rem, 6.4vw, 1.95rem)" }}>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        onClick={() => setSection(expanded ? null : g.label)}
                        className="mm-line flex w-full items-center gap-3.5 py-5 text-left font-[family-name:var(--font-display)] font-bold leading-[1.12] tracking-[-0.03em] text-white"
                      >
                        <span className="numeral shrink-0 text-[0.55rem] font-semibold tracking-[0.14em] text-yellow/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">{g.label}</span>
                        <span
                          aria-hidden="true"
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            expanded ? "rotate-45 border-yellow bg-yellow text-blue" : "border-white/25 text-white"
                          }`}
                        >
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                          </svg>
                        </span>
                      </button>
                    </span>

                    <div
                      id={panelId}
                      className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <ul className="grid gap-x-5 gap-y-0.5 pb-6 sm:grid-cols-2">
                          {links.map((l) => (
                            <li key={l.href}>
                              <Link
                                href={l.href}
                                tabIndex={expanded ? undefined : -1}
                                onClick={() => setOpen(false)}
                                className="group flex items-center justify-between gap-3 border-b border-white/[0.07] py-2.5 text-[0.92rem] text-white/65 transition-colors hover:text-white"
                              >
                                <span className="min-w-0">{l.label}</span>
                                <span
                                  aria-hidden="true"
                                  className="shrink-0 text-yellow/50 transition-transform duration-300 group-hover:translate-x-1"
                                >
                                  →
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                );
              })}
            </nav>

            <div className="mt-auto pt-10">
              <Link
                href="/get-a-quote"
                onClick={() => setOpen(false)}
                className="mm-meta btn btn-primary w-full justify-center"
              >
                <span>Get a Free Quote</span>
              </Link>

              <a
                href={SITE.phoneHref}
                className="mm-meta mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-sm text-white/60"
              >
                <span className="uppercase tracking-[0.14em]">Call us</span>
                <span className="font-semibold text-white">{SITE.phone}</span>
              </a>

              <a
                href={`mailto:${SITE.email}`}
                className="mm-meta mt-3 flex items-center justify-between gap-4 text-sm text-white/60"
              >
                <span className="uppercase tracking-[0.14em]">Email</span>
                <span className="break-all text-right font-semibold text-yellow">{SITE.email}</span>
              </a>

              <ul className="mm-meta mt-7 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/10 pt-5 text-[0.6rem] uppercase tracking-[0.12em] text-white/40">
                {TRUST.map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-green" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
