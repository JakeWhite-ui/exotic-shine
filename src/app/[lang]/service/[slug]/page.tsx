import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, Card, Eyebrow, Section, SectionHead } from "@/components/ui";
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from "@/components/schema";
import { Faq } from "@/components/faq";
import { LeadForm } from "@/components/lead-form";
import { deepContent } from "@/lib/content/deep-services";
import { imageFor } from "@/lib/content/media";
import { deepServices, getPillar, getService } from "@/lib/content/services";
import { ui } from "@/lib/content/ui";
import { business } from "@/lib/content/business";
import { href, isLocale, locales, t, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    deepServices().map((service) => ({ lang, slug: service.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/service/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: `${service.name.en} in Dubai`,
    description: service.short.en.slice(0, 155),
    alternates: {
      canonical: `/service/${slug}`,
      languages: {
        en: `/service/${slug}`,
        ar: `/ar/service/${slug}`,
      },
    },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/[lang]/service/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;

  const service = getService(slug);
  const content = deepContent[slug];
  if (!service || !content) notFound();

  const pillar = getPillar(service.pillar);

  return (
    <>
      <section className="border-b border-line bg-ink-raised">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted">
            <Link href={href(locale, "/")} className="hover:text-gold">
              {t(ui.nav.home, locale)}
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={href(locale, `/${pillar.id}`)}
              className="hover:text-gold"
            >
              {t(pillar.name, locale)}
            </Link>
          </nav>

          <Eyebrow>{t(pillar.name, locale)}</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-4xl sm:text-5xl">
            {t(service.name, locale)}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {t(content.lede, locale)}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={href(locale, "/contact")}>
              {t(ui.cta.quote, locale)}
            </ButtonLink>
            <a
              href={business.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-sm border border-line px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {t(ui.cta.whatsapp, locale)}
            </a>
          </div>
        </div>
      </section>

      <Section>
        <SectionHead
          eyebrow={locale === "ar" ? "طريقة العمل" : "How we do it"}
          title={
            locale === "ar"
              ? "الخطوات التي نتبعها"
              : "The steps that actually matter"
          }
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2">
          {content.process.map((step, index) => (
            <li key={step.title.en}>
              <Card className="h-full">
                <p className="font-display text-sm font-bold text-gold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-xl">{t(step.title, locale)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {t(step.body, locale)}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-y border-line bg-ink-raised">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow={locale === "ar" ? "ما يشمله" : "What's included"}
              title={
                locale === "ar" ? "ما تحصل عليه" : "What you get for the money"
              }
            />
            <ul className="mt-8 space-y-3">
              {content.includes.map((item) => (
                <li key={item.en} className="flex gap-3 text-muted">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-gold" />
                  <span>{t(item, locale)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* No image for this service yet — render nothing rather than an
              empty placeholder box. */}
          {imageFor(slug) ? (
            <div className="relative min-h-64 overflow-hidden rounded-lg border border-line-soft">
              <Image
                src={imageFor(slug)}
                alt={t(service.name, locale)}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow={t(ui.sections.faqEyebrow, locale)}
          title={t(ui.sections.faqTitle, locale)}
        />
        <div className="mt-10 max-w-3xl">
          <Faq
            items={content.faqs.map((faq) => ({
              question: t(faq.question, locale),
              answer: t(faq.answer, locale),
            }))}
          />
        </div>
      </Section>

      <Section className="border-t border-line bg-ink-raised">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead
            eyebrow={t(ui.sections.contactEyebrow, locale)}
            title={
              locale === "ar"
                ? `اطلب سعرًا لـ${t(service.name, locale)}`
                : `Get a price for ${service.name.en.toLowerCase()}`
            }
            lede={
              locale === "ar"
                ? "أرسل طراز سيارتك وسنرد بسعر ثابت ومدة إنجاز."
                : "Send us the car and you'll get a fixed price and a turnaround, same day."
            }
          />
          <LeadForm locale={locale} presetService={service.name.en} />
        </div>
      </Section>

      <ServiceSchema
        name={service.name.en}
        description={content.lede.en}
        slug={slug}
      />
      <FaqSchema
        items={content.faqs.map((faq) => ({
          question: faq.question.en,
          answer: faq.answer.en,
        }))}
      />
      <BreadcrumbSchema
        trail={[
          { name: "Home", path: "/" },
          { name: pillar.name.en, path: `/${pillar.id}` },
          { name: service.name.en, path: `/service/${slug}` },
        ]}
      />
    </>
  );
}
