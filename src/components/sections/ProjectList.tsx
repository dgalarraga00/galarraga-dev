import { TechIcon } from "@/components/icons/TechIcon";
import { IconArrowUpRight, IconGitHub } from "@/components/icons/ui";
import { Reveal } from "@/components/Reveal";
import { externalUrl } from "@/lib/url";
import { projects } from "@/content/site";

/**
 * Projects stacked vertically: name, context, stack, links.
 *
 * One column, not a grid. A project needs room to explain itself, and a
 * two-column grid forces every description down to a caption. Reading order is
 * also the priority order — the first entry is the strongest work.
 */
export function ProjectList() {
  return (
    <div className="mt-14 space-y-4">
      {projects.map((project) => (
        <Reveal key={project.slug}>
          <article className="border-poso hover:border-poso-strong rounded-xl border p-6 transition-colors duration-[--dur-control] ease-[--ease-out] sm:p-8">
            <p className="text-vapor font-mono text-xs">{project.year}</p>

            <h3 className="font-display text-crema mt-3 text-2xl font-semibold sm:text-3xl">
              {project.name}
            </h3>

            <p className="text-ambar mt-2 text-sm sm:text-base">
              {project.tagline}
            </p>

            <p className="text-leche mt-5 max-w-2xl leading-relaxed">
              {project.context}
            </p>

            {/* Stack chips carry the brand colour, so the technologies are
                recognisable at a glance without being read. */}
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech.slug}
                  className="border-poso bg-tostado text-leche inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs"
                >
                  <TechIcon slug={tech.slug} className="size-3.5" />
                  {tech.name}
                </li>
              ))}
            </ul>

            {project.liveUrl || project.repoUrl ? (
              <div className="border-poso mt-7 flex flex-wrap gap-6 border-t pt-6">
                {project.liveUrl ? (
                  <a
                    href={externalUrl(project.liveUrl)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-crema hover:text-ambar inline-flex min-h-11 items-center gap-2 text-sm transition-colors duration-[--dur-hint] ease-[--ease-out]"
                  >
                    Ver la página
                    <IconArrowUpRight className="size-4" />
                  </a>
                ) : null}

                {project.repoUrl ? (
                  <a
                    href={externalUrl(project.repoUrl)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-crema hover:text-ambar inline-flex min-h-11 items-center gap-2 text-sm transition-colors duration-[--dur-hint] ease-[--ease-out]"
                  >
                    <IconGitHub className="size-4" />
                    Código
                  </a>
                ) : null}
              </div>
            ) : null}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
