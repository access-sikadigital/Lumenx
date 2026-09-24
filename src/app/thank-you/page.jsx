import Link from "next/link";
import { SITE, TRUST, SERVICES } from "@/lib/site";

const TITLE = "Thank you | Lumenx";

export const metadata = {
  title: TITLE,
  description: "Your quote request has reached the Lumenx team.",
  // Never index a confirmation page: it has no search value, and if it ranks,
  // people land on a "thanks for your enquiry" screen having sent nothing.
  robots: { index: false, follow: false },
};

const NEXT = [
  {
    n: "01",
    t: "We read it today",
    d: "Someone on the team goes through it during opening hours — Monday to Saturday, 7am to 5pm.",
  },
  {
    n: "02",
    t: "We design and price it",
    d: "Sized to your roof and your actual usage, with every rebate you qualify for already deducted.",
  },
  {
    n: "03",
    t: "You get one fixed number",
    d: "Itemised line by line, in writing, within one business day. No obligation, and no sales visit unless you ask for one.",
  },
];

export default function Page() {
  return (
    <>
      {/* hero */}
      <section className="grain relative overflow-hidden bg-blue text-white">
        <div
          aria-hidden="true"
          className="glow glow--solar right-[-8%] top-[-25%]"
          style={{ width: "min(680px, 55%)" }}
        />

        <div className="shell page-hero-copy relative z-10">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-green/20 ring-1 ring-green/40">
            <svg width="26" height="26" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2.5 6.2 4.8 8.5 9.5 3.8"
                stroke="#81d553"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <p className="eyebrow mb-5 mt-8 text-yellow">Request received</p>
          <h1 className="t-h1 max-w-[22ch]">Thanks. That is all we need for now.</h1>
          <p className="t-lead mt-7 max-w-[54ch] text-white/72">
            Your request is with the team. You will hear back within one business day — and if it is
            urgent, call us rather than waiting.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <a href={SITE.quotePhoneHref} className="btn btn-primary">
              <span>Call {SITE.quotePhone}</span>
            </a>
            <Link href="/" className="btn btn-ghost text-white">
              <span>Back to home</span>
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-white/12 pt-6 text-[0.68rem] uppercase tracking-[0.14em] text-white/50">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-green" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* what happens next */}
      <section
        className="bg-white"
        style={{ paddingTop: "clamp(4rem, 9vh, 7rem)", paddingBottom: "clamp(4rem, 9vh, 7rem)" }}
      >
        <div className="shell">
          <span aria-hidden="true" className="mb-7 block h-[3px] w-12 bg-ember" />
          <h2 className="t-h2 max-w-[20ch] text-blue">What happens from here.</h2>

          <ol className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-x-[clamp(1.5rem,3vw,3.5rem)] gap-y-10 md:grid-cols-3">
            {NEXT.map((s) => (
              <li key={s.n} className="relative border-t border-blue/12 pt-8">
                <span aria-hidden="true" className="absolute left-0 top-[-1px] h-[2px] w-10 bg-ember" />
                <span className="numeral text-[0.7rem] tracking-[0.16em] text-ember">{s.n}</span>
                <h3 className="t-h3 mt-4 text-blue">{s.t}</h3>
                <p className="t-body mt-3 max-w-[36ch] text-ink">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* somewhere to go next */}
      <section
        className="bg-cloud"
        style={{ paddingTop: "clamp(4rem, 9vh, 7rem)", paddingBottom: "clamp(4rem, 9vh, 7rem)" }}
      >
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <h2 className="t-h2 max-w-[20ch] text-blue">
              While you wait, <span className="text-solar">have a read.</span>
            </h2>
            <Link href="/solar-rebates-victoria" className="btn btn-sm btn-ghost text-blue">
              <span>Rebates explained</span>
            </Link>
          </div>

          <div className="mt-[clamp(2rem,4vw,3rem)] grid gap-[clamp(1rem,1.5vw,1.5rem)] sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.slice(0, 4).map((s) => (
              <Link
                key={s.id}
                href={s.href}
                className="group flex flex-col rounded-[18px] border border-blue/10 bg-paper p-[clamp(1.3rem,1.7vw,1.8rem)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-blue/25"
              >
                <h3 className="font-[family-name:var(--font-display)] text-[1.02rem] font-bold text-blue">
                  {s.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[0.88rem] leading-relaxed text-ink">
                  {s.line.split(".")[0]}.
                </p>
                <span className="mt-5 flex items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-ember">
                  Read more
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
