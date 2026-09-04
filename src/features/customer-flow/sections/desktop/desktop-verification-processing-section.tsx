"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { mockVerifyAadhaar } from "@/features/customer-flow/utils/verification-mock";
import { DesktopAuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";
import { IconCircle } from "@/features/customer-flow/components/ui/icon-circle";

export function DesktopVerificationProcessingSection() {
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

  return (
    <DesktopAuthPageLayout>
      <div className="customer-desktop-card flex flex-col items-center text-center">
        <IconCircle
          iconSrc="/customer-flow/icons/lock.svg"
          iconAlt="Verification"
          iconWidth={32}
          iconHeight={32}
          variant="large"
        />
        <h1 className="customer-section-title mt-8">Verification in Progress</h1>
        <p className="customer-section-description mt-4 max-w-[320px]">
          Please wait while we securely verify your order details and payment credentials.
        </p>
        <div className="mt-8">
          <div className="border-common-border border-t-brand-primary size-8 animate-spin rounded-full border-4" />
        </div>
      </div>
    </DesktopAuthPageLayout>
  );
}
