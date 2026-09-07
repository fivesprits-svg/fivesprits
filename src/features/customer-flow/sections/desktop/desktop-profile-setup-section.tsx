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
    <DesktopAuthPageLayout maxWidth={isLoginHereFlow ? "max-w-4xl" : "max-w-xl"}>
      <div className="rounded-3xl border border-gray-200/80 bg-white p-4 shadow-xl shadow-black/5 md:p-8">
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Image
              src="/logo.svg"
              alt="Five Spirit"
              width={32}
              height={55}
              className="h-10 w-auto"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f7f4ee] px-3 py-1 text-[11px] font-bold tracking-wider text-[#a67854] uppercase">
            <span>Customer Onboarding</span>
          </div>

          <h1 className="font-unbounded mt-2 text-2xl font-black text-gray-900 md:text-3xl">
            Profile Setup
          </h1>
          <p className="font-geist mt-1.5 max-w-lg text-xs leading-relaxed text-gray-500 md:text-sm">
            {isLoginHereFlow
              ? "Provide your delivery and permit credentials to unlock fast, authorized checkout."
              : "Confirm your customer profile information to get started."}
          </p>
        </div>

        {/* Dynamic Form */}
        <div className="mt-3">
          {isLoginHereFlow ? <ProfileSetupHereForm /> : <ProfileSetupForm />}
        </div>
      </div>
    </DesktopAuthPageLayout>
  );
}
