import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <header className="surface-glass sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {companyName}
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center gap-x-1 gap-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:bg-foreground/5 hover:text-accent"
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
