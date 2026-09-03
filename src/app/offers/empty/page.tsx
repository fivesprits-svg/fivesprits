import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { DesktopEmptyOffersSection } from "@/features/customer-flow/sections/desktop/desktop-empty-offers-section";
import { MobileEmptyOffersSection } from "@/features/customer-flow/sections/mobile/mobile-empty-offers-section";

export default function EmptyOffersPage() {
  return (
    <AuthenticatedRoute>
      <MobileEmptyOffersSection />
      <DesktopEmptyOffersSection />
    </AuthenticatedRoute>
  );
}
