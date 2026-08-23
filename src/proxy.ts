import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

/**
 * English is served from the root so the URLs Google already indexed keep
 * resolving. Internally every request still lands in `app/[lang]`, so this
 * rewrites `/protect` to `/en/protect` without changing the address bar.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLocalised = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (isLocalised) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
