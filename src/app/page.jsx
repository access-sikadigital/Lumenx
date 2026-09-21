import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import EnergyFlow from "@/components/EnergyFlow";
import ServicesGrid from "@/components/ServicesGrid";
import WhyLumenx from "@/components/WhyLumenx";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import RebatesBand from "@/components/RebatesBand";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import { SITE, OFFICES, SERVICES } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${SITE.domain}/#organization`,
      name: "Lumenx",
      legalName: "Lumenx",
      url: SITE.domain,
      email: SITE.email,
      slogan: SITE.tagline,
      description:
        "Australian solar energy company. CEC-accredited solar panels, batteries, EV chargers and heat pumps for homes and business across Victoria and NSW.",
      areaServed: ["Victoria", "New South Wales", "Australia"],
      knowsAbout: [
        "Solar panels",
        "Solar batteries",
        "Commercial solar",
        "EV chargers",
        "Heat pump hot water",
        "Solar rebates",
      ],
      address: OFFICES.map((o) => ({
        "@type": "PostalAddress",
        streetAddress: o.address,
        addressCountry: "AU",
      })),
      makesOffer: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.line },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.domain}/#website`,
      url: SITE.domain,
      name: "Lumenx",
      inLanguage: "en-AU",
      publisher: { "@id": `${SITE.domain}/#organization` },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Marquee />
      <EnergyFlow />
      <ServicesGrid />
      <WhyLumenx />
      <Stats />
      <Process />
      <RebatesBand />
      <Reviews />
      <Faq />
      <CTA />
    </>
  );
}
