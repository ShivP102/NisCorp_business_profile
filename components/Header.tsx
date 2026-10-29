import Image from "next/image";
import Link from "next/link";
import { ServicesMenu } from "@/components/ServicesMenu";
import { Button } from "@/components/ui/button";

const pageLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

type HeaderProps = {
  companyName: string;
};

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
              <ServicesMenu />
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
