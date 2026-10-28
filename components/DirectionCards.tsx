import Link from "next/link";
import type { Offering } from "@/lib/data";

type DirectionCardsProps = {
  offerings: Offering[];
};

export function DirectionCards({ offerings }: DirectionCardsProps) {
  return (
    <ul className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-6">
      {offerings.map((offering) => (
        <li key={offering.slug}>
          <Link
            href={`/${offering.slug}`}
            className="group flex h-full flex-col rounded-lg border border-border bg-surface p-4 shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-6"
          >
            <h2 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-accent sm:text-xl">
              {offering.title}
            </h2>
            <p className="mt-3 flex-1 text-base leading-relaxed text-muted">
              {offering.summary}
            </p>
            <span className="mt-4 text-sm font-semibold text-accent sm:mt-6">
              Learn more →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
