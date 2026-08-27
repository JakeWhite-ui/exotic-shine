import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/components/link";
import { notFound } from "next/navigation";
import { BeforeAfter } from "@/components/before-after";
import { ButtonLink, Eyebrow, Section, SectionHead } from "@/components/ui";
import { gallery, isPublishable } from "@/lib/content/gallery";
import { featuredWork, imageFor } from "@/lib/content/media";
import { getService, pillars, servicesInPillar } from "@/lib/content/services";
import { ui } from "@/lib/content/ui";
import { href, isLocale, t, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Our work — before and after",
  description:
    "Real before-and-after results from our Dubai studio: paint protection film, ceramic coating, paint correction, wraps and interior detailing.",
  alternates: {
    canonical: "/gallery",
    languages: { en: "/gallery", ar: "/ar/gallery" },
  },
};

export default async function GalleryPage({
  params,
}: PageProps<"/[lang]/gallery">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;

  const publishable = gallery.filter(isPublishable);

  return (
    <>
      <section className="border-b border-line bg-ink-raised">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Eyebrow>{t(ui.sections.workEyebrow, locale)}</Eyebrow>
          <h1 className="mt-5 text-4xl sm:text-5xl">
            {locale === "ar" ? "أعمالنا" : "Our work"}
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">
            {locale === "ar"
              ? "ما نقوم به داخل الاستوديو، وقائمة الخدمات الأربع والعشرين كاملة."
              : "What we do inside the unit, and the full list of all twenty-four services."}
          </p>
        </div>
      </section>

      <Section className="border-b border-line-soft">
        <SectionHead
          eyebrow={locale === "ar" ? "الخدمات" : "The work"}
          title={locale === "ar" ? "ما نقوم به" : "What we do, in the unit"}
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredWork.map((slug) => {
            const service = getService(slug);
            if (!service) return null;
            return (
              <li
                key={slug}
                className="relative aspect-4/3 overflow-hidden rounded-lg border border-line-soft"
              >
                <Image
                  src={imageFor(slug)}
                  alt={t(service.name, locale)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <div aria-hidden className="photo-scrim absolute inset-0" />
                <p className="on-photo absolute inset-x-4 bottom-4 font-display text-sm font-bold uppercase tracking-wider">
                  {t(service.name, locale)}
                </p>
              </li>
            );
          })}
        </ul>
      </Section>

      {/*
        The before/after comparison section lived here. It's hidden until at
        least one pair has real images — an empty grid of "waiting on photos"
        boxes reads worse than not having the section at all. Fill in
        `src/lib/content/gallery.ts` and it comes back automatically.
      */}
      {publishable.length > 0 ? (
        <Section>
          <SectionHead
            eyebrow={t(ui.sections.workEyebrow, locale)}
            title={t(ui.sections.workTitle, locale)}
            lede={
              locale === "ar"
                ? "اسحب الشريط للمقارنة."
                : "Drag the handle to compare."
            }
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {publishable.map((item) => (
              <BeforeAfter
                key={item.id}
                before={item.before!}
                after={item.after!}
                label={t(item.label, locale)}
                beforeLabel={t(ui.labels.before, locale)}
                afterLabel={t(ui.labels.after, locale)}
                dragLabel={t(ui.labels.dragToCompare, locale)}
              />
            ))}
          </div>
        </Section>
      ) : null}

      <Section className="border-t border-line-soft">
        <SectionHead
          eyebrow={t(ui.nav.services, locale)}
          title={
            locale === "ar"
              ? "الخدمات الأربع والعشرون كاملة"
              : "All twenty-four services"
          }
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.id}>
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-gold">
                {t(pillar.name, locale)}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {servicesInPillar(pillar.id).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={href(
                        locale,
                        service.deep
                          ? `/service/${service.slug}`
                          : `/${pillar.id}#${service.slug}`,
                      )}
                      className="text-sm text-muted transition-colors hover:text-gold"
                    >
                      {t(service.name, locale)}
                      {service.comingSoon
                        ? ` — ${t(ui.labels.comingSoon, locale)}`
                        : ""}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-lg border border-line bg-ink-card p-8 text-center">
          <p className="mx-auto max-w-lg leading-relaxed text-muted">
            {locale === "ar"
              ? "هل ترغب برؤية نتيجة على طراز سيارتك تحديدًا؟ راسلنا وسنرسل لك أعمالًا مشابهة."
              : "Want to see a result on your exact model? Message us and we'll send work on the same car."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href={href(locale, "/contact")}>
              {t(ui.cta.quote, locale)}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
