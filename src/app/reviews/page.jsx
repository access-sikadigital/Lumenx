import ReviewsPage from "@/components/ReviewsPage";
import { REVIEWS_PAGE } from "@/lib/reviews";
import { SITE } from "@/lib/site";

export const metadata = {
  title: REVIEWS_PAGE.seoTitle,
  description: REVIEWS_PAGE.seoDescription,
  alternates: { canonical: "/reviews" },
  openGraph: {
    type: "website",
    title: REVIEWS_PAGE.seoTitle,
    description: REVIEWS_PAGE.seoDescription,
    url: "/reviews",
    images: [REVIEWS_PAGE.hero.image],
  },
};

// NOTE: no AggregateRating or Review schema here, deliberately.
//
// Review structured data puts star ratings directly into Google's results,
// and Google's own guidelines require it to reflect genuine reviews collected
// by the site. The testimonials on this page are still placeholders, so
// emitting rating markup for them would be both a policy breach (manual
// action risk, and it can drag down the whole domain) and a false claim.
//
// Once REVIEWS and GOOGLE_REVIEWS hold real, verifiable data, add an
// AggregateRating node here pointing at the organisation.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE.domain}/reviews/#webpage`,
      url: `${SITE.domain}/reviews/`,
      name: REVIEWS_PAGE.seoTitle,
      description: REVIEWS_PAGE.seoDescription,
      about: { "@id": `${SITE.domain}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "Reviews", item: `${SITE.domain}/reviews/` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReviewsPage />
    </>
  );
}
