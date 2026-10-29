import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DisclosureList } from "@/components/DisclosureList";
import { ProcessChevronBanner } from "@/components/ProcessChevronBanner";
import type { AboutSection } from "@/lib/data";
import type { ProcessStepContent } from "@/components/ProcessChevronBanner";

type AboutSectionsProps = {
  sections: AboutSection[];
};

function findSection(
  sections: AboutSection[],
  heading: string,
): AboutSection | undefined {
  return sections.find((section) => section.heading === heading);
}

function capabilityParts(paragraph: string): { summary: string; body: string } {
  const splitAt = paragraph.indexOf(": ");
  if (splitAt === -1) {
    return { summary: paragraph, body: paragraph };
  }
  return {
    summary: paragraph.slice(0, splitAt),
    body: paragraph.slice(splitAt + 2),
  };
}

function sectionId(heading: string): string {
  return heading.toLowerCase().replace(/\s+/g, "-");
}

function resolveHowWeWorkSteps(section: AboutSection): ProcessStepContent[] {
  if (section.steps && section.steps.length > 0) {
    return section.steps;
  }
  return section.paragraphs.map((paragraph, index) => ({
    title: `Step ${index + 1}`,
    description: paragraph,
  }));
}

export function AboutSections({ sections }: AboutSectionsProps) {
  const whatWeDo = findSection(sections, "What we do");
  const howWeWork = findSection(sections, "How we work");
  const capabilities = findSection(sections, "Capabilities");
  const principles = findSection(sections, "Principles");
  const whereWeWork = findSection(sections, "Where we work");

  const capabilityItems =
    capabilities?.paragraphs.map((paragraph, index) => {
      const { summary, body } = capabilityParts(paragraph);
      return {
        id: `capability-${index}-${summary}`,
        summary,
        body,
      };
    }) ?? [];

  const howWeWorkSteps = howWeWork ? resolveHowWeWorkSteps(howWeWork) : [];

  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      {whatWeDo ? (
        <section aria-labelledby={sectionId(whatWeDo.heading)}>
          <Card className="surface-glass gap-4 py-6 sm:py-8">
            <CardHeader className="px-5 sm:px-8">
              <h2
                id={sectionId(whatWeDo.heading)}
                className="text-xl font-semibold tracking-tight sm:text-2xl"
              >
                {whatWeDo.heading}
              </h2>
            </CardHeader>
            <CardContent className="px-5 sm:px-8">
              {whatWeDo.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-3xl text-base leading-relaxed text-foreground sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>
        </section>
      ) : null}

      {howWeWork && howWeWorkSteps.length > 0 ? (
        <ProcessChevronBanner
          idPrefix="about-process"
          heading={howWeWork.heading}
          headingId={sectionId(howWeWork.heading)}
          steps={howWeWorkSteps}
        />
      ) : null}

      {whereWeWork ? (
        <section aria-labelledby={sectionId(whereWeWork.heading)}>
          <h2
            id={sectionId(whereWeWork.heading)}
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            {whereWeWork.heading}
          </h2>
          {whereWeWork.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </section>
      ) : null}

      {principles ? (
        <section aria-labelledby="principles-heading">
          <h2
            id="principles-heading"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            {principles.heading}
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {principles.paragraphs.map((principle) => (
              <li
                key={principle}
                className="border-l-2 border-accent pl-4 text-sm leading-relaxed text-foreground sm:text-base"
              >
                {principle}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {capabilities ? (
        <section aria-labelledby="capabilities-heading">
          <h2
            id="capabilities-heading"
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            {capabilities.heading}
          </h2>
          <DisclosureList
            className="mt-6 divide-y divide-border border-y border-border"
            items={capabilityItems}
          />
        </section>
      ) : null}
    </div>
  );
}
