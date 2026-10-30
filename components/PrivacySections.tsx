import type { Company, PrivacyPage } from "@/lib/data";

type PrivacySectionsProps = {
  privacy: PrivacyPage;
  company: Company;
};

function sectionId(heading: string): string {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

const proseClass = "max-w-3xl text-base leading-relaxed text-foreground";
const mutedClass = "max-w-3xl text-base leading-relaxed text-muted-foreground";

export function PrivacySections({ privacy, company }: PrivacySectionsProps) {
  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      <div className="space-y-4">
        {privacy.introParagraphs.map((paragraph) => (
          <p key={paragraph} className={proseClass}>
            {paragraph}
          </p>
        ))}
        <p className={proseClass}>{privacy.complianceIntro}</p>
        <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground">
          {privacy.complianceBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {privacy.sections.map((section) => {
        const id = sectionId(section.heading);
        const isGrievance = section.heading.startsWith("8.");

        return (
          <section key={section.heading} aria-labelledby={id}>
            <h2
              id={id}
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              {section.heading}
            </h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className={`mt-4 ${mutedClass}`}>
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.orderedItems ? (
              <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-relaxed text-muted-foreground">
                {section.orderedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            ) : null}
            {isGrievance ? (
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-muted-foreground">
                <li>
                  <span className="font-semibold text-foreground">
                    Designation:{" "}
                  </span>
                  Grievance Officer
                </li>
                <li>
                  <span className="font-semibold text-foreground">
                    Entity:{" "}
                  </span>
                  {company.name}
                </li>
                <li>
                  <span className="font-semibold text-foreground">Email: </span>
                  <a
                    href={`mailto:${company.email}`}
                    className="font-semibold text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {company.email}
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-foreground">Phone: </span>
                  <a
                    href={`tel:${company.phoneTel}`}
                    className="font-semibold text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {company.phoneDisplay}
                  </a>
                </li>
              </ul>
            ) : null}
            {section.grievanceTimelines ? (
              <>
                <p className="mt-6 font-semibold text-foreground">
                  Grievance timelines
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
                  {section.grievanceTimelines.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
