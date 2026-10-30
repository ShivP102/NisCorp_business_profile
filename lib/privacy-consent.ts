export const PRIVACY_CONSENT_SESSION_KEY = "niscorp-privacy-consent";

export type LegalConsentRefs = {
  privacyLastUpdated: string;
  privacyPolicyUrl: string;
  termsLastUpdated: string;
  termsUrl: string;
};

export function buildPrivacyPolicyUrl(siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, "")}/privacy`;
}

export function buildTermsUrl(siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, "")}/terms`;
}

export function buildLegalConsentRefs(
  siteUrl: string,
  privacyLastUpdated: string,
  termsLastUpdated: string,
): LegalConsentRefs {
  return {
    privacyLastUpdated,
    privacyPolicyUrl: buildPrivacyPolicyUrl(siteUrl),
    termsLastUpdated,
    termsUrl: buildTermsUrl(siteUrl),
  };
}

export function formatConsentLine(refs: LegalConsentRefs): string {
  return `Privacy consent: I have read the NisCorp AI Privacy Policy (last updated ${refs.privacyLastUpdated}) at ${refs.privacyPolicyUrl} and the Terms and Conditions (last updated ${refs.termsLastUpdated}) at ${refs.termsUrl}, and consent to processing of my details to respond to this inquiry.`;
}

export function appendConsentToMessage(
  message: string,
  refs: LegalConsentRefs,
): string {
  const trimmed = message.trim();
  const consent = formatConsentLine(refs);
  return trimmed ? `${trimmed}\n\n${consent}` : consent;
}

export function hasSessionPrivacyConsent(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    return sessionStorage.getItem(PRIVACY_CONSENT_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function setSessionPrivacyConsent(): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    sessionStorage.setItem(PRIVACY_CONSENT_SESSION_KEY, "1");
  } catch {
    /* ignore quota / private mode */
  }
}

export function buildWhatsAppHref(whatsappE164: string, text: string): string {
  return `https://wa.me/${whatsappE164}?text=${encodeURIComponent(text)}`;
}

export function buildMailtoHref(
  companyEmail: string,
  subject: string,
  body: string,
): string {
  return `mailto:${companyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
