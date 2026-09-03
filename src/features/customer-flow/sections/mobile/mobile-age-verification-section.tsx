import { AgeVerificationForm } from "@/features/customer-flow/components/auth/age-verification-form";
import { AuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";
import { IconCircle } from "@/features/customer-flow/components/ui/icon-circle";

export function MobileAgeVerificationSection() {
  return (
    <AuthPageLayout>
      <div className="flex min-h-[80dvh] flex-col items-center px-6 pt-12 pb-24">
        <IconCircle
          iconSrc="/customer-flow/icons/lock.svg"
          iconAlt="Age verification"
          iconWidth={24}
          iconHeight={24}
        />
        <div className="mt-8 text-center">
          <h1 className="customer-section-title">Age Verification</h1>
          <p className="customer-section-description mt-3 px-2">
            Access to this catalogue is restricted. You must confirm that you are of legal age in
            your jurisdiction to proceed.
          </p>
        </div>
        <AgeVerificationForm />
      </div>
    </AuthPageLayout>
  );
}
