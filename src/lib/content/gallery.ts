import type { Translated } from "@/lib/i18n";

export type GalleryItem = {
  id: string;
  label: Translated;
  serviceSlug: string;
  /** Both paths must be filled for the comparison slider to render. */
  before?: string;
  after?: string;
};

/**
 * The before/after set the whole page hangs on.
 *
 * Entries without image paths render as labelled empty slots rather than
 * being hidden — that way the page shows exactly which shots are still
 * outstanding, and dropping files into /public/gallery plus filling in the
 * two paths below is all that's needed to publish one.
 */
export const gallery: GalleryItem[] = [
  {
    id: "ppf-front-end",
    serviceSlug: "paint-protection-film",
    label: { en: "Full front PPF", ar: "فيلم واقٍ للمقدمة الكاملة" },
  },
  {
    id: "ceramic-gloss",
    serviceSlug: "ceramic-coating",
    label: { en: "Ceramic coating on black paint", ar: "طلاء سيراميكي على طلاء أسود" },
  },
  {
    id: "paint-correction-swirls",
    serviceSlug: "paint-correction",
    label: { en: "Swirl removal, single stage", ar: "إزالة الخدوش الدائرية بمرحلة واحدة" },
  },
  {
    id: "wrap-colour-change",
    serviceSlug: "car-wrapping",
    label: { en: "Satin colour change wrap", ar: "تغليف ساتان لتغيير اللون" },
  },
  {
    id: "headlight-restore",
    serviceSlug: "headlight-restoration",
    label: { en: "Headlight restoration", ar: "تجديد المصابيح الأمامية" },
  },
  {
    id: "interior-deep-clean",
    serviceSlug: "interior-detailing",
    label: { en: "Interior deep clean", ar: "تنظيف عميق للمقصورة" },
  },
];

export function isPublishable(item: GalleryItem) {
  return Boolean(item.before && item.after);
}
