"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getSignature } from "@/lib/service-signatures";

gsap.registerPlugin(ScrollTrigger);

/**
 * Per-service signature sections.
 *
 * Each page gets one section that could not sit on any other service. The
 * shared template handles what every service has in common; this handles what
 * makes each one different.
 */

/* ---------- shared chrome ---------- */
function Shell({ children, dark = true, id }) {
  return (
    <section
      id={id}
      className={
        dark
          ? "grain relative overflow-hidden bg-blue text-white"
          : "relative overflow-hidden bg-cloud text-blue"
      }
      style={{ paddingTop: "clamp(4.5rem, 11vh, 9rem)", paddingBottom: "clamp(4.5rem, 11vh, 9rem)" }}
    >
      {dark && (
        <div
          aria-hidden="true"
          className="glow glow--solar right-[-10%] top-[-15%]"
          style={{
            width: "min(640px, 50%)",
          }}
        />
      )}
      <div className="shell relative">{children}</div>
    </section>
  );
}

function Head({ eyebrow, heading, lead, dark = true }) {
  return (
    /* No max-width on the wrapper. `ch` resolves against the element's own
       font-size, so a 64ch cap here is ~560px at the inherited 16px — far
       narrower than the h2's own cap at display size, which meant the
       heading was being squeezed by its container, not by its own rule. */
    <div className="sg-head">
      <p className={`eyebrow mb-5 ${dark ? "text-yellow" : "text-ember"}`}>{eyebrow}</p>
      {/* 26ch, not 18ch: these headings run 24–55 characters, and at 18ch the
          longest were breaking into four lines with half the row empty beside
          them. 26ch lands every one of them on one or two lines. */}
      <h2 className={`t-h2 max-w-[26ch] ${dark ? "" : "text-blue"}`}>{heading}</h2>
      <p className={`t-body mt-6 max-w-[60ch] ${dark ? "text-white/65" : "text-ink"}`}>{lead}</p>
    </div>
  );
}

const headIn = (root) =>
  gsap.from(".sg-head > *", {
    y: 26,
    opacity: 0,
    duration: 0.8,
    stagger: 0.09,
    ease: "power3.out",
    scrollTrigger: { trigger: root, start: "top 80%" },
  });

/* ================= commercial: load curve ================= */
function LoadCurve({ d }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      headIn(root.current);
      const st = { trigger: ".lc-chart", start: "top 82%" };
      gsap.from(".lc-draw", {
        strokeDashoffset: 1200,
        duration: 1.9,
        stagger: 0.25,
        ease: "power2.inOut",
        scrollTrigger: st,
      });
      gsap.from(".lc-fill", { opacity: 0, duration: 1.1, delay: 0.9, ease: "power2.out", scrollTrigger: st });
      gsap.from(".lc-note", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".lc-notes", start: "top 88%" },
      });
    },
    { scope: root }
  );

  // Illustrative shapes only — labelled as such in the caption.
  const gen = "M0,190 C60,188 90,150 130,96 C170,44 200,26 250,26 C300,26 330,44 370,96 C410,150 440,188 500,190";
  const dem = "M0,178 L70,178 C90,178 95,104 120,104 L380,104 C405,104 410,178 430,178 L500,178";
  const overlap =
    "M70,178 C90,178 95,104 120,104 L130,96 C170,44 200,26 250,26 C300,26 330,44 370,96 L380,104 L380,104 C405,104 410,178 430,178 Z";

  return (
    <div ref={root}>
      <Shell>
        <Head eyebrow={d.eyebrow} heading={d.heading} lead={d.lead} />

        <div className="lc-chart mt-[clamp(2.5rem,5vw,4rem)] rounded-[24px] border border-white/12 bg-blue-2/50 p-[clamp(1.25rem,2.5vw,2.75rem)]">
          <svg viewBox="0 0 500 220" className="block w-full" role="img" aria-label="Illustrative chart comparing solar generation with business demand across a day">
            <defs>
              <linearGradient id="lcOverlap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#81d553" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#81d553" stopOpacity="0.04" />
              </linearGradient>
            </defs>

            {[26, 67, 108, 149, 190].map((y) => (
              <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            ))}

            <path className="lc-fill" d={overlap} fill="url(#lcOverlap)" />
            <path
              className="lc-draw"
              d={gen}
              fill="none"
              stroke="#ffb120"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="1200"
            />
            <path
              className="lc-draw"
              d={dem}
              fill="none"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1200"
              strokeDashoffset="0"
            />

            {["6am", "9am", "12pm", "3pm", "6pm", "9pm"].map((t, i) => (
              <text key={t} x={12 + i * 96} y="212" fill="rgba(255,255,255,0.35)" fontSize="10" letterSpacing="1">
                {t}
              </text>
            ))}
          </svg>

          <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-6 text-[0.72rem] uppercase tracking-[0.12em] text-white/50">
            {d.legend.map((l) => (
              <li key={l.key} className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{
                    background:
                      l.tone === "yellow" ? "#ffb120" : l.tone === "green" ? "rgba(129,213,83,.55)" : "rgba(255,255,255,.75)",
                  }}
                />
                {l.label}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 max-w-[74ch] text-[0.78rem] leading-relaxed text-white/40">{d.caption}</p>

        <div className="lc-notes mt-[clamp(2.5rem,4vw,3.5rem)] grid gap-[clamp(1rem,1.5vw,1.5rem)] md:grid-cols-3">
          {d.notes.map((n) => (
            <div key={n.title} className="lc-note rounded-[18px] border border-white/12 bg-blue-2/40 p-[clamp(1.35rem,1.7vw,2rem)]">
              <h3 className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold">{n.title}</h3>
              <p className="mt-2.5 text-[0.92rem] leading-relaxed text-white/60">{n.line}</p>
            </div>
          ))}
        </div>
      </Shell>
    </div>
  );
}

/* ================= batteries: day cycle ================= */
const TONE_BG = { yellow: "#ffb120", ember: "#e8420a", green: "#81d553", ink: "rgba(255,255,255,0.3)" };

function DayCycle({ d }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      headIn(root.current);
      gsap.from(".dc-seg", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.85,
        stagger: 0.13,
        ease: "power3.out",
        scrollTrigger: { trigger: ".dc-track", start: "top 86%" },
      });
      gsap.from(".dc-card", {
        y: 34,
        opacity: 0,
        duration: 0.8,
        stagger: 0.11,
        ease: "power3.out",
        scrollTrigger: { trigger: ".dc-cards", start: "top 84%" },
      });
      gsap.from(".dc-row", {
        y: 20,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".dc-compare", start: "top 88%" },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <Shell>
        <Head eyebrow={d.eyebrow} heading={d.heading} lead={d.lead} />

        {/* 24h track */}
        <div className="dc-track mt-[clamp(2.5rem,5vw,4rem)] flex h-3 w-full overflow-hidden rounded-full">
          {d.phases.map((p) => (
            <span
              key={p.time}
              className="dc-seg h-full flex-1"
              style={{ background: TONE_BG[p.tone] || TONE_BG.ink }}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="dc-cards mt-6 grid gap-[clamp(1rem,1.5vw,1.5rem)] sm:grid-cols-2 xl:grid-cols-4">
          {d.phases.map((p) => (
            <article
              key={p.time}
              className="dc-card flex flex-col rounded-[18px] border border-white/12 bg-blue-2/45 p-[clamp(1.35rem,1.7vw,1.9rem)]"
            >
              <p className="text-[0.66rem] uppercase tracking-[0.16em] text-white/40">{p.time}</p>
              <h3 className="t-h3 mt-3">{p.title}</h3>
              <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-white/60">{p.line}</p>
              <p className="mt-6 flex items-center gap-2.5 border-t border-white/10 pt-4 text-[0.7rem] uppercase tracking-[0.12em] text-white/45">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ background: TONE_BG[p.tone] || TONE_BG.ink }}
                />
                {p.source}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-6 max-w-[74ch] text-[0.78rem] leading-relaxed text-white/40">{d.caption}</p>

        {/* with / without */}
        <div className="dc-compare mt-[clamp(2.5rem,4vw,3.5rem)] overflow-hidden rounded-[22px] border border-white/12">
          <div className="grid grid-cols-[1fr_1fr] gap-px bg-white/10 sm:grid-cols-[1.1fr_1fr_1fr]">
            <div className="hidden bg-blue px-6 py-4 text-[0.66rem] uppercase tracking-[0.14em] text-white/35 sm:block" />
            <div className="bg-blue px-5 py-4 text-[0.66rem] uppercase tracking-[0.14em] text-white/40">Without a battery</div>
            <div className="bg-blue px-5 py-4 text-[0.66rem] uppercase tracking-[0.14em] text-yellow">With a battery</div>

            {d.compare.rows.map((r) => (
              <div key={r.label} className="dc-row contents">
                <div className="col-span-2 bg-blue-2/40 px-5 py-4 font-[family-name:var(--font-display)] text-[0.95rem] font-semibold sm:col-span-1">
                  {r.label}
                </div>
                <div className="bg-blue px-5 py-4 text-[0.88rem] leading-relaxed text-white/50">{r.without}</div>
                <div className="bg-blue px-5 py-4 text-[0.88rem] leading-relaxed text-white/85">{r.with}</div>
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </div>
  );
}

/* ================= inverters: three-way compare ================= */
function Compare({ d }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      headIn(root.current);
      gsap.from(".cp-col", {
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cp-grid", start: "top 84%" },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <Shell dark={false}>
        <Head eyebrow={d.eyebrow} heading={d.heading} lead={d.lead} dark={false} />

        <div className="cp-grid mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1rem,1.5vw,1.5rem)] lg:grid-cols-3">
          {d.columns.map((c) => (
            <article
              key={c.name}
              className={`cp-col flex flex-col overflow-hidden rounded-[22px] border bg-white transition-colors duration-500 ${
                c.featured ? "border-ember/45" : "border-blue/12 hover:border-blue/25"
              }`}
            >
              <div
                className={`flex items-center justify-between gap-4 border-b px-[clamp(1.4rem,1.8vw,2rem)] py-5 ${
                  c.featured ? "border-ember/20 bg-ember/[0.04]" : "border-blue/10"
                }`}
              >
                <h3 className="t-h3 text-blue">{c.name}</h3>
                <span
                  className={`whitespace-nowrap rounded-full px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] ${
                    c.featured ? "bg-ember text-white" : "bg-cloud text-ink-soft"
                  }`}
                >
                  {c.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col px-[clamp(1.4rem,1.8vw,2rem)] py-[clamp(1.4rem,1.8vw,2rem)]">
                <p className="t-body text-ink">{c.line}</p>

                <dl className="mt-7 space-y-0 border-t border-blue/10">
                  {c.rows.map((r) => (
                    <div key={r.k} className="flex items-start justify-between gap-5 border-b border-blue/10 py-3.5">
                      <dt className="shrink-0 text-[0.68rem] uppercase tracking-[0.12em] text-ink-soft">{r.k}</dt>
                      <dd className="text-right text-[0.9rem] font-medium text-blue">{r.v}</dd>
                    </div>
                  ))}
                </dl>

                <p
                  className={`mt-7 rounded-[14px] p-4 text-[0.88rem] leading-relaxed ${
                    c.featured ? "bg-ember/[0.06] text-blue" : "bg-cloud text-ink"
                  }`}
                >
                  {c.pick}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Shell>
    </div>
  );
}

/* ================= EV: charge speeds ================= */
function Speeds({ d }) {
  const root = useRef(null);
  const max = Math.max(...d.items.map((i) => i.rangePerHour));

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      headIn(root.current);
      gsap.from(".sp-bar", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.25,
        stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: { trigger: ".sp-list", start: "top 84%" },
      });
      gsap.from(".sp-row", {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".sp-list", start: "top 86%" },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <Shell>
        <Head eyebrow={d.eyebrow} heading={d.heading} lead={d.lead} />

        <div className="sp-list mt-[clamp(2.5rem,5vw,4rem)] space-y-[clamp(1rem,1.5vw,1.4rem)]">
          {d.items.map((it) => (
            <article
              key={it.name}
              className={`sp-row rounded-[20px] border p-[clamp(1.35rem,2vw,2.25rem)] ${
                it.featured ? "border-yellow/40 bg-blue-2/70" : "border-white/12 bg-blue-2/35"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="t-h3">{it.name}</h3>
                <p className="numeral text-[0.95rem] tracking-[0.06em] text-white/45">{it.power}</p>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="sp-bar h-full rounded-full"
                    style={{
                      width: `${(it.rangePerHour / max) * 100}%`,
                      background: TONE_BG[it.tone] || TONE_BG.ink,
                    }}
                  />
                </div>
                <p className="shrink-0 font-[family-name:var(--font-display)] text-[1.05rem] font-bold">
                  ~{it.rangePerHour}
                  <span className="ml-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-white/45">km / hr</span>
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/10 pt-5">
                <p className="max-w-[60ch] text-[0.92rem] leading-relaxed text-white/60">{it.line}</p>
                <p className="shrink-0 text-[0.7rem] uppercase tracking-[0.12em] text-yellow/80">{it.overnight}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-7 max-w-[76ch] text-[0.78rem] leading-relaxed text-white/40">{d.caption}</p>
        <p className="mt-3 max-w-[76ch] text-[0.78rem] leading-relaxed text-white/40">{d.footnote}</p>
      </Shell>
    </div>
  );
}

/* ================= heat pump: the cycle ================= */
function Cycle({ d }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      headIn(root.current);
      gsap.from(".cy-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".cy-grid", start: "top 84%" },
      });
      gsap.from(".cy-step", {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cy-grid", start: "top 84%" },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <Shell dark={false}>
        <Head eyebrow={d.eyebrow} heading={d.heading} lead={d.lead} dark={false} />

        <div className="cy-grid relative mt-[clamp(3rem,6vw,5rem)]">
          {/* connector, desktop only */}
          <span
            aria-hidden="true"
            className="cy-line absolute left-0 right-0 top-[22px] hidden h-[2px] bg-gradient-to-r from-ember/60 via-yellow/60 to-green/60 lg:block"
          />

          <div className="grid gap-[clamp(1.75rem,3vw,2.5rem)] sm:grid-cols-2 lg:grid-cols-4">
            {d.steps.map((s) => (
              <div key={s.n} className="cy-step relative">
                <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border-2 border-ember bg-cloud font-[family-name:var(--font-display)] text-[0.85rem] font-bold text-ember">
                  {s.n}
                </span>
                <h3 className="t-h3 mt-6 text-blue">{s.title}</h3>
                <p className="t-body mt-3 max-w-[34ch] text-ink">{s.line}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] rounded-[22px] border border-blue/12 bg-white p-[clamp(1.6rem,2.5vw,2.75rem)]">
          <h3 className="t-h3 text-blue">{d.payoff.title}</h3>
          <p className="t-body mt-3 max-w-[70ch] text-ink">{d.payoff.line}</p>
        </div>
      </Shell>
    </div>
  );
}

/* ================= pool: two methods ================= */
function Methods({ d }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      headIn(root.current);
      gsap.from(".pm-card", {
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pm-grid", start: "top 84%" },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <Shell>
        <Head eyebrow={d.eyebrow} heading={d.heading} lead={d.lead} />

        <div className="pm-grid mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(1rem,1.5vw,1.5rem)] lg:grid-cols-2">
          {d.methods.map((m) => (
            <article
              key={m.name}
              className={`pm-card flex flex-col rounded-[22px] border p-[clamp(1.5rem,2.2vw,2.5rem)] ${
                m.featured ? "border-yellow/40 bg-blue-2/70" : "border-white/12 bg-blue-2/35"
              }`}
            >
              <h3 className="t-h3">{m.name}</h3>
              <p className="mt-3 text-[0.94rem] leading-relaxed text-white/60">{m.line}</p>

              <dl className="mt-7 border-t border-white/10">
                {m.marks.map((r) => (
                  <div key={r.k} className="flex items-start justify-between gap-5 border-b border-white/10 py-3.5">
                    <dt className="shrink-0 text-[0.68rem] uppercase tracking-[0.12em] text-white/40">{r.k}</dt>
                    <dd className="flex items-center gap-2.5 text-right text-[0.9rem] font-medium">
                      {r.v}
                      <span
                        aria-hidden="true"
                        className="grid h-4 w-4 shrink-0 place-items-center rounded-full"
                        style={{ background: r.good ? "rgba(129,213,83,.18)" : "rgba(255,255,255,.08)" }}
                      >
                        {r.good ? (
                          <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 6.2 4.8 8.5 9.5 3.8" stroke="#81d553" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <span className="h-[2px] w-2 rounded-full bg-white/35" />
                        )}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <div className="mt-[clamp(1.5rem,2.5vw,2rem)] grid gap-[clamp(1rem,1.5vw,1.5rem)] lg:grid-cols-2">
          <div className="rounded-[20px] border border-green/25 bg-green/[0.06] p-[clamp(1.4rem,2vw,2rem)]">
            <h3 className="font-[family-name:var(--font-display)] text-[1.1rem] font-bold text-green">{d.both.title}</h3>
            <p className="mt-2.5 text-[0.92rem] leading-relaxed text-white/70">{d.both.line}</p>
          </div>
          <div className="rounded-[20px] border border-white/12 bg-blue-2/35 p-[clamp(1.4rem,2vw,2rem)]">
            <h3 className="font-[family-name:var(--font-display)] text-[1.1rem] font-bold">{d.cover.title}</h3>
            <p className="mt-2.5 text-[0.92rem] leading-relaxed text-white/60">{d.cover.line}</p>
          </div>
        </div>
      </Shell>
    </div>
  );
}

/* ================= packages: inclusion matrix ================= */
function Tick({ on }) {
  if (on === false)
    return (
      <span aria-label="Not included" className="grid h-6 w-6 place-items-center rounded-full bg-blue/[0.05]">
        <span aria-hidden="true" className="h-[2px] w-2.5 rounded-full bg-blue/25" />
      </span>
    );
  if (on === true)
    return (
      <span aria-label="Included" className="grid h-6 w-6 place-items-center rounded-full bg-green/15">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 6.2 4.8 8.5 9.5 3.8" stroke="#63b93b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  return <span className="text-[0.82rem] font-medium text-blue">{on}</span>;
}

function Matrix({ d }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      headIn(root.current);
      gsap.from(".mx-row", {
        y: 18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: { trigger: ".mx-table", start: "top 86%" },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <Shell dark={false}>
        <Head eyebrow={d.eyebrow} heading={d.heading} lead={d.lead} dark={false} />

        <div className="mx-table mt-[clamp(2.5rem,5vw,4rem)] overflow-hidden rounded-[22px] border border-blue/12 bg-white">
          {/* header */}
          <div className="grid grid-cols-[1fr_auto_auto] items-end gap-x-4 border-b border-blue/10 px-[clamp(1.1rem,2vw,2rem)] py-5 sm:gap-x-8">
            <span className="text-[0.66rem] uppercase tracking-[0.14em] text-ink-soft">What is included</span>
            {d.packages.map((p) => (
              <span key={p.name} className="w-[clamp(84px,14vw,150px)] text-center">
                <span
                  className={`block font-[family-name:var(--font-display)] text-[0.82rem] font-bold leading-tight sm:text-[0.95rem] ${
                    p.featured ? "text-ember" : "text-blue"
                  }`}
                >
                  {p.name}
                </span>
                <span className="mt-1 block text-[0.58rem] uppercase tracking-[0.1em] text-ink-soft">{p.tag}</span>
              </span>
            ))}
          </div>

          {d.rows.map((r) => (
            <div
              key={r.label}
              className="mx-row grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-blue/[0.07] px-[clamp(1.1rem,2vw,2rem)] py-3.5 last:border-b-0 sm:gap-x-8"
            >
              <span className="text-[0.88rem] leading-snug text-ink sm:text-[0.94rem]">{r.label}</span>
              <span className="flex w-[clamp(84px,14vw,150px)] justify-center">
                <Tick on={r.a} />
              </span>
              <span className="flex w-[clamp(84px,14vw,150px)] justify-center">
                <Tick on={r.b} />
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-[74ch] text-[0.82rem] leading-relaxed text-ink-soft">{d.note}</p>
      </Shell>
    </div>
  );
}

/* ================= dispatcher ================= */
export default function ServiceSignature({ slug }) {
  const d = getSignature(slug);
  if (!d) return null;

  switch (d.type) {
    case "loadCurve":
      return <LoadCurve d={d} />;
    case "dayCycle":
      return <DayCycle d={d} />;
    case "compare":
      return <Compare d={d} />;
    case "speeds":
      return <Speeds d={d} />;
    case "cycle":
      return <Cycle d={d} />;
    case "methods":
      return <Methods d={d} />;
    case "matrix":
      return <Matrix d={d} />;
    // "sizes" is rendered by ServicePage's own Options block
    default:
      return null;
  }
}
