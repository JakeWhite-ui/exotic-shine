import Link from "next/link";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { LangSwitch } from "@/components/lang-switch";
import { mainNav } from "@/components/nav-links";
import {
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { shortAddress } from "@/components/address";
import { business, hoursSummary } from "@/lib/content/business";
import { ui } from "@/lib/content/ui";
import { href, t, type Locale } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur-md">
      <div className="hidden border-b border-line-soft lg:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-8 py-2.5 text-xs text-muted">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <PinIcon className="size-3.5 text-gold" />
              {shortAddress(locale)}
            </span>
            <span className="flex items-center gap-2">
              <ClockIcon className="size-3.5 text-gold" />
              {hoursSummary(locale)}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${business.phoneRaw}`}
              className="flex items-center gap-2 transition-colors hover:text-gold"
              dir="ltr"
            >
              <PhoneIcon className="size-3.5 text-gold" />
              {business.phone}
            </a>
            <a
              href={`mailto:${business.email}`}
              className="flex items-center gap-2 transition-colors hover:text-gold"
              dir="ltr"
            >
              <MailIcon className="size-3.5 text-gold" />
              {business.email}
            </a>
          </div>
        </div>
      </div>

      {/*
        Tight vertical padding: the full lockup is 1.6:1, so it needs real
        height to stay legible, and the header is sticky — every pixel here is
        taken off the reading area on every scroll.
      */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-2 sm:px-8">
        <Logo
          locale={locale}
          variant="full"
          priority
          sizes="240px"
          className="h-16 sm:h-20"
        />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {mainNav(locale).map((item) => (
              <li key={item.path}>
                <Link
                  href={href(locale, item.path)}
                  className="relative whitespace-nowrap font-display text-xs font-bold uppercase tracking-wider text-cream transition-colors after:absolute after:-bottom-1.5 after:inset-x-0 after:h-px after:origin-center after:scale-x-0 after:bg-gold after:transition-transform hover:text-gold hover:after:scale-x-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch locale={locale} />

          <a
            href={`mailto:${business.email}`}
            aria-label={t(ui.cta.email, locale)}
            title={t(ui.cta.email, locale)}
            className="tgl tgl-hover hidden sm:inline-flex"
          >
            <MailIcon className="size-4" />
          </a>

          <a
            href={`tel:${business.phoneRaw}`}
            aria-label={t(ui.cta.call, locale)}
            title={t(ui.cta.call, locale)}
            className="tgl tgl-hover hidden sm:inline-flex"
          >
            <PhoneIcon className="size-4" />
          </a>

          <a
            href={business.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-[2.375rem] items-center gap-2 whitespace-nowrap rounded-md bg-gold px-5 font-display text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-gold-bright sm:inline-flex"
          >
            <WhatsAppIcon className="size-4 shrink-0" />
            {t(ui.cta.whatsapp, locale)}
          </a>

          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}
