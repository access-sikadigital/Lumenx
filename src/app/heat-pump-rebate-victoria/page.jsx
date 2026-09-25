import GuidePage from "@/components/GuidePage";
import { getGuide } from "@/lib/guides";
import { SITE } from "@/lib/site";

const SLUG = "heat-pump-rebate-victoria";
const g = getGuide(SLUG);

export const metadata = {
  title: g.seoTitle,
  description: g.seoDescription,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "article",
    title: g.seoTitle,
    description: g.seoDescription,
    url: `/${SLUG}`,
    images: [g.hero.image],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE.domain}/${SLUG}/#webpage`,
      url: `${SITE.domain}/${SLUG}/`,
      name: g.seoTitle,
      description: g.seoDescription,
      about: { "@id": `${SITE.domain}/#organization` },
      publisher: { "@id": `${SITE.domain}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "Solar Rebates Victoria", item: `${SITE.domain}/solar-rebates-victoria/` },
        { "@type": "ListItem", position: 3, name: g.label, item: `${SITE.domain}/${SLUG}/` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GuidePage slug={SLUG} />
    </>
  );
}
