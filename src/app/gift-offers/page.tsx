"use client";

import { useEffect, useState } from "react";
import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { DesktopGiftOffersSection } from "@/features/customer-flow/sections/desktop/desktop-gift-offers-section";
import { MobileGiftOffersSection } from "@/features/customer-flow/sections/mobile/mobile-gift-offers-section";
import { fetchGiftOffersApi } from "@/features/customer-flow/services/offers-api";
import type { GiftOfferDetail } from "@/features/customer-flow/services/offers-api";

export default function GiftOffersPage() {
  const [giftOffer, setGiftOffer] = useState<GiftOfferDetail | null>(null);

  useEffect(() => {
    let active = true;
    fetchGiftOffersApi().then((data) => {
      if (active) setGiftOffer(data?.giftOffer || null);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <AuthenticatedRoute>
      <MobileGiftOffersSection offer={giftOffer} />
      <DesktopGiftOffersSection offer={giftOffer} />
    </AuthenticatedRoute>
  );
}
