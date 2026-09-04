"use client";
import Image from "next/image";
import { AadhaarForm } from "@/features/customer-flow/components/auth/aadhaar-form";
import { DesktopAuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";
import { IconCircle } from "@/features/customer-flow/components/ui/icon-circle";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function DesktopDigilockerSection() {
  const { logout } = useCustomerFlow();
  return (
    <DesktopAuthPageLayout>
      <div className="customer-desktop-card">
        <div className="mb-4 flex justify-center">
          <IconCircle
            iconSrc="/customer-flow/icons/lock.svg"
            iconAlt="Shield"
            iconWidth={32}
            iconHeight={32}
            variant="large"
          />
        </div>

        <div className="text-center">
          <h2 className="font-unbounded text-common-black text-3xl font-black">
            Verify Your Identity
          </h2>
          <p className="customer-section-description mt-2">
            First-time verification is required to ensure the security of your account. Complete the
            process via DigiLocker.
          </p>
        </div>

        <div className="border-common-border mt-4 rounded-2xl border p-3">
          <div className="flex items-center gap-3">
            <div className="bg-brand-light grid size-11 place-items-center rounded-xl">
              <Image src="/customer-flow/icons/lock.svg" alt="" width={20} height={20} />
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

        <button type="button" onClick={logout} className="customer-logout-button mt-5">
          <Image src="/customer-flow/icons/error.svg" alt="" width={18} height={18} />
          Logout
        </button>
      </div>
    </DesktopAuthPageLayout>
  );
}
