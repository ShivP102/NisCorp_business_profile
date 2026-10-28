import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { buildWhatsAppUrl, type Company, type Offering } from "@/lib/data";

type FooterProps = {
  company: Company;
  offerings: Offering[];
};

const linkClass =
  "text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const pageLinks = [
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/contact", label: "Send a message" },
] as const;

export function Footer({ company, offerings }: FooterProps) {
  const whatsappHref = buildWhatsAppUrl(company);

  return (
    <footer className="surface-glass mt-auto">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Work we do
          </p>
          <ul className="mt-4 space-y-2">
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
          <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-base">
            {pageLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`font-medium ${linkClass}`}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={`tel:${company.phoneTel}`} className={linkClass}>
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${company.email}`}
                className={`break-all ${linkClass}`}
              >
                {company.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-medium text-whatsapp hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Separator />
      <div className="px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4">
          <Image
            src="/img/niscorp-logo.png"
            alt="NisCorp AI. Software solutions and consulting."
            width={800}
            height={520}
            className="h-auto w-40 sm:w-48"
          />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {company.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
