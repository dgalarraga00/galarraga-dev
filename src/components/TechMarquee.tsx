import { TechIcon } from "@/components/icons/TechIcon";
import { marqueeTech } from "@/content/site";

/**
 * Continuous strip of the stack, in brand colour.
 *
 * The track holds the list twice and translates by exactly -50%, so the second
 * copy lands where the first started and the loop is seamless. Because it is a
 * pure CSS transform it runs on the compositor and never touches layout.
 *
 * Purely decorative, so the whole strip is hidden from assistive tech — the
 * real, readable stack lives in the grid below. It also stops under
 * prefers-reduced-motion: an infinite loop is the single worst offender for
 * anyone sensitive to motion.
 */
export function TechMarquee() {
  const items = [...marqueeTech, ...marqueeTech];

  return (
    <div
      aria-hidden="true"
      className="border-poso relative overflow-hidden border-y py-6"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <ul className="animate-marquee motion-reduce:animate-none flex w-max items-center gap-12">
        {items.map((tech, i) => (
          <li
            key={`${tech.slug}-${i}`}
            className="flex shrink-0 items-center gap-3"
          >
            <TechIcon slug={tech.slug} className="size-6" />
            <span className="text-leche font-mono text-xs tracking-[0.15em] whitespace-nowrap uppercase">
              {tech.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
