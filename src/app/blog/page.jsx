import BlogHubPage from "@/components/BlogHubPage";
import { BLOG_HUB, GUIDE_CARDS, POSTS } from "@/lib/blog";
import { SITE } from "@/lib/site";

const SLUG = "blog";

export const metadata = {
  title: BLOG_HUB.seoTitle,
  description: BLOG_HUB.seoDescription,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "website",
    title: BLOG_HUB.seoTitle,
    description: BLOG_HUB.seoDescription,
    url: `/${SLUG}`,
    images: [BLOG_HUB.hero.image],
  },
};

// CollectionPage, not Blog. A Blog node with no BlogPosting children is a claim
// about content that does not exist; the guides listed here are real pages, so
// the list describes those. Switch to Blog + BlogPosting once POSTS is filled.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE.domain}/${SLUG}/#webpage`,
      url: `${SITE.domain}/${SLUG}/`,
      name: BLOG_HUB.seoTitle,
      description: BLOG_HUB.seoDescription,
      publisher: { "@id": `${SITE.domain}/#organization` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [
          ...GUIDE_CARDS.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: g.title,
            url: `${SITE.domain}${g.href}/`,
          })),
          ...POSTS.map((p, i) => ({
            "@type": "ListItem",
            position: GUIDE_CARDS.length + i + 1,
            name: p.title,
            url: `${SITE.domain}/${SLUG}/${p.slug}/`,
          })),
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE.domain}/${SLUG}/` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogHubPage />
    </>
  );
}
