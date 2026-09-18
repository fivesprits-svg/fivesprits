"use client";

import { useEffect, useState } from "react";
import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { DesktopOffersSection } from "@/features/customer-flow/sections/desktop/desktop-offers-section";
import { MobileOffersSection } from "@/features/customer-flow/sections/mobile/mobile-offers-section";
import { fetchComboOffersApi } from "@/features/customer-flow/services/offers-api";
import type { ComboOffer } from "@/features/customer-flow/types";

export default function OffersPage() {
  const [offers, setOffers] = useState<ComboOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchComboOffersApi()
      .then((data) => {
        if (active) {
          setOffers(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <AuthenticatedRoute>
      <MobileOffersSection offersList={offers} isLoading={isLoading} />
      <DesktopOffersSection offersList={offers} isLoading={isLoading} />
    </AuthenticatedRoute>
  );
}
