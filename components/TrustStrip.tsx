type TrustStripProps = {
  facts: string[];
};

export function TrustStrip({ facts }: TrustStripProps) {
  return (
    <section aria-labelledby="trust-heading">
      <h2 id="trust-heading" className="sr-only">
        Experience
      </h2>
      <ul className="grid gap-4 md:grid-cols-3">
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
