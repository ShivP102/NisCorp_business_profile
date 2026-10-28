"use client";

import { useCallback, useState } from "react";

const PATH_OPTIONS = [
  { value: "website", label: "An individual website" },
  { value: "enterprise", label: "Enterprise software" },
  { value: "other", label: "Something else" },
] as const;

type PathValue = (typeof PATH_OPTIONS)[number]["value"];

export type ContactFormProps = {
  email: string;
  whatsappE164: string;
};

function pathLabel(value: PathValue): string {
  return PATH_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

function composeMessage(
  name: string,
  visitorEmail: string,
  path: PathValue,
  message: string,
): string {
  const lines = [
    `Name: ${name.trim()}`,
    `Email: ${visitorEmail.trim()}`,
    `Work: ${pathLabel(path)}`,
    "",
    message.trim(),
  ];
  return lines.join("\n");
}

function buildWhatsAppHref(whatsappE164: string, text: string): string {
  return `https://wa.me/${whatsappE164}?text=${encodeURIComponent(text)}`;
}

function buildMailtoHref(
  companyEmail: string,
  name: string,
  body: string,
): string {
  const subject = encodeURIComponent(
    `Message from ${name.trim() || "visitor"}`,
  );
  return `mailto:${companyEmail}?subject=${subject}&body=${encodeURIComponent(body)}`;
}

export function ContactForm({ email, whatsappE164 }: ContactFormProps) {
  const [name, setName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [path, setPath] = useState<PathValue>("website");
  const [message, setMessage] = useState("");

  const getBody = useCallback(
    () => composeMessage(name, visitorEmail, path, message),
    [message, name, path, visitorEmail],
  );

  const openWhatsApp = useCallback(() => {
    const href = buildWhatsAppHref(whatsappE164, getBody());
    window.open(href, "_blank", "noopener,noreferrer");
  }, [getBody, whatsappE164]);

  const openEmail = useCallback(() => {
    const href = buildMailtoHref(email, name, getBody());
    window.location.href = href;
  }, [email, getBody, name]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openWhatsApp();
  };

  return (
    <section
      aria-labelledby="contact-form-heading"
      className="mt-16 border-t border-border pt-16 sm:mt-20 sm:pt-20"
    >
      <h2
        id="contact-form-heading"
        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
      >
        Send a message
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        Your message opens in WhatsApp or email on your device—we do not store
        it on this site.
      </p>
      <form
        className="mt-8 max-w-xl space-y-6"
        onSubmit={handleSubmit}
        noValidate
      >
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-foreground"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-base text-foreground shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-foreground"
          >
            Your email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={visitorEmail}
            onChange={(event) => setVisitorEmail(event.target.value)}
            className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-base text-foreground shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </div>
        <div>
          <label
            htmlFor="contact-path"
            className="block text-sm font-medium text-foreground"
          >
            Kind of work
          </label>
          <select
            id="contact-path"
            name="path"
            required
            value={path}
            onChange={(event) => setPath(event.target.value as PathValue)}
            className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-base text-foreground shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {PATH_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-foreground"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="mt-2 w-full resize-y rounded-md border border-border bg-surface px-3 py-2.5 text-base text-foreground shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </div>
        <div className="flex flex-col gap-3 max-sm:pl-16 sm:flex-row sm:flex-wrap sm:pl-0 sm:pb-6 sm:pr-[4.75rem]">
          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-whatsapp px-5 py-2.5 text-base font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Send on WhatsApp
          </button>
          <button
            type="button"
            onClick={openEmail}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-surface px-5 py-2.5 text-base font-semibold text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Send by email
          </button>
        </div>
      </form>
    </section>
  );
}
