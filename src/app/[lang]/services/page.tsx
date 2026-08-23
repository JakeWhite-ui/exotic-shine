import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, Section } from "@/components/ui";
import { pillars, servicesInPillar } from "@/lib/content/services";
import { ui } from "@/lib/content/ui";
import { href, isLocale, t, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "All services",
  description:
    "Twenty-four car care services in Dubai — paint protection film, ceramic coating, tinting, detailing, respray, wraps, accessories and off-road fitting.",
  alternates: {
    canonical: "/services",
    languages: { en: "/services", ar: "/ar/services" },
  },
};

export default async function ServicesPage({
  params,
}: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;

  return (
    <>
      <section className="border-b border-line bg-ink-raised">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Eyebrow>{t(ui.nav.services, locale)}</Eyebrow>
          <h1 className="mt-5 text-4xl sm:text-5xl">
            {locale === "ar"
              ? "كل ما نقدمه لسيارتك"
              : "Everything we do to a car"}
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">
            {locale === "ar"
              ? "أربع وعشرون خدمة موزّعة على ثلاثة مسارات: الحماية، والتجديد، والتطوير."
              : "Twenty-four services across three tracks — protecting what's new, restoring what isn't, and building what you want."}
          </p>
        </div>
      </section>

      {pillars.map((pillar) => (
        <Section key={pillar.id} className="border-b border-line-soft">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>{t(pillar.lede, locale)}</Eyebrow>
              <h2 className="mt-3 text-3xl uppercase tracking-wide text-gold">
                {t(pillar.name, locale)}
              </h2>
            </div>
            <Link
              href={href(locale, `/${pillar.id}`)}
              className="font-display text-xs font-bold uppercase tracking-wider text-gold hover:text-gold-bright"
            >
              {t(ui.cta.learnMore, locale)} →
            </Link>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicesInPillar(pillar.id).map((service) => (
              <li key={service.slug}>
                <Link
                  href={href(
                    locale,
                    service.deep
                      ? `/service/${service.slug}`
                      : `/${pillar.id}#${service.slug}`,
                  )}
                  className="flex h-full flex-col rounded-md border border-line-soft bg-ink-card p-5 transition-colors hover:border-gold-deep"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base leading-snug">
                      {t(service.name, locale)}
                    </h3>
                    {service.comingSoon ? (
                      <span className="shrink-0 rounded-full border border-gold-deep px-2 py-0.5 font-display text-[0.625rem] font-semibold uppercase tracking-wider text-gold">
                        {t(ui.labels.comingSoon, locale)}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                    {t(service.short, locale)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </>
  );
}
