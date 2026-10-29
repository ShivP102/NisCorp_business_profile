import type { Metadata } from "next";
import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import { LiquidGlass } from "@/components/LiquidGlass";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAbout, getCompany } from "@/lib/data";

export function generateMetadata(): Metadata {
  const about = getAbout();
  return {
    title: about.metaTitle,
    description: about.metaDescription,
    openGraph: {
      title: about.metaTitle,
      description: about.metaDescription,
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

export default function AboutPage() {
  const company = getCompany();
  const about = getAbout();

  return (
    <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-4 px-4 pb-28 pt-10 max-sm:pl-16 sm:px-6 sm:pb-32 sm:pt-14 md:grid-cols-6 md:gap-5">
      <header className="relative md:col-span-6">
        <LiquidGlass variant="title" />
        <div className="relative z-10">
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">
            NisCorp AI
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
            {about.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {about.summary}
          </p>
        </div>
      </header>

      {about.sections.map((section) => (
        <section
          key={section.heading}
          aria-labelledby={section.heading}
          className="md:col-span-3"
        >
          <Card className="surface-glass h-full gap-4 py-5">
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

      <p className="md:col-span-6">
        <Link
          href="/case-studies"
          className="text-sm font-semibold text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Read the operations platform case study →
        </Link>
      </p>

      <div className="md:col-span-6 md:pt-2">
        <ContactActions company={company} heading="Talk with us" />
      </div>
    </main>
  );
}
