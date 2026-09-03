"use client";
import { useRouter } from "next/navigation";
import { DesktopAuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";
import { IconCircle } from "@/features/customer-flow/components/ui/icon-circle";

export function DesktopVerificationFailedSection() {
  const router = useRouter();

  return (
    <DesktopAuthPageLayout>
      <div className="customer-desktop-card flex flex-col items-center text-center">
        <IconCircle
          iconSrc="/customer-flow/icons/error.svg"
          iconAlt="Warning"
          iconWidth={28}
          iconHeight={28}
          variant="large"
        />
        <h1 className="customer-section-title mt-8">Verification Failed</h1>
        <p className="customer-section-description mt-4 max-w-[320px]">
          We couldn&apos;t verify your details. Please check your information and try again. May be
          you are not above 25 Years old
        </p>
        <button
          type="button"
          onClick={() => router.push("/digilocker")}
          className="customer-continue-button mt-8 w-full"
        >
          Try Again
        </button>
      </div>
    </DesktopAuthPageLayout>
  );
}
