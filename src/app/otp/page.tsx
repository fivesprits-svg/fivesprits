"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { AuthPageSkeleton } from "@/features/customer-flow/components/ui/skeleton";
import {
  isDigilockerCompleted,
  isProfileCompleted,
} from "@/features/customer-flow/utils/auth-guards";
import { DesktopOtpSection } from "@/features/customer-flow/sections/desktop/desktop-otp-section";
import { MobileOtpSection } from "@/features/customer-flow/sections/mobile/mobile-otp-section";

export default function OtpPage() {
  const router = useRouter();
  const { state, hydrated } = useCustomerFlow();

  const digilockerDone = isDigilockerCompleted(state.userDetails);
  const profileDone = isProfileCompleted(state.userDetails);
  const isOtpVerified = Boolean(state.userDetails?.verified);

  useEffect(() => {
    if (!hydrated) return;

    if (!state.userDetails?.mobile) {
      router.replace("/");
      return;
    }

    if (isOtpVerified) {
      if (!digilockerDone) {
        router.replace("/digilocker");
      } else if (!profileDone) {
        router.replace(state.userDetails?.ageVerified ? "/profile-setup" : "/age-verification");
      } else {
        router.replace("/categories");
      }
    }
  }, [
    hydrated,
    state.userDetails?.mobile,
    state.userDetails?.ageVerified,
    isOtpVerified,
    digilockerDone,
    profileDone,
    router,
  ]);

  if (!hydrated || !state.userDetails?.mobile || isOtpVerified) {
    return <AuthPageSkeleton />;
  }

  return (
    <main id="main-content">
      <MobileOtpSection />
      <DesktopOtpSection />
    </main>
  );
}
