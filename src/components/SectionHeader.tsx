import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  n: string;
  kicker: string;
  title: string;
  /** Optional lead paragraph under the title. */
  lead?: string;
  align?: "left" | "center";
};

/**
 * The spine of the page: a numbered ticket label, then the real heading.
 *
 * The number and kicker are one visual unit but never a heading element — the
 * document outline stays h2 per section so the page reads correctly to a screen
 * reader and to Google.
 */
export function SectionHeader({
  n,
  kicker,
  title,
  lead,
  align = "left",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "text-center" : undefined}>
      <p
        className={
          "text-vapor font-mono text-[11px] tracking-[0.2em] uppercase " +
          (centered ? "" : "")
        }
      >
        <span className="text-ambar">N.º {n}</span>
        <span aria-hidden="true" className="px-2">
          ·
        </span>
        {kicker}
      </p>

      <h2 className="font-display text-crema mt-4 text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {lead ? (
        <p
          className={
            "text-leche mt-5 max-w-2xl text-base leading-relaxed sm:text-lg " +
            (centered ? "mx-auto" : "")
          }
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
