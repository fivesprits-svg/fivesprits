"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { AuthPageSkeleton } from "@/features/customer-flow/components/ui/skeleton";
import { isSessionLoggedIn, isProfileCompleted } from "@/features/customer-flow/utils/auth-guards";
import { MobileDigilockerOtpSection } from "@/features/customer-flow/sections/mobile/mobile-digilocker-otp-section";
import { DesktopDigilockerOtpSection } from "@/features/customer-flow/sections/desktop/desktop-digilocker-otp-section";

export default function DigilockerOtpPage() {
  const router = useRouter();
  const { state, hydrated } = useCustomerFlow();

  const loggedIn = isSessionLoggedIn(state.userDetails);
  const profileDone = isProfileCompleted(state.userDetails);

  useEffect(() => {
    if (!hydrated) return;

    if (!loggedIn) {
      router.replace("/");
      return;
    }

    if (profileDone) {
      router.replace("/categories");
      return;
    }

    if (!state.userDetails?.aadhaarNumber) {
      router.replace("/digilocker");
      return;
    }
  }, [hydrated, loggedIn, profileDone, state.userDetails?.aadhaarNumber, router]);

  if (!hydrated || !loggedIn || profileDone || !state.userDetails?.aadhaarNumber) {
    return <AuthPageSkeleton />;
  }

  return (
    <main id="main-content">
      <MobileDigilockerOtpSection />
      <DesktopDigilockerOtpSection />
    </main>
  );
}
