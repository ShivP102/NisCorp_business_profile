import Link from "next/link";
import { Button } from "@/components/ui/button";
import { discoveryHref, type Company } from "@/lib/data";

type DiscoveryLinkProps = {
  company: Company;
  label: string;
};

export function DiscoveryLink({ company, label }: DiscoveryLinkProps) {
  const href = discoveryHref(company);
  const external = href.startsWith("https://");
  const className =
    "min-h-11 bg-accent px-4 text-base font-semibold text-accent-foreground hover:bg-accent/90";

  if (external) {
    return (
      <Button asChild className={className}>
        <a href={href}>{label}</a>
      </Button>
    );
  }

  return (
    <Button asChild className={className}>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
