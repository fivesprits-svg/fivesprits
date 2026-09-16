"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { fetchComboOfferByIdApi } from "@/features/customer-flow/services/offers-api";
import { DesktopOfferDetailsSection } from "@/features/customer-flow/sections/desktop/desktop-offer-details-section";
import { MobileOfferDetailsSection } from "@/features/customer-flow/sections/mobile/mobile-offer-details-section";
import type { ComboOffer } from "@/features/customer-flow/types";

export default function ComboOfferDetailsPage({
  params,
}: {
  params: Promise<{ offerId: string }>;
}) {
  const { offerId } = use(params);
  const [offer, setOffer] = useState<ComboOffer | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetchComboOfferByIdApi(offerId).then((data) => {
      if (active) {
        setOffer(data);
        setLoaded(true);
      }
    });
    return () => {
      active = false;
    };
  }, [offerId]);

  if (loaded && !offer) notFound();

  return (
    <AuthenticatedRoute>
      {offer && (
        <>
          <MobileOfferDetailsSection offer={offer} />
          <DesktopOfferDetailsSection offer={offer} />
        </>
      )}
    </AuthenticatedRoute>
  );
}
