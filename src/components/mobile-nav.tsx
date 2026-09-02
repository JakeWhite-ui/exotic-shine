"use client";

import { Link } from "@/components/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { mobileNavItems } from "@/components/nav-links";
import { LangSwitch } from "@/components/lang-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { business } from "@/lib/content/business";
import { ui } from "@/lib/content/ui";
import { href, t, type Locale } from "@/lib/i18n";

export function MobileNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    // Matches the desktop nav in header.tsx, which appears at `xl` — eight
    // items no longer fit the row at `lg`. Keep the two in step or the site
    // gets a stretch with no navigation at all.
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="tgl tgl-hover"
        aria-label={t(ui.labels.menu, locale)}
        aria-expanded={open}
      >
        <span aria-hidden className="relative block h-3 w-5">
          <span className="absolute inset-x-0 top-0 h-0.5 bg-current" />
          <span className="absolute inset-x-0 top-1.5 h-0.5 bg-current" />
          <span className="absolute inset-x-0 top-3 h-0.5 bg-current" />
        </span>
      </button>

      {/*
        Rendered into `body` rather than in place. The header uses
        `backdrop-blur`, and a backdrop filter makes an element a containing
        block for `position: fixed` descendants — leaving the panel here would
        clip it to the header strip instead of covering the viewport.
      */}
      {open && mounted
        ? createPortal(
        <div className="fixed inset-0 z-50 flex flex-col bg-ink">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div className="flex items-center gap-2">
              <ThemeToggle locale={locale} />
              <LangSwitch locale={locale} />
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="tgl tgl-hover"
              aria-label={t(ui.labels.close, locale)}
            >
              <span aria-hidden className="text-xl leading-none">
                ×
              </span>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="space-y-1">
              {mobileNavItems(locale).map((item) => (
                <li key={item.path}>
                  <Link
                    href={href(locale, item.path)}
                    className="block border-b border-line-soft py-4 font-display text-lg font-bold uppercase tracking-wider text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-line px-5 py-5">
            <a
              href={business.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-black"
            >
              <WhatsAppIcon className="size-4" />
              {t(ui.cta.whatsapp, locale)}
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${business.phoneRaw}`}
                className="flex items-center justify-center gap-2 rounded-md border border-line px-4 py-3 font-display text-xs font-bold uppercase tracking-wider text-cream"
              >
                <PhoneIcon className="size-4 text-gold" />
                {t(ui.cta.call, locale)}
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex items-center justify-center gap-2 rounded-md border border-line px-4 py-3 font-display text-xs font-bold uppercase tracking-wider text-cream"
              >
                <MailIcon className="size-4 text-gold" />
                {t(ui.cta.email, locale)}
              </a>
            </div>

            <p className="pt-1 text-center text-sm text-muted" dir="ltr">
              {business.phone}
            </p>
          </div>
        </div>,
            document.body,
          )
        : null}
    </div>
  );
}
