import ServicePage from "@/components/ServicePage";
import { SERVICE_PAGES, serviceUrl } from "@/lib/services";
import { SITE } from "@/lib/site";

const SLUG = "tesla-powerwall";
const URL_PATH = "/solar-batteries/tesla-powerwall";
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
        { "@type": "ListItem", position: 2, name: "Solar Batteries", item: `${SITE.domain}/solar-batteries/` },
        { "@type": "ListItem", position: 3, name: "Tesla Powerwall", item: `${SITE.domain}/solar-batteries/tesla-powerwall/` },
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
