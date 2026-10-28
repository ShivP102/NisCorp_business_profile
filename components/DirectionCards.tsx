import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Offering } from "@/lib/data";
import { cn } from "cn";

type DirectionCardsProps = {
  offerings: Offering[];
};

function surfaceFor(slug: string): string {
  if (slug === "enterprise") {
    return "surface-clay";
  }
  if (slug === "websites") {
    return "surface-glass";
  }
  return "surface-rule";
}

export function DirectionCards({ offerings }: DirectionCardsProps) {
  return (
    <ul className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3 md:gap-5">
      {offerings.map((offering) => (
        <li key={offering.slug} className="min-w-0">
          <Card
            className={cn(
              "group relative h-full gap-4 py-5 transition-transform duration-200 hover:-translate-y-1 focus-within:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-none sm:py-6",
              surfaceFor(offering.slug),
            )}
          >
            <CardHeader className="px-5 sm:px-6">
              <h2 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-accent sm:text-xl">
                <Link
                  href={offering.href}
                  className="after:absolute after:inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {offering.title}
                </Link>
              </h2>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col px-5 sm:px-6">
              <p className="flex-1 text-base leading-relaxed text-foreground">
                {offering.summary}
              </p>
              <span className="mt-4 text-sm font-semibold text-accent sm:mt-6">
                Learn more →
              </span>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
