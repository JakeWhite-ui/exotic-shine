import type { Translated } from "@/lib/i18n";

/**
 * Vehicle classes drive the price grid. Confirm with the client whether their
 * pricing actually splits this way before publishing numbers — if it doesn't,
 * collapse this to a single "from" column rather than inventing tiers.
 */
export const vehicleClasses: { id: string; label: Translated }[] = [
  { id: "sedan", label: { en: "Sedan / coupe", ar: "سيدان / كوبيه" } },
  { id: "suv", label: { en: "SUV / 4x4", ar: "دفع رباعي" } },
  { id: "exotic", label: { en: "Supercar / exotic", ar: "سيارات خارقة" } },
];

export type PriceRow = {
  serviceSlug: string;
  /** AED. `null` means "quote on inspection", which is the honest default. */
  prices: Record<string, number | null>;
  note?: Translated;
};

/**
 * Every row is deliberately unpriced until the client supplies real numbers.
 * The page renders "on request" for nulls, so publishing is a matter of
 * filling these in — no layout work, no invented figures in the meantime.
 */
export const priceRows: PriceRow[] = [
  {
    serviceSlug: "paint-protection-film",
    prices: { sedan: null, suv: null, exotic: null },
    note: {
      en: "Priced by coverage: front end, track pack or full body.",
      ar: "يُسعّر حسب التغطية: المقدمة أو الحزمة الرياضية أو الهيكل كاملًا.",
    },
  },
  {
    serviceSlug: "ceramic-coating",
    prices: { sedan: null, suv: null, exotic: null },
    note: {
      en: "Depends on paint condition and how many correction stages it needs.",
      ar: "يعتمد على حالة الطلاء وعدد مراحل التصحيح المطلوبة.",
    },
  },
  { serviceSlug: "window-tinting", prices: { sedan: null, suv: null, exotic: null } },
  { serviceSlug: "car-wrapping", prices: { sedan: null, suv: null, exotic: null } },
  { serviceSlug: "paint-correction", prices: { sedan: null, suv: null, exotic: null } },
  { serviceSlug: "interior-detailing", prices: { sedan: null, suv: null, exotic: null } },
  { serviceSlug: "exterior-detailing", prices: { sedan: null, suv: null, exotic: null } },
  { serviceSlug: "vehicle-washing", prices: { sedan: null, suv: null, exotic: null } },
  { serviceSlug: "headlight-restoration", prices: { sedan: null, suv: null, exotic: null } },
  { serviceSlug: "alloy-rim-protection", prices: { sedan: null, suv: null, exotic: null } },
  {
    serviceSlug: "full-respray",
    prices: { sedan: null, suv: null, exotic: null },
    note: {
      en: "Always quoted after inspection — bodywork condition changes everything.",
      ar: "يُسعّر دائمًا بعد المعاينة — حالة الهيكل تغيّر كل شيء.",
    },
  },
];
