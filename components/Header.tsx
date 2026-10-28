import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const pageLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const serviceLinks = [
  { href: "/services", label: "All services" },
  { href: "/services/ai-llm", label: "AI & LLM" },
  { href: "/services/websites", label: "Websites & SEO" },
] as const;

type HeaderProps = {
  companyName: string;
};

const summaryClass =
  "flex h-8 cursor-pointer list-none items-center rounded-md px-3 text-sm font-medium text-foreground hover:bg-foreground/5 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden";

export function Header({ companyName }: HeaderProps) {
  return (
    <header className="surface-glass sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Image
            src="/img/niscorp-mark.png"
            alt=""
            width={254}
            height={160}
            priority
            className="h-9 w-auto shrink-0"
          />
          <span className="whitespace-nowrap">{companyName}</span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center gap-x-1 gap-y-1">
            <li>
              <details className="relative">
                <summary className={summaryClass}>Services</summary>
                <ul className="absolute right-0 z-50 mt-2 min-w-48 rounded-md border border-border bg-surface p-2 shadow-lg">
                  {serviceLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-foreground/5 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            {pageLinks.map((item) => (
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
