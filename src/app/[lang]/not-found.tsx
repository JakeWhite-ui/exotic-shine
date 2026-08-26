import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { pillars } from "@/lib/content/services";

/**
 * Static, so it can't read the locale from params — English only. Arabic
 * visitors landing here still get working links back into the site.
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-5 py-20 sm:px-8">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-5 text-4xl sm:text-5xl">
        That page isn&rsquo;t here
      </h1>
      <p className="mt-5 leading-relaxed text-muted">
        It may have moved when we rebuilt the site. Everything we do is still
        one click away.
      </p>

      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/services" variant="outline">
          See all services
        </ButtonLink>
      </div>

      <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
        {pillars.map((pillar) => (
          <li key={pillar.id}>
            <Link
              href={`/${pillar.id}`}
              className="font-display text-xs font-bold uppercase tracking-wider text-gold hover:text-gold-bright"
            >
              {pillar.name.en}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/contact"
            className="font-display text-xs font-bold uppercase tracking-wider text-gold hover:text-gold-bright"
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}
