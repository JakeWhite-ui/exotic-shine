import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BeforeAfter, GallerySlot } from "@/components/before-after";
import { ButtonLink, Eyebrow, Section } from "@/components/ui";
import { gallery, isPublishable } from "@/lib/content/gallery";
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

  return (
    <>
      <section className="border-b border-line bg-ink-raised">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Eyebrow>{t(ui.sections.workEyebrow, locale)}</Eyebrow>
          <h1 className="mt-5 text-4xl sm:text-5xl">
            {t(ui.sections.workTitle, locale)}
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">
            {locale === "ar"
              ? "صور حقيقية من الاستوديو — نفس السيارة، نفس الزاوية، نفس الإضاءة. اسحب الشريط للمقارنة."
              : "Real cars from our unit — same angle, same light, nothing retouched. Drag the handle to compare."}
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 sm:grid-cols-2">
          {gallery.map((item) =>
            isPublishable(item) ? (
              <BeforeAfter
                key={item.id}
                before={item.before!}
                after={item.after!}
                label={t(item.label, locale)}
                beforeLabel={t(ui.labels.before, locale)}
                afterLabel={t(ui.labels.after, locale)}
                dragLabel={t(ui.labels.dragToCompare, locale)}
              />
            ) : (
              <GallerySlot
                key={item.id}
                label={t(item.label, locale)}
                note={
                  locale === "ar"
                    ? "بانتظار صور «قبل وبعد» من الاستوديو."
                    : "Waiting on the studio's own before-and-after shots."
                }
              />
            ),
          )}
        </div>

        <div className="mt-14 rounded-md border border-line bg-ink-card p-8 text-center">
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
