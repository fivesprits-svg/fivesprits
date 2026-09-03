import { AgeVerificationForm } from "@/features/customer-flow/components/auth/age-verification-form";
import { DesktopAuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";
import { IconCircle } from "@/features/customer-flow/components/ui/icon-circle";

export function DesktopAgeVerificationSection() {
  return (
    <DesktopAuthPageLayout>
      <div className="customer-desktop-card flex flex-col items-center text-center">
        <IconCircle
          iconSrc="/customer-flow/icons/lock.svg"
          iconAlt="Age verification"
          iconWidth={24}
          iconHeight={24}
        />
        <h1 className="customer-section-title mt-8">Age Verification</h1>
        <p className="customer-section-description mt-3 max-w-[360px]">
          Access to this catalogue is restricted. You must confirm that you are of legal age in your
          jurisdiction to proceed.
        </p>
        <AgeVerificationForm />
      </div>
    </DesktopAuthPageLayout>
  );
}
