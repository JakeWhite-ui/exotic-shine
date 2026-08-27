import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * `next/link` with prefetching off by default.
 *
 * Prefetch asks for a per-route RSC payload whose filename encodes the route
 * segments — for `/protect` the router derives them from the URL and requests
 * `__next.$d$lang.__PAGE__.txt`. Our build flattens `out/en/*` to the root, so
 * the URL no longer contains the `[lang]` segment the file was named for, and
 * every prefetch 404s. Nested dynamic routes like `/service/[slug]` are worse
 * still.
 *
 * Renaming the payloads to match would be guessing at Next internals that can
 * change between releases. Turning prefetch off removes the whole class of
 * problem, and on a static site of this size it costs very little: pages are
 * a few KB of HTML served from a CDN.
 *
 * Pass `prefetch` explicitly to override on a specific link.
 */
export function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}
