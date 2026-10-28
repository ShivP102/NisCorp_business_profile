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
  contactMetaTitle: string;
  contactMetaDescription: string;
  servicesMetaTitle: string;
  servicesMetaDescription: string;
  servicesIntro: string;
  heroLine: string;
  heroSubhead: string;
  about: string;
  processSteps: string[];
  calendarUrl: string;
  gaMeasurementId: string;
  trustFacts: string[];
};

export type OfferingSection = {
  heading: string;
  paragraphs: string[];
};

export type OfferingShape = {
  name: string;
  duration: string;
  points: string[];
};

export type Offering = {
  slug: string;
  title: string;
  summary: string;
  href: string;
  detail: boolean;
  overview: string;
  overviewCta: string;
  metaTitle: string;
  metaDescription: string;
  sections: OfferingSection[];
  shapes: OfferingShape[];
};

export type Faq = {
  question: string;
  answer: string;
  pages: string[];
};

export type AboutPage = {
  title: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  sections: OfferingSection[];
};

export type CaseStudy = {
  title: string;
  context: string;
  problem: string;
  approach: string[];
  impact: string[];
  stack: string[];
};

export type CaseStudiesPage = {
  title: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  items: CaseStudy[];
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
  return getOfferings().find((offering) => offering.slug === slug);
}

export function getFaqs(page: string): Faq[] {
  return readJson<Faq[]>("faqs.json").filter((faq) => faq.pages.includes(page));
}

export function getAbout(): AboutPage {
  return readJson<AboutPage>("about.json");
}

export function getCaseStudies(): CaseStudiesPage {
  return readJson<CaseStudiesPage>("case-studies.json");
}

export function buildWhatsAppUrl(company: Company): string {
  const text = encodeURIComponent(company.whatsappDefaultText);
  return `https://wa.me/${company.whatsappE164}?text=${text}`;
}

export function discoveryHref(company: Company): string {
  const url = company.calendarUrl.trim();
  if (url.startsWith("https://")) {
    return url;
  }
  return "/contact";
}
