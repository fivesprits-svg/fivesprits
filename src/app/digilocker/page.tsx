"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { AuthPageSkeleton } from "@/features/customer-flow/components/ui/skeleton";
import { isSessionLoggedIn, isProfileCompleted } from "@/features/customer-flow/utils/auth-guards";
import { MobileDigilockerSection } from "@/features/customer-flow/sections/mobile/mobile-digilocker-section";
import { DesktopDigilockerSection } from "@/features/customer-flow/sections/desktop/desktop-digilocker-section";

export default function DigilockerPage() {
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

    // Intercept browser back button while on mandatory DigiLocker page
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hydrated, loggedIn, profileDone, router]);

  if (!hydrated || !loggedIn || profileDone) {
    return <AuthPageSkeleton />;
  }

  return (
    <main id="main-content">
      <MobileDigilockerSection />
      <DesktopDigilockerSection />
    </main>
  );
}
