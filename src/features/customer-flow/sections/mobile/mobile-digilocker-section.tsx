"use client";
import Image from "next/image";
import { AadhaarForm } from "@/features/customer-flow/components/auth/aadhaar-form";
import { AuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";
import { IconCircle } from "@/features/customer-flow/components/ui/icon-circle";
import { Breadcrumb } from "@/features/customer-flow/components/navigation/breadcrumb";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatDisplayMobile } from "@/features/customer-flow/utils/validation";

export function MobileDigilockerSection() {
  const { state, logout } = useCustomerFlow();
  return (
    <AuthPageLayout>
      <div className="flex flex-col items-center px-6 pt-4 pb-16 md:px-12 md:pt-6 md:pb-20">
        <div className="w-full">
          <Breadcrumb
            homeHref="/"
            items={[{ label: "OTP", href: "/otp" }, { label: "Aadhaar Verification" }]}
          />
        </div>
        <div className="w-full text-left">
          <h1 className="font-unbounded text-common-black text-[24px] leading-tight font-extrabold md:text-[26px]">
            Welcome
          </h1>
          <p className="font-geist mt-1 text-sm font-semibold tracking-wide text-[#C9A07E] md:mt-1.5 md:text-base">
            {formatDisplayMobile(state.session?.mobile)}
          </p>
        </div>

        <div className="my-6 grid place-items-center rounded-full bg-[#faf6f0] p-6 md:my-8 md:p-8">
          <div className="grid place-items-center rounded-full bg-[#f3e9db] p-4 md:p-5">
            <IconCircle
              iconSrc="/customer-flow/icons/shield-badge.svg"
              iconAlt="Shield"
              iconWidth={80}
              iconHeight={80}
              variant="large"
            />
          </div>
        </div>

        <div className="w-full text-center">
          <h2 className="customer-section-title md:text-[32px]">Verify Your Identity</h2>
          <p className="customer-section-description mt-2 max-w-[340px] md:mx-auto md:mt-3 md:max-w-md md:text-base md:leading-relaxed">
            First-time verification is required to ensure the security of your account. Complete the
            process via DigiLocker.
          </p>
        </div>

        <div className="border-common-border mt-4 w-full rounded-2xl border p-3 md:mx-auto md:mt-6 md:max-w-md md:p-5">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#FAF3EB]">
              <Image
                src="/customer-flow/icons/digilocker-badge-icon.svg"
                alt=""
                width={48}
                height={48}
              />
            </div>
            <div>
              <h3 className="font-outfit text-common-black text-sm font-semibold md:text-base">
                DigiLocker Verification
              </h3>
              <p className="font-geist text-common-gray text-xs md:text-sm">
                Verify using your Aadhaar via DigiLocker
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 w-full md:mx-auto md:mt-6 md:max-w-md">
          <AadhaarForm />
        </div>

        <button type="button" onClick={logout} className="customer-logout-button mt-4 md:mt-6">
          <Image src="/customer-flow/icons/log-out.svg" alt="" width={18} height={18} />
          Logout
        </button>
      </div>
    </AuthPageLayout>
  );
}
