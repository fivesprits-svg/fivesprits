import { notFound } from "next/navigation";
import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { comboOffers } from "@/features/customer-flow/data/offers";
import { fetchComboOfferByIdApi } from "@/features/customer-flow/services/offers-api";
import { DesktopOfferDetailsSection } from "@/features/customer-flow/sections/desktop/desktop-offer-details-section";
import { MobileOfferDetailsSection } from "@/features/customer-flow/sections/mobile/mobile-offer-details-section";

export function generateStaticParams() {
  return comboOffers.map((offer) => ({ offerId: offer.id }));
}

export default async function ComboOfferDetailsPage({
  params,
}: {
  params: Promise<{ offerId: string }>;
}) {
  const { offerId } = await params;
  let offer = comboOffers.find((item) => item.id === offerId);
  if (!offer) {
    offer = (await fetchComboOfferByIdApi(offerId)) || undefined;
  }
  if (!offer) notFound();

  return (
    <AuthenticatedRoute>
      <MobileOfferDetailsSection offer={offer} />
      <DesktopOfferDetailsSection offer={offer} />
    </AuthenticatedRoute>
  );
}
