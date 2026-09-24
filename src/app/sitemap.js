import { SITE } from "@/lib/site";
import { SERVICE_SLUGS } from "@/lib/services";

/**
 * XML sitemap, generated from the same data the pages are built from, so a
 * new service hub cannot be added without appearing here.
 */
export default function sitemap() {
  const now = new Date();

  // /get-a-quote, /thank-you and /404 are deliberately absent: they are
  // noindex, and listing a noindex URL in a sitemap is a contradictory signal
  // that shows up as an error in Search Console.
  return [
    { url: `${SITE.domain}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.domain}/solar-rebates-victoria/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.domain}/about/`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE.domain}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE.domain}/reviews/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...SERVICE_SLUGS.map((slug) => ({
      url: `${SITE.domain}/${slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    })),
  ];
}
