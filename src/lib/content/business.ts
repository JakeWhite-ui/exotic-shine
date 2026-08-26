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
  /**
   * The .ae ccTLD is the stronger signal for a Dubai-only business. The old
   * .net still needs to 301 here rather than be switched off — it's on the
   * physical signage, on the Google Business Profile, and holds whatever
   * index Google has.
   */
  domain: "https://exoticshine.ae",
  legacyDomain: "https://exoticshine.net",
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
    // Decoded from the plus code on the Google Business Profile — "59JJ+7G
    // Dubai", full code 7HQQ59JJ+7G. See scripts/decode-pluscode.py.
    lat: 25.180687,
    lng: 55.381312,
    plusCode: "7HQQ59JJ+7G",
  },
  /**
   * Live Google Business Profile: 5.0 from 16 reviews, owner replies to each
   * one. Ask Abdul for the canonical share link — this search URL resolves to
   * the profile but a place-id link would be sturdier.
   */
  google: {
    profile:
      "https://www.google.com/maps/search/?api=1&query=Exotic+Shine+Motor+Services+Ras+Al+Khor+Dubai",
    rating: 5.0,
    reviewCount: 16,
  },
  /** Confirmed by the client 26 Aug — the Facebook and YouTube links both moved. */
  social: {
    instagram: "https://www.instagram.com/exoticshine.uae",
    facebook: "https://www.facebook.com/share/1BdzU3ovvR/",
    tiktok: "https://www.tiktok.com/@exoticshine.uae",
    youtube: "https://youtube.com/@exoticshineuae",
  },
  /**
   * Stored as 24-hour because that's what schema.org's
   * openingHoursSpecification expects. Displayed as 12-hour per the client —
   * see `formatHours` below.
   *
   * Open seven days. The old site listed Friday as closed; the client
   * confirmed on 26 Aug that they trade the same hours as every other day.
   */
  hours: [
    { day: "Monday", open: "09:00", close: "19:00" },
    { day: "Tuesday", open: "09:00", close: "19:00" },
    { day: "Wednesday", open: "09:00", close: "19:00" },
    { day: "Thursday", open: "09:00", close: "19:00" },
    { day: "Friday", open: "09:00", close: "19:00" },
    { day: "Saturday", open: "09:00", close: "19:00" },
    { day: "Sunday", open: "09:00", close: "19:00" },
  ],
} as const;

/**
 * "09:00" becomes "9:00 AM". The client asked for 12-hour throughout; the
 * stored 24-hour values still feed the structured data untouched.
 *
 * Arabic keeps 24-hour with Arabic-Indic digits, which is how times are
 * normally written in the UAE — AM/PM in an Arabic sentence reads as an
 * English intrusion.
 */
export function formatTime(time: string, locale: "en" | "ar") {
  const [h, m] = time.split(":").map(Number);

  if (locale === "ar") {
    // Drop the leading zero so it matches the hours written elsewhere in the
    // Arabic copy, then swap to Arabic-Indic digits.
    return `${h}:${String(m).padStart(2, "0")}`.replace(
      /\d/g,
      (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)],
    );
  }

  const suffix = h < 12 ? "AM" : "PM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function formatHours(
  entry: { open: string | null; close: string | null },
  locale: "en" | "ar",
) {
  if (!entry.open || !entry.close) return null;
  return `${formatTime(entry.open, locale)} – ${formatTime(entry.close, locale)}`;
}

const shortDay: Record<string, { en: string; ar: string }> = {
  Monday: { en: "Mon", ar: "الاثنين" },
  Tuesday: { en: "Tue", ar: "الثلاثاء" },
  Wednesday: { en: "Wed", ar: "الأربعاء" },
  Thursday: { en: "Thu", ar: "الخميس" },
  Friday: { en: "Fri", ar: "الجمعة" },
  Saturday: { en: "Sat", ar: "السبت" },
  Sunday: { en: "Sun", ar: "الأحد" },
};

/** The UAE working week starts on Saturday, so summarise in that order. */
const weekOrder = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

/**
 * The one-line version — "Sat–Thu 9:00 AM – 7:00 PM · Friday closed".
 *
 * Derived from the same `hours` array the day-by-day tables use, so the
 * summary in the top bar can't drift from the table in the footer. Both were
 * hand-written strings before and had already diverged: one said "9 AM – 7 PM",
 * the other "9:00 AM – 7:00 PM".
 */
export function hoursSummary(locale: "en" | "ar") {
  const ordered = weekOrder.map(
    (day) => business.hours.find((h) => h.day === day)!,
  );

  const open = ordered.filter((entry) => entry.open);
  const closed = ordered.filter((entry) => !entry.open);
  if (!open.length) return null;

  const times = formatHours(open[0], locale);

  // Seven days open would otherwise render as "Sat–Fri", which reads as a
  // typo rather than as "all week".
  if (!closed.length) {
    return locale === "ar" ? `يوميًا ${times}` : `Open daily ${times}`;
  }

  const first = shortDay[open[0].day][locale];
  const last = shortDay[open[open.length - 1].day][locale];
  const range = open.length === 1 ? first : `${first}–${last}`;

  const closedNames = closed
    .map((entry) => shortDay[entry.day][locale])
    .join(", ");
  const closedLabel =
    locale === "ar" ? `${closedNames} مغلق` : `${closedNames} closed`;

  return `${range} ${times} · ${closedLabel}`;
}

/**
 * Brands the studio actually works with, per the client on 26 Aug. GTECHNIQ
 * was on the old site as an "accredited studio" claim and has been removed —
 * the client's own list doesn't mention it, and an unbacked accreditation
 * claim is the kind of thing a brand will ask you to take down.
 *
 * Framed as "brands we use", not as certifications. The client listed all
 * three the same way — as products they work with — and said nothing about
 * being an accredited installer for any of them. "XPEL certified installer"
 * was our own wording carried over from the old site, so it's gone too.
 */
export const brands = [
  {
    name: "XPEL",
    label: { en: "Paint protection film", ar: "فيلم حماية الطلاء" } satisfies Translated,
  },
  {
    name: "3M",
    label: { en: "Films and wraps", ar: "أفلام وتغليف" } satisfies Translated,
  },
  {
    name: "UltraGuard",
    label: { en: "Protection systems", ar: "أنظمة حماية" } satisfies Translated,
  },
];

export const brandStatement: Translated = {
  en: "We work with some of the industry's most trusted and premium brands, including XPEL, 3M, UltraGuard and other high-quality solutions. Depending on your requirements, your budget and the level of protection you're after, we'll recommend the right product — so every vehicle gets the result that suits it.",
  ar: "نعمل بأفضل العلامات التجارية وأكثرها موثوقية في المجال، من بينها XPEL و3M وUltraGuard وحلول أخرى عالية الجودة. وبحسب متطلباتك وميزانيتك ومستوى الحماية الذي ترغب به، نرشّح لك المنتج المناسب — لتحصل كل سيارة على النتيجة التي تليق بها.",
};

/**
 * Claims that appear on the site.
 *
 * Every one of these is now checkable. The old site's "500+ cars protected",
 * "1,200+ happy customers" and "15+ certified technicians" had no source
 * behind them, so they're gone — replaced by the live Google rating, the
 * warranty term, the real turnaround and the service count. Keep it that way:
 * if a number can't be backed up, it doesn't belong here.
 */
export const stats: {
  value: string;
  label: Translated;
  verified: boolean;
}[] = [
  {
    value: "5.0",
    label: { en: "Rated on Google", ar: "تقييم غوغل" },
    verified: true,
  },
  {
    // Was "10 yr PPF warranty". XPEL's ten-year cover is granted through
    // accredited installers, and the client hasn't confirmed that status —
    // so the claim goes until they do. Open-seven-days is checkable today.
    value: "7 days",
    label: { en: "Open every day", ar: "مفتوح كل يوم" },
    verified: true,
  },
  {
    value: "1–3 days",
    label: { en: "Typical turnaround", ar: "مدة الإنجاز المعتادة" },
    verified: true,
  },
  {
    value: "24",
    label: { en: "Services under one roof", ar: "خدمة تحت سقف واحد" },
    verified: true,
  },
];
