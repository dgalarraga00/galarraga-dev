import { TechIcon } from "@/components/icons/TechIcon";
import { Reveal } from "@/components/Reveal";
import { stackGroups } from "@/content/site";

/**
 * The stack as a grid of brand-coloured tiles on light cards.
 *
 * Colour is the whole point here: this is the one section where the page lets
 * a dozen brands speak. Near-black brands fall back to ink (see TechIcon), so
 * nothing disappears into the card.
 *
 * Tiles are a single bordered surface — no card inside a card. The stagger is
 * capped so the last tile of a row never lags far enough to feel broken.
 */
export function StackGrid() {
  return (
    <div className="mt-14 space-y-12">
      {stackGroups.map((group) => (
        <div key={group.group}>
          <Reveal>
            <h3 className="text-ink-2 font-mono text-xs tracking-[0.2em] uppercase">
              {group.group}
            </h3>
          </Reveal>

          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {group.items.map((tech, i) => (
              <Reveal key={tech.slug} delay={Math.min(i * 45, 220)}>
                <li className="tech-tile bg-card border-line hover:border-line-dashed text-ink flex h-full flex-col items-center justify-center gap-3 rounded-2xl border px-3 py-6">
                  <TechIcon slug={tech.slug} className="size-8" />
                  <span className="text-center text-xs">{tech.name}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
