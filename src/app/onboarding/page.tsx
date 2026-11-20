"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { AuthPageSkeleton } from "@/features/customer-flow/components/ui/skeleton";
import { MobileOnboarding } from "@/features/customer-flow/components/onboarding/mobile-onboarding";
import { DesktopOnboarding } from "@/features/customer-flow/components/onboarding/desktop-onboarding";
import {
  isDigilockerCompleted,
  isProfileCompleted,
} from "@/features/customer-flow/utils/auth-guards";
import type { UserDetails } from "@/features/customer-flow/types/state";

export type OnboardingStep = "digilocker" | "age-verification" | "profile";

function determineOnboardingStep(userDetails: UserDetails | null): OnboardingStep | null {
  if (!userDetails) return null;
  const digilockerVerified = isDigilockerCompleted(userDetails);
  const ageVerified = userDetails.ageVerified === true;
  if (!digilockerVerified) return "digilocker";
  if (!ageVerified) return "age-verification";
  return isProfileCompleted(userDetails) ? null : "profile";
}

export default function OnboardingPage() {
  const router = useRouter();
  const { state, hydrated } = useCustomerFlow();
  const [nextStep, setNextStep] = useState<OnboardingStep | null>(null);
  const onboardingStep = determineOnboardingStep(state.userDetails);
  const currentStep = nextStep ?? onboardingStep;

  useEffect(() => {
    if (!hydrated) return;

    const userDetails = state.userDetails;
    if (!userDetails?.verified) {
      router.replace("/");
      return;
    }

    if (userDetails.isGuest) {
      router.replace("/categories");
      return;
    }

    if (onboardingStep === null) {
      router.replace("/categories");
    }
  }, [hydrated, state.userDetails, onboardingStep, router]);

  const handleStepComplete = (completedStep: OnboardingStep) => {
    if (completedStep === "digilocker") {
      setNextStep("age-verification");
    } else if (completedStep === "age-verification") {
      setNextStep("profile");
    } else {
      router.replace("/categories");
    }
  };

  if (
    !hydrated ||
    !state.userDetails?.verified ||
    state.userDetails.isGuest ||
    onboardingStep === null
  ) {
    return <AuthPageSkeleton />;
  }

  return (
    <main id="main-content">
      <MobileOnboarding step={currentStep} onComplete={handleStepComplete} />
      <DesktopOnboarding step={currentStep} onComplete={handleStepComplete} />
    </main>
  );
}
