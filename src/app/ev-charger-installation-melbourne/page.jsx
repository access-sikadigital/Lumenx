import LocationPage from "@/components/LocationPage";
import { getLocation } from "@/lib/locations";
import { SITE } from "@/lib/site";

const SLUG = "ev-charger-installation-melbourne";
const l = getLocation(SLUG);

export const metadata = {
  title: l.seoTitle,
  description: l.seoDescription,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "website",
    title: l.seoTitle,
    description: l.seoDescription,
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
      name: l.seoTitle,
      description: l.seoDescription,
      about: { "@id": `${SITE.domain}/#organization` },
      publisher: { "@id": `${SITE.domain}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${SITE.domain}/${SLUG}/#service`,
      name: l.label,
      serviceType: l.service,
      description: l.seoDescription,
      provider: { "@id": `${SITE.domain}/#organization` },
      areaServed: [
        { "@type": "City", name: l.city },
        ...l.areas.map((a) => ({ "@type": "Place", name: a })),
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE.domain}/locations/` },
        { "@type": "ListItem", position: 3, name: l.label, item: `${SITE.domain}/${SLUG}/` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LocationPage slug={SLUG} />
    </>
  );
}
