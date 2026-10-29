type TrustStripProps = {
  facts: string[];
  heading?: string;
};

export function TrustStrip({ facts, heading = "Experience" }: TrustStripProps) {
  return (
    <section aria-labelledby="trust-heading">
      <h2
        id="trust-heading"
        className="text-xl font-semibold tracking-tight sm:text-2xl"
      >
        {heading}
      </h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {facts.map((fact) => (
          <li
            key={fact}
            className="border-l-2 border-accent pl-4 text-sm leading-relaxed text-foreground"
          >
            {fact}
          </li>
        ))}
      </ul>
    </section>
  );
}
