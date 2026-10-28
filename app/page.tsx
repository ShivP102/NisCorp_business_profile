import type { Metadata } from "next";
import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import { DirectionCards } from "@/components/DirectionCards";
import { DiscoveryLink } from "@/components/DiscoveryLink";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { LiquidGlass } from "@/components/LiquidGlass";
import { TrustStrip } from "@/components/TrustStrip";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import {
  buildWhatsAppUrl,
  getCompany,
  getFaqs,
  getOfferings,
} from "@/lib/data";

export function generateMetadata(): Metadata {
  const company = getCompany();
  return {
    title: company.metaTitle,
    description: company.metaDescription,
    openGraph: {
      title: company.metaTitle,
      description: company.metaDescription,
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

export default function HomePage() {
  const company = getCompany();
  const offerings = getOfferings();
  const faqs = getFaqs("home");

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: company.siteUrl,
    email: company.email,
    telephone: company.phoneTel,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={faqLd} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-8 max-sm:pl-16 sm:px-6 sm:pb-32 sm:pt-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          <section
            aria-labelledby="hero-heading"
            className="relative isolate md:col-span-6"
          >
            <LiquidGlass />
            <div className="relative z-10">
              <p className="text-lg leading-none font-black tracking-[-0.04em] text-maximal sm:text-2xl">
                Choose the work.
              </p>
              <h1
                id="hero-heading"
                className="mt-4 max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-foreground sm:mt-5 sm:text-6xl sm:leading-[1.05]"
              >
                {company.heroLine}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {company.heroSubhead}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <DiscoveryLink
                  company={company}
                  label="Book a 20-minute discovery call"
                />
                <a
                  href={buildWhatsAppUrl(company)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-whatsapp px-4 text-base font-semibold text-white hover:bg-whatsapp/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  WhatsApp us
                </a>
              </div>
              <DirectionCards offerings={offerings} />
            </div>
          </section>

          <div className="md:col-span-6 md:px-2 md:pt-4">
            <TrustStrip facts={company.trustFacts} />
          </div>

          <section
            aria-labelledby="about-heading"
            className="px-1 py-8 md:col-span-6 md:px-2 md:py-12"
          >
            <h2
              id="about-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              How a project starts
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {company.about}{" "}
              <Link
                href="/about"
                className="font-semibold text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                About the founder
              </Link>
            </p>
            <ol className="mt-8 grid gap-4 sm:grid-cols-3">
              {company.processSteps.map((step, index) => (
                <li key={step}>
                  <Card className="surface-neo h-full gap-3 py-5">
                    <CardHeader className="px-5">
                      <Badge>{index + 1}</Badge>
                      <p className="text-base font-medium text-foreground">
                        {step}
                      </p>
                    </CardHeader>
                  </Card>
                </li>
              ))}
            </ol>
          </section>

          <div className="md:col-span-6 md:px-2">
            <FaqList faqs={faqs} />
          </div>

          <div className="md:col-span-6 md:px-2 md:pt-4">
            <ContactActions company={company} />
          </div>
        </div>
      </main>
    </>
  );
}
