import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/websites", label: "Websites" },
  { href: "/enterprise", label: "Enterprise" },
  { href: "/contact", label: "Contact" },
] as const;

type HeaderProps = {
  companyName: string;
};

export function Header({ companyName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {companyName}
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center gap-x-1 gap-y-2 sm:gap-x-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-2 py-1.5 text-sm font-medium text-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-3 sm:text-base"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
