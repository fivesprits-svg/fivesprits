"client";

import { Shield, Calculator, UserRound } from "lucide-react";
import { DigilockerConsentForm } from "../auth/digilocker-consent-form";
import { AgeVerificationForm } from "../auth/age-verification-form";
import { ProfileSetupForm } from "../auth/profile-setup-form";
import { AuthPageLayout } from "../ui/auth-page-layout";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatDisplayMobile } from "@/features/customer-flow/utils/validation";
import { OnboardingStep } from "./";

interface MobileOnboardingProps {
  step: OnboardingStep | null;
  onComplete: (step: OnboardingStep) => void;
}

export function MobileOnboarding({ step, onComplete }: MobileOnboardingProps) {
  const { state } = useCustomerFlow();

  const getStepContent = () => {
    switch (step) {
      case "digilocker":
        return {
          title: "Verify Your Identity",
          description:
            "First-time verification is required to ensure the security of your account. Complete the process via DigiLocker.",
          Icon: Shield,
          Form: DigilockerConsentForm,
        };
      case "age-verification":
        return {
          title: "Age Verification",
          description:
            "Please confirm your age to continue. You must be 25 years or older to access our services.",
          Icon: Calculator,
          Form: AgeVerificationForm,
        };
      case "profile":
        return {
          title: "Complete Your Profile",
          description:
            "Almost done! Please provide your name to complete the registration process.",
          Icon: UserRound,
          Form: ProfileSetupForm,
        };
      default:
        return null;
    }
  };

  const content = getStepContent();
  if (!content) return null;

  const Form = content.Form;
  const Icon = content.Icon;

  return (
    <AuthPageLayout>
      <div className="flex flex-col items-center px-6 pt-4 pb-16 md:px-12 md:pt-6 md:pb-20">
        <div className="w-full text-left">
          <h1 className="font-unbounded text-common-black text-[24px] leading-tight font-extrabold md:text-[26px]">
            Welcome
          </h1>
          <p className="font-geist mt-1 text-sm font-semibold tracking-wide text-[#C9A07E] md:mt-1.5 md:text-base">
            {formatDisplayMobile(state.userDetails?.mobile)}
          </p>
        </div>

        <div className="my-6 grid place-items-center rounded-full bg-[#faf6f0] p-6 md:my-8 md:p-8">
          <div className="grid place-items-center rounded-full bg-[#f3e9db] p-4 md:p-5">
            <Icon className="size-10 text-[#C9A07E] md:size-12" />
          </div>
        </div>

        <div className="w-full text-center">
          <h2 className="customer-section-title md:text-[32px]">{content.title}</h2>
          <p className="customer-section-description mt-2 max-w-[340px] md:mx-auto md:mt-3 md:max-w-md md:text-base md:leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className="mt-4 w-full md:mx-auto md:mt-6 md:max-w-md">
          <Form onComplete={step ? () => onComplete(step) : undefined} />
        </div>
      </div>
    </AuthPageLayout>
  );
}
