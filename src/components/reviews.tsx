import { business } from "@/lib/content/business";
import { reviews } from "@/lib/content/reviews";
import { t, type Locale } from "@/lib/i18n";

function Stars({ label }: { label: string }) {
  return (
    <span className="inline-flex gap-0.5 text-gold" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="size-4">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * A static grid rather than a carousel. The old site's slider looped four
 * quotes five times over to fake volume, which is obvious to anyone who
 * scrolls.
 */
export function Reviews({ locale }: { locale: Locale }) {
  const { rating, reviewCount, profile } = business.google;
  const ratingLabel =
    locale === "ar"
      ? `${rating} من ٥ نجوم`
      : `${rating} out of 5 stars`;

  return (
    <div>
      <a
        href={profile}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-line-soft bg-ink-card px-5 py-3 transition-colors hover:border-gold-deep"
      >
        <span className="font-display text-2xl font-extrabold text-gold">
          {rating.toFixed(1)}
        </span>
        <Stars label={ratingLabel} />
        <span className="text-sm text-muted">
          {locale === "ar"
            ? `من ${reviewCount} تقييمًا على غوغل`
            : `from ${reviewCount} reviews on Google`}
        </span>
      </a>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <li key={review.id}>
            <figure className="flex h-full flex-col rounded-lg border border-line-soft bg-ink-card p-6">
              <Stars label={ratingLabel} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                {t(review.quote, locale)}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line-soft pt-4">
                <span
                  aria-hidden
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold-deep font-display text-sm font-bold text-gold"
                >
                  {review.name.charAt(0)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-sm font-bold text-cream">
                    {review.name}
                  </span>
                  <span className="block text-xs text-muted">
                    {t(review.service, locale)}
                  </span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
