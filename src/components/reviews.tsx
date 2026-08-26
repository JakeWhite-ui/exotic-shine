import { business } from "@/lib/content/business";
import { reviews, type Review } from "@/lib/content/reviews";
import { t, type Locale } from "@/lib/i18n";

function Stars({ label }: { label: string }) {
  return (
    <span className="inline-flex gap-0.5 text-gold" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({
  review,
  locale,
  ratingLabel,
}: {
  review: Review;
  locale: Locale;
  ratingLabel: string;
}) {
  // Spacing lives on the card as a trailing margin rather than as `gap` on
  // the row. That makes each half of the track exactly N × (card + margin)
  // wide, so translating -50% lands on an identical frame. With `gap` the two
  // halves differ by one gap and the loop visibly jumps.
  return (
    <figure className="me-5 flex h-full w-[19rem] shrink-0 flex-col rounded-lg border border-line-soft bg-ink-card p-6 sm:w-[22rem]">
      <Stars label={ratingLabel} />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
        {t(review.quote, locale)}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-line-soft pt-4">
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
          <span className="block truncate text-xs text-muted">
            {t(review.service, locale)}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function Row({
  items,
  locale,
  ratingLabel,
  duration,
}: {
  items: Review[];
  locale: Locale;
  ratingLabel: string;
  duration: string;
}) {
  return (
    <div className="marquee-viewport overflow-hidden">
      <div
        className="marquee-track py-1"
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        <div className="flex">
          {items.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              locale={locale}
              ratingLabel={ratingLabel}
            />
          ))}
        </div>
        {/*
          An identical second pass so the loop can wrap without a jump. Hidden
          from assistive tech so the quotes aren't announced twice.
        */}
        <div aria-hidden className="flex">
          {items.map((review) => (
            <ReviewCard
              key={`${review.id}-loop`}
              review={review}
              locale={locale}
              ratingLabel={ratingLabel}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * All fourteen in a single line. The duration is set so the track moves at a
 * readable pace rather than a fixed loop time — with this many cards a short
 * duration would whip past.
 */
export function Reviews({ locale }: { locale: Locale }) {
  const { rating, reviewCount, profile } = business.google;
  const ratingLabel =
    locale === "ar" ? `${rating} من ٥ نجوم` : `${rating} out of 5 stars`;

  return (
    <div>
      <a
        href={profile}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-5 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-line-soft bg-ink-card px-5 py-3 transition-colors hover:border-gold-deep sm:mx-8 lg:mx-[max(2rem,calc((100vw-72rem)/2))]"
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

      <div className="mt-8">
        <Row
          items={reviews}
          locale={locale}
          ratingLabel={ratingLabel}
          duration="140s"
        />
      </div>
    </div>
  );
}
