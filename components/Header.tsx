import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";

type HeaderProps = {
  companyName: string;
};

export function Header({ companyName }: HeaderProps) {
  return (
    <header className="surface-glass sticky top-0 z-40 overflow-visible">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2 text-base font-semibold tracking-tight text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:gap-2.5"
        >
          <Image
            src="/img/niscorp-mark.png"
            alt=""
            width={254}
            height={160}
            priority
            className="h-8 w-auto shrink-0 sm:h-9"
          />
          <span className="truncate sm:whitespace-nowrap">{companyName}</span>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
