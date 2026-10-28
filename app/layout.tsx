import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { buildWhatsAppUrl, getCompany, getOfferings } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const companyMeta = getCompany();

export const metadata: Metadata = {
  metadataBase: new URL(companyMeta.siteUrl),
  openGraph: {
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  const company = getCompany();
  const offerings = getOfferings();

  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Header companyName={company.name} />
        {children}
        <Footer company={company} offerings={offerings} />
        <WhatsAppButton href={buildWhatsAppUrl(company)} />
      </body>
    </html>
  );
}
