"use client";
import Image from "next/image";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { ProfileSetupForm } from "@/features/customer-flow/components/auth/profile-setup-form";
import { ProfileSetupHereForm } from "@/features/customer-flow/components/auth/profile-setup-here-form";
import { AuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";

export function MobileProfileSetupSection() {
  const { state } = useCustomerFlow();
  const isLoginHereFlow = state.session?.cameFromLoginHere === true;

  return (
    <AuthPageLayout>
      <div className="px-6 pt-4 pb-24 md:px-12 md:pt-6 md:pb-28">
        {isLoginHereFlow ? (
          <>
            <div className="flex items-center gap-2 md:justify-center">
              <div className="bg-brand-primary size-3 rounded-full" />
              <span className="font-outfit text-common-black text-lg font-bold md:text-xl md:font-extrabold">
                FIVE SPIRIT
              </span>
            </div>
            <h1 className="customer-section-title mt-4 md:mt-6 md:text-center md:text-[32px]">
              Profile Setup
            </h1>
            <p className="customer-section-description mt-3 max-w-[340px] md:mx-auto md:mt-4 md:max-w-md md:text-center md:text-base md:leading-relaxed">
              Please provide your delivery and permit details to unlock fast checkout.
            </p>
            <div className="md:mx-auto md:max-w-md">
              <ProfileSetupHereForm />
            </div>
          </>
        ) : (
          <>
            <div className="flex h-[108px] items-center gap-3 md:h-[120px] md:justify-center">
              <Image
                src="/customer-flow/icons/logo.svg"
                alt="Five Spirits"
                width={44}
                height={76}
              />
            </div>
            <h1 className="customer-section-title mt-4 md:mt-6 md:text-center md:text-[32px]">
              Profile Setup
            </h1>
            <p className="customer-section-description mt-3 max-w-[340px] md:mx-auto md:mt-4 md:max-w-md md:text-center md:text-base md:leading-relaxed">
              Please provide your delivery and permit details to unlock fast checkout.
            </p>
            <div className="md:mx-auto md:max-w-md">
              <ProfileSetupForm />
            </div>
          </>
        )}
      </div>
    </AuthPageLayout>
  );
}
