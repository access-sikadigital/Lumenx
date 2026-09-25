import RebateCheckPage from "@/components/RebateCheckPage";
import { REBATE_CHECK } from "@/lib/calculators";
import { SITE } from "@/lib/site";

const SLUG = "solar-rebate-eligibility";

export const metadata = {
  title: REBATE_CHECK.seoTitle,
  description: REBATE_CHECK.seoDescription,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "website",
    title: REBATE_CHECK.seoTitle,
    description: REBATE_CHECK.seoDescription,
    url: `/${SLUG}`,
    images: ["/og-default.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "WebApplication"],
      "@id": `${SITE.domain}/${SLUG}/#webpage`,
      url: `${SITE.domain}/${SLUG}/`,
      name: REBATE_CHECK.label,
      description: REBATE_CHECK.seoDescription,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any modern web browser",
      isAccessibleForFree: true,
      publisher: { "@id": `${SITE.domain}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE.domain}/tools/` },
        { "@type": "ListItem", position: 3, name: REBATE_CHECK.label, item: `${SITE.domain}/${SLUG}/` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RebateCheckPage />
    </>
  );
}
