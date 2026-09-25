import { SITE } from "@/lib/site";
import { SERVICE_SLUGS, serviceUrl } from "@/lib/services";
import { SYSTEM_SIZES } from "@/lib/systems";
import { GUIDE_SLUGS } from "@/lib/guides";
import { LOCATION_SLUGS } from "@/lib/locations";
import { POSTS } from "@/lib/blog";
import { ALL_TOOL_SLUGS } from "@/lib/calculators";

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
    { url: `${SITE.domain}/locations/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.domain}/solar-systems/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.domain}/solar-products/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.domain}/faq/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.domain}/blog/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.domain}/tools/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.domain}/privacy-policy/`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },

    // Service hubs and their nested sub-pages.
    ...SERVICE_SLUGS.map((slug) => ({
      url: `${SITE.domain}${serviceUrl(slug)}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    })),

    // System sizes.
    ...SYSTEM_SIZES.map((s) => ({
      url: `${SITE.domain}/solar-systems/${s.slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),

    // Rebate guides.
    ...GUIDE_SLUGS.map((slug) => ({
      url: `${SITE.domain}/${slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })),

    // Location pages.
    ...LOCATION_SLUGS.map((slug) => ({
      url: `${SITE.domain}/${slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })),

    // Calculators and the rebate eligibility checker.
    ...ALL_TOOL_SLUGS.map((slug) => ({
      url: `${SITE.domain}/${slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),

    // Blog articles. Empty until real posts exist, so nothing is listed that
    // has no route behind it.
    ...POSTS.map((p) => ({
      url: `${SITE.domain}/blog/${p.slug}/`,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: "yearly",
      priority: 0.5,
    })),
  ];
}
