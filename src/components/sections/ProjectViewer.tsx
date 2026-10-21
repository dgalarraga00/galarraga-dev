"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IconArrowUpRight } from "@/components/icons/ui";
import { externalUrl } from "@/lib/url";
import type { Project } from "@/content/site";

type Device = "desktop" | "mobile";

type ProjectViewerProps = {
  projects: Project[];
  /** Slug of the open project, or null when the dialog is closed. */
  openSlug: string | null;
  onSelect: (slug: string) => void;
  onClose: () => void;
};

const toggleBase =
  "flex h-11 w-12 cursor-pointer items-center justify-center rounded-[9px] transition-colors duration-[--dur-hint] ease-[--ease-out] ";

/**
 * Project viewer: a Mac-style window in a native <dialog>.
 *
 * showModal() gives the focus trap, the inert background, Esc-to-close and
 * focus return to the opener for free — all things a hand-rolled overlay
 * would have to rebuild. Open state is driven from the parent; the dialog's
 * own `close` event (Esc, red dot, backdrop) reports back through onClose.
 */
export function ProjectViewer({
  projects,
  openSlug,
  onSelect,
  onClose,
}: ProjectViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [device, setDevice] = useState<Device>("desktop");
  const project = projects.find((p) => p.slug === openSlug) ?? null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openSlug && !dialog.open) dialog.showModal();
    else if (!openSlug && dialog.open) dialog.close();
  }, [openSlug]);

  const live = project?.liveUrl ? externalUrl(project.liveUrl) : null;
  const image = project?.images[device];
  const index = project ? projects.indexOf(project) : 0;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="viewer-title"
      // The window fills the dialog completely, so a click that targets the
      // dialog element itself can only have landed on its ::backdrop.
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current?.close();
      }}
      onClose={() => {
        setDevice("desktop");
        onClose();
      }}
      // Lenis would otherwise keep scrolling the page behind the dialog.
      data-lenis-prevent
      className="surface-dark m-auto h-[min(50rem,calc(100dvh-2rem))] w-[min(80rem,calc(100vw-1.5rem))] max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-espresso/55 sm:w-[min(80rem,calc(100vw-2rem))]"
    >
      {project && image ? (
        <div className="bg-roast text-crema border-poso flex h-full flex-col overflow-hidden rounded-3xl border shadow-[0_40px_80px_rgba(0,0,0,0.45)]">
          {/* Title bar */}
          <div className="border-tostado flex items-center gap-3 border-b py-1.5 pr-3 pl-3 sm:gap-4 sm:pr-4">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Cerrar visor"
                className="-mr-[7.5px] flex size-11 cursor-pointer items-center justify-center"
              >
                <span className="size-[13px] rounded-full bg-[#ff5f57]" />
              </button>
              <span
                aria-hidden="true"
                className="size-[13px] rounded-full bg-[#febc2e]"
              />
              <span
                aria-hidden="true"
                className="ml-2 size-[13px] rounded-full bg-[#28c840]"
              />
            </div>

            <span className="min-w-0 flex-1 truncate font-mono text-sm">
              {image.src.split("/").pop()}
            </span>

            <div
              role="group"
              aria-label="Tipo de vista"
              className="bg-espresso border-tostado flex gap-1 rounded-xl border p-1"
            >
              <button
                type="button"
                aria-label="Vista escritorio"
                aria-pressed={device === "desktop"}
                onClick={() => setDevice("desktop")}
                className={
                  toggleBase +
                  (device === "desktop"
                    ? "bg-poso text-crema"
                    : "text-vapor hover:text-crema")
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-[18px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <path d="M8 20h8" />
                  <path d="M12 16v4" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Vista celular"
                aria-pressed={device === "mobile"}
                onClick={() => setDevice("mobile")}
                className={
                  toggleBase +
                  (device === "mobile"
                    ? "bg-poso text-crema"
                    : "text-vapor hover:text-crema")
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-[18px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
                  <path d="M11 18.5h2" />
                </svg>
              </button>
            </div>

            {live ? (
              <a
                href={live}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Abrir sitio en una pestaña nueva"
                className="bg-espresso border-tostado text-crema hover:text-ambar flex size-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-[--dur-hint] ease-[--ease-out]"
              >
                <IconArrowUpRight className="size-[18px]" />
              </a>
            ) : null}
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain md:flex-row md:overflow-hidden">
            {/* Preview */}
            <div className="bg-espresso flex min-w-0 flex-1 items-start justify-center p-5 sm:p-7 md:overflow-y-auto">
              {device === "desktop" ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1440}
                  height={900}
                  sizes="(min-width: 1280px) 900px, 100vw"
                  className="block h-auto w-full rounded-[10px] shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
                />
              ) : (
                <div className="bg-roast-deep rounded-[40px] p-[9px] shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={390}
                    height={844}
                    sizes="280px"
                    className="block aspect-[390/844] w-70 rounded-[32px] object-cover object-top"
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="border-tostado flex shrink-0 flex-col gap-3.5 border-t p-6 sm:p-7 md:w-75 md:overflow-y-auto md:border-t-0 md:border-l">
              <span className="text-vapor font-mono text-[13px]">
                N.º {String(index + 1).padStart(2, "0")} · {project.year} ·{" "}
                {project.kind}
              </span>
              <h2
                id="viewer-title"
                className="font-display text-4xl leading-none font-semibold"
              >
                {project.name}
              </h2>
              <p className="text-ambar text-base">{project.tagline}</p>
              <p className="text-leche text-[15px] leading-relaxed">
                {project.context}
              </p>
              {live ? (
                <a
                  href={live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="bg-ambar text-espresso hover:bg-cobre mt-2 inline-flex min-h-12 items-center gap-2 self-start rounded-full px-6 font-semibold transition-colors duration-[--dur-hint] ease-[--ease-out]"
                >
                  Visitar sitio
                  <IconArrowUpRight className="size-4" />
                </a>
              ) : null}

              <div className="mt-auto pt-4">
                <span className="text-vapor font-mono text-xs">
                  otros proyectos
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {projects.map((p) => {
                    const active = p.slug === project.slug;
                    return (
                      <button
                        key={p.slug}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onSelect(p.slug)}
                        className={
                          "min-h-11 cursor-pointer rounded-full border px-4 text-sm transition-colors duration-[--dur-hint] ease-[--ease-out] " +
                          (active
                            ? "bg-ambar border-ambar text-espresso font-semibold"
                            : "border-poso text-crema hover:border-ambar")
                        }
                      >
                        {p.shortName}
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
