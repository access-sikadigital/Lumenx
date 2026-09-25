import ServicePage from "@/components/ServicePage";
import { SERVICE_PAGES, serviceUrl } from "@/lib/services";
import { SITE } from "@/lib/site";

const SLUG = "solar-inverter-replacement";
const URL_PATH = "/solar-inverter-replacement";
const s = SERVICE_PAGES[SLUG];

export const metadata = {
  title: s.seoTitle,
  description: s.seoDescription,
  alternates: { canonical: URL_PATH },
  openGraph: {
    type: "website",
    title: s.seoTitle,
    description: s.seoDescription,
    url: URL_PATH,
    images: [s.hero.image],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE.domain}${URL_PATH}/#service`,
      name: s.label,
      serviceType: s.label,
      description: s.seoDescription,
      provider: { "@id": `${SITE.domain}/#organization` },
      areaServed: ["Victoria", "New South Wales", "Australia"],
      url: `${SITE.domain}${URL_PATH}/`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "Solar Inverters", item: `${SITE.domain}/solar-inverters/` },
        { "@type": "ListItem", position: 3, name: "Inverter Replacement", item: `${SITE.domain}/solar-inverter-replacement/` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServicePage slug={SLUG} />
    </>
  );
}
