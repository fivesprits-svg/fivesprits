"use client";
import Image from "next/image";
import { ProfileSetupForm } from "@/features/customer-flow/components/auth/profile-setup-form";
import { DesktopAuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";

export function DesktopProfileSetupSection() {
  return (
    <DesktopAuthPageLayout>
      <div className="customer-desktop-card">
        <div className="mb-6 flex justify-center">
          <Image src="/customer-flow/icons/logo.svg" alt="Five Spirits" width={44} height={76} />
        </div>
        <h1 className="customer-section-title text-center">Profile Setup</h1>
        <p className="customer-section-description mt-3 text-center">
          Please provide your delivery and permit details to unlock fast checkout.
        </p>
        <ProfileSetupForm />
      </div>
    </DesktopAuthPageLayout>
  );
}
