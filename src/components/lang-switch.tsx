"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

/**
 * Shows the language you'd switch *to*, not the one you're on — "ع" while
 * reading English, "EN" while reading Arabic. Keeps the visitor on the same
 * page rather than dumping them back on the homepage.
 */
export function LangSwitch({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname() || "/";
  const other = locales.find((item) => item !== locale) ?? defaultLocale;

  const stripped =
    locales.reduce<string | null>((acc, item) => {
      if (acc !== null) return acc;
      if (pathname === `/${item}`) return "/";
      if (pathname.startsWith(`/${item}/`)) return pathname.slice(item.length + 1);
      return null;
    }, null) ?? pathname;

  const target =
    other === defaultLocale
      ? stripped
      : `/${other}${stripped === "/" ? "" : stripped}`;

  return (
    <Link
      href={target}
      hrefLang={other}
      lang={other}
      aria-label={other === "ar" ? "التبديل إلى العربية" : "Switch to English"}
      className={`tgl tgl-hover ${className}`}
    >
      <span aria-hidden className={other === "ar" ? "text-base" : ""}>
        {other === "ar" ? "ع" : "EN"}
      </span>
    </Link>
  );
}
