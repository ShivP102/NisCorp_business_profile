import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactActions } from "@/components/ContactActions";
import { JsonLd } from "@/components/JsonLd";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCompany, getOfferingBySlug } from "@/lib/data";

export function generateMetadata(): Metadata {
  const offering = getOfferingBySlug("enterprise");
  if (!offering) {
    return {};
  }
  return {
    title: offering.metaTitle,
    description: offering.metaDescription,
    openGraph: {
      title: offering.metaTitle,
      description: offering.metaDescription,
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

export default function EnterprisePage() {
  const company = getCompany();
  const offering = getOfferingBySlug("enterprise");

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
      <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-4 px-4 pb-28 pt-10 max-sm:pl-16 sm:px-6 sm:pb-32 sm:pt-14 md:grid-cols-6 md:gap-5">
        <header className="md:col-span-6">
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">
            Operations software
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
            {offering.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {offering.summary}
          </p>
        </header>

        {offering.sections.map((section) => (
          <section
            key={section.heading}
            aria-labelledby={section.heading}
            className="md:col-span-2"
          >
            <Card className="surface-clay h-full gap-4 py-5">
              <CardHeader className="px-5">
                <h2
                  id={section.heading}
                  className="text-xl font-semibold tracking-tight"
                >
                  {section.heading}
                </h2>
              </CardHeader>
              <CardContent className="space-y-4 px-5">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-base leading-relaxed text-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </CardContent>
            </Card>
          </section>
        ))}

        <div className="md:col-span-6 md:pt-6">
          <ContactActions
            company={company}
            heading="Contact about enterprise software"
          />
        </div>
      </main>
    </>
  );
}
