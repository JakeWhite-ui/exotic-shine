/**
 * One still per service, all of them frames pulled out of the client's own
 * footage by scripts/build-media.py.
 *
 * What was here before was a set of AI renders inherited from the old site —
 * gold-lit studios, a mobile detailing van that doesn't exist, a flat lay of
 * accessories nobody owns. Alli flagged them on 1 September and sent thirteen
 * videos of the real unit instead, so every entry below is now a car that
 * actually stood on their floor.
 *
 * Two services lost their picture in the swap rather than keep a fake one:
 * mobile detailing (which is "coming soon" anyway) and off-road accessories.
 * `imageFor` returning undefined is handled everywhere it's called.
 */
export const workImages: Record<string, string> = {
  "paint-protection-film": "/work/paint-protection-film.webp",
  "ceramic-coating": "/work/ceramic-coating.webp",
  // The one frame here that isn't the job being done: there's no footage of
  // film going onto glass, so this is a finished car with the tint visible.
  "window-tinting": "/work/window-tinting.webp",
  "car-wrapping": "/work/car-wrapping.webp",
  "paint-correction": "/work/paint-correction.webp",
  "vehicle-washing": "/work/vehicle-washing.webp",
  "alloy-rim-protection": "/work/alloy-rim-protection.webp",
  "interior-detailing": "/work/interior-detailing.webp",
  "exterior-detailing": "/work/exterior-detailing.webp",
};

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
  "interior-detailing",
  "exterior-detailing",
];
