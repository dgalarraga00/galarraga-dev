"use client";

import { Accordion, type AccordionItem } from "@/components/Accordion";
import {
  IconChat,
  IconCode,
  IconDocument,
  IconRocket,
} from "@/components/icons/ui";
import { process, type ProcessStep } from "@/content/site";

const icons: Record<ProcessStep["icon"], (p: { className?: string }) => React.ReactNode> = {
  chat: IconChat,
  document: IconDocument,
  code: IconCode,
  rocket: IconRocket,
};

export function ProcessAccordion() {
  const items: AccordionItem[] = process.map((step) => {
    const Icon = icons[step.icon];
    return {
      id: step.id,
      title: step.title,
      icon: <Icon className="size-5" />,
      body: <p className="max-w-2xl">{step.body}</p>,
    };
  });

  // The first step opens by default: an all-closed list of four bars gives the
  // visitor nothing to read and no hint of what is inside.
  return <Accordion items={items} defaultOpen={0} single />;
}
