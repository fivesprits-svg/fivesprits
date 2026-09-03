"use client";
import { useRouter } from "next/navigation";
import { AuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";
import { IconCircle } from "@/features/customer-flow/components/ui/icon-circle";

export function MobileVerificationFailedSection() {
  const router = useRouter();

  return (
    <AuthPageLayout>
      <div className="flex min-h-[80dvh] flex-col items-center justify-center px-6 text-center md:px-10">
        <IconCircle
          iconSrc="/customer-flow/icons/error.svg"
          iconAlt="Warning"
          iconWidth={28}
          iconHeight={28}
          variant="large"
        />
        <h1 className="customer-section-title mt-8 md:mt-10 md:text-3xl">Verification Failed</h1>
        <p className="customer-section-description mt-4 max-w-[280px] md:mt-5 md:max-w-sm md:text-base">
          We couldn&apos;t verify your details. Please check your information and try again. May be
          you are not above 25 Years old
        </p>
        <button
          type="button"
          onClick={() => router.push("/digilocker")}
          className="customer-continue-button mt-auto mb-10 w-full md:mb-12 md:max-w-sm"
        >
          Try Again
        </button>
      </div>
    </AuthPageLayout>
  );
}
