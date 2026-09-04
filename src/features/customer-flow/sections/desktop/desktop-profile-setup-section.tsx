"use client";
import Image from "next/image";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { ProfileSetupForm } from "@/features/customer-flow/components/auth/profile-setup-form";
import { ProfileSetupHereForm } from "@/features/customer-flow/components/auth/profile-setup-here-form";
import { DesktopAuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";

export function DesktopProfileSetupSection() {
  const { state } = useCustomerFlow();
  const isLoginHereFlow = state.session?.cameFromLoginHere === true;

  return (
    <DesktopAuthPageLayout>
      <div className="customer-desktop-card">
        {isLoginHereFlow ? (
          <>
            <div className="mb-6 flex items-center justify-center gap-2">
              <div className="bg-brand-primary size-3 rounded-full" />
              <span className="font-outfit text-common-black text-lg font-bold">FIVE SPIRIT</span>
            </div>
            <h1 className="customer-section-title text-center">Profile Setup</h1>
            <p className="customer-section-description mt-3 text-center">
              Please provide your delivery and permit details to unlock fast checkout.
            </p>
            <ProfileSetupHereForm />
          </>
        ) : (
          <>
            <div className="mb-4 flex justify-center">
              <Image
                src="/customer-flow/icons/logo.svg"
                alt="Five Spirits"
                width={44}
                height={76}
              />
            </div>
            <h1 className="customer-section-title text-center">Profile Setup</h1>
            <p className="customer-section-description mt-3 text-center">
              Please provide your delivery and permit details to unlock fast checkout.
            </p>
            <ProfileSetupForm />
          </>
        )}
      </div>
    </DesktopAuthPageLayout>
  );
}
