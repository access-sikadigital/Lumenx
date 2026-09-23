import { SITE } from "@/lib/site";
import { SERVICE_SLUGS } from "@/lib/services";

/**
 * XML sitemap, generated from the same data the pages are built from, so a
 * new service hub cannot be added without appearing here.
 */
export default function sitemap() {
  const now = new Date();

  return [
    { url: `${SITE.domain}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.domain}/solar-rebates-victoria/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.domain}/about/`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    ...SERVICE_SLUGS.map((slug) => ({
      url: `${SITE.domain}/${slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    })),
  ];
}
