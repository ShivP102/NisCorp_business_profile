import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferingDetail } from "@/components/OfferingDetail";
import { getCompany, getOfferingBySlug } from "@/lib/data";

export function generateMetadata(): Metadata {
  const offering = getOfferingBySlug("websites");
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

export default function WebsitesServicePage() {
  const company = getCompany();
  const offering = getOfferingBySlug("websites");

  if (!offering) {
    notFound();
  }

  return (
    <OfferingDetail
      company={company}
      offering={offering}
      heading="Websites & SEO for individuals and small teams"
      eyebrow="Sites and search"
      surface="glass"
      ctaLabel="Get your site live in 14 days"
      contactHeading="Contact about a website"
    />
  );
}
