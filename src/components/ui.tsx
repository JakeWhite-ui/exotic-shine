import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Section({
  children,
  className = "",
  ...rest
}: ComponentProps<"section">) {
  return (
    <section className={`px-5 py-16 sm:px-8 sm:py-24 ${className}`} {...rest}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow flex items-center gap-3">
      <span aria-hidden className="h-px w-6 bg-gold" />
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "start",
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "start" | "center";
  /** Pages that lead with a section rather than a hero pass `as="h1"`. */
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center [&_.eyebrow]:justify-center"
          : "max-w-2xl"
      }
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading
        className={`mt-4 leading-tight ${
          Heading === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
        }`}
      >
        {title}
      </Heading>
      {lede ? <p className="mt-4 text-muted sm:text-lg">{lede}</p> : null}
    </div>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider transition-all duration-200";

const buttonVariants = {
  gold: "bg-gold text-black hover:bg-gold-bright hover:shadow-[0_0_24px_-6px_rgba(212,175,55,0.55)]",
  outline:
    "border border-line text-cream bg-transparent hover:border-gold hover:text-gold hover:bg-gold/5",
  ghost: "text-gold hover:text-gold-bright underline-offset-4 hover:underline px-0 py-0",
};

export function ButtonLink({
  href: to,
  variant = "gold",
  className = "",
  children,
  ...rest
}: ComponentProps<typeof Link> & { variant?: keyof typeof buttonVariants }) {
  return (
    <Link
      href={to}
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function ExternalButton({
  variant = "gold",
  className = "",
  children,
  ...rest
}: ComponentProps<"a"> & { variant?: keyof typeof buttonVariants }) {
  return (
    <a
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-line-soft bg-ink-card p-6 transition-colors duration-200 hover:border-gold-deep ${className}`}
    >
      {children}
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gold-deep px-3 py-1 font-display text-[0.6875rem] font-semibold uppercase tracking-wider text-gold">
      {children}
    </span>
  );
}
