import Link from "next/link";

const linkClass =
  "font-semibold text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function LegalConsentLabel() {
  return (
    <>
      I have read the{" "}
      <Link href="/privacy" className={linkClass}>
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link href="/terms" className={linkClass}>
        Terms and Conditions
      </Link>{" "}
      and consent to NisCorp AI processing my details to respond to this
      inquiry.
    </>
  );
}
