import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/content/business";
import { href, type Locale } from "@/lib/i18n";

/**
 * Two crops of the client's badge, both cut from the supplied artwork with the
 * black background alphaed out so they sit on any surface.
 *
 * `wordmark` is the header lockup — at 40px tall the car and crown would be
 * illegible, so that variant keeps only the type. `full` adds the crown, arc
 * and silhouette and is used where there's room for it.
 */
const variants = {
  wordmark: { src: "/brand/logo-wordmark.png", width: 640, height: 179 },
  full: { src: "/brand/logo-lockup.png", width: 720, height: 450 },
};

export function Logo({
  locale,
  variant = "wordmark",
  className = "",
  priority = false,
  /** Rendered width, so the optimiser stops serving a 1920px source. */
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
      className={`inline-block transition-opacity hover:opacity-85 ${className}`}
      aria-label={`${business.legalName} — home`}
    >
      <Image
        src={art.src}
        alt={business.legalName}
        width={art.width}
        height={art.height}
        priority={priority}
        sizes={sizes}
        className="h-full w-auto"
      />
    </Link>
  );
}
