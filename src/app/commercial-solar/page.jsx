import CommercialPage from "@/components/CommercialPage";
import CTA from "@/components/CTA";
import { SERVICE_PAGES } from "@/lib/services";
import { SITE } from "@/lib/site";

const SLUG = "commercial-solar";
const s = SERVICE_PAGES[SLUG];

export const metadata = {
  title: s.seoTitle,
  description: s.seoDescription,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "website",
    title: s.seoTitle,
    description: s.seoDescription,
    url: `/${SLUG}`,
    images: [s.hero.image],
  },
};

// Service + BreadcrumbList. FAQPage schema is emitted by the Faq component
// from this page's own questions, so it is not duplicated here.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE.domain}/${SLUG}/#service`,
      name: s.label,
      serviceType: s.label,
      description: s.seoDescription,
      provider: { "@id": `${SITE.domain}/#organization` },
      areaServed: ["Victoria", "New South Wales", "Australia"],
      url: `${SITE.domain}/${SLUG}/`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: s.label, item: `${SITE.domain}/${SLUG}/` },
      ],
    },
  ],
};

/* Commercial no longer renders through ServicePage.
   It is its own page with its own look — steel grey and navy rather than the
   residential cream and yellow — because a business buyer working from
   interval data is a different reader with a different decision. Running it
   through the shared residential template is what made it look like a
   residential company having a go at commercial. */
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CommercialPage />
      <CTA />
    </>
  );
}
