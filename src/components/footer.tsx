import { Link } from "@/components/link";
import { Logo } from "@/components/logo";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { Address } from "@/components/address";
import { SocialLinks } from "@/components/social-links";
import { business, formatHours } from "@/lib/content/business";
import { pillars, servicesInPillar } from "@/lib/content/services";
import { ui } from "@/lib/content/ui";
import { href, t, type Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-line bg-ink-raised">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo locale={locale} variant="full" className="h-24" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {locale === "ar"
                ? "استوديو عناية بالسيارات في رأس الخور، دبي. حماية طلاء، وطلاء سيراميكي، وتظليل، وعناية كاملة."
                : "A car care studio in Ras Al Khor, Dubai. Paint protection, ceramic coating, tinting and full detailing."}
            </p>
            <p className="mt-6 font-display text-xs font-bold uppercase tracking-widest text-gold">
              {t(ui.labels.followUs, locale)}
            </p>
            <SocialLinks locale={locale} className="mt-3" />
          </div>

          {pillars.map((pillar) => (
            <div key={pillar.id}>
              <h2 className="font-display text-xs font-bold uppercase tracking-widest text-gold">
                {t(pillar.name, locale)}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {servicesInPillar(pillar.id)
                  .slice(0, 6)
                  .map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={href(
                          locale,
                          service.deep
                            ? `/service/${service.slug}`
                            : `/${pillar.id}#${service.slug}`,
                        )}
                        className="text-sm text-muted transition-colors hover:text-cream"
                      >
                        {t(service.name, locale)}
                      </Link>
                    </li>
                  ))}
                <li>
                  <Link
                    href={href(locale, `/${pillar.id}`)}
                    className="text-sm text-gold transition-colors hover:text-gold-bright"
                  >
                    {t(ui.cta.learnMore, locale)} →
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="font-display text-xs font-bold uppercase tracking-widest text-gold">
              {t(ui.labels.address, locale)}
            </h2>
            <Address
              locale={locale}
              className="mt-3 text-sm leading-relaxed text-muted"
            />
          </div>

          <div>
            <h2 className="font-display text-xs font-bold uppercase tracking-widest text-gold">
              {t(ui.labels.phone, locale)}
            </h2>
            <div className="mt-4 space-y-2.5">
              <a
                href={`tel:${business.phoneRaw}`}
                className="flex items-center gap-2.5 rounded-md border border-line px-4 py-2.5 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
                dir="ltr"
              >
                <PhoneIcon className="size-4 shrink-0 text-gold" />
                {business.phone}
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex items-center gap-2.5 rounded-md border border-line px-4 py-2.5 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
                dir="ltr"
              >
                <MailIcon className="size-4 shrink-0 text-gold" />
                {business.email}
              </a>
              <a
                href={business.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-md bg-gold px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-gold-bright"
              >
                <WhatsAppIcon className="size-4 shrink-0" />
                {t(ui.cta.whatsapp, locale)}
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-display text-xs font-bold uppercase tracking-widest text-gold">
              {t(ui.labels.hours, locale)}
            </h2>
            <ul className="mt-3 space-y-1 text-sm text-muted">
              {business.hours.map((entry) => (
                <li key={entry.day} className="flex justify-between gap-4">
                  <span>{entry.day}</span>
                  <span className={entry.open ? "" : "text-spark"} dir="ltr">
                    {formatHours(entry, locale) ?? t(ui.labels.closed, locale)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs text-muted">
          © {new Date().getFullYear()} {business.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
