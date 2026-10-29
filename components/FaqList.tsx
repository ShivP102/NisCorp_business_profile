import type { Faq } from "@/lib/data";
import { DisclosureList } from "@/components/DisclosureList";

type FaqListProps = {
  faqs: Faq[];
  heading?: string;
  id?: string;
};

export function FaqList({
  faqs,
  heading = "Questions",
  id = "faq-heading",
}: FaqListProps) {
  if (faqs.length === 0) {
    return null;
  }

  const items = faqs.map((faq) => ({
    id: faq.question,
    summary: faq.question,
    body: faq.answer,
  }));

  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <h2
        id={id}
        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
      >
        {heading}
      </h2>
      <DisclosureList
        className="mt-6 divide-y divide-border border-y border-border"
        items={items}
      />
    </section>
  );
}
