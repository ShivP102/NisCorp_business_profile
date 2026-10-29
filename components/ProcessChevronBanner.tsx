import {
  CHEVRON_SEGMENT_VIEWBOX,
  chevronSegmentPath,
  chevronSegmentRole,
  chevronStepTextPadding,
} from "@/lib/chevron-paths";
import { cn } from "cn";

export type ProcessStepContent = {
  title: string;
  description?: string;
};

type ProcessChevronBannerProps = {
  steps: ProcessStepContent[];
  heading?: string;
  headingId?: string;
  idPrefix?: string;
  compact?: boolean;
  className?: string;
};

export function ProcessChevronBanner({
  steps,
  heading,
  headingId,
  idPrefix = "process",
  compact = false,
  className,
}: ProcessChevronBannerProps) {
  const useChevronGrid = steps.length >= 3 && steps.length <= 5;
  const bannerLabel = heading ?? "Process steps";
  const minHeight =
    steps.length > 4
      ? "min-h-[8rem] lg:min-h-[8.5rem]"
      : compact
        ? "min-h-[7rem] lg:min-h-[7.5rem]"
        : "min-h-[9.5rem] lg:min-h-[10.5rem]";

  const titleClass =
    steps.length > 4
      ? "text-sm font-semibold leading-snug text-foreground lg:text-[0.9375rem]"
      : "text-base font-semibold leading-snug text-foreground lg:text-lg";

  const track = (
    <>
      {useChevronGrid ? (
        <ol
          className={cn(
            "mt-8 hidden list-none gap-3 md:grid",
            heading ? "md:mt-6" : "",
            className,
          )}
          style={{
            gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
          }}
          aria-label={`${bannerLabel} steps`}
        >
          {steps.map((step, index) => {
            const role = chevronSegmentRole(index, steps.length);
            const path = chevronSegmentPath(role);
            return (
              <li
                key={step.title}
                className={cn("relative min-w-0", minHeight)}
              >
                <svg
                  aria-hidden
                  className="absolute inset-0 h-full w-full text-accent"
                  viewBox={CHEVRON_SEGMENT_VIEWBOX}
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id={`${idPrefix}-banner-fill-${index}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="#fffdf8"
                        stopOpacity="0.98"
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--accent)"
                        stopOpacity={0.08 + index * 0.05}
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d={path}
                    fill={`url(#${idPrefix}-banner-fill-${index})`}
                  />
                  <path
                    d={path}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <div
                  className={cn(
                    "relative z-10 flex h-full flex-col justify-center py-4",
                    chevronStepTextPadding(index, steps.length),
                  )}
                >
                  <p className="text-[0.65rem] font-semibold tracking-wide text-accent uppercase sm:text-xs">
                    Step {index + 1}
                  </p>
                  <p className={cn("mt-1", titleClass)}>{step.title}</p>
                  {step.description && !compact && steps.length <= 3 ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      ) : null}

      <ol
        className={cn(
          "list-none space-y-0 divide-y divide-border border-y border-border",
          useChevronGrid ? "md:hidden" : "",
          heading ? "mt-6" : "mt-8",
          className,
        )}
        aria-label={useChevronGrid ? undefined : `${bannerLabel} steps`}
      >
        {steps.map((step, index) => (
          <li key={step.title} className="py-4">
            <p className="text-xs font-semibold tracking-wide text-accent uppercase">
              Step {index + 1} of {steps.length}
            </p>
            <p className="mt-1 text-base font-semibold text-foreground">
              {step.title}
            </p>
            {step.description ? (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </>
  );

  if (heading && headingId) {
    return (
      <section aria-labelledby={headingId} className="w-full">
        <h2
          id={headingId}
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          {heading}
        </h2>
        {track}
      </section>
    );
  }

  return track;
}
