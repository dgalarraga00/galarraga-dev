"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum scrolling.
 *
 * `scroll-behavior: smooth` only eases programmatic jumps — the wheel stays
 * stepped, which is what makes most sites feel abrupt. Lenis interpolates the
 * scroll position itself, so the page carries momentum and settles instead of
 * stopping dead.
 *
 * Disabled entirely under prefers-reduced-motion: hijacking the scroll of
 * someone who asked for less motion is exactly the wrong move.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (prefersReducedMotion.matches) return;

    const lenis = new Lenis({
      // Slightly under 1s of travel: long enough to glide, short enough that
      // a deliberate jump to a section never feels like waiting.
      duration: 1.1,
      // Exponential ease-out. The move is fastest at the start, where the
      // user is looking, and settles at the end.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
