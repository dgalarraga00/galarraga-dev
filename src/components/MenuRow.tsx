"use client";

import { useId, useState, type ReactNode } from "react";
import { IconChevron } from "@/components/icons/ui";
import { scopeFor } from "@/content/scope";

type MenuRowProps = {
  /** Left column: what the thing is. Read by a client. */
  name: ReactNode;
  /** Right column: the "price". Scanned by a recruiter. */
  price: ReactNode;
  /** Optional line under the name. */
  description?: ReactNode;
  /** Product id from pricing.ts. Enables the scope disclosure. */
  productId?: string;
  /** Renders the row with a hover affordance. */
  interactive?: boolean;
};

/**
 * A single line of the menu: name on the left, leader dots across the gap,
 * "price" on the right, and an optional disclosure with the real scope.
 *
 * This layout is doing real work. A café menu is the one widely-understood
 * format where two different readers each take what they came for from the
 * same row — the client reads left, the recruiter scans right — without either
 * column being demoted. That is why the section is a menu and not a card grid.
 *
 * The leader is a bottom border on a flex spacer rather than repeated glyphs,
 * so it stays a single crisp line at any width and is never read aloud by a
 * screen reader.
 */
export function MenuRow({
  name,
  price,
  description,
  productId,
  interactive = false,
}: MenuRowProps) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const scope = scopeFor(productId);

  return (
    <div
      className={
        "group/row border-poso border-b py-6 transition-colors duration-200 " +
        (interactive || scope ? "hover:border-poso-strong" : "")
      }
    >
      <div className="flex items-baseline gap-3">
        <h3
          className={
            "font-display text-crema text-xl leading-tight font-medium sm:text-2xl " +
            (interactive
              ? "group-hover/row:text-ambar transition-colors duration-200"
              : "")
          }
        >
          {name}
        </h3>

        {/* Leader dots. Purely decorative, so hidden from assistive tech. */}
        <span
          aria-hidden="true"
          className="border-poso-strong mb-[0.35em] hidden min-w-8 flex-1 border-b border-dotted sm:block"
        />

        <span className="text-ambar font-mono text-xs whitespace-nowrap sm:text-sm">
          {price}
        </span>
      </div>

      {description ? (
        <p className="text-leche mt-2 max-w-2xl text-sm leading-relaxed sm:text-base">
          {description}
        </p>
      ) : null}

      {scope ? (
        <>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="text-vapor hover:text-ambar mt-3 inline-flex min-h-11 items-center gap-1.5 font-mono text-xs transition-colors duration-[--dur-hint] ease-[--ease-out]"
          >
            {open ? "Ocultar el detalle" : "Ver qué incluye"}
            <IconChevron
              className={
                "size-4 transition-transform duration-[--dur-control] ease-[--ease-out] " +
                (open ? "rotate-180" : "")
              }
            />
          </button>

          {/* 0fr → 1fr animates the real content height with no measurement
              and no jump when the text reflows. */}
          <div
            id={panelId}
            className={
              "grid transition-[grid-template-rows] duration-[--dur-panel] ease-[--ease-out] " +
              (open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
            }
          >
            <div className="overflow-hidden">
              <div className="grid gap-6 pt-4 pb-1 sm:grid-cols-2">
                <div>
                  <p className="text-vapor font-mono text-xs">incluye</p>
                  <ul className="mt-3 space-y-1.5">
                    {scope.includes.map((item) => (
                      <li
                        key={item}
                        className="text-leche flex gap-2.5 text-sm leading-relaxed"
                      >
                        <span aria-hidden="true" className="text-ambar shrink-0">
                          +
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* The exclusions get equal billing. A client who reads them
                    here will not ask for those things later. */}
                <div>
                  <p className="text-vapor font-mono text-xs">no incluye</p>
                  <ul className="mt-3 space-y-1.5">
                    {scope.excludes.map((item) => (
                      <li
                        key={item}
                        className="text-vapor flex gap-2.5 text-sm leading-relaxed"
                      >
                        <span aria-hidden="true" className="shrink-0">
                          −
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
