"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { mockVerifyAadhaar } from "@/features/customer-flow/utils/verification-mock";
import { AuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";
import { IconCircle } from "@/features/customer-flow/components/ui/icon-circle";

export function MobileVerificationProcessingSection() {
  const router = useRouter();
  const { state, hydrated, completeVerification } = useCustomerFlow();

  useEffect(() => {
    if (!hydrated) return;

    if (!state.session?.aadhaarNumber) {
      router.replace("/digilocker");
      return;
    }

    const timer = setTimeout(() => {
      const result = mockVerifyAadhaar(state.session!.aadhaarNumber!);
      completeVerification(result.dateOfBirth, result.age);

      if (result.age < 25) {
        router.push("/digilocker/verification-failed");
      } else {
        router.push("/age-verification");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hydrated, state.session, completeVerification, router]);

  if (!hydrated) {
    return (
      <AuthPageLayout>
        <div className="flex min-h-[80dvh] flex-col items-center justify-center px-6 text-center md:px-12">
          <IconCircle
            iconSrc="/customer-flow/icons/lock.svg"
            iconAlt="Verification"
            iconWidth={32}
            iconHeight={32}
            variant="large"
          />
          <h1 className="customer-section-title mt-8 md:mt-10 md:text-[32px]">
            Verification in Progress
          </h1>
          <p className="customer-section-description mt-4 max-w-[280px] md:mt-5 md:max-w-sm md:text-base md:leading-relaxed">
            Please wait while we securely verify your order details and payment credentials.
          </p>
          <div className="mt-8 md:mt-10">
            <div className="border-common-border border-t-brand-primary size-8 animate-spin rounded-full border-4 md:size-10" />
          </div>
        </div>
      </AuthPageLayout>
    );
  }

  return (
    <AuthPageLayout>
      <div className="flex min-h-[80dvh] flex-col items-center justify-center px-6 text-center md:px-12">
        <IconCircle
          iconSrc="/customer-flow/icons/lock.svg"
          iconAlt="Verification"
          iconWidth={32}
          iconHeight={32}
          variant="large"
        />
        <h1 className="customer-section-title mt-8 md:mt-10 md:text-[32px]">
          Verification in Progress
        </h1>
        <p className="customer-section-description mt-4 max-w-[280px] md:mt-5 md:max-w-sm md:text-base md:leading-relaxed">
          Please wait while we securely verify your order details and payment credentials.
        </p>
        <div className="mt-8 md:mt-10">
          <div className="border-common-border border-t-brand-primary size-8 animate-spin rounded-full border-4 md:size-10" />
        </div>
      </div>
    </AuthPageLayout>
  );
}
