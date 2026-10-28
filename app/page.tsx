import type { Metadata } from "next";
import { ContactActions } from "@/components/ContactActions";
import { DirectionCards } from "@/components/DirectionCards";
import { JsonLd } from "@/components/JsonLd";
import { getCompany, getOfferings } from "@/lib/data";

export function generateMetadata(): Metadata {
  const company = getCompany();
  return {
    title: company.metaTitle,
    description: company.metaDescription,
    openGraph: {
      title: company.metaTitle,
      description: company.metaDescription,
    },
  };
}

export default function HomePage() {
  const company = getCompany();
  const offerings = getOfferings();

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: company.siteUrl,
    email: company.email,
    telephone: company.phoneTel,
  };

  return (
    <>
      <JsonLd data={organizationLd} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 pt-10 sm:px-6 sm:pb-32 sm:pt-14">
        <section aria-labelledby="hero-heading">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Software solutions and consulting
          </p>
          <h1
            id="hero-heading"
            className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl sm:leading-tight"
          >
            {company.heroLine}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Choose the kind of work you need. Both paths start with a
            conversation.
          </p>
          <DirectionCards offerings={offerings} />
        </section>

        <section
          aria-labelledby="about-heading"
          className="mt-16 border-t border-border pt-16 sm:mt-20 sm:pt-20"
        >
          <h2
            id="about-heading"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            About
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {company.about}
          </p>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {company.processSteps.map((step, index) => (
              <li
                key={step}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <span className="text-sm font-semibold text-accent">
                  {index + 1}
                </span>
                <p className="mt-2 text-base font-medium text-foreground">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="services-heading"
          className="mt-16 border-t border-border pt-16 sm:mt-20 sm:pt-20"
        >
          <h2
            id="services-heading"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            Two ways we work
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted">
            Individual websites and enterprise software are different
            engagements. Each page describes what you get and how we proceed.
          </p>
          <DirectionCards offerings={offerings} />
        </section>

        <div className="mt-16 border-t border-border pt-16 sm:mt-20 sm:pt-20">
          <ContactActions company={company} />
        </div>
      </main>
    </>
  );
}
