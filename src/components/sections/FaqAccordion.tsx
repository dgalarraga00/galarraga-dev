"use client";

import { Accordion, type AccordionItem } from "@/components/Accordion";
import { faqs } from "@/content/site";

export function FaqAccordion() {
  const items: AccordionItem[] = faqs.map((faq) => ({
    id: faq.id,
    title: faq.question,
    body: <p className="max-w-2xl">{faq.answer}</p>,
  }));

  // All closed, and multiple can stay open: someone comparing price against
  // delivery time should not lose the first answer to read the second.
  return <Accordion items={items} defaultOpen={null} single={false} />;
}
