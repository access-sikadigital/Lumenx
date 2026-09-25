import SystemSizePage from "@/components/SystemSizePage";
import { getSize } from "@/lib/systems";
import { SITE } from "@/lib/site";

const SLUG = "10kw";
const s = getSize(SLUG);

export const metadata = {
  title: s.seoTitle,
  description: s.seoDescription,
  alternates: { canonical: `/solar-systems/${SLUG}` },
  openGraph: {
    type: "website",
    title: s.seoTitle,
    description: s.seoDescription,
    url: `/solar-systems/${SLUG}`,
    images: [s.image],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE.domain}/solar-systems/${SLUG}/#webpage`,
      url: `${SITE.domain}/solar-systems/${SLUG}/`,
      name: s.seoTitle,
      description: s.seoDescription,
      about: { "@id": `${SITE.domain}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "Solar Systems", item: `${SITE.domain}/solar-systems/` },
        { "@type": "ListItem", position: 3, name: `${s.kw} system`, item: `${SITE.domain}/solar-systems/${SLUG}/` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SystemSizePage slug={SLUG} />
    </>
  );
}
