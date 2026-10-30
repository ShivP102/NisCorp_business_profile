"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  appendConsentToMessage,
  buildMailtoHref,
  buildWhatsAppHref,
  hasSessionPrivacyConsent,
  setSessionPrivacyConsent,
} from "@/lib/privacy-consent";

type PendingAction =
  | { kind: "whatsapp"; baseText: string }
  | { kind: "email"; subject: string; baseBody: string };

type PrivacyConsentContextValue = {
  requestWhatsApp: (baseText: string) => void;
  requestEmail: (subject: string, baseBody: string) => void;
};

const PrivacyConsentContext = createContext<PrivacyConsentContextValue | null>(
  null,
);

export function usePrivacyConsent(): PrivacyConsentContextValue {
  const value = useContext(PrivacyConsentContext);
  if (!value) {
    throw new Error(
      "usePrivacyConsent must be used within PrivacyConsentProvider",
    );
  }
  return value;
}

type PrivacyConsentProviderProps = {
  children: ReactNode;
  email: string;
  whatsappE164: string;
  whatsappDefaultText: string;
  privacyLastUpdated: string;
  privacyPolicyUrl: string;
};

export function PrivacyConsentProvider({
  children,
  email,
  whatsappE164,
  whatsappDefaultText,
  privacyLastUpdated,
  privacyPolicyUrl,
}: PrivacyConsentProviderProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [pending, setPending] = useState<PendingAction | null>(null);
  const [dialogConsent, setDialogConsent] = useState(false);
  const consentHintId = useId();
  const titleId = useId();

  const runAction = useCallback(
    (action: PendingAction) => {
      if (action.kind === "whatsapp") {
        const text = appendConsentToMessage(
          action.baseText,
          privacyLastUpdated,
          privacyPolicyUrl,
        );
        window.open(
          buildWhatsAppHref(whatsappE164, text),
          "_blank",
          "noopener,noreferrer",
        );
        return;
      }
      const body = appendConsentToMessage(
        action.baseBody,
        privacyLastUpdated,
        privacyPolicyUrl,
      );
      window.location.href = buildMailtoHref(email, action.subject, body);
    },
    [email, privacyLastUpdated, privacyPolicyUrl, whatsappE164],
  );

  const closeDialog = useCallback(() => {
    setPending(null);
    setDialogConsent(false);
    dialogRef.current?.close();
  }, []);

  const confirmDialog = useCallback(() => {
    if (!pending || !dialogConsent) {
      return;
    }
    setSessionPrivacyConsent();
    runAction(pending);
    closeDialog();
  }, [closeDialog, dialogConsent, pending, runAction]);

  const requestWithGate = useCallback(
    (action: PendingAction) => {
      if (hasSessionPrivacyConsent()) {
        runAction(action);
        return;
      }
      setPending(action);
      setDialogConsent(false);
      dialogRef.current?.showModal();
    },
    [runAction],
  );

  const requestWhatsApp = useCallback(
    (baseText: string) => {
      requestWithGate({
        kind: "whatsapp",
        baseText: baseText.trim() || whatsappDefaultText,
      });
    },
    [requestWithGate, whatsappDefaultText],
  );

  const requestEmail = useCallback(
    (subject: string, baseBody: string) => {
      requestWithGate({
        kind: "email",
        subject,
        baseBody: baseBody.trim() || whatsappDefaultText,
      });
    },
    [requestWithGate, whatsappDefaultText],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    const onCancel = () => {
      setPending(null);
      setDialogConsent(false);
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, []);

  return (
    <PrivacyConsentContext.Provider value={{ requestWhatsApp, requestEmail }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="fixed top-1/2 left-1/2 z-[100] w-[min(100%-2rem,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-0 shadow-lg backdrop:bg-foreground/40 open:flex open:flex-col"
      >
        <form
          className="surface-glass flex flex-col gap-5 rounded-xl p-6"
          onSubmit={(event) => {
            event.preventDefault();
            confirmDialog();
          }}
        >
          <div>
            <h2
              id={titleId}
              className="text-lg font-semibold tracking-tight text-foreground"
            >
              Privacy consent
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Before we open WhatsApp or email on your device, confirm you agree
              to our Privacy Policy.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <input
              id="privacy-gate-consent"
              type="checkbox"
              checked={dialogConsent}
              onChange={(event) => setDialogConsent(event.target.checked)}
              aria-describedby={consentHintId}
              className="mt-1 size-4 shrink-0 rounded border-border accent-accent"
            />
            <Label
              htmlFor="privacy-gate-consent"
              id={consentHintId}
              className="block min-w-0 flex-1 text-sm leading-relaxed font-normal text-foreground"
            >
              I have read the{" "}
              <Link
                href="/privacy"
                className="font-semibold text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Privacy Policy
              </Link>{" "}
              and consent to NisCorp AI processing my details to respond to this
              inquiry.
            </Label>
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="min-h-11"
              onClick={closeDialog}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!dialogConsent}
              className="min-h-11 disabled:opacity-50"
            >
              Continue
            </Button>
          </div>
        </form>
      </dialog>
    </PrivacyConsentContext.Provider>
  );
}
