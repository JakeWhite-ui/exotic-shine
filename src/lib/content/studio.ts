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
  src: "/studio/entrance-day.webp",
  alt: {
    en: "Warehouse 09 seen from the street in daylight, with the Exotic Shine sign and red apron at the entrance",
    ar: "المستودع رقم ٩ من الشارع نهارًا، مع لوحة إكزوتك شاين والسجادة الحمراء عند المدخل",
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
    src: "/studio/film-swatches.webp",
    alt: {
      en: "Wrap film and tint swatches on the counter, showing the colour range",
      ar: "عينات أفلام التغليف والتظليل على الطاولة، تُظهر تدرج الألوان",
    },
  },
  {
    src: "/studio/hall-wide.webp",
    alt: {
      en: "The full workshop floor with the Exotic Shine wall and the stair to the mezzanine",
      ar: "أرضية الورشة كاملة مع جدار إكزوتك شاين والدرج المؤدي للميزانين",
    },
  },
  {
    src: "/studio/brand-wall.webp",
    alt: {
      en: "The X Exotic Shine wall with its LED strips and marble floor",
      ar: "جدار إكزوتك شاين بإضاءته الشريطية وأرضيته الرخامية",
    },
  },
  {
    src: "/studio/bay-sealed.webp",
    alt: {
      en: "A dust-sealed bay behind strip curtains, under the Exotic Shine sign",
      ar: "منطقة عمل معزولة عن الغبار خلف ستائر شرائحية، تحت لوحة إكزوتك شاين",
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
    src: "/studio/hall-open.webp",
    alt: {
      en: "The workshop floor with the roller door open to the street",
      ar: "أرضية الورشة والباب المتحرك مفتوح على الشارع",
    },
  },
  {
    src: "/studio/film-rolls.webp",
    portrait: true,
    alt: {
      en: "The film rack with paint protection film and tint rolls in stock",
      ar: "رف الأفلام مع لفات فيلم حماية الطلاء والتظليل",
    },
  },
  {
    src: "/studio/tool-wall.webp",
    alt: {
      en: "The equipment wall with tools and machine polishers",
      ar: "جدار المعدات مع الأدوات وآلات التلميع",
    },
  },
  {
    src: "/studio/counter-front.webp",
    alt: {
      en: "The retail counter with detailing products under display lighting",
      ar: "طاولة البيع مع منتجات العناية تحت إضاءة العرض",
    },
  },
  {
    src: "/studio/entrance-day.webp",
    alt: {
      en: "The unit from the street in Ras Al Khor Industrial Area 3",
      ar: "الوحدة من الشارع في رأس الخور الصناعية ٣",
    },
  },
];
