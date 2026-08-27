import * as simpleIcons from "simple-icons";

type SimpleIcon = { title: string; hex: string; path: string };

/**
 * Relative luminance, WCAG formula. Used to decide whether a brand colour is
 * legible on the espresso background.
 */
function luminance(hex: string): number {
  const channels = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/**
 * Some brands (GitHub, Vercel, shadcn, Render) are officially black. Painting
 * them with their own hex on a near-black page makes them disappear, so those
 * fall back to the page's ink colour. Everything else keeps its real brand
 * colour — that is the point of the section.
 */
const MIN_LUMINANCE = 0.06;

type TechIconProps = {
  /** simple-icons slug without the `si` prefix, e.g. "react", "nextdotjs". */
  slug: string;
  className?: string;
  /** Overrides the resolved colour. */
  color?: string;
};

export function TechIcon({ slug, className, color }: TechIconProps) {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const icon = (simpleIcons as unknown as Record<string, SimpleIcon>)[key];

  if (!icon) return null;

  const fill =
    color ??
    (luminance(icon.hex) < MIN_LUMINANCE ? "var(--color-crema)" : `#${icon.hex}`);

  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill={fill}
    >
      <path d={icon.path} />
    </svg>
  );
}

/** True when the slug resolves to a real icon — lets callers fail loudly. */
export function hasTechIcon(slug: string): boolean {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  return key in (simpleIcons as unknown as Record<string, unknown>);
}
