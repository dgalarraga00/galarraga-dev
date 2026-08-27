"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/**
 * Reads the motion preference as an external store rather than syncing it into
 * state from an effect. That keeps the value correct if the user flips the OS
 * setting mid-session, and avoids the double render that setting state during
 * an effect would cause.
 */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false, // Server: assume motion is fine, the client corrects on mount.
  );
}

type TypewriterProps = {
  text: string;
  /** Milliseconds per character. */
  speed?: number;
  /** Pause before the first character lands. */
  startDelay?: number;
  className?: string;
};

/**
 * Types the text out once on mount, then leaves a blinking caret.
 *
 * Deliberately not a loop. A wordmark that retypes itself every few seconds
 * pulls the eye back to the corner of the screen forever, which is the opposite
 * of what a logo is for: it should introduce itself and then get out of the way.
 *
 * Accessibility: the animated characters are hidden from assistive tech and the
 * complete string is rendered separately, so a screen reader announces
 * "dev.galarraga" once instead of narrating it letter by letter. That copy is
 * also what lands in the server HTML, so the name is present with JS disabled.
 */
export function Typewriter({
  text,
  speed = 70,
  startDelay = 250,
  className,
}: TypewriterProps) {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) return;

    let index = 0;
    let interval: ReturnType<typeof setInterval>;

    // Every state update happens inside a timer callback, never in the effect
    // body, so React commits once per character and not twice on mount.
    const start = setTimeout(() => {
      interval = setInterval(() => {
        index += 1;
        setCount(index);
        if (index >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, startDelay, reduced]);

  const visible = reduced ? text : text.slice(0, count);
  const done = visible.length >= text.length;

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>

      <span aria-hidden="true" className="inline-flex items-center">
        {/* Reserves the final width from the first frame, so the nav never
            reflows while the characters land. */}
        <span className="relative">
          <span className="invisible">{text}</span>
          <span className="absolute inset-0 whitespace-pre">{visible}</span>
        </span>

        {reduced ? null : (
          <span
            className={
              "bg-ambar ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.15em] " +
              (done ? "animate-caret" : "")
            }
          />
        )}
      </span>
    </span>
  );
}
