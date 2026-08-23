import type { Translated } from "@/lib/i18n";

/**
 * Single source of truth for NAP data. It feeds the header, footer, contact
 * page and the LocalBusiness JSON-LD, so the details Google sees can never
 * drift from the details a visitor sees.
 */
export const business = {
  legalName: "Exotic Shine Motor Services LLC",
  name: "Exotic Shine",
  tagline: "Premium Car Care Studio",
  motto: ["Protect", "Enhance", "Elevate"],
  phone: "+971 50 109 7330",
  phoneRaw: "+971501097330",
  email: "info@exoticshine.net",
  whatsapp: "https://wa.me/971501097330",
  domain: "https://exoticshine.net",
  address: {
    unit: "Warehouse No. 09, Al Maklai Warehouses",
    district: "Ras Al Khor, Industrial Area 3",
    city: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
    /** Same address for the Arabic side; the English above feeds the JSON-LD. */
    localised: {
      unit: {
        en: "Warehouse No. 09, Al Maklai Warehouses",
        ar: "مستودع رقم ٩، مستودعات المكلاي",
      },
      district: {
        en: "Ras Al Khor, Industrial Area 3",
        ar: "رأس الخور، المنطقة الصناعية ٣",
      },
      city: { en: "Dubai", ar: "دبي" },
      country: { en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
    },
    // TODO: replace with surveyed coordinates once Abdul confirms the unit pin.
    lat: 25.1749,
    lng: 55.3573,
  },
  social: {
    instagram: "https://www.instagram.com/exoticshine.uae",
    facebook: "https://www.facebook.com/share/17daiQbKxL/",
    tiktok: "https://www.tiktok.com/@exoticshine.uae",
    youtube: "https://www.youtube.com/watch?v=YhUqxWR4mnE",
  },
  /** Friday is the studio's day off. */
  hours: [
    { day: "Monday", open: "09:00", close: "19:00" },
    { day: "Tuesday", open: "09:00", close: "19:00" },
    { day: "Wednesday", open: "09:00", close: "19:00" },
    { day: "Thursday", open: "09:00", close: "19:00" },
    { day: "Friday", open: null, close: null },
    { day: "Saturday", open: "09:00", close: "19:00" },
    { day: "Sunday", open: "09:00", close: "19:00" },
  ],
} as const;

export const accreditations = [
  {
    name: "XPEL",
    label: { en: "Certified installer", ar: "منشآت معتمدة" } satisfies Translated,
  },
  {
    name: "GTECHNIQ",
    label: { en: "Accredited studio", ar: "استوديو معتمد" } satisfies Translated,
  },
  {
    name: "3M",
    label: { en: "Approved films", ar: "أفلام معتمدة" } satisfies Translated,
  },
];

/**
 * Claims that appear on the site and inside structured data.
 *
 * `verified: false` means Abdul has not confirmed the number yet — those are
 * rendered as plain copy and deliberately kept out of the JSON-LD so we never
 * hand Google a review count we cannot stand behind.
 */
export const stats: {
  value: string;
  label: Translated;
  verified: boolean;
}[] = [
  {
    value: "500+",
    label: { en: "Cars protected", ar: "سيارة تمت حمايتها" },
    verified: false,
  },
  {
    value: "10 yr",
    label: { en: "PPF warranty", ar: "ضمان الفيلم الواقي" },
    verified: true,
  },
  {
    value: "1–3 days",
    label: { en: "Typical turnaround", ar: "مدة الإنجاز المعتادة" },
    verified: true,
  },
  {
    value: "15+",
    label: { en: "Certified technicians", ar: "فني معتمد" },
    verified: false,
  },
];
