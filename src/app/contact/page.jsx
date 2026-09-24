import ContactPage from "@/components/ContactPage";
import { CONTACT } from "@/lib/contact";
import { SITE, OFFICES } from "@/lib/site";

export const metadata = {
  title: CONTACT.seoTitle,
  description: CONTACT.seoDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: CONTACT.seoTitle,
    description: CONTACT.seoDescription,
    url: "/contact",
    images: [CONTACT.hero.image],
  },
};

// ContactPage + LocalBusiness with real hours and both addresses. This is the
// page Google looks at for local business details, so the structured data
// needs to agree with what is on screen.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${SITE.domain}/contact/#contactpage`,
      url: `${SITE.domain}/contact/`,
      name: CONTACT.seoTitle,
      description: CONTACT.seoDescription,
      about: { "@id": `${SITE.domain}/#organization` },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE.domain}/#localbusiness`,
      name: SITE.name,
      url: SITE.domain,
      email: SITE.email,
      telephone: SITE.phone,
      areaServed: ["Victoria", "New South Wales", "Australia"],
      address: OFFICES.map((o) => ({
        "@type": "PostalAddress",
        streetAddress: o.address,
        addressCountry: "AU",
      })),
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "07:00",
          closes: "17:00",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE.domain}/contact/` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactPage />
    </>
  );
}
