import { OtpForm } from "@/features/customer-flow/components/auth/otp-form";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { MobileHomeIndicator } from "@/features/customer-flow/components/navigation/mobile-system-chrome";
export function MobileOtpSection() {
  return (
    <section className="customer-page-container lg:hidden">
      <MobileHeader title="" backHref="/" />
      <div className="px-6 pt-12 md:px-10">
        <h1 className="font-unbounded text-common-black text-[30px] leading-tight font-black uppercase md:text-[40px]">
          Verify Your
          <br />
          Number
        </h1>
        <p className="customer-section-description mt-4 max-w-[290px] md:max-w-md md:text-base">
          We sent a verification code to Admin please check with them
        </p>
        <OtpForm />
      </div>
      <MobileHomeIndicator />
    </section>
  );
}
