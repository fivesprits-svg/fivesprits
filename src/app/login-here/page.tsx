import { MobileLoginHereSection } from "@/features/customer-flow/sections/mobile/mobile-login-here-section";
import { DesktopLoginHereSection } from "@/features/customer-flow/sections/desktop/desktop-login-here-section";
export default function LoginHerePage() {
  return (
    <main id="main-content">
      <MobileLoginHereSection />
      <DesktopLoginHereSection />
    </main>
  );
}
