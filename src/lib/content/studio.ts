import type { Translated } from "@/lib/i18n";

/**
 * Photographs of the actual unit in Ras Al Khor, sent by the client on
 * 25 August. Unlike the branded marketing set in `media.ts`, these are real:
 * their floor, their signage, their cars, their number plates.
 *
 * That makes them the better choice anywhere the job is to prove the place
 * exists and looks the part — hero, about, contact.
 */
export type StudioShot = {
  src: string;
  alt: Translated;
  /** Portrait shots need different framing in the grids. */
  portrait?: boolean;
};

export const studioHero: StudioShot = {
  src: "/studio/floor-wide.webp",
  alt: {
    en: "The Exotic Shine workshop floor in Ras Al Khor, with a Nissan Patrol, Lincoln Navigator and Mercedes in the bays",
    ar: "أرضية ورشة إكزوتك شاين في رأس الخور، وفيها نيسان باترول ولينكولن نافيغيتور ومرسيدس",
  },
};

/**
 * Used on the contact page, so the job is recognition from the street rather
 * than atmosphere — the wider daytime frame shows the building, the sign and
 * the red apron together. The tight night shot of the doorway looked good but
 * told a first-time visitor nothing about what to look for.
 */
export const entranceShot: StudioShot = {
  src: "/studio/exterior-front.webp",
  portrait: true,
  alt: {
    en: "Warehouse 09 seen from the street, with the lit Exotic Shine sign and red apron at the entrance",
    ar: "المستودع رقم ٩ من الشارع، مع لوحة إكزوتك شاين المضاءة والسجادة الحمراء عند المدخل",
  },
};

/**
 * Ordered strongest first — the homepage shows only the first three, so the
 * lead shots have to carry the point on their own: a car being worked on, the
 * floor it's standing on, and the counter you walk up to.
 */
export const studioGallery: StudioShot[] = [
  {
    src: "/studio/polishing.webp",
    portrait: true,
    alt: {
      en: "A technician machine-polishing a bonnet under the Exotic Shine sign",
      ar: "فني يلمّع غطاء المحرك آليًا تحت لوحة إكزوتك شاين",
    },
  },
  {
    src: "/studio/bay-mercedes-front.webp",
    portrait: true,
    alt: {
      en: "A Mercedes CLA on the marble floor in front of the Exotic Shine wall",
      ar: "مرسيدس CLA على الأرضية الرخامية أمام جدار إكزوتك شاين",
    },
  },
  {
    src: "/studio/counter.webp",
    portrait: true,
    alt: {
      en: "The front counter with detailing products on display",
      ar: "طاولة الاستقبال مع منتجات العناية المعروضة",
    },
  },
  {
    src: "/studio/bay-landcruiser.webp",
    portrait: true,
    alt: {
      en: "A white Land Cruiser in the workshop",
      ar: "لاند كروزر بيضاء داخل الورشة",
    },
  },
  {
    src: "/studio/bay-lit.webp",
    portrait: true,
    alt: {
      en: "A prepared bay under the Exotic Shine sign",
      ar: "منطقة عمل مجهزة تحت لوحة إكزوتك شاين",
    },
  },
  {
    src: "/studio/bay-curtains.webp",
    portrait: true,
    alt: {
      en: "Dust-controlled bays behind strip curtains",
      ar: "مناطق عمل معزولة عن الغبار خلف ستائر شرائحية",
    },
  },
  {
    src: "/studio/exterior-front.webp",
    portrait: true,
    alt: {
      en: "The unit from the street in Ras Al Khor Industrial Area 3",
      ar: "الوحدة من الشارع في رأس الخور الصناعية ٣",
    },
  },
];
