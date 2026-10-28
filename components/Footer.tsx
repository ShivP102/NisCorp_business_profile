import Image from "next/image";
import Link from "next/link";
import type { Company, Offering } from "@/lib/data";

type FooterProps = {
  company: Company;
  offerings: Offering[];
};

const linkClass =
  "block py-1.5 text-base leading-[1.8] text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const headingClass =
  "text-sm font-semibold tracking-wide text-muted-foreground uppercase";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case studies" },
] as const;

const supportLinks = [{ href: "/contact", label: "Send a message" }] as const;

export function Footer({ company, offerings }: FooterProps) {
  const tagline = company.servicesIntro.split(". ")[0] + ".";

  return (
    <footer className="surface-glass mt-auto">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 sm:pr-24 lg:grid-cols-4 lg:gap-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-base font-semibold tracking-tight text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Image
              src="/img/niscorp-mark.png"
              alt=""
              width={254}
              height={160}
              className="h-10 w-auto shrink-0"
            />
            <span>{company.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {tagline}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            © {new Date().getFullYear()} {company.name}
          </p>
        </div>
        <div>
          <p className={headingClass}>Work we do</p>
          <ul className="mt-3">
            {offerings.map((offering) => (
              <li key={offering.slug}>
                <Link href={offering.href} className={linkClass}>
                  {offering.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={headingClass}>Company</p>
          <ul className="mt-3">
            {companyLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={headingClass}>Support</p>
          <ul className="mt-3">
            {supportLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
