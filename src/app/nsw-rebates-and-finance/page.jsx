import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import Faq from "@/components/Faq";
import RebatesVsFinance from "@/components/illustrations/RebatesVsFinance";
import { NSW_PROGRAM_ACCESS } from "@/lib/finance";
import { SITE } from "@/lib/site";

/**
 * NSW rebates and finance.
 *
 * HIDDEN UNTIL CONFIRMED. Every rebate page on this site is Victoria-only,
 * which left a NSW visitor reading about Solar Victoria programs they cannot
 * apply for. This is the page that fixes that.
 *
 * It is gated behind NSW_PROGRAM_ACCESS and 404s until Lumenx confirms it can
 * actually originate under the NSW programs described here. The reason for a
 * hard 404 rather than a quiet, unlinked page: an unlinked page is still
 * crawled, indexed and shared, and a NSW household acting on a program we
 * cannot deliver is worse than no page at all.
 *
 * It is also deliberately absent from the sitemap and the navigation. Flip
 * NSW_PROGRAM_ACCESS in lib/finance.js and it appears, along with the NSW
 * loan in the finance strip and the quote form.
 */

export const metadata = {
  title: "NSW Solar Rebates & Finance",
  description:
    "The federal and New South Wales programs that apply to solar, batteries and hot water in NSW, what each one is conditional on, and the difference between a rebate and a loan.",
  alternates: { canonical: "/nsw-rebates-and-finance" },
  robots: NSW_PROGRAM_ACCESS ? undefined : { index: false, follow: false },
};

const FEDERAL = [
  {
    name: "Small-scale Technology Certificates",
    status: "Likely eligible",
    line: "A discount on eligible solar at the point of sale, sized by the system and your location. It applies in NSW exactly as it does in Victoria.",
  },
  {
    name: "Cheaper Home Batteries",
    status: "Likely eligible",
    line: "A discount on an eligible battery, conditional on eligible solar being installed already or at the same time. Since 1 May 2026 it tapers above 14kWh and again above 28kWh.",
  },
];

const NSW = [
  {
    name: "VPP battery incentive",
    status: "Check",
    line: "For a battery that joins an approved virtual power plant. A compatible battery does not mean you are enrolled: joining is a separate contract with the VPP provider, and a reserve stays in the battery for your home.",
  },
  {
    name: "Home Energy Saver Loan",
    status: "Info",
    line: "0% interest, NSW only. It is a loan, repaid over its term, not a discount. It changes when you pay rather than what you pay.",
  },
  {
    name: "Energy Savings Scheme, hot water",
    status: "Likely eligible",
    line: "Discounts an efficient hot water upgrade through accredited providers when you are replacing an existing gas or electric storage system.",
  },
];

const DOT = {
  "Likely eligible": "bg-green",
  Check: "bg-yellow",
  Info: "bg-ember",
};

const FAQS = [
  {
    q: "Are NSW rebates the same as Victoria's?",
    a: "No. The federal programs are identical in both states, but the state programs are completely separate. Solar Victoria rebates do not exist in New South Wales, and the NSW programs listed here do not exist in Victoria. Anything you read on our Victorian rebate pages applies to a Victorian address only.",
  },
  {
    q: "Is the Home Energy Saver Loan a rebate?",
    a: "No, and the distinction matters. A rebate reduces the price of the system. A loan spreads what is left over a term and is repaid in full. A 0% loan is genuinely useful, and it is not money off.",
  },
  {
    q: "Do I have to join a VPP to get a battery?",
    a: "No. The VPP incentive is for people who choose to join one. A battery works perfectly well without it. Joining means giving a provider access to some of your stored energy at peak times in exchange for credits or payments, under their contract, with a reserve kept for your own home.",
  },
  {
    q: "Do you handle the paperwork in NSW?",
    a: "Yes, the same way we do in Victoria. We check what you qualify for, apply the discounts to your quote and lodge what needs lodging. You get written confirmation of what was claimed on your behalf.",
  },
];

export default function NswRebatesPage() {
  if (!NSW_PROGRAM_ACCESS) notFound();

  return (
    <>
      <PageHero
        eyebrow="New South Wales"
        h1="What applies in NSW."
        lead="The federal programs reach every state. The New South Wales programs are their own thing, and none of them are the Victorian ones."
        image="/images/real-install-1.webp"
        imageAlt=""
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "NSW rebates and finance", href: "/nsw-rebates-and-finance" },
        ]}
      />

      <section
        className="bg-white"
        style={{ paddingTop: "clamp(3.5rem,8vh,6rem)", paddingBottom: "clamp(3.5rem,8vh,6rem)" }}
      >
        <div className="shell grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-2">
          <div>
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-blue">
              Federal · applies in both states
            </p>
            <ul className="space-y-2.5">
              {FEDERAL.map((p) => (
                <li key={p.name} className="rounded-[16px] border border-blue/12 bg-cloud p-5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[0.98rem] font-semibold text-blue">{p.name}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-paper px-2.5 py-0.5 text-[0.66rem] font-bold uppercase tracking-[0.08em] text-ink">
                      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${DOT[p.status]}`} />
                      {p.status}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-ink">{p.line}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-blue">
              New South Wales
            </p>
            <ul className="space-y-2.5">
              {NSW.map((p) => (
                <li key={p.name} className="rounded-[16px] border border-blue/12 bg-cloud p-5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[0.98rem] font-semibold text-blue">{p.name}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-paper px-2.5 py-0.5 text-[0.66rem] font-bold uppercase tracking-[0.08em] text-ink">
                      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${DOT[p.status]}`} />
                      {p.status}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-ink">{p.line}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="shell mt-8">
          <p className="max-w-[72ch] text-[0.84rem] leading-relaxed text-ink-soft">
            Program rules change and rounds open and close. Each program links to its official
            page with the date we last checked it, and we confirm your actual position in writing
            before you commit to anything.
          </p>
        </div>
      </section>

      <section
        className="bg-cloud"
        style={{ paddingTop: "clamp(3.5rem,8vh,6rem)", paddingBottom: "clamp(3.5rem,8vh,6rem)" }}
      >
        <div className="shell">
          <p className="eyebrow mb-5 text-ember">The distinction that matters</p>
          <h2 className="t-h2 max-w-[22ch] text-blue">A rebate cuts the price. A loan does not.</h2>
          <div className="mt-[clamp(2rem,4vw,3rem)]">
            <RebatesVsFinance />
          </div>
        </div>
      </section>

      <Faq
        items={FAQS}
        heading="NSW, answered."
        lead="Send us your address and what you are considering, and we will confirm your position in writing."
      />

      <section className="bg-white" style={{ paddingTop: "clamp(3rem,7vh,5rem)", paddingBottom: "clamp(3rem,7vh,5rem)" }}>
        <div className="shell flex flex-wrap items-center gap-3.5">
          <Link href="/get-a-quote" className="btn btn-primary">
            <span>Check what I qualify for</span>
          </Link>
          <a href={SITE.phoneHref} className="btn btn-ghost btn-ghost-ink">
            <span>{SITE.phone}</span>
          </a>
        </div>
      </section>

      <CTA />
    </>
  );
}
