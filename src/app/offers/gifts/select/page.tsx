import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { DesktopGiftSelectionSection } from "@/features/customer-flow/sections/desktop/desktop-gift-selection-section";
import { MobileGiftSelectionSection } from "@/features/customer-flow/sections/mobile/mobile-gift-selection-section";

export default function GiftSelectionPage() {
  return (
    <AuthenticatedRoute>
      <MobileGiftSelectionSection />
      <DesktopGiftSelectionSection />
    </AuthenticatedRoute>
  );
}
