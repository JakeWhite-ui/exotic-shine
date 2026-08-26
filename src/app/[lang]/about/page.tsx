import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ButtonLink, Card, Eyebrow, Section } from "@/components/ui";
import { Address } from "@/components/address";
import { studioGallery, studioHero } from "@/lib/content/studio";
import { brandStatement, brands, business } from "@/lib/content/business";
import { pillars } from "@/lib/content/services";
import { ui } from "@/lib/content/ui";
import { href, isLocale, t, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About the studio",
  description:
    "Exotic Shine is an XPEL-certified car care studio in Ras Al Khor, Dubai — paint protection, ceramic coating, detailing and styling.",
  alternates: {
    canonical: "/about",
    languages: { en: "/about", ar: "/ar/about" },
  },
};

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;

  return (
    <>
      <section className="relative border-b border-line bg-ink-raised">
        <div className="absolute inset-0">
          <Image
            src={studioHero.src}
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
          <Eyebrow>{t(ui.nav.about, locale)}</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-4xl sm:text-5xl">
            {locale === "ar"
              ? "استوديو بناه أناس يهتمون بالسيارات فعلًا"
              : "Built by people who actually care about cars"}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {locale === "ar"
              ? "نعمل من وحدة في رأس الخور الصناعية بدبي. لا صالة عرض فاخرة، بل مساحة عمل نظيفة ومضبوطة الإضاءة، لأن هذا ما تحتاجه أعمال الطلاء الجادة."
              : "We work out of a unit in Ras Al Khor Industrial Area. No marble showroom — a clean, properly lit workspace, because that's what serious paint work actually needs."}
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 leading-relaxed text-muted">
            <p>
              {locale === "ar"
                ? "بدأنا لأن معظم ما يُسمّى «تلميعًا» في دبي هو في الحقيقة إخفاء للمشكلة. طبقة شمع فوق خدوش، أو فيلم يُقص مباشرة على الطلاء، أو تظليل يتجعّد عند الزوايا بعد شهرين."
                : "We started because a lot of what passes for detailing in Dubai is really just hiding the problem. Wax over swirls. Film cut on the car with a blade. Tint that creases at the corners two months later."}
            </p>
            <p>
              {locale === "ar"
                ? "طريقتنا مختلفة: نصحح أولًا ثم نحمي. نقيس سماكة الطلاء قبل التلميع. نفك القطع بدل التغليف حولها. ونخبرك بصراحة حين تكون الخدمة التي طلبتها ليست ما تحتاجه سيارتك."
                : "Our way round is correct first, then protect. We measure paint depth before we polish. We take trim off rather than wrap around it. And we'll tell you when the service you asked for isn't the one your car needs."}
            </p>
            <p>
              {locale === "ar"
                ? "نعمل على كل شيء: سيدان يومية، ودفع رباعي عائلي، وسيارات خارقة. الطريقة نفسها في الحالات الثلاث."
                : "We work on everything — daily sedans, family 4x4s, and the exotics. Same process on all three."}
            </p>
          </div>

          <div className="space-y-5">
            <Card>
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-gold">
                {locale === "ar" ? "المنتجات" : "Products we use"}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {t(brandStatement, locale)}
              </p>
              <ul className="mt-5 space-y-4 border-t border-line-soft pt-5">
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
            </Card>

            <Card>
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-gold">
                {t(ui.labels.findUs, locale)}
              </h2>
              <Address
                locale={locale}
                withCountry={false}
                className="mt-4 text-sm leading-relaxed text-muted"
              />
              <a
                href={`tel:${business.phoneRaw}`}
                className="mt-4 inline-block font-display text-lg font-extrabold text-cream hover:text-gold"
                dir="ltr"
              >
                {business.phone}
              </a>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line bg-ink-raised">
        <h2 className="text-3xl">
          {locale === "ar" ? "ثلاثة مسارات للعمل" : "Three ways we work"}
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.id}>
              <h3 className="font-display text-xl font-extrabold uppercase tracking-wider text-gold">
                {t(pillar.name, locale)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t(pillar.intro, locale)}
              </p>
            </Card>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href={href(locale, "/services")}>
            {t(ui.cta.viewServices, locale)}
          </ButtonLink>
        </div>
      </Section>

      <Section className="border-t border-line">
        <h2 className="text-3xl">
          {locale === "ar" ? "جولة في المكان" : "A look around"}
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {studioGallery.map((shot) => (
            <li
              key={shot.src}
              className="relative aspect-3/4 overflow-hidden rounded-lg border border-line-soft"
            >
              <Image
                src={shot.src}
                alt={t(shot.alt, locale)}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 24vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
