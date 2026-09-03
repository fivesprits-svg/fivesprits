import { MobileCartSection } from "@/features/customer-flow/sections/mobile/mobile-cart-section";
import { DesktopCartSection } from "@/features/customer-flow/sections/desktop/desktop-cart-section";
import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
export default function CartPage() {
  return (
    <AuthenticatedRoute>
      <MobileCartSection />
      <DesktopCartSection />
    </AuthenticatedRoute>
  );
}
