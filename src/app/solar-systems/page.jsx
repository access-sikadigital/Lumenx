import SystemsHubPage from "@/components/SystemsHubPage";
import { SYSTEMS_HUB, SYSTEM_SIZES } from "@/lib/systems";
import { SITE } from "@/lib/site";

export const metadata = {
  title: SYSTEMS_HUB.seoTitle,
  description: SYSTEMS_HUB.seoDescription,
  alternates: { canonical: "/solar-systems" },
  openGraph: {
    type: "website",
    title: SYSTEMS_HUB.seoTitle,
    description: SYSTEMS_HUB.seoDescription,
    url: "/solar-systems",
    images: [SYSTEMS_HUB.hero.image],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE.domain}/solar-systems/#collection`,
      url: `${SITE.domain}/solar-systems/`,
      name: SYSTEMS_HUB.seoTitle,
      description: SYSTEMS_HUB.seoDescription,
      about: { "@id": `${SITE.domain}/#organization` },
      hasPart: SYSTEM_SIZES.map((s) => ({
        "@type": "WebPage",
        name: `${s.kw} solar system`,
        url: `${SITE.domain}/solar-systems/${s.slug}/`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "Solar Systems", item: `${SITE.domain}/solar-systems/` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SystemsHubPage />
    </>
  );
}
