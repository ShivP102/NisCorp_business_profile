import { Button } from "@/components/ui/button";
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
      <ul className="mt-8 flex flex-col gap-4 max-sm:pl-16 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-4 sm:pl-0 sm:pb-6 sm:pr-[4.75rem]">
        <li>
          <Button
            asChild
            variant="outline"
            className="h-auto min-h-11 w-full items-start justify-start bg-surface px-4 py-3 text-left whitespace-normal sm:w-auto"
          >
            <a href={`tel:${company.phoneTel}`}>
              <span className="flex flex-col items-start gap-0.5">
                <span className="text-sm font-medium text-muted-foreground">
                  Phone
                </span>
                <span className="text-lg font-semibold text-foreground">
                  {company.phoneDisplay}
                </span>
              </span>
            </a>
          </Button>
        </li>
        <li>
          <Button
            asChild
            variant="outline"
            className="h-auto min-h-11 w-full items-start justify-start bg-surface px-4 py-3 text-left whitespace-normal sm:w-auto"
          >
            <a href={`mailto:${company.email}`}>
              <span className="flex flex-col items-start gap-0.5">
                <span className="text-sm font-medium text-muted-foreground">
                  Email
                </span>
                <span className="text-lg font-semibold break-all text-foreground">
                  {company.email}
                </span>
              </span>
            </a>
          </Button>
        </li>
        <li>
          <Button
            asChild
            className="h-auto min-h-11 w-full items-start justify-start bg-whatsapp px-4 py-3 text-left whitespace-normal text-white hover:bg-whatsapp/90 sm:w-auto"
          >
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <span className="flex flex-col items-start gap-2">
                <span className="text-sm font-medium text-white/90">
                  WhatsApp
                </span>
                <span className="text-base font-semibold">
                  Message on WhatsApp
                </span>
              </span>
            </a>
          </Button>
        </li>
      </ul>
    </section>
  );
}
