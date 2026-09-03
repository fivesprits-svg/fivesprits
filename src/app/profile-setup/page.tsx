import { MobileProfileSetupSection } from "@/features/customer-flow/sections/mobile/mobile-profile-setup-section";
import { DesktopProfileSetupSection } from "@/features/customer-flow/sections/desktop/desktop-profile-setup-section";
export default function ProfileSetupPage() {
  return (
    <main id="main-content">
      <MobileProfileSetupSection />
      <DesktopProfileSetupSection />
    </main>
  );
}
