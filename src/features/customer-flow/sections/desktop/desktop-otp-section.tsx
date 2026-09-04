import { OtpForm } from "@/features/customer-flow/components/auth/otp-form";
export function DesktopOtpSection() {
  return (
    <section className="hidden min-h-dvh items-center justify-center bg-[#f8f9fa] px-8 md:flex">
      <div className="customer-desktop-card w-full max-w-lg">
        {/* <p className="text-brand-primary text-sm font-bold tracking-[0.25em]">FIVE SPIRITS</p> */}
        <h1 className="font-unbounded text-common-black mt-5 text-3xl font-black uppercase">
          Verify your number
        </h1>
        <p className="customer-section-description mt-3">
          We sent a verification code to Admin please check with them.
        </p>
        <OtpForm />
      </div>
    </section>
  );
}
