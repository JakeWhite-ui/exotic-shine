import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink, Eyebrow, Section } from "@/components/ui";
import { priceRows, vehicleClasses } from "@/lib/content/pricing";
import { getService } from "@/lib/content/services";
import { ui } from "@/lib/content/ui";
import { business } from "@/lib/content/business";
import { href, isLocale, t, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "What paint protection film, ceramic coating, tinting, wrapping and detailing cost at our Ras Al Khor studio in Dubai.",
  alternates: {
    canonical: "/pricing",
    languages: { en: "/pricing", ar: "/ar/pricing" },
  },
};

export default async function PricingPage({
  params,
}: PageProps<"/[lang]/pricing">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;

  const onRequest = locale === "ar" ? "عند الطلب" : "On request";

  return (
    <>
      <section className="border-b border-line bg-ink-raised">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Eyebrow>{t(ui.nav.pricing, locale)}</Eyebrow>
          <h1 className="mt-5 text-4xl sm:text-5xl">
            {locale === "ar" ? "الأسعار بوضوح" : "What it costs"}
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">
            {locale === "ar"
              ? "السعر يعتمد على حجم السيارة وحالة الطلاء. نعطيك رقمًا ثابتًا بعد المعاينة، دون مفاجآت لاحقة."
              : "Price depends on the size of the car and the state of the paint. We quote a fixed number after seeing it, and that's the number you pay."}
          </p>
        </div>
      </section>

      <Section>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[42rem] border-collapse text-start">
            <caption className="sr-only">
              {locale === "ar"
                ? "أسعار الخدمات حسب فئة السيارة"
                : "Service prices by vehicle class"}
            </caption>
            <thead>
              <tr className="border-b border-line">
                <th
                  scope="col"
                  className="py-4 text-start font-display text-xs font-bold uppercase tracking-wider text-muted"
                >
                  {locale === "ar" ? "الخدمة" : "Service"}
                </th>
                {vehicleClasses.map((vehicle) => (
                  <th
                    key={vehicle.id}
                    scope="col"
                    className="py-4 text-start font-display text-xs font-bold uppercase tracking-wider text-gold"
                  >
                    {t(vehicle.label, locale)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {priceRows.map((row) => {
                const service = getService(row.serviceSlug);
                if (!service) return null;
                return (
                  <tr key={row.serviceSlug} className="border-b border-line-soft">
                    <th scope="row" className="py-5 pe-4 text-start font-normal">
                      <span className="block text-cream">
                        {t(service.name, locale)}
                      </span>
                      {row.note ? (
                        <span className="mt-1 block max-w-sm text-xs leading-relaxed text-muted">
                          {t(row.note, locale)}
                        </span>
                      ) : null}
                    </th>
                    {vehicleClasses.map((vehicle) => {
                      const price = row.prices[vehicle.id];
                      return (
                        <td
                          key={vehicle.id}
                          className="py-5 pe-4 align-top text-sm text-muted"
                        >
                          {price === null ? (
                            onRequest
                          ) : (
                            <span className="text-cream" dir="ltr">
                              AED {price.toLocaleString("en-AE")}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-12 rounded-md border border-line bg-ink-card p-8">
          <h2 className="text-xl">
            {locale === "ar"
              ? "احصل على سعر ثابت لسيارتك"
              : "Get a fixed price for your car"}
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">
            {locale === "ar"
              ? "أرسل لنا الطراز وسنة الصنع وما تحتاجه — نرد بسعر ومدة إنجاز في نفس اليوم."
              : "Send us the model, the year and what you need. You'll get a price and a turnaround the same day."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
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
      </Section>
    </>
  );
}
