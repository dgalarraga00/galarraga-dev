import type { SVGProps } from "react";

/**
 * The house mark: a cup with rising steam.
 *
 * Drawn rather than dropped in as an emoji — an emoji renders differently on
 * every OS, ignores the brand colour, and cannot be animated. This inherits
 * `currentColor` and matches the 1.6 stroke weight of the rest of the icons.
 *
 * The three steam wisps drift up and fade on a loop, each offset so they never
 * pulse in unison. The animation is defined in globals.css and stops under
 * prefers-reduced-motion, leaving a clean static cup.
 */
export function CoffeeCup(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <g className="cup-steam">
        <path className="cup-steam-1" d="M8.5 6.2c0-1.4 1.4-1.6 1.4-3.1" />
        <path className="cup-steam-2" d="M12 6.2c0-1.4 1.4-1.6 1.4-3.1" />
        <path className="cup-steam-3" d="M15.5 6.2c0-1.4 1.4-1.6 1.4-3.1" />
      </g>

      {/* Cup */}
      <path d="M4 10h13v4.5a4.5 4.5 0 0 1-4.5 4.5h-4A4.5 4.5 0 0 1 4 14.5Z" />
      {/* Handle */}
      <path d="M17 11.2h1.4a2.4 2.4 0 0 1 0 4.8H17" />
      {/* Saucer */}
      <path d="M3 21.4h16" />
    </svg>
  );
}
