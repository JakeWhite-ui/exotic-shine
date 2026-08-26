/**
 * Post-processes the static export for GitHub Pages.
 *
 * 1. Lifts `out/en/*` up to `out/` so English serves from `/protect/` rather
 *    than `/en/protect/`. Arabic stays where it is, at `/ar/`. This is what
 *    proxy.ts used to do at request time — the links in the app already point
 *    at the unprefixed paths, so after the move hrefs and files line up.
 *
 * 2. Writes meta-refresh stubs for the five `/service/*` slugs the old site
 *    had that no longer exist. `redirects()` in next.config needs a server, so
 *    on Pages this is the only way to keep those URLs resolving.
 *
 * 3. Drops in `.nojekyll` so GitHub doesn't strip the `_next` directory —
 *    Jekyll ignores folders beginning with an underscore, which would take
 *    every script and stylesheet with it.
 */
import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const OUT = "out";
const DEFAULT_LOCALE = "en";

const legacyRedirects = {
  "car-detailing": "/enhance/#interior-detailing",
  "car-washing": "/enhance/#vehicle-washing",
  "home-detailing": "/enhance/#mobile-detailing",
  "alloy-rim-protection": "/protect/#alloy-rim-protection",
  "vehicle-accessories": "/elevate/#custom-exterior-accessories",
};

async function flattenDefaultLocale() {
  const from = path.join(OUT, DEFAULT_LOCALE);
  if (!existsSync(from)) {
    throw new Error(`${from} missing — did the build emit the locale routes?`);
  }

  for (const entry of await readdir(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(OUT, entry.name);
    await rm(dest, { recursive: true, force: true });
    await cp(src, dest, { recursive: true });
  }

  await rm(from, { recursive: true, force: true });
  console.log(`lifted out/${DEFAULT_LOCALE}/* to the root`);
}

function stub(target) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved</title>
<link rel="canonical" href="${target}">
<meta http-equiv="refresh" content="0; url=${target}">
<meta name="robots" content="noindex">
</head>
<body><p>This page has moved to <a href="${target}">${target}</a>.</p></body>
</html>
`;
}

async function writeLegacyStubs() {
  for (const [slug, target] of Object.entries(legacyRedirects)) {
    for (const prefix of ["", "/ar"]) {
      const dir = path.join(OUT, prefix, "service", slug);
      await mkdir(dir, { recursive: true });
      const dest = prefix ? `${prefix}${target}` : target;
      await writeFile(path.join(dir, "index.html"), stub(dest));
    }
  }
  console.log(
    `${Object.keys(legacyRedirects).length * 2} legacy redirect stubs written`,
  );
}

await flattenDefaultLocale();
await writeLegacyStubs();
await writeFile(path.join(OUT, ".nojekyll"), "");
console.log(".nojekyll written");
