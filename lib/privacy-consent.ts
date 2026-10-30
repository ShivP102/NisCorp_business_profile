export const PRIVACY_CONSENT_SESSION_KEY = "niscorp-privacy-consent";

export function buildPrivacyPolicyUrl(siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, "")}/privacy`;
}

export function formatConsentLine(
  privacyLastUpdated: string,
  privacyPolicyUrl: string,
): string {
  return `Privacy consent: I have read the NisCorp AI Privacy Policy (last updated ${privacyLastUpdated}) at ${privacyPolicyUrl} and consent to processing of my details to respond to this inquiry.`;
}

export function appendConsentToMessage(
  message: string,
  privacyLastUpdated: string,
  privacyPolicyUrl: string,
): string {
  const trimmed = message.trim();
  const consent = formatConsentLine(privacyLastUpdated, privacyPolicyUrl);
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
