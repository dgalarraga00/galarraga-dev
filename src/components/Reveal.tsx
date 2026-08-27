"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger within a group, in milliseconds. Keep the total under ~300ms. */
  delay?: number;
  className?: string;
};

/**
 * Fades content up as it enters the viewport, once.
 *
 * The element stays revealed after the first intersection — re-animating on
 * every pass turns a nice detail into a distraction on the way back up.
 * Reduced-motion users get the final state immediately (see globals.css).
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      // Fire slightly before the element is fully on screen so the motion is
      // already settling by the time it reaches a comfortable reading position.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className ?? ""}`}
      data-shown={shown}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
