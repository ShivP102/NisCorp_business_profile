import { buildWhatsAppUrl, type Company } from "@/lib/data";

type ContactActionsProps = {
  company: Company;
  heading?: string;
  id?: string;
};

const valueLink =
  "mt-1 inline-block text-lg font-semibold text-foreground underline-offset-4 hover:text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

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
      <ul className="mt-8 grid gap-8 sm:grid-cols-3 sm:pr-[4.75rem]">
        <li>
          <p className="text-sm font-medium text-muted-foreground">Phone</p>
          <a href={`tel:${company.phoneTel}`} className={valueLink}>
            {company.phoneDisplay}
          </a>
        </li>
        <li>
          <p className="text-sm font-medium text-muted-foreground">Email</p>
          <a href={`mailto:${company.email}`} className={valueLink}>
            {company.email.slice(0, company.email.indexOf("@"))}
            <wbr />
            {company.email.slice(company.email.indexOf("@"))}
          </a>
        </li>
        <li>
          <p className="text-sm font-medium text-muted-foreground">WhatsApp</p>
          <p className="mt-1 text-base leading-relaxed text-muted-foreground">
            Open a chat on your device.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center justify-center rounded-md bg-whatsapp px-4 text-sm font-semibold text-white hover:bg-whatsapp/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Message on WhatsApp
          </a>
        </li>
      </ul>
    </section>
  );
}
