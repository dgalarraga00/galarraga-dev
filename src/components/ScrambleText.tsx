"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/*+-<>";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

type ScrambleTextProps = {
  /** Cycled in order, looping back to the first. */
  words: string[];
  /** How long a resolved word stays before the next scramble. */
  holdMs?: number;
  /** Frames each character stays scrambled before locking in. */
  scrambleFrames?: number;
  className?: string;
};

/**
 * Resolves each word out of random glyphs, holds it, then scrambles into the
 * next one.
 *
 * Applied to a single rotating word, never to a headline. Scrambling the h1
 * would make the most important line on the page unreadable for the first
 * second, and it is what the browser measures as the LCP element.
 *
 * Characters lock in left to right, so the word reads as *arriving* rather than
 * flickering in place. Driven by requestAnimationFrame, so it pauses with the
 * tab and never queues work in a background tab the way setInterval does.
 *
 * Reduced motion renders the first word statically, with no timers at all.
 */
export function ScrambleText({
  words,
  holdMs = 1800,
  scrambleFrames = 8,
  className,
}: ScrambleTextProps) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(words[0] ?? "");
  const wordIndex = useRef(0);

  // The longest word reserves the width, so surrounding text never shifts as
  // the value changes. Layout shift is the one thing this effect must not cause.
  const widest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    if (reduced || words.length < 2) return;

    let frame = 0;
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    function scrambleTo(next: string) {
      const previous = words[wordIndex.current];
      const length = Math.max(previous.length, next.length);
      frame = 0;

      const step = () => {
        if (cancelled) return;

        let out = "";
        for (let i = 0; i < length; i++) {
          // Each character gets its own reveal frame, so the word locks in
          // from left to right instead of all at once.
          const revealAt = i * 1.6;
          if (frame >= revealAt + scrambleFrames) {
            out += next[i] ?? "";
          } else if (frame >= revealAt) {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          } else {
            out += previous[i] ?? "";
          }
        }

        setDisplay(out);
        frame += 1;

        if (frame < length * 1.6 + scrambleFrames) {
          raf = requestAnimationFrame(step);
          return;
        }

        setDisplay(next);
        wordIndex.current = (wordIndex.current + 1) % words.length;
        timeout = setTimeout(
          () => scrambleTo(words[(wordIndex.current + 1) % words.length]),
          holdMs,
        );
      };

      raf = requestAnimationFrame(step);
    }

    timeout = setTimeout(() => scrambleTo(words[1]), holdMs);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [words, holdMs, scrambleFrames, reduced]);

  return (
    <span className={className}>
      {/* A rotating word is noise to a screen reader; the first value is the
          honest, stable one to announce. */}
      <span className="sr-only">{words[0]}</span>

      <span aria-hidden="true" className="relative inline-block">
        <span className="invisible">{widest}</span>
        <span className="absolute inset-0 whitespace-pre">
          {reduced ? words[0] : display}
        </span>
      </span>
    </span>
  );
}
