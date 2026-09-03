"use client";
import Image from "next/image";
import { AadhaarForm } from "@/features/customer-flow/components/auth/aadhaar-form";
import { AuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";
import { IconCircle } from "@/features/customer-flow/components/ui/icon-circle";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function MobileDigilockerSection() {
  const { state, logout } = useCustomerFlow();
  return (
    <AuthPageLayout>
      <div className="flex flex-col items-center px-6 pt-6 pb-24">
        <div className="w-full text-left">
          <h1 className="font-unbounded text-common-black text-[22px] font-bold">Welcome</h1>
          <p className="font-outfit text-common-gray mt-1 text-sm">+91 {state.session?.mobile}</p>
        </div>

        <div className="my-10">
          <IconCircle
            iconSrc="/customer-flow/icons/lock.svg"
            iconAlt="Shield"
            iconWidth={32}
            iconHeight={32}
          />
        </div>

        <div className="w-full text-center">
          <h2 className="customer-section-title">Verify Your Identity</h2>
          <p className="customer-section-description mt-3 px-2">
            First-time verification is required to ensure the security of your account. Complete the
            process via DigiLocker.
          </p>
        </div>

        <div className="border-common-border mt-8 w-full rounded-2xl border p-5">
          <div className="flex items-center gap-4">
            <div className="bg-brand-light grid size-12 place-items-center rounded-xl">
              <Image src="/customer-flow/icons/lock.svg" alt="" width={20} height={20} />
            </div>
            <div>
              <h3 className="font-outfit text-common-black text-base font-semibold">
                DigiLocker Verification
              </h3>
              <p className="font-geist text-common-gray text-xs">
                Verify using your Aadhaar via DigiLocker
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <AadhaarForm />
        </div>

        <button type="button" onClick={logout} className="customer-logout-button mt-6">
          <Image src="/customer-flow/icons/error.svg" alt="" width={18} height={18} />
          Logout
        </button>
      </div>
    </AuthPageLayout>
  );
}
