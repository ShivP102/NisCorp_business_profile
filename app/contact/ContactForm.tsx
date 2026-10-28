"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const PATH_OPTIONS = [
  { value: "ai", label: "AI and LLM work" },
  { value: "website", label: "An individual website" },
  { value: "enterprise", label: "Enterprise software" },
  { value: "other", label: "Something else" },
] as const;

type PathValue = (typeof PATH_OPTIONS)[number]["value"];

export type ContactFormProps = {
  email: string;
  whatsappE164: string;
};

const brutalLabel =
  "font-[family-name:ui-sans-serif,system-ui,sans-serif] text-xs font-bold tracking-[0.14em] text-foreground uppercase";

const brutalField =
  "mt-2 h-11 rounded-none border-2 border-foreground bg-white text-base text-foreground shadow-none focus-visible:border-accent focus-visible:ring-accent/40";

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
  const [path, setPath] = useState<PathValue>("ai");
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
    <section aria-labelledby="contact-form-heading" className="scroll-mt-24">
      <Separator className="mb-10" />
      <h2
        id="contact-form-heading"
        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
      >
        Send a message
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Your message opens in WhatsApp or email on your device—we do not store
        it on this site.
      </p>
      <form
        className="surface-brutal mt-8 max-w-xl space-y-6 p-5 sm:p-8"
        onSubmit={handleSubmit}
        noValidate
      >
        <div>
          <Label htmlFor="contact-name" className={brutalLabel}>
            Name
          </Label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={brutalField}
          />
        </div>
        <div>
          <Label htmlFor="contact-email" className={brutalLabel}>
            Your email
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={visitorEmail}
            onChange={(event) => setVisitorEmail(event.target.value)}
            className={brutalField}
          />
        </div>
        <div>
          <Label htmlFor="contact-path" className={brutalLabel}>
            Kind of work
          </Label>
          <Select
            value={path}
            onValueChange={(value) => setPath(value as PathValue)}
          >
            <SelectTrigger
              id="contact-path"
              aria-required
              className={`${brutalField} data-[size=default]:h-11 w-full`}
            >
              <SelectValue>{pathLabel(path)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {PATH_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="contact-message" className={brutalLabel}>
            Message
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={`${brutalField} field-sizing-fixed min-h-32`}
          />
        </div>
        <div className="flex flex-col gap-3 max-sm:pl-16 sm:flex-row sm:flex-wrap sm:pl-0 sm:pb-2 sm:pr-[4.75rem]">
          <Button
            type="submit"
            className="min-h-11 rounded-none bg-whatsapp text-base font-semibold text-white hover:bg-whatsapp/90"
          >
            Send on WhatsApp
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={openEmail}
            className="min-h-11 rounded-none border-2 border-foreground bg-white font-[family-name:ui-sans-serif,system-ui,sans-serif] text-base font-bold tracking-wide text-foreground uppercase shadow-[4px_4px_0_#141414] hover:bg-foreground hover:text-white"
          >
            Send by email
          </Button>
        </div>
      </form>
    </section>
  );
}
