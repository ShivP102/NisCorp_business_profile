import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactActions } from "@/components/ContactActions";
import { JsonLd } from "@/components/JsonLd";
import { getCompany, getOfferingBySlug } from "@/lib/data";

export function generateMetadata(): Metadata {
  const offering = getOfferingBySlug("websites");
  if (!offering) {
    return {};
  }
  return {
    title: offering.metaTitle,
    description: offering.metaDescription,
    openGraph: {
      title: offering.metaTitle,
      description: offering.metaDescription,
    },
  };
}

export default function WebsitesPage() {
  const company = getCompany();
  const offering = getOfferingBySlug("websites");

  if (!offering) {
    notFound();
  }

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: offering.title,
    description: offering.metaDescription,
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 pt-10 sm:px-6 sm:pb-32 sm:pt-14">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Individual websites
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {offering.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          {offering.summary}
        </p>

        <div className="mt-14 space-y-14">
          {offering.sections.map((section) => (
            <section key={section.heading} aria-labelledby={section.heading}>
              <h2
                id={section.heading}
                className="text-xl font-semibold tracking-tight sm:text-2xl"
              >
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="max-w-2xl text-base leading-relaxed text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-16 sm:mt-20 sm:pt-20">
          <ContactActions
            company={company}
            heading="Contact about an individual website"
          />
        </div>
      </main>
    </>
  );
}
