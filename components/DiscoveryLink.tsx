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
    "min-h-11 bg-accent px-4 text-base font-semibold text-accent-foreground transition-transform duration-200 hover:bg-accent/90 hover:shadow-md active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100";

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
