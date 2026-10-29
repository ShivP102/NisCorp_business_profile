import type { Metadata } from "next";
import { ContactActions } from "@/components/ContactActions";
import { LiquidGlass } from "@/components/LiquidGlass";
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
      images: [
        {
          url: "/img/niscorp_logo.jpg",
          width: 1251,
          height: 848,
          alt: "NisCorp AI. Software solutions and consulting.",
        },
      ],
    },
  };
}

export default function ContactPage() {
  const company = getCompany();

  return (
    <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-4 px-4 pb-28 pt-10 max-sm:pl-16 sm:px-6 sm:pb-32 sm:pt-14 md:grid-cols-6 md:gap-5">
      <header className="relative md:col-span-6">
        <LiquidGlass variant="title" />
        <div className="relative z-10">
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">
            Reach the company
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl">
            Contact
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Tell us your name, the work you need, and a short message. We reply
            within one business day.
          </p>
        </div>
      </header>
      <div className="md:col-span-6">
        <ContactActions
          company={company}
          heading="Phone, email, and WhatsApp"
          id="contact-links"
        />
      </div>
      <div className="md:col-span-6">
        <ContactForm
          email={company.email}
          whatsappE164={company.whatsappE164}
        />
      </div>
    </main>
  );
}
