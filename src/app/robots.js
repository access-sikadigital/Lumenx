import { SITE } from "@/lib/site";

/**
 * robots.txt
 *
 * Conversion and confirmation pages are excluded: they have no search value,
 * and a thank-you page that ranks means people landing on "thanks for your
 * enquiry" having sent nothing. The API route is excluded because it only
 * accepts POST and has nothing to crawl.
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/thank-you", "/get-a-quote"],
      },
    ],
    sitemap: `${SITE.domain}/sitemap.xml`,
    host: SITE.domain,
  };
}
