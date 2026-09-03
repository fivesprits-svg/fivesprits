import { OtpForm } from "@/features/customer-flow/components/auth/otp-form";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { MobileHomeIndicator } from "@/features/customer-flow/components/navigation/mobile-system-chrome";
export function MobileOtpSection() {
  return (
    <section className="mx-auto min-h-dvh w-full max-w-[390px] bg-white lg:hidden">
      <MobileHeader title="" backHref="/" />
      <div className="px-6 pt-12">
        <h1 className="text-[34px] leading-[38px] font-black">
          VERIFY YOUR
          <br />
          NUMBER
        </h1>
        <p className="mt-4 max-w-[290px] text-sm leading-6 text-[#6b7280]">
          We sent a verification code to Admin please check with them
        </p>
        <OtpForm />
      </div>
      <MobileHomeIndicator />
    </section>
  );
}
