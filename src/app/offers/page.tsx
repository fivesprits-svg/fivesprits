import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { DesktopOffersSection } from "@/features/customer-flow/sections/desktop/desktop-offers-section";
import { MobileOffersSection } from "@/features/customer-flow/sections/mobile/mobile-offers-section";
import { fetchComboOffersApi } from "@/features/customer-flow/services/offers-api";

export default async function OffersPage() {
  const offers = await fetchComboOffersApi();

  return (
    <AuthenticatedRoute>
      <MobileOffersSection offersList={offers} />
      <DesktopOffersSection offersList={offers} />
    </AuthenticatedRoute>
  );
}
