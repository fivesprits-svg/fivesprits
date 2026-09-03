import { MobileVerificationProcessingSection } from "@/features/customer-flow/sections/mobile/mobile-verification-processing-section";
import { DesktopVerificationProcessingSection } from "@/features/customer-flow/sections/desktop/desktop-verification-processing-section";
export default function VerificationProcessingPage() {
  return (
    <main id="main-content">
      <MobileVerificationProcessingSection />
      <DesktopVerificationProcessingSection />
    </main>
  );
}
