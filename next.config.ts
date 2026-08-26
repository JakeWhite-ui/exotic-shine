import type { NextConfig } from "next";

/**
 * Built as a static export for GitHub Pages, which serves files and nothing
 * else. That rules out three things this project used to rely on:
 *
 *   - `proxy.ts`, which rewrote `/protect` to `/en/protect`. Gone; instead
 *     scripts/flatten-export.mjs lifts `out/en/*` to the root after the build,
 *     so English still lives at `/` and Arabic at `/ar/`.
 *   - `/api/lead`. The enquiry form now posts straight to the GoHighLevel
 *     webhook from the browser.
 *   - `redirects()`, which can't run without a server. The five retired
 *     `/service/*` slugs are emitted as meta-refresh stubs by the same script.
 */
const nextConfig: NextConfig = {
  output: "export",

  // Directory-style URLs (`/protect/index.html`), which is what Pages expects.
  trailingSlash: true,

  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
};

export default nextConfig;
