import { buildWhatsAppUrl, type Company } from "@/lib/data";

type ContactActionsProps = {
  company: Company;
  heading?: string;
  id?: string;
};

export function ContactActions({
  company,
  heading = "Reach us",
  id = "contact",
}: ContactActionsProps) {
  const whatsappHref = buildWhatsAppUrl(company);

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-20">
      <h2
        id={`${id}-heading`}
        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
      >
        {heading}
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        Phone, email, or WhatsApp—use whichever is easiest. We read every
        message.
      </p>
      <ul className="mt-8 flex flex-col gap-4 max-sm:pl-16 sm:flex-row sm:flex-wrap sm:gap-6 sm:pl-0 sm:pb-6 sm:pr-[4.75rem]">
        <li>
          <a
            href={`tel:${company.phoneTel}`}
            className="group inline-flex flex-col gap-0.5 text-foreground underline-offset-4 hover:text-accent hover:underline"
          >
            <span className="text-sm font-medium text-muted">Phone</span>
            <span className="text-lg font-semibold">
              {company.phoneDisplay}
            </span>
          </a>
        </li>
        <li>
          <a
            href={`mailto:${company.email}`}
            className="group inline-flex flex-col gap-0.5 text-foreground underline-offset-4 hover:text-accent hover:underline"
          >
            <span className="text-sm font-medium text-muted">Email</span>
            <span className="text-lg font-semibold break-all">
              {company.email}
            </span>
          </a>
        </li>
        <li>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col gap-2"
          >
            <span className="text-sm font-medium text-muted">WhatsApp</span>
            <span className="inline-flex min-h-11 items-center justify-center rounded-md bg-whatsapp px-5 py-2.5 text-base font-semibold text-white transition-opacity hover:opacity-90">
              Message on WhatsApp
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
}
