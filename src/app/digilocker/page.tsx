import { MobileDigilockerSection } from "@/features/customer-flow/sections/mobile/mobile-digilocker-section";
import { DesktopDigilockerSection } from "@/features/customer-flow/sections/desktop/desktop-digilocker-section";
export default function DigilockerPage() {
  return (
    <main id="main-content">
      <MobileDigilockerSection />
      <DesktopDigilockerSection />
    </main>
  );
}
