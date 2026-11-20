"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { AuthPageSkeleton } from "@/features/customer-flow/components/ui/skeleton";
import { DesktopOtpSection } from "@/features/customer-flow/sections/desktop/desktop-otp-section";
import { MobileOtpSection } from "@/features/customer-flow/sections/mobile/mobile-otp-section";

export default function OtpPage() {
  const router = useRouter();
  const { state, hydrated } = useCustomerFlow();

  const isOtpVerified = Boolean(state.userDetails?.verified);

  useEffect(() => {
    if (!hydrated) return;

    if (!state.userDetails?.mobile) {
      router.replace("/");
      return;
    }

    if (isOtpVerified) {
      router.replace("/onboarding");
    }
  }, [hydrated, state.userDetails?.mobile, isOtpVerified, router]);

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
