import type { OfferingShape } from "@/lib/data";

type EngagementShapesProps = {
  heading: string;
  shapes: OfferingShape[];
  id?: string;
  level?: 2 | 3;
};

export function EngagementShapes({
  heading,
  shapes,
  id = "engagement-shapes",
  level = 2,
}: EngagementShapesProps) {
  const columns =
    shapes.length > 3 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3";
  const HeadingTag = level === 3 ? "h3" : "h2";
  const headingClass =
    level === 3
      ? "text-lg font-semibold tracking-tight text-foreground"
      : "text-xl font-semibold tracking-tight text-foreground sm:text-2xl";

  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <HeadingTag id={id} className={headingClass}>
        {heading}
      </HeadingTag>
      <ul className={`mt-6 grid gap-4 ${columns}`}>
        {shapes.map((shape) => (
          <li
            key={shape.name}
            className="rounded-xl border border-border bg-surface px-5 py-5"
          >
            <p className="text-base font-semibold text-foreground">
              {shape.name}
            </p>
            <p className="mt-1 text-sm font-medium text-accent">
              {shape.duration}
            </p>
            <ul className="mt-3 space-y-2">
              {shape.points.map((point) => (
                <li
                  key={point}
                  className="text-sm leading-relaxed text-foreground"
                >
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
