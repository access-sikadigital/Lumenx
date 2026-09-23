import AboutPage from "@/components/AboutPage";
import { ABOUT } from "@/lib/about";
import { SITE, OFFICES } from "@/lib/site";

export const metadata = {
  title: ABOUT.seoTitle,
  description: ABOUT.seoDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: ABOUT.seoTitle,
    description: ABOUT.seoDescription,
    url: "/about",
    images: [ABOUT.hero.image],
  },
};

// AboutPage + BreadcrumbList. FAQPage schema is emitted by the Faq component
// from this page's own questions.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE.domain}/about/#aboutpage`,
      url: `${SITE.domain}/about/`,
      name: ABOUT.seoTitle,
      description: ABOUT.seoDescription,
      about: { "@id": `${SITE.domain}/#organization` },
      mainEntity: {
        "@id": `${SITE.domain}/#organization`,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "About", item: `${SITE.domain}/about/` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AboutPage />
    </>
  );
}
