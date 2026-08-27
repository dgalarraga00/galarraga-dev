"use client";

import { useId, useState, type ReactNode } from "react";
import { IconChevron } from "@/components/icons/ui";

export type AccordionItem = {
  id: string;
  title: string;
  body: ReactNode;
  /** Optional leading icon. */
  icon?: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  /** Index open on first render. Pass null for all closed. */
  defaultOpen?: number | null;
  /** When true, opening one panel closes the others. */
  single?: boolean;
};

/**
 * Disclosure list.
 *
 * The open/close animation uses `grid-template-rows: 0fr → 1fr` rather than a
 * measured pixel height. It animates real content height with no JS
 * measurement, no ResizeObserver, and no jump when the content reflows.
 *
 * The transition is a CSS transition rather than a keyframe animation so an
 * interrupted toggle reverses from wherever it is, instead of restarting.
 */
export function Accordion({
  items,
  defaultOpen = 0,
  single = true,
}: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<number[]>(
    defaultOpen === null ? [] : [defaultOpen],
  );

  function toggle(index: number) {
    setOpen((prev) => {
      if (prev.includes(index)) return prev.filter((i) => i !== index);
      return single ? [index] : [...prev, index];
    });
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            key={item.id}
            className={
              "overflow-hidden rounded-xl border transition-colors duration-[--dur-control] ease-[--ease-out] " +
              (isOpen
                ? "border-poso-strong bg-tostado"
                : "border-poso hover:border-poso-strong")
            }
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
              >
                {item.icon ? (
                  <span
                    className={
                      "shrink-0 transition-colors duration-[--dur-control] ease-[--ease-out] " +
                      (isOpen ? "text-ambar" : "text-vapor")
                    }
                  >
                    {item.icon}
                  </span>
                ) : null}

                <span className="font-display text-crema flex-1 text-lg font-medium sm:text-xl">
                  {item.title}
                </span>

                <IconChevron
                  className={
                    "size-5 shrink-0 transition-[transform,color] duration-[--dur-control] ease-[--ease-out] " +
                    (isOpen ? "text-ambar rotate-180" : "text-vapor")
                  }
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              // 0fr → 1fr animates the true content height with no measurement.
              className={
                "grid transition-[grid-template-rows] duration-[--dur-panel] ease-[--ease-out] " +
                (isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
              }
            >
              <div className="overflow-hidden">
                <div
                  className={
                    "text-leche px-5 pb-6 leading-relaxed sm:px-6 " +
                    // Fading the body slightly behind the height keeps the text
                    // from appearing before there is room for it.
                    "transition-opacity duration-[--dur-panel] ease-[--ease-out] " +
                    (isOpen ? "opacity-100 delay-75" : "opacity-0")
                  }
                >
                  {item.body}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
