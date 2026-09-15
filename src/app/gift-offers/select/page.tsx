import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { DesktopGiftSelectionSection } from "@/features/customer-flow/sections/desktop/desktop-gift-selection-section";
import { MobileGiftSelectionSection } from "@/features/customer-flow/sections/mobile/mobile-gift-selection-section";
import { fetchGiftOffersApi } from "@/features/customer-flow/services/offers-api";

export default async function GiftSelectionPage() {
  const data = await fetchGiftOffersApi();

  return (
    <AuthenticatedRoute>
      <MobileGiftSelectionSection offer={data?.giftOffer} productsList={data?.giftProducts} />
      <DesktopGiftSelectionSection offer={data?.giftOffer} productsList={data?.giftProducts} />
    </AuthenticatedRoute>
  );
}
