"use client";
import Image from "next/image";
import { AadhaarForm } from "@/features/customer-flow/components/auth/aadhaar-form";
import { DesktopAuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";
import { IconCircle } from "@/features/customer-flow/components/ui/icon-circle";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatDisplayMobile } from "@/features/customer-flow/utils/validation";

export function DesktopDigilockerSection() {
  const { state } = useCustomerFlow();
  return (
    <DesktopAuthPageLayout>
      <div className="customer-desktop-card">
        <div className="text-left">
          <h1 className="font-unbounded text-common-black text-2xl leading-tight font-extrabold">
            Welcome
          </h1>
          <p className="font-outfit mt-1 text-sm font-semibold tracking-wide text-[#C9A07E]">
            {formatDisplayMobile(state.userDetails?.mobile)}
          </p>
        </div>
        <div className="my-4 flex justify-center">
          <div className="grid place-items-center rounded-full bg-[#faf6f0] p-6">
            <div className="grid place-items-center rounded-full bg-[#f3e9db] p-4">
              <IconCircle
                iconSrc="/customer-flow/icons/shield-badge.svg"
                iconAlt="Shield"
                iconWidth={40}
                iconHeight={40}
                variant="large"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="font-unbounded text-common-black text-2xl font-black">
            Verify Your Identity
          </h2>
          <p className="customer-section-description mt-2">
            First-time verification is required to ensure the security of your account. Complete the
            process via DigiLocker.
          </p>
        </div>

        <div className="border-common-border mt-4 rounded-2xl border p-3">
          <div className="flex items-center gap-3">
            <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#FAF3EB]">
              <Image
                src="/customer-flow/icons/digilocker-badge-icon.svg"
                alt=""
                width={48}
                height={48}
                className="rounded-[14px]"
              />
            </div>
            <div>
              <h3 className="font-outfit text-common-black text-sm font-semibold">
                DigiLocker Verification
              </h3>
              <p className="font-geist text-common-gray text-xs">
                Verify using your Aadhaar via DigiLocker
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <AadhaarForm />
        </div>
      </div>
    </DesktopAuthPageLayout>
  );
}
