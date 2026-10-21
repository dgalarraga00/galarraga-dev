"use client";

import { useId, useState } from "react";
import { IconArrowUpRight } from "@/components/icons/ui";
import { faqs } from "@/content/site";

/**
 * Big-question accordion. One answer open at a time, the first by default so
 * the column never starts as an empty list of rules.
 *
 * Each question is a real button with aria-expanded pointing at its region.
 * The ↗ turns 90° and fills amber when open: transform and background only.
 */
export function FaqAccordion() {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-ink border-t-[1.5px]">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={faq.id} className="border-ink border-b-[1.5px]">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-8 text-left"
              >
                <span className="text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight font-medium tracking-[-0.01em]">
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className={
                    "flex size-14 shrink-0 items-center justify-center rounded-full transition-[transform,background-color] duration-[--dur-control] ease-[--ease-out] " +
                    (isOpen ? "bg-ambar rotate-90" : "bg-transparent")
                  }
                >
                  <IconArrowUpRight className="size-[26px]" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
            >
              <p className="text-ink-2 pr-0 pb-8 text-lg leading-[1.65] sm:pr-[4.5rem]">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
