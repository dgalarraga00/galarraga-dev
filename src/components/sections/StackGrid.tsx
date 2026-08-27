import { TechIcon } from "@/components/icons/TechIcon";
import { Reveal } from "@/components/Reveal";
import { stackGroups } from "@/content/site";

/**
 * The stack as a grid of brand-coloured tiles.
 *
 * Colour is the whole point here: this is the one section where the page stops
 * being amber-on-brown and lets fifteen other brands speak. Restraint elsewhere
 * is what makes this read as a burst instead of noise.
 *
 * Tiles are a single bordered surface — no card inside a card. The stagger is
 * capped so the last tile of a row never lags far enough to feel broken.
 */
export function StackGrid() {
  return (
    <div className="mt-14 space-y-14">
      {stackGroups.map((group) => (
        <div key={group.group}>
          <Reveal>
            <h3 className="text-vapor font-mono text-xs tracking-[0.2em] uppercase">
              {group.group}
            </h3>
          </Reveal>

          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {group.items.map((tech, i) => (
              <Reveal key={tech.slug} delay={Math.min(i * 45, 220)}>
                <li className="tech-tile border-poso hover:border-poso-strong hover:bg-tostado flex h-full flex-col items-center justify-center gap-3 rounded-xl border px-3 py-6">
                  <TechIcon slug={tech.slug} className="size-8" />
                  <span className="text-crema text-center text-xs">
                    {tech.name}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
