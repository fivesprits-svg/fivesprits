"client";

import { Shield, Calculator, UserRound } from "lucide-react";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatDisplayMobile } from "@/features/customer-flow/utils/validation";
import { AgeVerificationForm } from "../auth/age-verification-form";
import { DigilockerConsentForm } from "../auth/digilocker-consent-form";
import { ProfileSetupForm } from "../auth/profile-setup-form";
import { DesktopAuthPageLayout } from "../ui/auth-page-layout";
import { OnboardingStep } from "./";

interface DesktopOnboardingProps {
  step: OnboardingStep | null;
  onComplete: (step: OnboardingStep) => void;
}

export function DesktopOnboarding({ step, onComplete }: DesktopOnboardingProps) {
  const { state } = useCustomerFlow();
  console.log("DesktopOnboarding step::", step);

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
    <DesktopAuthPageLayout>
      <div className="customer-desktop-card">
        <div className="text-left">
          <h1 className="font-unbounded text-common-black text-2xl leading-tight font-extrabold">
            Welcome
          </h1>
          <p className="font-outfit mt-1 text-sm font-semibold tracking-wide text-[#C9A07E]">
            {formatDisplayMobile(state.userDetails?.mobile)}
          </p>
        </div>

        <div className="my-4 flex justify-center">
          <div className="grid place-items-center rounded-full bg-[#faf6f0] p-6">
            <div className="grid place-items-center rounded-full bg-[#f3e9db] p-4">
              <Icon className="size-10 text-[#C9A07E]" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="font-unbounded text-common-black text-2xl font-black">{content.title}</h2>
          <p className="customer-section-description mt-2">{content.description}</p>
        </div>

        <div className="mt-5">
          <Form onComplete={step ? () => onComplete(step) : undefined} />
        </div>
      </div>
    </DesktopAuthPageLayout>
  );
}
