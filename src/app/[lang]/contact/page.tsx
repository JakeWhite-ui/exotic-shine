import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, Section, SectionHead } from "@/components/ui";
import { LeadForm } from "@/components/lead-form";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { Address } from "@/components/address";
import { entranceShot } from "@/lib/content/studio";
import Image from "next/image";
import { business } from "@/lib/content/business";
import { ui } from "@/lib/content/ui";
import { isLocale, t, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Contact the studio",
  description:
    "Exotic Shine Motor Services, Warehouse 09, Al Maklai Warehouses, Ras Al Khor Industrial Area 3, Dubai. Call +971 50 109 7330 or send an enquiry.",
  alternates: {
    canonical: "/contact",
    languages: { en: "/contact", ar: "/ar/contact" },
  },
};

const mapQuery = encodeURIComponent(
  `${business.address.unit}, ${business.address.district}, ${business.address.city}`,
);

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;

  return (
    <>
      <Section>
        <SectionHead
          as="h1"
          eyebrow={t(ui.sections.contactEyebrow, locale)}
          title={t(ui.sections.contactTitle, locale)}
          lede={
            locale === "ar"
              ? "أخبرنا بنوع سيارتك والخدمة المطلوبة، وسنرد بسعر واضح ومدة إنجاز واقعية."
              : "Tell us the car and what you're after. You'll get a clear price and a realistic turnaround."
          }
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <LeadForm locale={locale} />

          <div className="space-y-5">
            <Card>
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-gold">
                {locale === "ar" ? "الأسرع" : "Fastest route"}
              </h2>
              <div className="mt-4 space-y-3">
                <a
                  href={business.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-gold-bright"
                >
                  <WhatsAppIcon className="size-4" />
                  {t(ui.cta.whatsapp, locale)}
                </a>
                <a
                  href={`tel:${business.phoneRaw}`}
                  className="flex w-full items-center justify-center gap-2.5 rounded-md border border-line px-6 py-3.5 font-display text-sm font-bold text-cream transition-colors hover:border-gold hover:text-gold"
                  dir="ltr"
                >
                  <PhoneIcon className="size-4 text-gold" />
                  {business.phone}
                </a>
                <a
                  href={`mailto:${business.email}`}
                  className="flex w-full items-center justify-center gap-2.5 rounded-md border border-line px-6 py-3.5 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
                  dir="ltr"
                >
                  <MailIcon className="size-4 text-gold" />
                  {business.email}
                </a>
              </div>
            </Card>

            <Card className="overflow-hidden p-0">
              <div className="relative aspect-4/3">
                <Image
                  src={entranceShot.src}
                  alt={t(entranceShot.alt, locale)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="font-display text-sm font-bold uppercase tracking-widest text-gold">
                  {t(ui.labels.address, locale)}
                </h2>
                <Address
                  locale={locale}
                  className="mt-4 text-sm leading-relaxed text-muted"
                />
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  {locale === "ar"
                    ? "ابحث عن اللوحة المضاءة والسجادة الحمراء عند المدخل رقم ٩."
                    : "Look for the lit sign and the red apron at door 09."}
                </p>
              </div>
            </Card>

            <Card>
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-gold">
                {t(ui.labels.hours, locale)}
              </h2>
              <ul className="mt-4 space-y-1.5 text-sm text-muted">
                {business.hours.map((entry) => (
                  <li key={entry.day} className="flex justify-between gap-4">
                    <span>{entry.day}</span>
                    <span className={entry.open ? "" : "text-spark"} dir="ltr">
                      {entry.open
                        ? `${entry.open} – ${entry.close}`
                        : t(ui.labels.closed, locale)}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      <section className="border-t border-line">
        <h2 className="sr-only">{t(ui.labels.findUs, locale)}</h2>
        <iframe
          title={t(ui.labels.findUs, locale)}
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-96 w-full border-0 grayscale"
        />
      </section>
    </>
  );
}
