import { ui } from "@/lib/content/ui";
import { pillars } from "@/lib/content/services";
import { t, type Locale } from "@/lib/i18n";

/**
 * The pillars carry the navigation rather than a generic "Services" link —
 * that page indexes the same items, and having both made the row wide enough
 * to wrap. It stays reachable from the footer and the homepage.
 *
 * Four pillars is roughly the ceiling for this row on a laptop. A fifth needs
 * the desktop nav rethinking, not another entry appended here.
 */
export function mainNav(locale: Locale) {
  return [
    ...pillars.map((pillar) => ({
      path: `/${pillar.id}`,
      label: t(pillar.name, locale),
    })),
    { path: "/gallery", label: t(ui.nav.gallery, locale) },
    { path: "/pricing", label: t(ui.nav.pricing, locale) },
    { path: "/about", label: t(ui.nav.about, locale) },
    { path: "/contact", label: t(ui.nav.contact, locale) },
  ];
}

/** Mobile menu has room for the full list. */
export function mobileNavItems(locale: Locale) {
  return [
    { path: "/services", label: t(ui.nav.services, locale) },
    ...mainNav(locale),
  ];
}
