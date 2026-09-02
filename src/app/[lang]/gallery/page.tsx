import type { Metadata } from "next";
import { Link } from "@/components/link";
import { notFound } from "next/navigation";
import { BeforeAfter } from "@/components/before-after";
import { Clip } from "@/components/clip";
import { ButtonLink, Eyebrow, Section, SectionHead } from "@/components/ui";
import { clipPoster, clipVideo, reelClips } from "@/lib/content/clips";
import { gallery, isPublishable } from "@/lib/content/gallery";
import {
  getService,
  pillars,
  quoteHref,
  servicesInPillar,
} from "@/lib/content/services";
import { ui } from "@/lib/content/ui";
import { href, isLocale, t, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Our work — video from the studio floor",
  description:
    "Real footage from our Dubai studio: paint protection film going on, colour change wraps, machine polishing, wheels and interiors.",
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
              ? "مقاطع من داخل الورشة، وقائمة الخدمات الأربع والعشرين كاملة."
              : "Clips from the floor of the unit, and the full list of all twenty-four services."}
          </p>
        </div>
      </section>

      {/*
        The reel wall — the section this page now leads on. The client pointed
        at thevelondubai.com, which sells through an embedded Instagram grid;
        this makes the same argument without handing the page weight and the
        visitor tracking to Meta. See src/components/clip.tsx for how little of
        it actually downloads.
      */}
      <Section className="border-b border-line-soft">
        <SectionHead
          eyebrow={t(ui.sections.clipsEyebrow, locale)}
          title={t(ui.sections.clipsTitle, locale)}
          lede={t(ui.sections.clipsLede, locale)}
        />
        <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {reelClips.map((clip) => {
            const service = getService(clip.serviceSlug);
            return (
              <li key={clip.id}>
                <Clip
                  src={clipVideo(clip)}
                  poster={clipPoster(clip)}
                  caption={t(clip.caption, locale)}
                  playLabel={t(ui.labels.playClip, locale)}
                  pauseLabel={t(ui.labels.pauseClip, locale)}
                />
                {service ? (
                  <Link
                    href={quoteHref(locale, service.slug)}
                    className="mt-3 inline-block font-display text-xs font-bold uppercase tracking-wider text-gold transition-colors hover:text-gold-bright"
                  >
                    {t(ui.cta.quoteShort, locale)} →
                  </Link>
                ) : null}
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
        <Section className="border-b border-line-soft">
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

      <Section>
        <SectionHead
          eyebrow={t(ui.nav.services, locale)}
          title={
            locale === "ar"
              ? "الخدمات الأربع والعشرون كاملة"
              : "All twenty-four services"
          }
          lede={
            locale === "ar"
              ? "لكل خدمة رابط لطلب عرض سعر يصلنا وقد اخترتها مسبقًا."
              : "Every one of them has its own quote link — it reaches us with the service already filled in."
          }
        />

        <div className="mt-10 grid gap-x-10 gap-y-12 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.id}>
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-gold">
                {t(pillar.name, locale)}
              </h3>
              <ul className="mt-4">
                {servicesInPillar(pillar.id).map((service) => (
                  <li
                    key={service.slug}
                    className="flex items-baseline justify-between gap-4 border-b border-line-soft py-2.5"
                  >
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
                    <Link
                      href={quoteHref(locale, service.slug)}
                      aria-label={`${t(ui.cta.quoteShort, locale)} — ${t(service.name, locale)}`}
                      className="shrink-0 font-display text-[0.625rem] font-bold uppercase tracking-wider text-gold/70 transition-colors hover:text-gold-bright"
                    >
                      {t(ui.cta.quoteShort, locale)}
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
