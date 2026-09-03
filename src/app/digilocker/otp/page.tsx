import { MobileDigilockerOtpSection } from "@/features/customer-flow/sections/mobile/mobile-digilocker-otp-section";
import { DesktopDigilockerOtpSection } from "@/features/customer-flow/sections/desktop/desktop-digilocker-otp-section";
export default function DigilockerOtpPage() {
  return (
    <main id="main-content">
      <MobileDigilockerOtpSection />
      <DesktopDigilockerOtpSection />
    </main>
  );
}
