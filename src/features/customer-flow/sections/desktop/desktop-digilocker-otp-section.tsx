import { DigilockerOtpForm } from "@/features/customer-flow/components/auth/digilocker-otp-form";
import { DesktopAuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";

export function DesktopDigilockerOtpSection() {
  return (
    <DesktopAuthPageLayout>
      <div className="customer-desktop-card">
        <h1 className="font-unbounded text-common-black text-3xl font-black uppercase">
          Verify Your
          <br />
          Identity
        </h1>
        <p className="font-geist text-common-gray mt-4 text-sm">
          Verify using your Aadhaar via DigiLocker
        </p>
        <p className="font-geist text-common-black mt-2 text-base font-semibold">1234 5678 9012</p>
        <p className="font-geist text-common-gray mt-4 text-sm">We sent a verification code to</p>
        <p className="font-geist text-common-black mt-1 text-sm font-semibold">+91 ●●●●● ●●738</p>
        <DigilockerOtpForm />
      </div>
    </DesktopAuthPageLayout>
  );
}
