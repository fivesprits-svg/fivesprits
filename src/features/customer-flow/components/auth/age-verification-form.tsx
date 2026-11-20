"use client";
import { FlowNavButtons } from "@/features/customer-flow/components/auth/flow-nav-buttons";
import { TermsOfServiceModal } from "@/features/customer-flow/components/auth/terms-of-service-modal";
import { OnboardingStep } from "@/features/customer-flow/components/onboarding/index";
import { updateProfileApi } from "@/features/customer-flow/services/profile-api";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AgeVerificationFormProps {
  onComplete?: (step: OnboardingStep) => void;
}

export function AgeVerificationForm({ onComplete }: AgeVerificationFormProps) {
  const router = useRouter();
  const { state, setUserDetails, updateFormDraft } = useCustomerFlow();
  const draft = state.userDetails?.formDrafts?.ageVerification;
  const [confirmed, setConfirmed] = useState(draft?.confirmed ?? false);
  const [showTerms, setShowTerms] = useState(false);
  const [loading, setloading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!confirmed) return;
    setloading(true);
    try {
      const profile = await updateProfileApi({ ageVerified: true });
      setUserDetails({ ...profile, ageVerified: true });

      // Trigger callback for onboarding flow
      if (onComplete) {
        onComplete("age-verification");
      } else {
        // Fallback to old navigation
        router.push("/profile-setup");
      }
    } finally {
      setloading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 w-full space-y-6 md:mt-10 md:max-w-md md:space-y-8">
      <button
        type="button"
        onClick={() => {
          const next = !confirmed;
          setConfirmed(next);
          updateFormDraft({
            type: "age-verification",
            data: { confirmed: next },
          });
        }}
        className="border-common-border flex w-full items-start gap-4 rounded-2xl border p-5 text-left md:gap-5 md:p-6"
      >
        <div
          className={`customer-checkbox ${confirmed ? "customer-checkbox-checked" : ""}`}
          aria-checked={confirmed}
          role="checkbox"
        >
          {confirmed && (
            <Image src="/customer-flow/icons/success.svg" alt="" width={14} height={14} />
          )}
        </div>
        <span className="font-geist text-common-black cursor-pointer text-[15px] leading-snug md:text-base md:leading-normal">
          I confirm that I am 25 years of age or older.
        </span>
      </button>
      <FlowNavButtons
        backHref="/onboarding"
        submitLabel="Continue"
        loading={loading}
        loadingLabel="Processing..."
        disabled={!confirmed}
      />
      <p className="font-geist text-common-gray text-center text-xs md:text-sm">
        By continuing, you agree to our{" "}
        <button
          type="button"
          onClick={() => setShowTerms(true)}
          className="text-common-black text-md cursor-pointer font-semibold underline"
        >
          Terms of Service
        </button>
      </p>
      <TermsOfServiceModal open={showTerms} onClose={() => setShowTerms(false)} />
    </form>
  );
}
