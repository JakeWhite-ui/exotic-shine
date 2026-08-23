import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink, Card, Eyebrow, Section } from "@/components/ui";
import { ui } from "@/lib/content/ui";
import { href, isLocale, t, type Locale, type Translated } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Current offers",
  description:
    "Running offers at Exotic Shine Dubai — PPF and ceramic coating packages, and a first-visit discount on detailing.",
  alternates: {
    canonical: "/promotions",
    languages: { en: "/promotions", ar: "/ar/promotions" },
  },
};

/**
 * Carried over from the old site. Confirm both are still running before
 * launch — a stale offer is worse than no offer page.
 */
const offers: {
  title: Translated;
  body: Translated;
  terms: Translated;
}[] = [
  {
    title: {
      en: "PPF and ceramic together",
      ar: "الفيلم الواقي والسيراميك معًا",
    },
    body: {
      en: "Book full-body XPEL paint protection film and GTECHNIQ ceramic coating in the same visit and save AED 800, with the first annual rejuvenation included.",
      ar: "احجز فيلم XPEL الواقي للهيكل الكامل مع طلاء GTECHNIQ السيراميكي في نفس الزيارة ووفّر ٨٠٠ درهم، مع تجديد سنوي أول مجاني.",
    },
    terms: {
      en: "One vehicle per booking. Cannot be combined with other offers.",
      ar: "سيارة واحدة لكل حجز. لا يُجمع مع عروض أخرى.",
    },
  },
  {
    title: { en: "First visit", ar: "الزيارة الأولى" },
    body: {
      en: "15% off your first detailing service with us, on any full interior or exterior package.",
      ar: "خصم ١٥٪ على أول خدمة عناية لدينا، على أي باقة داخلية أو خارجية كاملة.",
    },
    terms: {
      en: "New clients only. Mention it when you book.",
      ar: "للعملاء الجدد فقط. اذكر العرض عند الحجز.",
    },
  },
];

export default async function PromotionsPage({
  params,
}: PageProps<"/[lang]/promotions">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;

  return (
    <>
      <section className="border-b border-line bg-ink-raised">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Eyebrow>{t(ui.nav.promotions, locale)}</Eyebrow>
          <h1 className="mt-5 text-4xl sm:text-5xl">
            {locale === "ar" ? "العروض الحالية" : "What's running now"}
          </h1>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {offers.map((offer) => (
            <Card key={offer.title.en} className="flex flex-col p-8">
              <h2 className="text-2xl text-gold">{t(offer.title, locale)}</h2>
              <p className="mt-4 flex-1 leading-relaxed text-muted">
                {t(offer.body, locale)}
              </p>
              <p className="mt-6 text-xs leading-relaxed text-muted/70">
                {t(offer.terms, locale)}
              </p>
              <div className="mt-6">
                <ButtonLink href={href(locale, "/contact")}>
                  {t(ui.cta.quote, locale)}
                </ButtonLink>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
