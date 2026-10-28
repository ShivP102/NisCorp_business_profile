import type { Metadata } from "next";
import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import { getCaseStudies, getCompany } from "@/lib/data";

export function generateMetadata(): Metadata {
  const cases = getCaseStudies();
  return {
    title: cases.metaTitle,
    description: cases.metaDescription,
    openGraph: {
      title: cases.metaTitle,
      description: cases.metaDescription,
      images: [
        {
          url: "/img/niscorp_logo.jpg",
          width: 1251,
          height: 848,
          alt: "NisCorp AI. Software solutions and consulting.",
        },
      ],
    },
  };
}

export default function CaseStudiesPage() {
  const company = getCompany();
  const cases = getCaseStudies();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-10 max-sm:pl-16 sm:px-6 sm:pb-32 sm:pt-14">
      <header>
        <p className="text-sm font-semibold tracking-wide text-accent uppercase">
          Selected work
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          {cases.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {cases.summary}
        </p>
      </header>

      {cases.items.map((item) => (
        <article key={item.title} className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {item.title}
          </h2>
          <section className="mt-8" aria-labelledby="case-context">
            <h3
              id="case-context"
              className="text-sm font-semibold tracking-wide text-accent uppercase"
            >
              Context
            </h3>
            <p className="mt-3 text-base leading-relaxed text-foreground">
              {item.context}
            </p>
          </section>
          <section className="mt-8" aria-labelledby="case-problem">
            <h3
              id="case-problem"
              className="text-sm font-semibold tracking-wide text-accent uppercase"
            >
              Problem
            </h3>
            <p className="mt-3 text-base leading-relaxed text-foreground">
              {item.problem}
            </p>
          </section>
          <section className="mt-8" aria-labelledby="case-approach">
            <h3
              id="case-approach"
              className="text-sm font-semibold tracking-wide text-accent uppercase"
            >
              Approach
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground">
              {item.approach.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </section>
          <section className="mt-8" aria-labelledby="case-impact">
            <h3
              id="case-impact"
              className="text-sm font-semibold tracking-wide text-accent uppercase"
            >
              Impact
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground">
              {item.impact.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
          <section className="mt-8" aria-labelledby="case-stack">
            <h3
              id="case-stack"
              className="text-sm font-semibold tracking-wide text-accent uppercase"
            >
              Stack
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {item.stack.map((tool) => (
                <li
                  key={tool}
                  className="rounded-md border border-border bg-surface px-3 py-1 text-sm text-foreground"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </section>
        </article>
      ))}

      <p className="mt-12 flex flex-wrap gap-x-5 gap-y-2">
        <Link
          href="/services#enterprise"
          className="text-sm font-semibold text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Enterprise software →
        </Link>
        <Link
          href="/contact"
          className="text-sm font-semibold text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Book a call →
        </Link>
      </p>

      <div className="mt-12">
        <ContactActions company={company} />
      </div>
    </main>
  );
}
