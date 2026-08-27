import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { LocalBusinessSchema } from "@/components/schema";
import { themeScript } from "@/components/theme-toggle";
import { business } from "@/lib/content/business";
import { dirOf, isLocale, locales } from "@/lib/i18n";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(business.domain),
  title: {
    default: `${business.legalName} | PPF, Ceramic Coating & Detailing in Dubai`,
    template: `%s | ${business.name} Dubai`,
  },
  description:
    "Paint protection film, ceramic coating, window tinting and full detailing in Ras Al Khor, Dubai. Premium films from XPEL, 3M and UltraGuard.",
  openGraph: {
    siteName: business.legalName,
    type: "website",
    locale: "en_AE",
  },
  robots: { index: true, follow: true },
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return (
    <html
      lang={lang}
      dir={dirOf(lang)}
      className={`${archivo.variable} ${inter.variable} ${plexArabic.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-ink text-cream">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:font-semibold focus:text-black"
        >
          Skip to content
        </a>
        <Header locale={lang} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={lang} />
        <WhatsAppFab locale={lang} />
        <LocalBusinessSchema />
      </body>
    </html>
  );
}
