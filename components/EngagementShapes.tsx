import type { OfferingShape } from "@/lib/data";
import { cn } from "cn";

type EngagementShapesProps = {
  heading: string;
  shapes: OfferingShape[];
  id?: string;
  level?: 2 | 3;
  mode?: "peers" | "sequence";
};

export function EngagementShapes({
  heading,
  shapes,
  id = "engagement-shapes",
  level = 2,
  mode = "peers",
}: EngagementShapesProps) {
  const sequence = mode === "sequence";
  const wideAtLg = shapes.length > 3;
  const columns = wideAtLg ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3";
  const HeadingTag = level === 3 ? "h3" : "h2";
  const ListTag = sequence ? "ol" : "ul";
  const headingClass =
    level === 3
      ? "text-lg font-semibold tracking-tight text-foreground"
      : "text-xl font-semibold tracking-tight text-foreground sm:text-2xl";

  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <HeadingTag id={id} className={headingClass}>
        {heading}
      </HeadingTag>
      <div className="relative mt-6">
        {sequence ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute top-3 bottom-3 left-0 z-0 w-px bg-accent sm:hidden"
            />
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute top-1/2 z-0 h-px -translate-y-1/2 bg-accent",
                wideAtLg
                  ? "right-[12.5%] left-[12.5%] hidden lg:block"
                  : "right-[16.67%] left-[16.67%] hidden sm:block",
              )}
            />
          </>
        ) : null}
        <ListTag className={cn("relative z-10 grid list-none gap-4", columns)}>
          {shapes.map((shape) => (
            <li
              key={shape.name}
              className={cn(
                "rounded-xl border border-border bg-surface px-5 py-5",
                sequence &&
                  "max-sm:ml-3 transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-none",
              )}
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
        </ListTag>
      </div>
    </section>
  );
}
