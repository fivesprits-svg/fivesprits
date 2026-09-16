"use client";

import { useEffect, useState } from "react";
import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { DesktopGiftSelectionSection } from "@/features/customer-flow/sections/desktop/desktop-gift-selection-section";
import { MobileGiftSelectionSection } from "@/features/customer-flow/sections/mobile/mobile-gift-selection-section";
import { fetchGiftOffersApi } from "@/features/customer-flow/services/offers-api";
import type { GiftOfferDetail } from "@/features/customer-flow/services/offers-api";
import type { GiftProduct } from "@/features/customer-flow/types";

export default function GiftSelectionPage() {
  const [data, setData] = useState<{
    giftOffer: GiftOfferDetail | null;
    giftProducts: GiftProduct[];
  }>({
    giftOffer: null,
    giftProducts: [],
  });

  useEffect(() => {
    let active = true;
    fetchGiftOffersApi().then((res) => {
      if (active && res) {
        setData({
          giftOffer: res.giftOffer || null,
          giftProducts: res.giftProducts || [],
        });
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <AuthenticatedRoute>
      <MobileGiftSelectionSection offer={data.giftOffer} productsList={data.giftProducts} />
      <DesktopGiftSelectionSection offer={data.giftOffer} productsList={data.giftProducts} />
    </AuthenticatedRoute>
  );
}
