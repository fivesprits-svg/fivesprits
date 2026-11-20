"use client";

import { useState } from "react";
import { startDigilockerKyc } from "@/features/customer-flow/services/digilocker-api";
import { FlowNavButtons } from "@/features/customer-flow/components/auth/flow-nav-buttons";

interface DigilockerConsentFormProps {
  onComplete?: () => void;
}

const UNAVAILABLE_MESSAGE = "KYC is temporarily unavailable. Please try again later.";

export function DigilockerConsentForm({ onComplete }: DigilockerConsentFormProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await startDigilockerKyc({
        documents: ["aadhaar"],
      });
      sessionStorage.setItem("digilockerAttemptId", result.attemptId);

      // Trigger callback for onboarding flow
      if (onComplete) {
        onComplete();
      }

      // Redirect to DigiLocker
      window.location.assign(result.redirectUrl);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "";
      setError(
        message && !/^request failed with status 5\d\d$/i.test(message)
          ? message
          : UNAVAILABLE_MESSAGE,
      );
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 md:space-y-5" noValidate>
      <p className="font-geist text-common-gray text-sm">
        You will securely complete identity verification through DigiLocker. We do not collect
        document numbers or files here.
      </p>
      {error && (
        <p role="alert" className="text-common-error text-xs font-medium md:text-sm">
          {error}
        </p>
      )}
      <FlowNavButtons
        hideBack
        submitLabel="Continue with DigiLocker"
        loading={loading}
        loadingLabel="Opening DigiLocker..."
      />
    </form>
  );
}
