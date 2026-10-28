import { buildWhatsAppUrl, type Company } from "@/lib/data";

type ContactActionsProps = {
  company: Company;
  heading?: string;
  id?: string;
};

const cardClass =
  "flex h-full flex-col rounded-xl border border-border bg-surface p-5";

export function ContactActions({
  company,
  heading = "Reach us",
  id = "contact",
}: ContactActionsProps) {
  const whatsappHref = buildWhatsAppUrl(company);

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <h2
        id={`${id}-heading`}
        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
      >
        {heading}
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Phone, email, or WhatsApp—use whichever is easiest. We read every
        message.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3 sm:pr-[4.75rem]">
        <li className={cardClass}>
          <p className="text-sm font-medium text-muted-foreground">Phone</p>
          <a
            href={`tel:${company.phoneTel}`}
            className="mt-3 text-lg font-semibold text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {company.phoneDisplay}
          </a>
        </li>
        <li className={cardClass}>
          <p className="text-sm font-medium text-muted-foreground">Email</p>
          <a
            href={`mailto:${company.email}`}
            className="mt-3 text-lg font-semibold break-all text-foreground hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {company.email}
          </a>
        </li>
        <li className={cardClass}>
          <p className="text-sm font-medium text-muted-foreground">WhatsApp</p>
          <p className="mt-3 text-base leading-relaxed text-foreground">
            Open a chat on your device.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center justify-center self-start rounded-md bg-whatsapp px-4 text-sm font-semibold text-white hover:bg-whatsapp/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Message on WhatsApp
          </a>
        </li>
      </ul>
    </section>
  );
}
