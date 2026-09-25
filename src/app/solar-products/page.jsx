import ProductsHubPage from "@/components/ProductsHubPage";
import { PRODUCTS_HUB } from "@/lib/products";
import { SITE } from "@/lib/site";

const SLUG = "solar-products";

export const metadata = {
  title: PRODUCTS_HUB.seoTitle,
  description: PRODUCTS_HUB.seoDescription,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "website",
    title: PRODUCTS_HUB.seoTitle,
    description: PRODUCTS_HUB.seoDescription,
    url: `/${SLUG}`,
    images: [PRODUCTS_HUB.hero.image],
  },
};

// CollectionPage + ItemList of the categories. Deliberately no Product schema:
// Product entities invite offers, prices and aggregate ratings, none of which
// Lumenx publishes, and an incomplete Product node is worse than none.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE.domain}/${SLUG}/#webpage`,
      url: `${SITE.domain}/${SLUG}/`,
      name: PRODUCTS_HUB.seoTitle,
      description: PRODUCTS_HUB.seoDescription,
      about: { "@id": `${SITE.domain}/#organization` },
      publisher: { "@id": `${SITE.domain}/#organization` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: PRODUCTS_HUB.categories.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.title,
          url: `${SITE.domain}${c.href}/`,
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "Products", item: `${SITE.domain}/${SLUG}/` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductsHubPage />
    </>
  );
}
