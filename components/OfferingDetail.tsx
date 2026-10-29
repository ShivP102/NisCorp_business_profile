import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import { DiscoveryLink } from "@/components/DiscoveryLink";
import { EngagementShapes } from "@/components/EngagementShapes";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { LiquidGlass } from "@/components/LiquidGlass";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Company, Faq, Offering } from "@/lib/data";
import { cn } from "cn";

type OfferingDetailProps = {
  company: Company;
  offering: Offering;
  heading?: string;
  eyebrow: string;
  surface: "glass" | "rule";
  ctaLabel: string;
  contactHeading: string;
  faqs?: Faq[];
};

export function OfferingDetail({
  company,
  offering,
  eyebrow,
  heading,
  surface,
  ctaLabel,
  contactHeading,
  faqs = [],
}: OfferingDetailProps) {
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: offering.title,
    description: offering.metaDescription,
    provider: {
      "@type": "Organization",
      name: company.name,
      url: company.siteUrl,
    },
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-4 px-4 pb-28 pt-10 max-sm:pl-16 sm:px-6 sm:pb-32 sm:pt-14 md:grid-cols-6 md:gap-5">
        <header className="relative md:col-span-6">
          <LiquidGlass variant="title" />
          <div className="relative z-10">
            <p className="text-sm font-semibold tracking-wide text-accent uppercase">
              {eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
              {heading ?? offering.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {offering.summary}
            </p>
            <div className="mt-6">
              <DiscoveryLink company={company} label={ctaLabel} />
            </div>
          </div>
        </header>

        {offering.sections.map((section) => (
          <section
            key={section.heading}
            aria-labelledby={section.heading}
            className="md:col-span-2"
          >
            <Card
              className={cn(
                "h-full gap-4 py-5",
                surface === "glass" ? "surface-glass" : "surface-rule",
              )}
            >
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
                    key={paragraph}
                    className="text-base leading-relaxed text-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </CardContent>
            </Card>
          </section>
        ))}

        <div className="md:col-span-6 md:pt-4">
          <EngagementShapes
            id={`${offering.slug}-shapes`}
            heading={offering.slug === "websites" ? "Packages" : "How it works"}
            shapes={offering.shapes}
          />
        </div>

        {faqs.length > 0 ? (
          <div className="md:col-span-6 md:pt-4">
            <FaqList
              faqs={faqs}
              heading="Data protection"
              id={`${offering.slug}-faq`}
            />
          </div>
        ) : null}

        <p className="md:col-span-6">
          <Link
            href="/services"
            className="text-sm font-semibold text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            All services
          </Link>
        </p>

        <div className="md:col-span-6 md:pt-2">
          <ContactActions company={company} heading={contactHeading} />
        </div>
      </main>
    </>
  );
}
