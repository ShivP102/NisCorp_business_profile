import type { Metadata } from "next";
import { ContactActions } from "@/components/ContactActions";
import { ContactForm } from "@/app/contact/ContactForm";
import { getCompany } from "@/lib/data";

export function generateMetadata(): Metadata {
  const company = getCompany();
  return {
    title: company.contactMetaTitle,
    description: company.contactMetaDescription,
    openGraph: {
      title: company.contactMetaTitle,
      description: company.contactMetaDescription,
    },
  };
}

export default function ContactPage() {
  const company = getCompany();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 pt-10 sm:px-6 sm:pb-32 sm:pt-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        Reach the company
      </p>
      <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
        Contact
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        Tell us your name, the kind of work you need, and a short message. We
        read every note that comes through phone, email, or WhatsApp.
      </p>
      <ContactActions
        company={company}
        heading="Phone, email, and WhatsApp"
        id="contact-links"
      />
      <ContactForm email={company.email} whatsappE164={company.whatsappE164} />
    </main>
  );
}
