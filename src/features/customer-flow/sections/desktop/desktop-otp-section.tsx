import { OtpForm } from "@/features/customer-flow/components/auth/otp-form";
export function DesktopOtpSection() {
  return (
    <section className="hidden min-h-dvh items-center justify-center bg-[#f7f7f5] px-8 lg:flex">
      <div className="w-full max-w-lg rounded-3xl border border-black/10 bg-white p-12 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
        <p className="text-sm font-bold tracking-[0.25em] text-[#a67854]">FIVE SPIRITS</p>
        <h1 className="mt-5 text-4xl font-black">Verify your access</h1>
        <p className="mt-3 text-[#6b7280]">Use the code provided by the administrator.</p>
        <OtpForm />
      </div>
    </section>
  );
}
