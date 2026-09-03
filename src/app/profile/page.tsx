import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { DesktopProfileSection } from "@/features/customer-flow/sections/desktop/desktop-profile-section";
import { MobileProfileSection } from "@/features/customer-flow/sections/mobile/mobile-profile-section";
export default function ProfilePage() {
  return (
    <AuthenticatedRoute>
      <MobileProfileSection />
      <DesktopProfileSection />
    </AuthenticatedRoute>
  );
}
