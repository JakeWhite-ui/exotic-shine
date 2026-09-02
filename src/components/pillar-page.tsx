import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/components/link";
import { notFound } from "next/navigation";
import { ButtonLink, Eyebrow, Section } from "@/components/ui";
import { BreadcrumbSchema } from "@/components/schema";
import {
  getPillar,
  quoteHref,
  servicesInPillar,
  type PillarId,
} from "@/lib/content/services";
import { ui } from "@/lib/content/ui";
import { href, isLocale, t, type Locale } from "@/lib/i18n";

/**
 * Real photographs of the unit, dimmed behind each heading — they replaced
 * the branded marketing renders. A wide architectural shot also survives
 * being dropped to 25% opacity behind text far better than a close-up does.
 *
 * Protect gets the dust-sealed bay because that's the argument the section
 * makes: paint work needs a clean room, and here is the clean room.
 */
const pillarHeroes: Record<PillarId, string> = {
  protect: "/studio/bay-sealed.webp",
  enhance: "/studio/bay-empty.webp",
  elevate: "/studio/hall-open.webp",
  // The tool wall: the only photograph of the unit with equipment rather than
  // finish in it, which is the right note for the servicing side.
  maintain: "/studio/tool-wall.webp",
};

const metaDescriptions: Record<PillarId, string> = {
  protect:
    "Paint protection film, ceramic coating, window tinting, alloy and underbody protection at our Ras Al Khor studio in Dubai.",
  enhance:
    "Paint correction, respray, dent removal, headlight restoration and full interior and exterior detailing in Dubai.",
  elevate:
    "Colour change wraps, body kits, roof racks, off-road gear and lighting upgrades fitted properly in Dubai.",
  maintain:
    "Tyres, alignment and balancing, rims and rim repair, battery, AC, oil, brakes, mechanical and auto-electrical service in Ras Al Khor, Dubai.",
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
            src={pillarHeroes[id]}
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
        <div className="divide-y divide-line-soft" data-reveal-items>
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
                {/*
                  Every service gets its own quote link, arriving at the form
                  with this service already picked. Before this, someone eight
                  services down the page had to scroll back to the top to act.
                */}
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <ButtonLink
                    href={quoteHref(locale, service.slug)}
                    variant="outline"
                    className="px-5 py-2.5 text-xs"
                  >
                    {t(ui.cta.quoteShort, locale)}
                  </ButtonLink>
                  {service.deep ? (
                    <Link
                      href={href(locale, `/service/${service.slug}`)}
                      className="font-display text-xs font-bold uppercase tracking-wider text-gold transition-colors hover:text-gold-bright"
                    >
                      {t(ui.cta.learnMore, locale)} →
                    </Link>
                  ) : null}
                </div>
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
