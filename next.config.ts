import type { NextConfig } from "next";

/**
 * The old site had a page per service under /service/<slug>. Four of those
 * slugs survive as deep pages; the rest now live as sections on a pillar
 * page. These 301s hand their accumulated ranking to the new location
 * instead of letting it die in a 404.
 */
const legacyServiceRedirects: Record<string, string> = {
  "car-detailing": "/enhance#interior-detailing",
  "car-washing": "/enhance#vehicle-washing",
  "home-detailing": "/enhance#mobile-detailing",
  "alloy-rim-protection": "/protect#alloy-rim-protection",
  "vehicle-accessories": "/elevate#custom-exterior-accessories",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(legacyServiceRedirects).flatMap(([slug, target]) => [
      { source: `/service/${slug}`, destination: target, permanent: true },
      {
        source: `/ar/service/${slug}`,
        destination: `/ar${target}`,
        permanent: true,
      },
    ]);
  },
};

export default nextConfig;
