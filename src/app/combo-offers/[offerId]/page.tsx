import { notFound } from "next/navigation";
import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { fetchComboOfferByIdApi } from "@/features/customer-flow/services/offers-api";
import { DesktopOfferDetailsSection } from "@/features/customer-flow/sections/desktop/desktop-offer-details-section";
import { MobileOfferDetailsSection } from "@/features/customer-flow/sections/mobile/mobile-offer-details-section";

export default async function ComboOfferDetailsPage({
  params,
}: {
  params: Promise<{ offerId: string }>;
}) {
  const { offerId } = await params;
  const offer = await fetchComboOfferByIdApi(offerId);
  if (!offer) notFound();

  return (
    <AuthenticatedRoute>
      <MobileOfferDetailsSection offer={offer} />
      <DesktopOfferDetailsSection offer={offer} />
    </AuthenticatedRoute>
  );
}
