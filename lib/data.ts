import fs from "fs";
import path from "path";

export type Company = {
  name: string;
  email: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsappE164: string;
  whatsappDefaultText: string;
  siteUrl: string;
  metaTitle: string;
  metaDescription: string;
  heroLine: string;
  about: string;
  processSteps: string[];
};

export type OfferingSection = {
  heading: string;
  paragraphs: string[];
};

export type Offering = {
  slug: string;
  title: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  sections: OfferingSection[];
};

const dataDir = path.join(process.cwd(), "data");

function readJson<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as T;
}

export function getCompany(): Company {
  return readJson<Company>("company.json");
}

export function getOfferings(): Offering[] {
  return readJson<Offering[]>("offerings.json");
}

export function getOfferingBySlug(slug: string): Offering | undefined {
  return getOfferings().find((o) => o.slug === slug);
}

export function buildWhatsAppUrl(company: Company): string {
  const text = encodeURIComponent(company.whatsappDefaultText);
  return `https://wa.me/${company.whatsappE164}?text=${text}`;
}
