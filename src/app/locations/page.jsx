import LocationsHubPage from "@/components/LocationsHubPage";
import { LOCATIONS, LOCATIONS_HUB } from "@/lib/locations";
import { SITE } from "@/lib/site";

export const metadata = {
  title: LOCATIONS_HUB.seoTitle,
  description: LOCATIONS_HUB.seoDescription,
  alternates: { canonical: "/locations" },
  openGraph: {
    type: "website",
    title: LOCATIONS_HUB.seoTitle,
    description: LOCATIONS_HUB.seoDescription,
    url: "/locations",
    images: ["/og-default.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE.domain}/locations/#webpage`,
      url: `${SITE.domain}/locations/`,
      name: LOCATIONS_HUB.seoTitle,
      description: LOCATIONS_HUB.seoDescription,
      about: { "@id": `${SITE.domain}/#organization` },
      publisher: { "@id": `${SITE.domain}/#organization` },
      hasPart: LOCATIONS.map((l) => ({
        "@type": "WebPage",
        url: `${SITE.domain}/${l.slug}/`,
        name: l.label,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE.domain}/locations/` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LocationsHubPage />
    </>
  );
}
