import LegalPage from "@/components/LegalPage";
import { PRIVACY } from "@/lib/legal";
import { SITE } from "@/lib/site";

const SLUG = "privacy-policy";

export const metadata = {
  title: PRIVACY.seoTitle,
  description: PRIVACY.seoDescription,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "website",
    title: PRIVACY.seoTitle,
    description: PRIVACY.seoDescription,
    url: `/${SLUG}`,
    images: ["/og-default.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE.domain}/${SLUG}/#webpage`,
      url: `${SITE.domain}/${SLUG}/`,
      name: PRIVACY.seoTitle,
      description: PRIVACY.seoDescription,
      publisher: { "@id": `${SITE.domain}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: PRIVACY.label, item: `${SITE.domain}/${SLUG}/` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LegalPage doc={PRIVACY} />
    </>
  );
}
