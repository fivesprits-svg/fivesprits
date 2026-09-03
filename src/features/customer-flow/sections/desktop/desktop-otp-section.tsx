import { OtpForm } from "@/features/customer-flow/components/auth/otp-form";
export function DesktopOtpSection() {
  return (
    <section className="hidden min-h-dvh items-center justify-center bg-[#f7f7f5] px-8 lg:flex">
      <div className="customer-desktop-card w-full max-w-lg">
        <p className="text-brand-primary text-sm font-bold tracking-[0.25em]">FIVE SPIRITS</p>
        <h1 className="font-unbounded text-common-black mt-5 text-4xl font-black">
          Verify your access
        </h1>
        <p className="customer-section-description mt-3">
          Use the code provided by the administrator.
        </p>
        <OtpForm />
      </div>
    </section>
  );
}
