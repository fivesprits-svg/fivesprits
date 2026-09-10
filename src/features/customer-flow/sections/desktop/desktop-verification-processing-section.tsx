"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { mockVerifyAadhaar } from "@/features/customer-flow/utils/verification-mock";
import { DesktopAuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";
import Image from "next/image";

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
        <div className="my-4 grid place-items-center rounded-full bg-[#faf6f0] p-6">
          <div className="grid place-items-center rounded-full bg-[#f3e9db] p-4">
            <div className="grid size-20 place-items-center rounded-full bg-white/80">
              <Image
                src="/customer-flow/icons/shield-badge.svg"
                alt="Verification"
                width={64}
                height={64}
              />
            </div>
          </div>
        </div>
        <h1 className="font-unbounded text-common-black mt-2 text-3xl font-black">
          Verification in Progress
        </h1>
        <p className="customer-section-description mt-4 max-w-[320px]">
          Please wait while we securely verify your order details and payment credentials.
        </p>
        <div className="mt-8">
          <div className="border-common-border border-t-brand-primary size-8 animate-spin rounded-full border-4" />
        </div>
        <button
          type="button"
          onClick={() => router.push("/digilocker/otp")}
          className="customer-form-nav-back mt-8"
        >
          Back
        </button>
      </div>
    </DesktopAuthPageLayout>
  );
}
