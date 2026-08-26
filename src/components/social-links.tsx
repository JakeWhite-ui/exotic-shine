import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/components/icons";
import { business } from "@/lib/content/business";
import { ui } from "@/lib/content/ui";
import { t, type Locale } from "@/lib/i18n";

const channels = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon, url: business.social.instagram },
  { key: "tiktok", label: "TikTok", Icon: TikTokIcon, url: business.social.tiktok },
  { key: "youtube", label: "YouTube", Icon: YouTubeIcon, url: business.social.youtube },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon, url: business.social.facebook },
];

/**
 * `icon` is the compact square set for the footer; `labelled` spells the
 * network out, which suits the contact page where there's room and the point
 * is to be obvious rather than tidy.
 */
export function SocialLinks({
  locale,
  variant = "icon",
  className = "",
}: {
  locale: Locale;
  variant?: "icon" | "labelled";
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`}>
      {channels.map(({ key, label, Icon, url }) => (
        <li key={key}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${business.name} on ${label}`}
            title={label}
            className={
              variant === "icon"
                ? "flex size-11 items-center justify-center rounded-md border border-line text-cream transition-colors hover:border-gold hover:bg-gold/5 hover:text-gold"
                : "flex items-center gap-2.5 rounded-md border border-line px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-cream transition-colors hover:border-gold hover:bg-gold/5 hover:text-gold"
            }
          >
            <Icon className="size-5 shrink-0" />
            {variant === "labelled" ? label : null}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function socialHeading(locale: Locale) {
  return t(ui.labels.followUs, locale);
}
