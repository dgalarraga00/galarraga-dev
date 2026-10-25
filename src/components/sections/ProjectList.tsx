"use client";

import Image from "next/image";
import { useState } from "react";
import { ButtonLink } from "@/components/Button";
import { IconArrowUpRight } from "@/components/icons/ui";
import { ProjectViewer } from "@/components/sections/ProjectViewer";
import { Reveal } from "@/components/Reveal";
import { externalUrl } from "@/lib/url";
import { nextProjectSlot, projects, type Project } from "@/content/site";

/** Hostname for the fake address bar: "home.twonutris.net". */
function host(url: string): string {
  return externalUrl(url).replace(/^https?:\/\//, "").replace(/\/$/, "");
}

const dots = (
  <>
    <span className="size-3 rounded-full bg-[#ff5f57]" />
    <span className="size-3 rounded-full bg-[#febc2e]" />
    <span className="size-3 rounded-full bg-[#28c840]" />
  </>
);

type ProjectCardProps = {
  project: Project;
  index: number;
  onOpen: (slug: string) => void;
};

/**
 * One project, alternating light and dark down the page. The screenshot sits in
 * a browser frame with a rotated phone overlapping its corner; the whole frame
 * is a real button that opens the viewer.
 */
function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const dark = index % 2 === 1;
  const live = project.liveUrl ? externalUrl(project.liveUrl) : null;
  const { desktop, mobile } = project.images;

  return (
    <article
      className={
        "flex flex-wrap items-center gap-10 rounded-[32px] p-6 sm:p-8 " +
        (dark
          ? "surface-dark bg-espresso text-crema"
          : "bg-card border-line border")
      }
    >
      <div
        className={
          "relative min-w-0 flex-[999_1_35rem] pb-10 " +
          (dark ? "lg:order-2" : "")
        }
      >
        <button
          type="button"
          onClick={() => onOpen(project.slug)}
          aria-label={`Abrir ${project.name} en el visor`}
          className={
            "block w-full cursor-pointer overflow-hidden rounded-2xl text-left " +
            (dark
              ? "bg-card shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
              : "bg-espresso shadow-[0_24px_48px_rgba(36,28,23,0.2)]")
          }
        >
          <span
            aria-hidden="true"
            className={
              "flex items-center gap-2 px-4 py-3 " + (dark ? "bg-tape" : "")
            }
          >
            {dots}
            <span
              className={
                "ml-3 flex-1 truncate rounded-lg px-3 py-1.5 text-center font-mono text-xs " +
                (dark ? "bg-ground text-ink-2" : "bg-tostado text-leche")
              }
            >
              {live ? host(live) : project.shortName}
            </span>
          </span>
          <Image
            src={desktop.src}
            alt={desktop.alt}
            width={1440}
            height={900}
            sizes="(min-width: 1152px) 640px, (min-width: 1024px) 55vw, calc(100vw - 96px)"
            className="block aspect-[16/10] w-full object-cover object-top"
          />
        </button>

        <div
          className={
            "absolute bottom-0 w-[26%] min-w-[7.5rem] rounded-[30px] p-[7px] " +
            (dark
              ? "bg-roast-deep -left-3 -rotate-4 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              : "bg-espresso -right-3 rotate-4 shadow-[0_20px_40px_rgba(36,28,23,0.3)]")
          }
        >
          <Image
            src={mobile.src}
            alt={mobile.alt}
            width={390}
            height={844}
            sizes="200px"
            className="block aspect-[390/844] w-full rounded-3xl object-cover object-top"
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-[1_1_18.75rem] flex-col gap-4">
        <span
          className={
            "font-mono text-[13px] " + (dark ? "text-ambar" : "text-copper")
          }
        >
          N.º {String(index + 1).padStart(2, "0")} · {project.year} ·{" "}
          {project.kind}
        </span>
        <h3 className="font-display text-5xl leading-none font-semibold tracking-[-0.02em]">
          {project.name}
        </h3>
        <p className="font-display text-[22px] leading-snug">
          {project.tagline}
        </p>
        <p
          className={
            "text-base leading-relaxed " + (dark ? "text-leche" : "text-ink-2")
          }
        >
          {project.summary}
        </p>

        <ul className="mt-1 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech.slug}
              className={
                "rounded-full border px-3 py-1.5 text-[13px] " +
                (dark
                  ? "bg-tostado border-poso"
                  : "bg-ground border-line")
              }
            >
              {tech.name}
            </li>
          ))}
        </ul>

        <div className="mt-3 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => onOpen(project.slug)}
            className={
              "inline-flex min-h-12 cursor-pointer items-center rounded-full px-6 font-semibold transition-[background-color,transform] duration-[--dur-press] ease-[--ease-out] active:scale-[0.97] " +
              (dark
                ? "bg-ambar text-espresso hover:bg-cobre"
                : "bg-espresso text-crema hover:bg-tostado")
            }
          >
            Abrir proyecto
          </button>
          {live ? (
            <a
              href={live}
              target="_blank"
              rel="noreferrer noopener"
              className={
                "inline-flex min-h-12 items-center gap-2 rounded-full border-[1.5px] px-5 font-semibold transition-[background-color,color,transform] duration-[--dur-press] ease-[--ease-out] active:scale-[0.97] " +
                (dark
                  ? "border-crema text-crema hover:bg-crema hover:text-espresso"
                  : "border-ink text-ink hover:bg-ink hover:text-crema")
              }
            >
              Ver en vivo
              <IconArrowUpRight className="size-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/**
 * La barra: the project cards plus the viewer dialog they open.
 *
 * This is the one client component of the section because the open project is
 * state shared between every card and the dialog. The data stays in site.ts.
 */
export function ProjectList() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <>
      <div className="mt-14 space-y-7">
        {projects.map((project, index) => (
          <Reveal key={project.slug}>
            <ProjectCard
              project={project}
              index={index}
              onOpen={setOpenSlug}
            />
          </Reveal>
        ))}

        <Reveal>
          <div className="border-line-dashed flex flex-wrap items-center justify-between gap-5 rounded-[32px] border-2 border-dashed px-8 py-10">
            <div>
              <p className="font-display text-[clamp(1.6rem,3vw,2rem)] font-semibold">
                {nextProjectSlot.title}
              </p>
              <p className="text-ink-2 mt-2 text-base">{nextProjectSlot.body}</p>
            </div>
            <ButtonLink href="/comanda" className="min-h-12 px-6 text-base">
              {nextProjectSlot.cta}
            </ButtonLink>
          </div>
        </Reveal>
      </div>

      <ProjectViewer
        projects={projects}
        openSlug={openSlug}
        onSelect={setOpenSlug}
        onClose={() => setOpenSlug(null)}
      />
    </>
  );
}
