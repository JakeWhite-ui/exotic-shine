import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, Eyebrow, Section } from "@/components/ui";
import { BreadcrumbSchema } from "@/components/schema";
import { imageFor } from "@/lib/content/media";
import { getPillar, servicesInPillar, type PillarId } from "@/lib/content/services";
import { ui } from "@/lib/content/ui";
import { href, isLocale, t, type Locale } from "@/lib/i18n";

/** One representative shot per pillar, dimmed behind the heading. */
const pillarHeroes: Record<PillarId, string> = {
  protect: "paint-protection-film",
  enhance: "paint-correction",
  elevate: "car-wrapping",
};

const metaDescriptions: Record<PillarId, string> = {
  protect:
    "Paint protection film, ceramic coating, window tinting, alloy and underbody protection at our Ras Al Khor studio in Dubai.",
  enhance:
    "Paint correction, respray, dent removal, headlight restoration and full interior and exterior detailing in Dubai.",
  elevate:
    "Colour change wraps, body kits, roof racks, off-road gear and lighting upgrades fitted properly in Dubai.",
};

export function pillarMetadata(id: PillarId): Metadata {
  const pillar = getPillar(id);
  return {
    title: `${pillar.name.en} — ${pillar.lede.en}`,
    description: metaDescriptions[id],
    alternates: {
      canonical: `/${id}`,
      languages: { en: `/${id}`, ar: `/ar/${id}` },
    },
  };
}

export async function PillarPage({
  id,
  params,
}: {
  id: PillarId;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;

  const pillar = getPillar(id);
  const items = servicesInPillar(id);

  return (
    <>
      <section className="relative border-b border-line bg-ink-raised">
        <div className="absolute inset-0">
          <Image
            src={imageFor(pillarHeroes[id])}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-ink/40"
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <Eyebrow>
            {items.length} {t(ui.labels.servicesCount, locale)}
          </Eyebrow>
          <h1 className="mt-5 text-4xl uppercase tracking-wide text-gold sm:text-6xl">
            {t(pillar.name, locale)}
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-cream sm:text-2xl">
            {t(pillar.lede, locale)}
          </p>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted">
            {t(pillar.intro, locale)}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={href(locale, "/contact")}>
              {t(ui.cta.quote, locale)}
            </ButtonLink>
            <ButtonLink href={href(locale, "/pricing")} variant="outline">
              {t(ui.cta.seePricing, locale)}
            </ButtonLink>
          </div>
        </div>
      </section>

      <Section>
        <div className="divide-y divide-line-soft">
          {items.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className="grid scroll-mt-28 gap-4 py-10 first:pt-0 sm:grid-cols-[auto_1fr] sm:gap-8"
            >
              <p
                aria-hidden
                className="font-display text-3xl font-extrabold text-line sm:text-4xl"
              >
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl">{t(service.name, locale)}</h2>
                  {service.comingSoon ? (
                    <span className="rounded-full border border-gold-deep px-3 py-0.5 font-display text-[0.6875rem] font-semibold uppercase tracking-wider text-gold">
                      {t(ui.labels.comingSoon, locale)}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                  {t(service.short, locale)}
                </p>
                {service.deep ? (
                  <Link
                    href={href(locale, `/service/${service.slug}`)}
                    className="mt-4 inline-block font-display text-xs font-bold uppercase tracking-wider text-gold transition-colors hover:text-gold-bright"
                  >
                    {t(ui.cta.learnMore, locale)} →
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <BreadcrumbSchema
        trail={[
          { name: "Home", path: "/" },
          { name: pillar.name.en, path: `/${id}` },
        ]}
      />
    </>
  );
}
