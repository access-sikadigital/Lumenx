import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { SITE, TRUST, OFFICES, CTA_PROMISES } from "@/lib/site";

const TITLE = "Get a Free Solar Quote | Lumenx";
const DESCRIPTION =
  "Request a free, fixed and itemised solar, battery or EV charger quote from Lumenx. Every rebate applied, no obligation and no pushy sales visit.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/get-a-quote" },
  // A conversion page has no business in search results competing with the
  // service hubs, and it should never be indexed with form state in the URL.
  robots: { index: false, follow: true },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: "/get-a-quote" },
};

const STEPS = [
  { n: "01", t: "You send the details", d: "The form below, or a photo of a recent bill by email. Two minutes." },
  { n: "02", t: "We design and price it", d: "Sized to your roof and your usage, with every rebate you qualify for deducted." },
  { n: "03", t: "You get one fixed number", d: "Itemised line by line, in writing. Compare it properly before you decide." },
];

export default function Page() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-blue text-white">
        <div
          aria-hidden="true"
          className="glow glow--solar right-[-8%] top-[-25%]"
          style={{ width: "min(680px, 55%)" }}
        />

        <div className="shell page-hero-copy relative z-10">
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex items-center gap-2.5 text-[0.7rem] uppercase tracking-[0.14em] text-white/45">
              <li>
                <Link href="/" className="transition-colors duration-500 hover:text-white">Home</Link>
              </li>
              <li aria-hidden="true" className="text-white/25">/</li>
              <li className="text-white/75" aria-current="page">Get a quote</li>
            </ol>
          </nav>

          <p className="eyebrow mb-5 text-yellow">Free quote</p>
          <h1 className="t-h1 max-w-[24ch]">Tell us about your place. We will do the maths.</h1>
          <p className="t-lead mt-7 max-w-[56ch] text-white/72">
            A fixed, itemised price with every rebate already applied — not a range, and not a
            number that moves after the deposit.
          </p>

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

      {/* form + reassurance */}
      <section
        className="bg-cloud"
        style={{ paddingTop: "clamp(3.5rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 10vh, 7rem)" }}
      >
        <div className="shell grid items-start gap-[clamp(2rem,4vw,4.5rem)] lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[24px] border border-blue/10 bg-paper p-[clamp(1.5rem,3vw,3rem)]">
            <h2 className="t-h3 text-blue">Your details</h2>
            <p className="t-body mt-2.5 max-w-[52ch] text-ink">
              Fields marked * are the ones we genuinely need to quote you accurately.
            </p>
            <div className="mt-8">
              <QuoteForm />
            </div>
          </div>

          <aside className="lg:sticky lg:top-[14vh] lg:self-start">
            <div className="rounded-[22px] border border-blue/10 bg-paper p-[clamp(1.4rem,2vw,2rem)]">
              <p className="eyebrow mb-6 text-ember">What happens next</p>
              <ol className="space-y-6">
                {STEPS.map((s) => (
                  <li key={s.n} className="relative border-t border-blue/12 pt-5">
                    <span aria-hidden="true" className="absolute left-0 top-[-1px] h-[2px] w-8 bg-ember" />
                    <span className="numeral text-[0.66rem] tracking-[0.16em] text-ember">{s.n}</span>
                    <h3 className="mt-2.5 font-[family-name:var(--font-display)] text-[1.02rem] font-bold text-blue">
                      {s.t}
                    </h3>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-ink">{s.d}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-4 rounded-[22px] border border-blue/10 bg-paper p-[clamp(1.4rem,2vw,2rem)]">
              <p className="eyebrow mb-5 text-ember">Rather talk?</p>
              <a href={SITE.quotePhoneHref} className="block font-[family-name:var(--font-display)] text-xl font-bold text-blue transition-colors duration-300 hover:text-ember">
                {SITE.quotePhone}
              </a>
              <a href={`mailto:${SITE.email}`} className="mt-1.5 block text-[0.92rem] text-ember underline underline-offset-4 transition-colors duration-300 hover:text-blue">
                {SITE.email}
              </a>
              <p className="mt-5 border-t border-blue/10 pt-5 text-[0.84rem] leading-relaxed text-ink-soft">
                Offices in {OFFICES.map((o) => o.state.split(",")[0]).join(" and ")}. Installing across
                Victoria and New South Wales.
              </p>
            </div>

            <ul className="mt-4 space-y-3 rounded-[22px] border border-blue/10 bg-paper p-[clamp(1.4rem,2vw,2rem)]">
              {CTA_PROMISES.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green/15">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2.5 6.2 4.8 8.5 9.5 3.8" stroke="#63b93b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-[0.9rem] leading-relaxed text-ink">{p}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
