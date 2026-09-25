import FaqLibraryPage from "@/components/FaqLibraryPage";
import { FAQ_PAGE, allFaqs } from "@/lib/faq-groups";
import { SITE } from "@/lib/site";

const SLUG = "faq";

export const metadata = {
  title: FAQ_PAGE.seoTitle,
  description: FAQ_PAGE.seoDescription,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "website",
    title: FAQ_PAGE.seoTitle,
    description: FAQ_PAGE.seoDescription,
    url: `/${SLUG}`,
    images: [FAQ_PAGE.hero.image],
  },
};

// The FAQPage node lives here rather than inside the accordion component, so
// the page emits exactly one FAQPage block covering every question on it.
// FaqLibraryPage does not render <Faq>, which is what would otherwise produce
// a second, partial FAQPage on the same URL.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": `${SITE.domain}/${SLUG}/#webpage`,
      url: `${SITE.domain}/${SLUG}/`,
      name: FAQ_PAGE.seoTitle,
      description: FAQ_PAGE.seoDescription,
      publisher: { "@id": `${SITE.domain}/#organization` },
      mainEntity: allFaqs().map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE.domain}/${SLUG}/` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FaqLibraryPage />
    </>
  );
}
