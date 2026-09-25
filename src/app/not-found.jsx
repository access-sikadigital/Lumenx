import Link from "next/link";
import { SITE, SERVICES } from "@/lib/site";

export const metadata = {
  title: "Page not found | Lumenx",
  robots: { index: false, follow: true },
};

/**
 * 404.
 *
 * Treated as a navigation problem, not a joke. Someone here followed a stale
 * link or mistyped a URL, so the page's job is to get them to what they were
 * looking for in one click — which is why it lists the actual services rather
 * than just apologising and offering a "back to home" button.
 */
export default function NotFound() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-blue text-white">
        <div
          aria-hidden="true"
          className="glow glow--solar right-[-8%] top-[-25%]"
          style={{ width: "min(680px, 55%)" }}
        />

        <div className="shell page-hero-copy relative z-10">
          <p
            className="numeral leading-[0.85] text-solar"
            style={{ fontSize: "clamp(4.5rem, 14vw, 12rem)" }}
          >
            404
          </p>

          <h1 className="t-h2 mt-6 max-w-[20ch]">This page has gone off the grid.</h1>
          <p className="t-lead mt-6 max-w-[52ch] text-white/72">
            The link is either out of date or slightly mistyped. Nothing is broken on your end, and
            here is everything that does exist.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <Link href="/" className="btn btn-primary">
              <span>Back to home</span>
            </Link>
            <a href={SITE.quotePhoneHref} className="btn btn-ghost text-white">
              <span>{SITE.quotePhone}</span>
            </a>
          </div>
        </div>
      </section>

      <section
        className="bg-white"
        style={{ paddingTop: "clamp(3.5rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 9vh, 7rem)" }}
      >
        <div className="shell">
          <span aria-hidden="true" className="mb-7 block h-[3px] w-12 bg-ember" />
          <h2 className="t-h2 max-w-[20ch] text-blue">What we install.</h2>

          <div className="mt-[clamp(2rem,4vw,3rem)] grid gap-[clamp(0.75rem,1.2vw,1.25rem)] sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <Link
                key={s.id}
                href={s.href}
                className="group flex items-center justify-between gap-4 rounded-[16px] border border-blue/10 bg-cloud px-5 py-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-blue/25 hover:bg-paper"
              >
                <span className="font-[family-name:var(--font-display)] text-[0.98rem] font-bold text-blue">
                  {s.title}
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-ember transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-[clamp(2.5rem,4vw,3.5rem)] flex flex-wrap gap-x-8 gap-y-3 border-t border-blue/12 pt-8 text-[0.9rem]">
            {[
              ["Solar rebates", "/solar-rebates-victoria"],
              ["About Lumenx", "/about"],
              ["Reviews", "/reviews"],
              ["Contact", "/contact"],
              ["Get a free quote", "/get-a-quote"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-ink underline decoration-blue/20 underline-offset-4 transition-colors duration-300 hover:text-ember hover:decoration-ember/50"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
