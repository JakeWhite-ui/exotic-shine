"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/**
 * Drag-to-compare slider. Keyboard accessible via the range input, which is
 * also what carries the accessible name — a pointer-only slider would be
 * unusable for anyone not using a mouse.
 */
export function BeforeAfter({
  before,
  after,
  label,
  beforeLabel,
  afterLabel,
  dragLabel,
}: {
  before: string;
  after: string;
  label: string;
  beforeLabel: string;
  afterLabel: string;
  dragLabel: string;
}) {
  const [position, setPosition] = useState(50);
  const frame = useRef<HTMLDivElement>(null);

  function handlePointer(event: React.PointerEvent) {
    if (event.buttons === 0 && event.type === "pointermove") return;
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((event.clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }

  return (
    <figure className="group">
      <div
        ref={frame}
        onPointerDown={handlePointer}
        onPointerMove={handlePointer}
        className="relative aspect-4/3 touch-none overflow-hidden rounded-md border border-line-soft bg-ink-card"
      >
        <Image
          src={after}
          alt={`${label} — ${afterLabel}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before}
            alt={`${label} — ${beforeLabel}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-gold"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-gold bg-ink text-xs text-gold">
            ↔
          </span>
        </div>

        <span className="pointer-events-none absolute bottom-3 left-3 rounded-sm bg-ink/80 px-2 py-1 font-display text-[0.625rem] font-bold uppercase tracking-wider text-cream">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-3 bottom-3 rounded-sm bg-ink/80 px-2 py-1 font-display text-[0.625rem] font-bold uppercase tracking-wider text-gold">
          {afterLabel}
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={`${label} — ${dragLabel}`}
        className="mt-3 w-full accent-gold"
      />

      <figcaption className="mt-1 text-sm text-muted">{label}</figcaption>
    </figure>
  );
}

export function GallerySlot({ label, note }: { label: string; note: string }) {
  return (
    <figure>
      <div className="flex aspect-4/3 items-center justify-center rounded-md border border-dashed border-line bg-ink-card p-6 text-center">
        <p className="max-w-[15rem] text-sm leading-relaxed text-muted">{note}</p>
      </div>
      <figcaption className="mt-3 text-sm text-muted">{label}</figcaption>
    </figure>
  );
}
