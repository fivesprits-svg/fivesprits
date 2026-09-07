"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { mockVerifyAadhaar } from "@/features/customer-flow/utils/verification-mock";
import { AuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";
import { Breadcrumb } from "@/features/customer-flow/components/navigation/breadcrumb";
import Image from "next/image";

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

  return (
    <AuthPageLayout>
      <div className="flex min-h-[80dvh] flex-col items-center px-6 pt-6 pb-24 md:px-12 md:pt-8 md:pb-28">
        <div className="w-full">
          <Breadcrumb
            homeHref="/"
            items={[
              { label: "DigiLocker OTP", href: "/digilocker/otp" },
              { label: "Verification" },
            ]}
          />
        </div>
        <div className="my-6 grid place-items-center rounded-full bg-[#faf6f0] p-6 md:my-8 md:p-8">
          <div className="grid place-items-center rounded-full bg-[#f3e9db] p-4 md:p-5">
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
        <h1 className="font-unbounded text-common-black mt-2 text-center text-[26px] leading-tight font-black md:text-[32px]">
          Verification in
          <br />
          Progress
        </h1>
        <p className="customer-section-description mt-4 max-w-[280px] text-center md:mt-5 md:max-w-sm md:text-base md:leading-relaxed">
          Please wait while we securely verify your order details and payment credentials.
        </p>
        <div className="mt-8 md:mt-10">
          <div className="border-common-border border-t-brand-primary size-8 animate-spin rounded-full border-4 md:size-10" />
        </div>
      </div>
    </AuthPageLayout>
  );
}
