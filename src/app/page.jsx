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
      // How people actually search for the business: the trading name with
      // its category, and the older "Lumenex" spelling.
      alternateName: ["Lumenx Solar", "Lumenex"],
      legalName: "Lumenx",
      url: SITE.domain,
      email: SITE.email,
      // The Organization node is what Google reads for the knowledge panel and
      // local results, and it was publishing an email but no phone number.
      telephone: SITE.phone,
      slogan: SITE.tagline,
      description:
        "Australian solar energy company. SAA-accredited installers fitting CEC-approved solar panels, batteries, EV chargers and heat pumps for homes and businesses across Victoria and NSW.",
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
      alternateName: ["Lumenx Solar", "Lumenex"],
      inLanguage: "en-AU",
      publisher: { "@id": `${SITE.domain}/#organization` },
    },
  ],
};

// The home page is the one page that leads with the brand, because it is the
// page that answers a search for "Lumenx". "Lumenx Solar" rather than bare
// "Lumenx" because other, unrelated businesses share the name; the extra word
// is what tells a searcher (and Google) which Lumenx this is. `absolute` skips
// the layout's "%s | Lumenx" template so the brand is not printed twice.
const HOME_TITLE = "Lumenx Solar | Solar & Battery Installers in VIC & NSW";
const HOME_DESCRIPTION =
  "Solar panels, batteries and EV chargers for homes and businesses in VIC and NSW. Solar Victoria authorised, every rebate applied. Free quote: 1800 577 319.";

export const metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
  },
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
