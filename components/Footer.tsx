import Link from "next/link";
import { buildWhatsAppUrl, type Company, type Offering } from "@/lib/data";

type FooterProps = {
  company: Company;
  offerings: Offering[];
};

export function Footer({ company, offerings }: FooterProps) {
  const whatsappHref = buildWhatsAppUrl(company);

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">
            Work we do
          </p>
          <ul className="mt-4 space-y-2">
            {offerings.map((offering) => (
              <li key={offering.slug}>
                <Link
                  href={`/${offering.slug}`}
                  className="text-base text-foreground hover:text-accent"
                >
                  {offering.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-base">
            <li>
              <Link
                href="/contact"
                className="font-medium text-foreground hover:text-accent"
              >
                Send a message
              </Link>
            </li>
            <li>
              <a
                href={`tel:${company.phoneTel}`}
                className="text-foreground hover:text-accent"
              >
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${company.email}`}
                className="break-all text-foreground hover:text-accent"
              >
                {company.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-medium text-whatsapp hover:underline"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-6 sm:px-6">
        <p className="mx-auto max-w-5xl text-sm text-muted">
          © {new Date().getFullYear()} {company.name}
        </p>
      </div>
    </footer>
  );
}
