import ToolsHubPage from "@/components/ToolsHubPage";
import { TOOLS_HUB, CALCULATORS, REBATE_CHECK } from "@/lib/calculators";
import { SITE } from "@/lib/site";

const SLUG = "tools";

export const metadata = {
  title: TOOLS_HUB.seoTitle,
  description: TOOLS_HUB.seoDescription,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "website",
    title: TOOLS_HUB.seoTitle,
    description: TOOLS_HUB.seoDescription,
    url: `/${SLUG}`,
    images: [TOOLS_HUB.hero.image],
  },
};

const tools = [...CALCULATORS.map((c) => ({ slug: c.slug, label: c.label })), { slug: REBATE_CHECK.slug, label: REBATE_CHECK.label }];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE.domain}/${SLUG}/#webpage`,
      url: `${SITE.domain}/${SLUG}/`,
      name: TOOLS_HUB.seoTitle,
      description: TOOLS_HUB.seoDescription,
      publisher: { "@id": `${SITE.domain}/#organization` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: tools.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.label,
          url: `${SITE.domain}/${t.slug}/`,
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE.domain}/${SLUG}/` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ToolsHubPage />
    </>
  );
}
