import type { Metadata } from "next";
import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import { DiscoveryLink } from "@/components/DiscoveryLink";
import { EngagementShapes } from "@/components/EngagementShapes";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCompany, getOfferings } from "@/lib/data";
import { cn } from "cn";

export function generateMetadata(): Metadata {
  const company = getCompany();
  return {
    title: company.servicesMetaTitle,
    description: company.servicesMetaDescription,
    openGraph: {
      title: company.servicesMetaTitle,
      description: company.servicesMetaDescription,
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

function surfaceFor(slug: string): string {
  if (slug === "enterprise") {
    return "surface-clay";
  }
  if (slug === "websites") {
    return "surface-glass";
  }
  return "surface-rule";
}

export default function ServicesPage() {
  const company = getCompany();
  const offerings = getOfferings();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-10 max-sm:pl-16 sm:px-6 sm:pb-32 sm:pt-14">
      <header>
        <p className="text-sm font-semibold tracking-wide text-accent uppercase">
          What we build
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          Services
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {company.servicesIntro}
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {offerings.map((offering) => (
            <li key={offering.slug}>
              <a
                href={`#${offering.slug}`}
                className="text-sm font-semibold text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {offering.title}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <div className="mt-12 space-y-16">
        {offerings.map((offering) => (
          <section
            key={offering.slug}
            id={offering.slug}
            aria-labelledby={`${offering.slug}-heading`}
            className="scroll-mt-28"
          >
            <h2
              id={`${offering.slug}-heading`}
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {offering.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground">
              {offering.overview}
            </p>

            {offering.detail ? (
              <p className="mt-6">
                <Link
                  href={offering.href}
                  className="text-sm font-semibold text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {offering.overviewCta} →
                </Link>
              </p>
            ) : (
              <div className="mt-8 space-y-8">
                <div className="grid gap-4 md:grid-cols-3">
                  {offering.sections.map((section) => (
                    <Card
                      key={section.heading}
                      className={cn(
                        "h-full gap-4 py-5",
                        surfaceFor(offering.slug),
                      )}
                    >
                      <CardHeader className="px-5">
                        <h3 className="text-xl font-semibold tracking-tight">
                          {section.heading}
                        </h3>
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
                  ))}
                </div>
                <EngagementShapes
                  id="enterprise-shapes"
                  heading="How we work"
                  level={3}
                  shapes={offering.shapes}
                />
                <p>
                  <Link
                    href="/case-studies"
                    className="text-sm font-semibold text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Read the operations platform case study →
                  </Link>
                </p>
                <DiscoveryLink
                  company={company}
                  label="Discuss your operation — Book a call"
                />
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="mt-16">
        <ContactActions company={company} />
      </div>
    </main>
  );
}
