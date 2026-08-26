"use client";

import { useState } from "react";
import { business } from "@/lib/content/business";
import { pillars, servicesInPillar } from "@/lib/content/services";
import { ui } from "@/lib/content/ui";
import { t, type Locale } from "@/lib/i18n";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-sm border border-line bg-ink px-4 py-3 text-cream placeholder:text-muted/60 focus:border-gold focus:outline-none";

const labelClass =
  "block font-display text-xs font-semibold uppercase tracking-wider text-muted";

export function LeadForm({
  locale,
  presetService,
}: {
  locale: Locale;
  presetService?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  /**
   * The site is a static export on GitHub Pages, so there's no server to post
   * through — the enquiry goes straight from the browser to the GoHighLevel
   * webhook. That does put the webhook URL in the page source; it's an
   * inbound-only endpoint, so the worst case is someone pushing junk leads,
   * which the honeypot below and GHL's own filtering handle. If that ever
   * becomes a real problem the answer is a small proxy on a host that runs
   * server code, not obfuscating the URL here.
   */
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (data.website) {
      form.reset();
      setStatus("sent");
      return;
    }

    const webhook = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL;
    if (!webhook) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: data.name,
          phone: data.phone,
          email: data.email,
          vehicle: data.vehicle,
          service: data.service,
          message: data.message,
          source: "exoticshine.ae",
          locale,
          page: window.location.href,
        }),
      });

      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-md border border-gold-deep bg-ink-card p-8 text-center">
        <p className="font-display text-xl font-bold text-gold">
          {t(ui.form.success, locale)}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-muted underline underline-offset-4 hover:text-cream"
        >
          {locale === "ar" ? "إرسال طلب آخر" : "Send another enquiry"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="lead-name">
            {t(ui.form.name, locale)} *
          </label>
          <input
            id="lead-name"
            name="name"
            required
            autoComplete="name"
            className={`${fieldClass} mt-2`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="lead-phone">
            {t(ui.form.phone, locale)} *
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            className={`${fieldClass} mt-2`}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="lead-email">
            {t(ui.form.email, locale)}
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            dir="ltr"
            className={`${fieldClass} mt-2`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="lead-vehicle">
            {t(ui.form.vehicle, locale)}
          </label>
          <input
            id="lead-vehicle"
            name="vehicle"
            placeholder={locale === "ar" ? "مثال: نيسان باترول ٢٠٢٢" : "e.g. 2022 Nissan Patrol"}
            className={`${fieldClass} mt-2`}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="lead-service">
          {t(ui.form.service, locale)}
        </label>
        <select
          id="lead-service"
          name="service"
          defaultValue={presetService ?? ""}
          className={`${fieldClass} mt-2`}
        >
          <option value="">{t(ui.form.servicePlaceholder, locale)}</option>
          {pillars.map((pillar) => (
            <optgroup key={pillar.id} label={t(pillar.name, locale)}>
              {servicesInPillar(pillar.id).map((service) => (
                <option key={service.slug} value={service.name.en}>
                  {t(service.name, locale)}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="lead-message">
          {t(ui.form.message, locale)}
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={4}
          className={`${fieldClass} mt-2 resize-y`}
        />
      </div>

      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="lead-website">Leave this empty</label>
        <input id="lead-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" ? (
        <p role="alert" className="rounded-sm border border-spark px-4 py-3 text-sm text-cream">
          {t(ui.form.error, locale)}{" "}
          <a
            href={business.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline underline-offset-4"
          >
            {business.phone}
          </a>
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-sm bg-gold px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-gold-bright disabled:opacity-60"
        >
          {status === "sending"
            ? t(ui.form.sending, locale)
            : t(ui.form.submit, locale)}
        </button>
        <p className="text-xs text-muted">{t(ui.form.privacy, locale)}</p>
      </div>
    </form>
  );
}
