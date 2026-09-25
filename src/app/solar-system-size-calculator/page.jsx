import CalculatorPage from "@/components/CalculatorPage";
import { getCalculator } from "@/lib/calculators";
import { SITE } from "@/lib/site";

const SLUG = "solar-system-size-calculator";
const c = getCalculator(SLUG);

export const metadata = {
  title: c.seoTitle,
  description: c.seoDescription,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "website",
    title: c.seoTitle,
    description: c.seoDescription,
    url: `/${SLUG}`,
    images: ["/og-default.jpg"],
  },
};

// WebApplication is the honest type for an interactive tool. isAccessibleForFree
// is true because none of these are gated, and there is no offer or price node
// because the tool does not sell anything.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "WebApplication"],
      "@id": `${SITE.domain}/${SLUG}/#webpage`,
      url: `${SITE.domain}/${SLUG}/`,
      name: c.label,
      description: c.seoDescription,
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
        { "@type": "ListItem", position: 3, name: c.label, item: `${SITE.domain}/${SLUG}/` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalculatorPage slug={SLUG} />
    </>
  );
}
