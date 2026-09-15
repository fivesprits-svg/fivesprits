import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { DesktopGiftOffersSection } from "@/features/customer-flow/sections/desktop/desktop-gift-offers-section";
import { MobileGiftOffersSection } from "@/features/customer-flow/sections/mobile/mobile-gift-offers-section";
import { fetchGiftOffersApi } from "@/features/customer-flow/services/offers-api";

export default async function GiftOffersPage() {
  const data = await fetchGiftOffersApi();

  return (
    <AuthenticatedRoute>
      <MobileGiftOffersSection offer={data?.giftOffer} />
      <DesktopGiftOffersSection offer={data?.giftOffer} />
    </AuthenticatedRoute>
  );
}
