export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

/**
 * English lives at the root (`/protect`) so the URLs already indexed by Google
 * keep working; Arabic is prefixed (`/ar/protect`).
 */
export function href(locale: Locale, path = "/") {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return locale === defaultLocale ? clean || "/" : `/${locale}${clean}`;
}

export type Translated = Record<Locale, string>;

export function t(value: Translated, locale: Locale) {
  return value[locale] || value[defaultLocale];
}
