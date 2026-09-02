"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A muted looping clip that only downloads once it's about to be seen.
 *
 * Nine of these on the gallery page come to 9 MB, which would be indefensible
 * as a page weight — so nothing but the poster loads until the clip is within
 * a screen of the viewport, and playback stops the moment it leaves. A visitor
 * who reads the page top to bottom pulls two or three of them.
 *
 * `preload="none"` plus a late `src` is belt and braces: Safari has shipped
 * versions that fetch metadata for a video element regardless of the hint.
 */
export function Clip({
  src,
  poster,
  caption,
  playLabel,
  pauseLabel,
  landscape = false,
  priority = false,
  hideCaption = false,
  className = "",
}: {
  src: string;
  poster: string;
  /** Doubles as the accessible description — these have no audio track. */
  caption: string;
  playLabel: string;
  pauseLabel: string;
  landscape?: boolean;
  /** The hero: loads on arrival instead of waiting to be scrolled to. */
  priority?: boolean;
  /**
   * For the homepage strip, where four tiles sit two-up on a phone and a
   * forty-character caption under a 165px tile runs to five lines. The text
   * stays in the accessibility tree either way — it's the video's label.
   */
  hideCaption?: boolean;
  className?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(priority);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element || loaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLoaded(true);
        observer.disconnect();
      },
      { rootMargin: "100% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [loaded]);

  useEffect(() => {
    const element = video.current;
    if (!element || !loaded) return;

    // Someone who asked their OS for less motion did not ask for eight looping
    // videos. They get the poster and the play button instead.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Autoplay can still be refused — low power mode, for one. Nothing to
        // recover from: the poster stays up and the play button still works.
        if (entry.isIntersecting) void element.play().catch(() => {});
        else element.pause();
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [loaded]);

  function toggle() {
    const element = video.current;
    if (!element) return;
    setLoaded(true);
    if (element.paused) void element.play().catch(() => {});
    else element.pause();
  }

  return (
    <figure className={`group ${className}`}>
      <div
        className={`relative overflow-hidden rounded-lg border border-line-soft bg-ink-card transition-colors duration-300 group-hover:border-gold-deep ${
          landscape ? "aspect-video" : "aspect-9/16"
        }`}
      >
        <video
          ref={video}
          src={loaded ? src : undefined}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={caption}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="size-full object-cover"
        />

        {/*
          The whole frame is the control. Native controls would put a scrub bar
          across the bottom of every tile on the wall, and there's no audio and
          nothing to seek to — play or don't is the entire interaction.
        */}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? pauseLabel : playLabel}
          className="absolute inset-0 flex items-end justify-start p-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold"
        >
          <span
            aria-hidden
            className={`flex size-11 items-center justify-center rounded-full border border-gold-deep bg-black/55 text-gold-bright backdrop-blur-sm transition-opacity duration-300 ${
              playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
          >
            {playing ? <PauseGlyph /> : <PlayGlyph />}
          </span>
        </button>
      </div>

      <figcaption
        className={
          hideCaption ? "sr-only" : "mt-3 text-sm leading-relaxed text-muted"
        }
      >
        {caption}
      </figcaption>
    </figure>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

function PauseGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
      <path d="M7 5h3.5v14H7V5Zm6.5 0H17v14h-3.5V5Z" />
    </svg>
  );
}
