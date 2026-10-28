import type { Faq } from "@/lib/data";

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

  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <h2
        id={id}
        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
      >
        {heading}
      </h2>
      <div className="mt-6 divide-y divide-border border-y border-border">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-4">
            <summary className="cursor-pointer text-base font-medium text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              {faq.question}
            </summary>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
