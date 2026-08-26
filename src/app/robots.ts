import type { MetadataRoute } from "next";
import { business } from "@/lib/content/business";

// Required by `output: 'export'` — there's no server to regenerate this.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${business.domain}/sitemap.xml`,
    host: business.domain,
  };
}
