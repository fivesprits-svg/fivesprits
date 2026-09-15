"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { AuthPageSkeleton } from "@/features/customer-flow/components/ui/skeleton";
import {
  isSessionLoggedIn,
  isDigilockerCompleted,
  isProfileCompleted,
} from "@/features/customer-flow/utils/auth-guards";
import { MobileAgeVerificationSection } from "@/features/customer-flow/sections/mobile/mobile-age-verification-section";
import { DesktopAgeVerificationSection } from "@/features/customer-flow/sections/desktop/desktop-age-verification-section";

export default function AgeVerificationPage() {
  const router = useRouter();
  const { state, hydrated } = useCustomerFlow();

  const loggedIn = isSessionLoggedIn(state.userDetails);
  const digilockerDone = isDigilockerCompleted(state.userDetails);
  const profileDone = isProfileCompleted(state.userDetails);

  useEffect(() => {
    if (!hydrated) return;

    if (!loggedIn) {
      router.replace("/");
      return;
    }

    if (!digilockerDone) {
      router.replace("/digilocker");
      return;
    }

    if (profileDone) {
      router.replace("/categories");
      return;
    }
  }, [hydrated, loggedIn, digilockerDone, profileDone, router]);

  if (!hydrated || !loggedIn || !digilockerDone || profileDone) {
    return <AuthPageSkeleton />;
  }

  return (
    <main id="main-content">
      <MobileAgeVerificationSection />
      <DesktopAgeVerificationSection />
    </main>
  );
}
