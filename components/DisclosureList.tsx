export type DisclosureItem = {
  id: string;
  summary: string;
  body: string;
};

type DisclosureListProps = {
  items: DisclosureItem[];
  className?: string;
};

export function DisclosureList({ items, className }: DisclosureListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={className ?? "divide-y divide-border border-y border-border"}
    >
      {items.map((item) => (
        <details key={item.id} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
            <span>{item.summary}</span>
            <span
              aria-hidden
              className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
            >
              ▾
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {item.body}
          </p>
        </details>
      ))}
    </div>
  );
}
