/**
 * Image loader for the GitHub Pages static export.
 *
 * There's no optimiser on Pages, so `next/image` can't resize on request.
 * Instead scripts/build-image-variants.py writes a fixed ladder of widths next
 * to each source, and this maps a requested width onto the nearest one at or
 * above it. The upshot is that srcset still works — a phone downloads the
 * 640px file, not the 1600px original.
 *
 * Anything without pre-built variants (or an external URL) is returned
 * untouched.
 */
const WIDTHS = [640, 1080, 1600];

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.startsWith("http") || src.startsWith("data:")) {
    return src;
  }

  const match = src.match(/^(.*)\.(webp|png|jpe?g)$/i);
  if (!match) return src;

  const [, base] = match;
  const chosen = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];

  return `${base}-${chosen}.webp`;
}
