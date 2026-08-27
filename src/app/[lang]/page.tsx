import Image from "next/image";
import { Link } from "@/components/link";
import { ButtonLink, Card, Section, SectionHead } from "@/components/ui";
import { Faq } from "@/components/faq";
import { Reviews } from "@/components/reviews";
import { Address } from "@/components/address";
import { FaqSchema } from "@/components/schema";
import {
  brandStatement,
  brands,
  business,
  hoursSummary,
  stats,
} from "@/lib/content/business";
import { generalFaqs } from "@/lib/content/faqs";
import { featuredWork, imageFor } from "@/lib/content/media";
import { studioGallery, studioHero } from "@/lib/content/studio";
import { getService, pillars, servicesInPillar } from "@/lib/content/services";
import { ui } from "@/lib/content/ui";
import { href, isLocale, t } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 start-1/4 size-[36rem] rounded-full bg-gold/8 blur-[120px]"
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-6 bg-gold" />
              {locale === "ar"
                ? "استوديو العناية الفاخرة · رأس الخور، دبي"
                : "Premium car care studio · Ras Al Khor, Dubai"}
            </p>

            <h1 className="mt-6 text-4xl leading-[1.05] sm:text-6xl">
              <span className="block text-metal">
                {locale === "ar" ? "احمِ." : "Protect."}
              </span>
              <span className="block text-metal">
                {locale === "ar" ? "جدّد." : "Enhance."}
              </span>
              <span className="block text-gold">
                {locale === "ar" ? "طوّر." : "Elevate."}
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              {locale === "ar"
                ? "فيلم حماية الطلاء، والطلاء السيراميكي، والتظليل، والعناية الكاملة — في رأس الخور بدبي. نعامل كل سيارة كما نعامل سياراتنا."
                : "Paint protection film, ceramic coating, tinting and full detailing in Ras Al Khor, Dubai. We treat every car the way we'd treat our own."}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={href(locale, "/contact")}>
                {t(ui.cta.quote, locale)}
              </ButtonLink>
              <ButtonLink href={href(locale, "/gallery")} variant="outline">
                {t(ui.cta.viewWork, locale)}
              </ButtonLink>
            </div>

            <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {brands.map((item) => (
                <li key={item.name}>
                  <p className="font-display text-lg font-extrabold tracking-wider text-metal">
                    {item.name}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    {t(item.label, locale)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-line-soft">
              <Image
                src={studioHero.src}
                alt={t(studioHero.alt, locale)}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
              />
              <div aria-hidden className="photo-scrim absolute inset-0" />
              <div className="absolute inset-x-4 bottom-4 rounded-md border border-gold-deep bg-black/55 px-4 py-3 backdrop-blur-sm">
                <p className="font-display text-xs font-bold uppercase tracking-wider text-gold-bright">
                  {locale === "ar"
                    ? "الاستوديو · رأس الخور"
                    : "Our unit · Ras Al Khor"}
                </p>
                <p className="mt-0.5 text-xs text-white/70">
                  {locale === "ar"
                    ? "مستودع رقم ٩، المنطقة الصناعية ٣"
                    : "Warehouse 09, Industrial Area 3"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink-raised">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 sm:px-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.value} className="px-2 py-8 text-center">
              <p className="font-display text-3xl font-extrabold text-gold sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                {t(stat.label, locale)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Section className="border-b border-line-soft">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <SectionHead
            eyebrow={locale === "ar" ? "المنتجات" : "Products"}
            title={
              locale === "ar"
                ? "المواد التي نعمل بها"
                : "What we put on your car"
            }
          />
          <p className="text-lg leading-relaxed text-muted">
            {t(brandStatement, locale)}
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {brands.map((item) => (
            <li
              key={item.name}
              className="rounded-lg border border-line-soft bg-ink-card px-6 py-5 text-center"
            >
              <p className="font-display text-xl font-extrabold tracking-wider text-metal">
                {item.name}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                {t(item.label, locale)}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead
          eyebrow={t(ui.sections.pillarsEyebrow, locale)}
          title={t(ui.sections.pillarsTitle, locale)}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const items = servicesInPillar(pillar.id);
            return (
              <Card key={pillar.id} className="flex flex-col">
                <h3 className="font-display text-2xl font-extrabold uppercase tracking-wider text-gold">
                  {t(pillar.name, locale)}
                </h3>
                <p className="mt-2 text-sm text-cream">{t(pillar.lede, locale)}</p>
                <ul className="mt-6 flex-1 space-y-2">
                  {items.slice(0, 5).map((service) => (
                    <li key={service.slug} className="text-sm text-muted">
                      {t(service.name, locale)}
                    </li>
                  ))}
                  {items.length > 5 ? (
                    <li className="text-sm text-muted">
                      +{items.length - 5}{" "}
                      {t(ui.labels.servicesCount, locale)}
                    </li>
                  ) : null}
                </ul>
                <Link
                  href={href(locale, `/${pillar.id}`)}
                  className="mt-6 font-display text-xs font-bold uppercase tracking-wider text-gold transition-colors hover:text-gold-bright"
                >
                  {t(ui.cta.learnMore, locale)} →
                </Link>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section className="border-t border-line bg-ink-raised">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead
            eyebrow={t(ui.sections.workEyebrow, locale)}
            title={locale === "ar" ? "من داخل الاستوديو" : "Inside the studio"}
          />
          <Link
            href={href(locale, "/gallery")}
            className="font-display text-xs font-bold uppercase tracking-wider text-gold hover:text-gold-bright"
          >
            {t(ui.cta.viewWork, locale)} →
          </Link>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredWork.slice(0, 6).map((slug) => {
            const service = getService(slug);
            if (!service) return null;
            return (
              <li key={slug}>
                <Link
                  href={href(
                    locale,
                    service.deep
                      ? `/service/${slug}`
                      : `/${service.pillar}#${slug}`,
                  )}
                  className="group relative block aspect-4/3 overflow-hidden rounded-lg border border-line-soft"
                >
                  <Image
                    src={imageFor(slug)}
                    alt={t(service.name, locale)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div aria-hidden className="photo-scrim absolute inset-0" />
                  <p className="on-photo absolute inset-x-4 bottom-4 font-display text-sm font-bold uppercase tracking-wider">
                    {t(service.name, locale)}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section className="border-t border-line">
        <SectionHead
          eyebrow={locale === "ar" ? "المكان" : "The unit"}
          title={
            locale === "ar"
              ? "المكان الذي ستترك سيارتك فيه"
              : "Where you'll be leaving your car"
          }
          lede={
            locale === "ar"
              ? "أرضية رخامية، وإضاءة مضبوطة، ومناطق معزولة عن الغبار. ليست ورشة في زاوية مرآب."
              : "Marble floor, controlled lighting, dust-sealed bays. Paint work needs a clean room, not a corner of a garage."
          }
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {studioGallery.slice(0, 3).map((shot) => (
            <li
              key={shot.src}
              className="relative aspect-3/4 overflow-hidden rounded-lg border border-line-soft"
            >
              <Image
                src={shot.src}
                alt={t(shot.alt, locale)}
                fill
                sizes="(max-width: 640px) 100vw, 32vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </Section>

      {/*
        Not wrapped in <Section>: the marquee wants the full viewport width so
        cards run off both edges, while the heading stays in the grid.
      */}
      <section className="overflow-hidden border-t border-line bg-ink-raised py-16 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <SectionHead
            eyebrow={t(ui.sections.reviewsEyebrow, locale)}
            title={t(ui.sections.reviewsTitle, locale)}
          />
        </div>
        <div className="mt-10">
          <Reviews locale={locale} />
        </div>
      </section>

      <Section className="border-t border-line">
        <SectionHead
          eyebrow={t(ui.sections.faqEyebrow, locale)}
          title={t(ui.sections.faqTitle, locale)}
        />
        <div className="mt-10 max-w-3xl">
          <Faq
            items={generalFaqs.map((faq) => ({
              question: t(faq.question, locale),
              answer: t(faq.answer, locale),
            }))}
          />
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHead
              eyebrow={t(ui.sections.contactEyebrow, locale)}
              title={t(ui.sections.contactTitle, locale)}
              lede={
                locale === "ar"
                  ? "أرسل لنا نوع سيارتك وما تحتاجه، وسنعطيك سعرًا واضحًا ومدة الإنجاز."
                  : "Send us your car and what you're after. You'll get a clear price and a realistic turnaround, not a callback to book a callback."
              }
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={href(locale, "/contact")}>
                {t(ui.cta.quote, locale)}
              </ButtonLink>
              <a
                href={business.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-line px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-cream transition-colors hover:border-gold hover:text-gold"
              >
                {t(ui.cta.whatsapp, locale)}
              </a>
            </div>
          </div>

          <Card>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-gold">
              {t(ui.labels.findUs, locale)}
            </h3>
            <Address
              locale={locale}
              className="mt-4 text-sm leading-relaxed text-muted"
            />
            <a
              href={`tel:${business.phoneRaw}`}
              className="mt-5 inline-block font-display text-xl font-extrabold text-cream transition-colors hover:text-gold"
            >
              {business.phone}
            </a>
            <p className="mt-4 text-xs uppercase tracking-wider text-muted">
              {hoursSummary(locale)}
            </p>
          </Card>
        </div>
      </Section>

      <FaqSchema
        items={generalFaqs.map((faq) => ({
          question: faq.question.en,
          answer: faq.answer.en,
        }))}
      />
    </>
  );
}
