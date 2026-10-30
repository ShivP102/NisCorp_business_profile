"use client";

import { usePrivacyConsent } from "@/components/PrivacyConsentProvider";
import type { Company } from "@/lib/data";

type ContactActionsProps = {
  company: Company;
  heading?: string;
  id?: string;
};

const valueLink =
  "mt-1 inline-block text-lg font-semibold text-foreground underline-offset-4 hover:text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const emailButtonClass = `${valueLink} cursor-pointer border-0 bg-transparent p-0 text-left`;

const EMAIL_SUBJECT = "Message from NisCorp AI website";

export function ContactActions({
  company,
  heading = "Reach us",
  id = "contact",
}: ContactActionsProps) {
  const { requestWhatsApp, requestEmail } = usePrivacyConsent();

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
          <button
            type="button"
            className={emailButtonClass}
            onClick={() =>
              requestEmail(EMAIL_SUBJECT, company.whatsappDefaultText)
            }
          >
            {company.email.slice(0, company.email.indexOf("@"))}
            <wbr />
            {company.email.slice(company.email.indexOf("@"))}
          </button>
        </li>
        <li>
          <p className="text-sm font-medium text-muted-foreground">WhatsApp</p>
          <p className="mt-1 text-base leading-relaxed text-muted-foreground">
            Open a chat on your device.
          </p>
          <button
            type="button"
            onClick={() => requestWhatsApp(company.whatsappDefaultText)}
            className="mt-3 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md border-0 bg-whatsapp px-4 text-sm font-semibold text-white hover:bg-whatsapp/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Message on WhatsApp
          </button>
        </li>
      </ul>
    </section>
  );
}
