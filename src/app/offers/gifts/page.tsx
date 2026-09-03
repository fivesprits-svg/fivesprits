import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { DesktopGiftOffersSection } from "@/features/customer-flow/sections/desktop/desktop-gift-offers-section";
import { MobileGiftOffersSection } from "@/features/customer-flow/sections/mobile/mobile-gift-offers-section";

export default function GiftOffersPage() {
  return (
    <AuthenticatedRoute>
      <MobileGiftOffersSection />
      <DesktopGiftOffersSection />
    </AuthenticatedRoute>
  );
}
