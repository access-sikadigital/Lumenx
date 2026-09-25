// Contact page content.
//
// Opening hours are taken from the live site (lumenex.com.au): Mon–Sat,
// 07.00–17.00. Change them here if that is out of date — they appear on the
// page and in the LocalBusiness schema, so a wrong value is a wrong promise.

export const CONTACT = {
  seoTitle: "Contact Lumenx | Solar Melbourne & Sydney",
  seoDescription:
    "Talk to Lumenx about solar, batteries, EV charging or hot water. Offices in Maribyrnong and Sydney, installing across Victoria and New South Wales.",
  eyebrow: "Contact",
  h1: "A real person, usually within the hour.",
  lead: "No call centre, no chatbot, no form that disappears into a queue. Phone us, email us, or send your address and a recent bill and we will come back with actual numbers.",
  hero: {
    // Using the real drone photo of a Lumenx van outside a completed job.
    // It is a better contact hero than stock would be — genuine vehicle,
    // genuine install — so `page-contact.webp` may not be worth buying.
    // Swap the path here if you decide otherwise.
    image: "/images/real-install-2.webp",
    alt: "A Lumenx van outside a home with a completed rooftop solar system",
  },
  chips: ["Mon to Sat, 7am to 5pm", "Victoria & New South Wales", "No obligation"],

  hours: { days: "Monday to Saturday", time: "7:00am to 5:00pm", note: "Closed Sundays and public holidays" },

  // What each channel is actually best for — so people pick the right one and
  // get a faster answer, rather than defaulting to whichever is listed first.
  channels: [
    {
      n: "01",
      label: "Phone",
      best: "Best for anything urgent",
      line: "A fault, a system that has stopped producing, or a question you want answered now rather than tomorrow.",
      kind: "phone",
    },
    {
      n: "02",
      label: "Email",
      best: "Best for quotes and documents",
      line: "Send a photo of a recent bill and your address. That is genuinely all we need to start sizing a system.",
      kind: "email",
    },
    {
      n: "03",
      label: "Quote form",
      best: "Best if you are comparing",
      line: "Give us the detail once and you get a fixed, itemised proposal back with every rebate already applied.",
      kind: "form",
    },
  ],

  faqs: [
    {
      q: "How quickly will I hear back?",
      a: "Phone calls are answered during opening hours, Monday to Saturday. Emails and quote requests are answered within one business day, and usually a lot sooner than that.",
    },
    {
      q: "Do you charge for a quote or a site visit?",
      a: "No. Quotes are free and there is no obligation. We will also tell you over the phone if we think your property is a poor candidate, rather than booking a visit to sell you something anyway.",
    },
    {
      q: "What do you need from me to quote?",
      a: "Your address and a recent power bill. The address tells us about your roof, your distributor and which rebates apply; the bill tells us how much power you actually use and when.",
    },
    {
      q: "Do you service my area?",
      a: "We install across Victoria and New South Wales from our Maribyrnong and Sydney offices, including the surrounding regional areas. Send us your postcode and we will confirm before going further.",
    },
    {
      q: "I already have solar. Can you help?",
      a: "Yes. Battery retrofits, inverter replacements, system additions and fault-finding on existing systems are a large part of what we do, whoever installed the original.",
    },
  ],
};
