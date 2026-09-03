import { DesktopLoginSection } from "@/features/customer-flow/sections/desktop/desktop-login-section";
import { MobileLoginSection } from "@/features/customer-flow/sections/mobile/mobile-login-section";
export default function HomePage() {
  return (
    <main id="main-content">
      <MobileLoginSection />
      <DesktopLoginSection />
    </main>
  );
}
