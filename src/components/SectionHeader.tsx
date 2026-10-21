import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  /** Includes its closing full stop: the mockup titles end in ".". */
  title: string;
  /** Handwritten tape label stuck beside the title. */
  tape?: string;
  /** Optional lead paragraph under the title. */
  lead?: string;
  /** Right-aligned content on wide screens (e.g. a short note). */
  aside?: ReactNode;
};

/**
 * Oversized section title with an optional handwritten tape label.
 *
 * The tape is decorative flavour text, so it never replaces the heading: the
 * document outline stays one h2 per section and reads correctly out loud.
 */
export function SectionHeader({ title, tape, lead, aside }: SectionHeaderProps) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
        <div className="flex flex-wrap items-end gap-x-8 gap-y-5">
          <h2 className="font-display text-[clamp(3.25rem,7vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.03em]">
            {title}
          </h2>
          {tape ? (
            <span className="font-hand text-ink mb-3.5 -rotate-3 bg-white px-4 py-1 text-[28px] shadow-[0_6px_16px_rgba(36,28,23,0.12)]">
              {tape}
            </span>
          ) : null}
        </div>
        {aside}
      </div>

      {lead ? (
        <p className="text-ink-2 mt-5 max-w-[35rem] text-lg leading-normal">
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
