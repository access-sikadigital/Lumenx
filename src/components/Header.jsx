"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { NAV, SITE, TRUST } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const tl = useRef(null);
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
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close on navigation, so the menu never survives a route change.
  useEffect(() => setOpen(false), [pathname]);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(".mm-sheet", { yPercent: -101 });
      gsap.set([".mm-line", ".mm-meta"], { yPercent: 0, opacity: 1 });

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
        // links rise out of their masks
        .from(
          ".mm-line",
          { yPercent: 118, duration: 0.72, stagger: 0.055, ease: "power3.out" },
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

  return (
    <header
      ref={root}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled && !open
          ? "bg-blue/85 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="shell flex h-[72px] items-center justify-between md:h-20">
        <Link href="/" aria-label="Lumenx home" className="relative z-30 flex items-center">
          <img
            src="/logos/lumenx-fullcolor-white.svg"
            alt="Lumenx"
            className="h-7 w-auto md:h-8"
          />
        </Link>

        {/* Desktop nav starts at xl, not lg: with seven links plus the logo
            and buttons, the bar overran the shell between 1024 and 1279 and
            wrapped. Those widths get the full-screen menu instead. */}
        <nav className="hidden items-center gap-6 xl:flex 2xl:gap-8">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative text-[0.95rem] font-medium text-white/85 transition-colors hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-yellow transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 xl:flex">
          {/* Same ghost treatment as the hero, so the phone reads as an equal
              action rather than a label beside a button. Held back to xl:
              between 1024 and 1279 the six nav links plus two buttons do not
              fit the shell, and the quote button is the one that matters. */}
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

      {/* ---------------- mobile menu ---------------- */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        // inert, not just pointer-events-none: pointer-events does not remove
        // the links from the tab order, so a closed menu would otherwise trap
        // keyboard users in six invisible links. React 19 takes a real
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
            style={{
              width: "min(560px, 90%)",
            }}
          />

          <div
            className="shell relative flex min-h-full flex-col"
            style={{ paddingTop: "calc(var(--header-h) + 2rem)", paddingBottom: "2rem" }}
          >
            <nav className="flex flex-col">
              {NAV.map((l, i) => (
                <div
                  key={l.href}
                  className="border-b border-white/10 py-[0.5rem] first:border-t first:border-white/10"
                >
                  {/* The mask carries the font-size so .line's descender
                      allowance (0.16em) scales with the display type rather
                      than the 16px it would otherwise inherit, which is what
                      clips the g in "EV Charging". */}
                  <span
                    className="line"
                    style={{ fontSize: "clamp(1.6rem, 8.5vw, 2.6rem)" }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="mm-line group flex items-baseline gap-3.5 font-[family-name:var(--font-display)] font-bold leading-[1.12] tracking-[-0.03em] text-white"
                    >
                      <span className="numeral text-[0.6rem] font-semibold tracking-[0.14em] text-yellow/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                        {l.label}
                      </span>
                    </Link>
                  </span>
                </div>
              ))}
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
                <span className="font-semibold text-yellow">{SITE.email}</span>
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
