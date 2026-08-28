/**
 * The client's own branded imagery, carried over from the old site and
 * re-encoded (10.9 MB of 6084px JPEGs became 1.2 MB of 1600px WebP).
 *
 * Note these are marketing images with the Exotic Shine badge burned into a
 * corner, not documentary shots of specific jobs — so they carry the site
 * visually, but the before/after pairs we've asked Abdul for are still the
 * thing that will actually sell work. Those go in `gallery.ts`.
 */
export const workImages: Record<string, string> = {
  // Real photo of the film rack, with UltraGuard PPF boxes legible on the
  // shelf — it replaced the branded render and doubles as evidence for the
  // brands the client says they stock.
  "paint-protection-film": "/studio/film-rolls.webp",
  "ceramic-coating": "/work/ceramic-coating.webp",
  "window-tinting": "/work/window-tinting.webp",
  "car-wrapping": "/work/car-wrapping.webp",
  "paint-correction": "/work/paint-correction.webp",
  "vehicle-washing": "/work/vehicle-washing.webp",
  "alloy-rim-protection": "/work/alloy-rim-protection.webp",
  "off-road-accessories": "/work/off-road-accessories.webp",
  "mobile-detailing": "/work/mobile-detailing.webp",
};

export const heroImage = workImages["paint-protection-film"];

export function imageFor(slug: string) {
  return workImages[slug];
}

/** Ordered for the homepage teaser and the work grid. */
export const featuredWork = [
  "paint-protection-film",
  "ceramic-coating",
  "car-wrapping",
  "paint-correction",
  "window-tinting",
  "alloy-rim-protection",
  "vehicle-washing",
  "off-road-accessories",
  "mobile-detailing",
];
