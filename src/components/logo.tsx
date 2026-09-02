import Image from "next/image";
import { Link } from "@/components/link";
import { business } from "@/lib/content/business";
import { href, type Locale } from "@/lib/i18n";

/**
 * Two crops of the client's badge in two finishes.
 *
 * `wordmark` is the type only; `full` adds the crown, arc and car silhouette.
 * Each exists in a chrome version for the dark theme and a dark-ink version
 * for the light one — the chrome artwork is built from near-whites and simply
 * disappears on a light page.
 *
 * Both are rendered and toggled with CSS rather than picked in JS: the theme
 * is decided by an inline script before React runs, so a JS choice would
 * either flash the wrong mark or force this to be a client component.
 */
const variants = {
  wordmark: {
    dark: "/brand/logo-wordmark.png",
    light: "/brand/logo-wordmark-light.png",
    width: 640,
    height: 179,
  },
  full: {
    dark: "/brand/logo-lockup.png",
    light: "/brand/logo-lockup-light.png",
    width: 720,
    height: 456,
  },
};

export function Logo({
  locale,
  variant = "wordmark",
  className = "",
  priority = false,
  sizes = "180px",
}: {
  locale: Locale;
  variant?: keyof typeof variants;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const art = variants[variant];

  return (
    <Link
      href={href(locale, "/")}
      // `shrink-0` is load-bearing. The mark is sized by height with `w-auto`
      // on the image, so a flex parent that runs out of room finds no
      // intrinsic width to respect and squashes it to a sliver — the header
      // logo rendered 16px wide against 80px tall the day a fourth nav item
      // pushed the row over its container. Overflowing is the better failure
      // of the two, because somebody notices it.
      className={`inline-block shrink-0 transition-opacity hover:opacity-85 ${className}`}
      aria-label={`${business.legalName} — home`}
    >
      <Image
        src={art.dark}
        alt={business.legalName}
        width={art.width}
        height={art.height}
        priority={priority}
        sizes={sizes}
        className="h-full w-auto light:hidden"
      />
      <Image
        src={art.light}
        alt=""
        aria-hidden
        width={art.width}
        height={art.height}
        priority={priority}
        sizes={sizes}
        className="hidden h-full w-auto light:block"
      />
    </Link>
  );
}
