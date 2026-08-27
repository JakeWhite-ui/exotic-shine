"use client";

import { useEffect, useState } from "react";
import { ui } from "@/lib/content/ui";
import { t, type Locale } from "@/lib/i18n";

export const THEME_KEY = "exotic-shine-theme";

/**
 * Runs before first paint, inlined in the document head.
 *
 * Without this the page renders dark, React hydrates, and only then does the
 * saved preference apply — a white flash on every navigation for anyone who
 * chose light. On a static export there's no server to read a cookie and get
 * it right up front, so a blocking script is the honest fix.
 */
export const themeScript = `
(function(){
  try {
    var saved = localStorage.getItem('${THEME_KEY}');
    var theme = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    if (theme === 'light') document.documentElement.classList.add('light');
  } catch (e) {}
})();
`;

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      aria-hidden
      className="size-4"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.6v2.2M12 19.2v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-4"
    >
      <path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5Z" />
    </svg>
  );
}

export function ThemeToggle({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !isLight;
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem(THEME_KEY, next ? "light" : "dark");
    } catch {
      // Private browsing — the choice just won't survive a reload.
    }
    setIsLight(next);
  }

  const label = t(isLight ? ui.labels.themeDark : ui.labels.themeLight, locale);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`tgl tgl-hover ${className}`}
    >
      {/*
        Rendered only after mount: the server can't know which theme the
        inline script picked, so committing to an icon during SSR guarantees
        it's wrong half the time and React logs a hydration mismatch.
      */}
      {mounted ? isLight ? <MoonIcon /> : <SunIcon /> : <span className="size-4" />}
    </button>
  );
}
