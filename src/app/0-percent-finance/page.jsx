import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import RebatesVsFinance from "@/components/illustrations/RebatesVsFinance";
import FinanceTabs from "@/components/FinanceTabs";
import { BRIGHTE_APPROVED, NSW_PROGRAM_ACCESS } from "@/lib/finance";
import { SITE } from "@/lib/site";

/**
 * 0% finance.
 *
 * GATED. The client brief is explicit that Brighte must approve this page and
 * its wording before release, so if `BRIGHTE_APPROVED` is false and NSW
 * program access is unconfirmed, the route 404s rather than publishing an
 * unapproved description of someone else's credit product.
 *
 * That is deliberately a hard stop and not a "coming soon" page: a visible
 * placeholder about finance is still a finance claim, and it would be indexed
 * and shared before anyone had signed it off.
 *
 * To publish: get Brighte's approval in writing, then set BRIGHTE_APPROVED to
 * true in lib/finance.js. The whole page is already built and will appear,
 * along with the strip under the main navigation.
 */

export const metadata = {
  title: "0% Interest Solar & Battery Finance | How It Works",
  description:
    "How 0% interest payment plans for solar and batteries work, what fees apply, who is eligible, and how finance differs from a rebate. Explained in plain English.",
  alternates: { canonical: "/0-percent-finance" },
  // Not indexed until it is approved. Belt and braces alongside the 404.
  robots: BRIGHTE_APPROVED || NSW_PROGRAM_ACCESS ? undefined : { index: false, follow: false },
};

export default function FinancePage() {
  if (!BRIGHTE_APPROVED && !NSW_PROGRAM_ACCESS) notFound();

  return (
    <>
      <PageHero
        eyebrow="Paying for it"
        h1="0% finance, explained properly."
        lead="What a payment plan actually costs, who can get one, and the difference between money you save and money you still owe."
        image="/images/rooftop-home.webp"
        imageAlt=""
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "0% finance", href: "/0-percent-finance" },
        ]}
      />

      {/* The distinction comes FIRST, before any offer is described. Someone
          who reads only the top of this page should still leave knowing that
          a loan is not a discount. */}
      <section
        className="bg-white"
        style={{ paddingTop: "clamp(3.5rem,8vh,6rem)", paddingBottom: "clamp(3.5rem,8vh,6rem)" }}
      >
        <div className="shell">
          <div className="max-w-[46rem]">
            <p className="eyebrow mb-5 text-ember">First, the important bit</p>
            <h2 className="t-h2 text-blue">A rebate cuts the price. A loan does not.</h2>
            <p className="t-body mt-6 max-w-[54ch] text-ink">
              Both make a system easier to afford, and they are not the same thing. Here is where
              each one lands.
            </p>
          </div>

          <div className="mt-[clamp(2.5rem,5vw,4rem)]">
            <RebatesVsFinance />
          </div>
        </div>
      </section>

      {/* The offers themselves. */}
      <section
        className="bg-cloud"
        style={{ paddingTop: "clamp(3.5rem,8vh,6rem)", paddingBottom: "clamp(3.5rem,8vh,6rem)" }}
      >
        <div className="shell">
          <div className="max-w-[46rem]">
            <p className="eyebrow mb-5 text-ember">What is available</p>
            <h2 className="t-h2 text-blue">The plans you can actually use.</h2>
            <p className="t-body mt-6 max-w-[54ch] text-ink">
              What you can apply for depends on your state. Switch states at the top of the page
              and this changes with it.
            </p>
          </div>

          <div className="mt-[clamp(2rem,4vw,3rem)]">
            <FinanceTabs />
          </div>
        </div>
      </section>

      <section
        className="bg-white"
        style={{ paddingTop: "clamp(3rem,7vh,5rem)", paddingBottom: "clamp(3rem,7vh,5rem)" }}
      >
        <div className="shell">
          <div className="rounded-[22px] border border-blue/12 bg-cloud p-[clamp(1.4rem,2.5vw,2.25rem)]">
            <h2 className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold text-blue">
              Before you apply
            </h2>
            <p className="mt-3 max-w-[64ch] text-[0.92rem] leading-relaxed text-ink">
              Lumenx is not the credit provider and does not assess your application. We can tell
              you what a system costs and show you the repayment options beside it; the decision,
              the amount and the term belong to the lender. Nothing on this page is credit advice.
              If you are weighing up a loan against paying outright, that is worth a conversation
              with your own financial adviser.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <Link href="/get-a-quote" className="btn btn-primary">
                <span>Get a quote with finance options</span>
              </Link>
              <a href={SITE.phoneHref} className="btn btn-ghost btn-ghost-ink">
                <span>{SITE.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
