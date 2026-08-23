/**
 * Native `details` rather than a JS accordion — the answers stay in the DOM
 * and readable with JavaScript disabled, which is what we want given these
 * are also marked up as FAQPage structured data.
 */
export function Faq({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="divide-y divide-line-soft border-y border-line-soft">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-base font-bold text-cream transition-colors hover:text-gold [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden
              className="shrink-0 text-xl leading-none text-gold transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pb-6 leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
