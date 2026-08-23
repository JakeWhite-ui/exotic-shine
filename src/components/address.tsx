import { business } from "@/lib/content/business";
import { t, type Locale } from "@/lib/i18n";

const parts = business.address.localised;

/** Full postal address, localised. */
export function Address({
  locale,
  className = "",
  withCountry = true,
}: {
  locale: Locale;
  className?: string;
  withCountry?: boolean;
}) {
  return (
    <address className={`not-italic ${className}`}>
      {t(parts.unit, locale)}
      <br />
      {t(parts.district, locale)}
      <br />
      {t(parts.city, locale)}
      {withCountry ? `, ${t(parts.country, locale)}` : null}
    </address>
  );
}

/** One-line version for the top bar. */
export function shortAddress(locale: Locale) {
  return `${t(parts.district, locale)}, ${t(parts.city, locale)}`;
}
