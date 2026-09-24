import { SITE } from "@/lib/site";

/**
 * Web app manifest. Lets the site be saved to a phone home screen with the
 * right name, icon and brand colours rather than a screenshot and a URL.
 */
export default function manifest() {
  return {
    name: `${SITE.name} — Solar, Batteries & EV Charging`,
    short_name: SITE.name,
    description: SITE.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#0b143b",
    theme_color: "#0b143b",
    lang: "en-AU",
    icons: [
      { src: "/favicon.png", sizes: "any", type: "image/png" },
      { src: "/logos/logomark.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
