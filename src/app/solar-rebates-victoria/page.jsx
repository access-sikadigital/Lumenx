import RebatesPage from "@/components/RebatesPage";
import { REBATES_PAGE } from "@/lib/rebates";
import { SITE } from "@/lib/site";

const SLUG = "solar-rebates-victoria";

export const metadata = {
  title: REBATES_PAGE.seoTitle,
  description: REBATES_PAGE.seoDescription,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "website",
    title: REBATES_PAGE.seoTitle,
    description: REBATES_PAGE.seoDescription,
    url: `/${SLUG}`,
    images: [REBATES_PAGE.hero.image],
  },
};

// FAQPage schema is emitted by the Faq component from this page's questions.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE.domain}/${SLUG}/#webpage`,
      url: `${SITE.domain}/${SLUG}/`,
      name: REBATES_PAGE.seoTitle,
      description: REBATES_PAGE.seoDescription,
      about: { "@id": `${SITE.domain}/#organization` },
      publisher: { "@id": `${SITE.domain}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Solar Rebates Victoria",
          item: `${SITE.domain}/${SLUG}/`,
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RebatesPage />
    </>
  );
}
