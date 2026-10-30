import type { Metadata } from "next";
import { PrivacySections } from "@/components/PrivacySections";
import { LiquidGlass } from "@/components/LiquidGlass";
import { getCompany, getPrivacy } from "@/lib/data";

export function generateMetadata(): Metadata {
  const privacy = getPrivacy();
  return {
    title: privacy.metaTitle,
    description: privacy.metaDescription,
    openGraph: {
      title: privacy.metaTitle,
      description: privacy.metaDescription,
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

export default function PrivacyPage() {
  const company = getCompany();
  const privacy = getPrivacy();

  return (
    <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-4 px-4 pb-28 pt-10 max-sm:pl-16 sm:px-6 sm:pb-32 sm:pt-14 md:grid-cols-6 md:gap-5">
      <header className="relative md:col-span-6">
        <LiquidGlass variant="title" />
        <div className="relative z-10">
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">
            Legal
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl">
            {privacy.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Last updated: {privacy.lastUpdated}
          </p>
        </div>
      </header>

      <div className="md:col-span-6">
        <PrivacySections privacy={privacy} company={company} />
      </div>
    </main>
  );
}
