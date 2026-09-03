import { DesktopOtpSection } from "@/features/customer-flow/sections/desktop/desktop-otp-section";
import { MobileOtpSection } from "@/features/customer-flow/sections/mobile/mobile-otp-section";
export default function OtpPage() {
  return (
    <main id="main-content">
      <MobileOtpSection />
      <DesktopOtpSection />
    </main>
  );
}
