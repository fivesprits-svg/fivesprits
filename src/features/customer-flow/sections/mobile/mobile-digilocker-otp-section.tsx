import { DigilockerOtpForm } from "@/features/customer-flow/components/auth/digilocker-otp-form";
import { AuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";

export function MobileDigilockerOtpSection() {
  return (
    <AuthPageLayout>
      <div className="px-6 pt-6 pb-24 md:px-12 md:pt-8 md:pb-28">
        <h1 className="font-unbounded text-common-black text-[28px] leading-tight font-black uppercase md:text-[36px] md:leading-tight">
          Verify Your
          <br />
          Identity
        </h1>
        <p className="font-geist text-common-gray mt-4 text-sm md:mt-5 md:text-base md:leading-relaxed">
          Verify using your Aadhaar via DigiLocker
        </p>
        <p className="font-geist text-common-black mt-2 text-base font-semibold md:mt-3 md:text-lg md:font-bold">
          1234 5678 9012
        </p>
        <p className="font-geist text-common-gray mt-4 text-sm md:mt-5 md:text-base md:leading-relaxed">
          We sent a verification code to
        </p>
        <p className="font-geist text-common-black mt-1 text-sm font-semibold md:mt-2 md:text-base md:font-bold">
          +91 ●●●●● ●●738
        </p>
        <DigilockerOtpForm />
      </div>
    </AuthPageLayout>
  );
}
