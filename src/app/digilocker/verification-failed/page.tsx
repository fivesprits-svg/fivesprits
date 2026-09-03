import { MobileVerificationFailedSection } from "@/features/customer-flow/sections/mobile/mobile-verification-failed-section";
import { DesktopVerificationFailedSection } from "@/features/customer-flow/sections/desktop/desktop-verification-failed-section";
export default function VerificationFailedPage() {
  return (
    <main id="main-content">
      <MobileVerificationFailedSection />
      <DesktopVerificationFailedSection />
    </main>
  );
}
