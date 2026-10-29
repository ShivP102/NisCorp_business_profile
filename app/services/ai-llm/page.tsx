import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferingDetail } from "@/components/OfferingDetail";
import { getCompany, getFaqs, getOfferingBySlug } from "@/lib/data";

export function generateMetadata(): Metadata {
  const offering = getOfferingBySlug("ai-llm");
  if (!offering) {
    return {};
  }
  return {
    title: offering.metaTitle,
    description: offering.metaDescription,
    openGraph: {
      title: offering.metaTitle,
      description: offering.metaDescription,
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

export default function AiLlmPage() {
  const company = getCompany();
  const offering = getOfferingBySlug("ai-llm");

  if (!offering) {
    notFound();
  }

  return (
    <OfferingDetail
      company={company}
      offering={offering}
      heading="AI & LLM Solutions — RAG, agents, and automation that ship"
      eyebrow="Practical AI"
      surface="glass"
      ctaLabel="Book a 20-minute discovery call"
      contactHeading="Talk about an AI project"
      faqs={getFaqs("ai-llm")}
    />
  );
}
