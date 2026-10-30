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
  companyIntro: string;
  about: string;
  processSteps: string[];
  /** Home: titled steps with detail (preferred over `processSteps` when set). */
  processSections?: { heading: string; paragraphs: string[] }[];
  processHeading?: string;
  processAssurance?: string;
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

export type AboutProcessStep = {
  title: string;
  description: string;
};

export type AboutSection = {
  heading: string;
  paragraphs: string[];
  steps?: AboutProcessStep[];
};

export type AboutPage = {
  title: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  sections: AboutSection[];
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

export type PrivacySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  orderedItems?: string[];
  grievanceTimelines?: string[];
};

export type PrivacyPage = {
  title: string;
  lastUpdated: string;
  metaTitle: string;
  metaDescription: string;
  introParagraphs: string[];
  complianceIntro: string;
  complianceBullets: string[];
  sections: PrivacySection[];
};

export type TermsSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  orderedItems?: string[];
  grievanceTimelines?: string[];
};

export type TermsPage = {
  title: string;
  lastUpdated: string;
  metaTitle: string;
  metaDescription: string;
  introParagraphs: string[];
  sections: TermsSection[];
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

export function getPrivacy(): PrivacyPage {
  return readJson<PrivacyPage>("privacy.json");
}

export function getTerms(): TermsPage {
  return readJson<TermsPage>("terms.json");
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
