import { MobileLoginHereSection } from "@/features/customer-flow/sections/mobile/mobile-login-here-section";
import { DesktopLoginHereSection } from "@/features/customer-flow/sections/desktop/desktop-login-here-section";
import { GuestRoute } from "@/features/customer-flow/components/layout/guest-route";
export default function LoginHerePage() {
  return (
    <GuestRoute>
      <main id="main-content">
        <MobileLoginHereSection />
        <DesktopLoginHereSection />
      </main>
    </GuestRoute>
  );
}
