// Legal pages.
//
// ============================================================================
// REVIEW BEFORE LAUNCH
// ============================================================================
// This policy was written to describe what THIS website actually does, not
// from a generic template. Every statement below is true of the code as built:
// the quote form collects name, email, phone, address and optional notes and
// posts them to a single configured endpoint; the site sets no analytics,
// advertising or tracking cookies; nothing is sold or shared with third
// parties for marketing.
//
// Four things only Lumenx can confirm. Each is written here in a form that is
// accurate for the site as it stands, and each needs updating if that changes:
//
//   1. ABN — currently omitted rather than invented. Add it to `entity` below.
//   2. Cookies — the policy states the site sets no analytics or advertising
//      cookies. TRUE TODAY. The moment GA4, Meta Pixel, Clarity or GTM is
//      added, the cookies section must be rewritten and a consent banner added.
//   3. Retention — stated as "as long as we need it, and as long as the law
//      requires", which is accurate without committing to a period Lumenx has
//      not set. Replace with a specific period if there is a policy.
//   4. Disclosure — lists installers, Solar Victoria / scheme administrators
//      and IT providers. If leads are also passed to finance brokers or
//      third-party lead buyers, that MUST be disclosed here.
//
// This is a plain-English policy written in good faith, not legal advice. Have
// it reviewed by a lawyer before launch.
// ============================================================================

export const PRIVACY = {
  slug: "privacy-policy",
  label: "Privacy Policy",
  seoTitle: "Privacy Policy | Lumenx",
  seoDescription:
    "How Lumenx collects, uses, stores and discloses personal information, and how to access, correct or complain about it.",
  eyebrow: "Legal",
  h1: "Privacy policy",
  lead: "Plain English, and short, because a policy nobody reads protects nobody. This describes exactly what we collect, why, and what we do not do with it.",
  updated: "September 2026",

  // Deliberately no ABN placeholder text on the page — an invented or
  // "[insert]" ABN is worse than none. Add the real one here.
  entity: {
    name: "Lumenx",
    line: "Lumenx, Sustainable Energy",
  },

  summary: [
    "We collect what we need to quote and install, and nothing else.",
    "We do not sell, rent or trade your personal information.",
    "This website sets no advertising or analytics cookies.",
    "You can ask us what we hold, correct it, or ask us to delete it.",
  ],

  sections: [
    {
      h: "What we collect",
      p: [
        "When you request a quote or contact us, we collect your name, email address, phone number and the address of the property the work would be done at. You may also choose to tell us what you are interested in and add notes about your property or your usage.",
        "If you send us a power bill so we can size a system, that bill contains your usage history and your retailer account details. We use it for the sizing calculation and nothing else.",
        "If you become a customer we also collect what is needed to install and to lodge your rebate: site details, meter and switchboard information, electricity distributor details, and the records the relevant scheme requires us to keep.",
        "Our web server records standard technical information with each request, such as IP address, browser type and the pages requested. This is ordinary server logging, used to keep the site running and secure.",
      ],
    },
    {
      h: "Why we collect it",
      p: [
        "To answer your enquiry and prepare a quote. To design and install a system if you go ahead. To check your eligibility for rebates and lodge the paperwork as an accredited retailer. To honour our warranty and support you afterwards. To meet the record-keeping obligations that apply to accredited solar retailers and licensed electrical work.",
        "We do not use your information to build advertising profiles, and we do not add you to a marketing list because you asked for a quote.",
      ],
    },
    {
      h: "Who we share it with",
      p: [
        "Our installers and licensed electricians, so they can do the work at your property.",
        "Scheme administrators, including Solar Victoria and the administrators of the federal programs, where a rebate is being claimed on your behalf. This is a requirement of claiming, not an optional extra.",
        "Your electricity distributor, for the connection or notification application your installation requires.",
        "Our IT and communications providers, who host our systems and handle our email in the ordinary course of running a business.",
        "Anyone we are required to disclose to by law.",
        "We do not sell, rent or trade your personal information, and we do not pass your enquiry to other solar companies.",
      ],
    },
    {
      h: "Cookies and tracking",
      p: [
        "This website does not set advertising or analytics cookies, and it does not run third-party tracking pixels. There is no cookie banner because there is nothing to consent to.",
        "If that changes we will update this policy before the change goes live, and add the consent controls the change requires. We mention this because a policy that quietly stops being true is worse than no policy.",
      ],
    },
    {
      h: "How long we keep it",
      p: [
        "Enquiries that do not proceed are kept only as long as we need them to follow up, and are then deleted.",
        "Customer records are kept for as long as we need them to support the installation and honour the warranty, and for as long as the law and the relevant accreditation schemes require us to keep them. Some of those obligations run for years after the work is done.",
      ],
    },
    {
      h: "Keeping it secure",
      p: [
        "Information submitted through this website is sent over an encrypted connection. Access to customer records is limited to the people who need it to do their job.",
        "No system is perfectly secure, and we will not pretend otherwise. If a breach occurs that is likely to cause you serious harm, we will tell you and notify the regulator as the law requires.",
      ],
    },
    {
      h: "Your choices",
      p: [
        "You can ask us what personal information we hold about you, and we will tell you.",
        "You can ask us to correct anything that is wrong.",
        "You can ask us to delete what we hold, and we will, except where we are legally required to keep it.",
        "You can ask us to stop contacting you at any time, and we will stop.",
        "To do any of these, email us. We will respond within a reasonable time and we will not make it difficult.",
      ],
    },
    {
      h: "Complaints",
      p: [
        "If you think we have mishandled your personal information, tell us first. We would rather fix it directly.",
        "If you are not satisfied with how we handle your complaint, you can take it to the Office of the Australian Information Commissioner at oaic.gov.au.",
      ],
    },
    {
      h: "Changes to this policy",
      p: [
        "If we change how we handle personal information, we will update this page and change the date at the top. Material changes will be reflected here before they take effect, not after.",
      ],
    },
  ],
};
