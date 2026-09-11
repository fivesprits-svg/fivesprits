import { DesktopLoginSection } from "@/features/customer-flow/sections/desktop/desktop-login-section";
import { MobileLoginSection } from "@/features/customer-flow/sections/mobile/mobile-login-section";
import { GuestRoute } from "@/features/customer-flow/components/layout/guest-route";
export default function HomePage() {
  return (
    <GuestRoute>
      <main id="main-content">
        <MobileLoginSection />
        <DesktopLoginSection />
      </main>
    </GuestRoute>
  );
}
