/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Allow high-quality WebP for full-bleed hero/section imagery.
  images: {
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },

  /**
   * Permanent redirects for the October 2026 services restructure.
   *
   * The menu went from twelve services to eight plus Commercial, which meant
   * merging pages that were really one decision split in two. Every retired
   * URL 301s to the page that replaced it, so existing rankings, backlinks
   * and anything bookmarked all land somewhere sensible instead of a 404.
   *
   * 301 (permanent: true) on purpose: these pages are not coming back, and a
   * 302 would tell search engines to keep the old URL indexed.
   *
   * NOT redirected, deliberately — see the note below about /solar-systems.
   */
  async redirects() {
    return [
      // Solar Inverters + Inverter Replacement are one job: "Inverter Repair".
      { source: "/solar-inverters", destination: "/inverter-repair", permanent: true },
      { source: "/solar-inverter-replacement", destination: "/inverter-repair", permanent: true },

      // Pool heating is off the menu and is now a quote-form option. The page
      // itself still exists for anyone searching for it directly, so this is
      // not a redirect — it is just unlinked from the nav.
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
