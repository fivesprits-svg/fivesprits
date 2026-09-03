"use client";
import Image from "next/image";
import { ProfileSetupForm } from "@/features/customer-flow/components/auth/profile-setup-form";
import { AuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";

export function MobileProfileSetupSection() {
  return (
    <AuthPageLayout>
      <div className="px-6 pt-4 pb-24">
        <div className="flex h-[108px] items-center gap-3">
          <Image src="/customer-flow/icons/logo.svg" alt="Five Spirits" width={44} height={76} />
        </div>
        <h1 className="customer-section-title mt-4">Profile Setup</h1>
        <p className="customer-section-description mt-3">
          Please provide your delivery and permit details to unlock fast checkout.
        </p>
        <ProfileSetupForm />
      </div>
    </AuthPageLayout>
  );
}
