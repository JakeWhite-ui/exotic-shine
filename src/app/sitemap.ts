import type { MetadataRoute } from "next";
import { business } from "@/lib/content/business";
import { deepServices, pillars } from "@/lib/content/services";

// Required by `output: 'export'` — there's no server to regenerate this.
export const dynamic = "force-static";

const staticPaths = [
  "/",
  "/services",
  "/gallery",
  "/pricing",
  "/about",
  "/promotions",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...pillars.map((pillar) => `/${pillar.id}`),
    ...deepServices().map((service) => `/service/${service.slug}`),
  ];

  return paths.map((path) => ({
    url: `${business.domain}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/service/") ? 0.8 : 0.7,
    alternates: {
      languages: {
        en: `${business.domain}${path === "/" ? "" : path}`,
        ar: `${business.domain}/ar${path === "/" ? "" : path}`,
      },
    },
  }));
}
