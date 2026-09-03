import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { DesktopOffersSection } from "@/features/customer-flow/sections/desktop/desktop-offers-section";
import { MobileOffersSection } from "@/features/customer-flow/sections/mobile/mobile-offers-section";

export default function OffersPage() {
  return (
    <AuthenticatedRoute>
      <MobileOffersSection />
      <DesktopOffersSection />
    </AuthenticatedRoute>
  );
}
