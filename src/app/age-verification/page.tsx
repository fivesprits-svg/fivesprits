import { MobileAgeVerificationSection } from "@/features/customer-flow/sections/mobile/mobile-age-verification-section";
import { DesktopAgeVerificationSection } from "@/features/customer-flow/sections/desktop/desktop-age-verification-section";
export default function AgeVerificationPage() {
  return (
    <main id="main-content">
      <MobileAgeVerificationSection />
      <DesktopAgeVerificationSection />
    </main>
  );
}
