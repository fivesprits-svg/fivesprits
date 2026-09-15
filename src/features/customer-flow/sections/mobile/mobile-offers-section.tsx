"use client";

import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileOfferHero } from "@/features/customer-flow/components/offers/mobile-offer-hero";
import { OfferTabs } from "@/features/customer-flow/components/offers/offer-tabs";
import { ComboOfferCard } from "@/features/customer-flow/components/offers/combo-offer-card";
import type { ComboOffer } from "@/features/customer-flow/types";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { MobileHeader } from "../../components/navigation/mobile-header";
import { EmptyState } from "@/features/customer-flow/components/ui/empty-state";

export function MobileOffersSection({
  offersList = [],
}: {
  offersList?: ComboOffer[];
} = {}) {
  const { addComboToCart, removeFromCart, state } = useCustomerFlow();

  const cartLines = state.cart;

  return (
    <div className="min-h-dvh bg-white pb-28 md:hidden">
      <MobileHeader title="Offers" backHref="" />
      <main className="mx-auto w-full max-w-[390px] px-6 pt-2">
        <OfferTabs active="combo" />
        <MobileOfferHero />
        {offersList.length === 0 ? (
          <EmptyState
            icon="sparkles"
            title="No Combo Offers Available"
            description="There are currently no active combo offers. Please check back soon."
            actionLabel="Browse Categories"
            actionHref="/categories"
          />
        ) : (
          <div className="mt-4 space-y-4">
            {offersList.map((offer) => {
              const item = cartLines.find((line) => line.productId === offer.id);
              return (
                <ComboOfferCard
                  key={offer.id}
                  offer={offer}
                  onAdd={() =>
                    addComboToCart(offer.id, 1, {
                      id: offer.id,
                      comboName: offer.title,
                      badge: offer.badge,
                      mrp: offer.mrp,
                      originalPrice: offer.mrp,
                      salePrice: offer.salePrice,
                      offerPrice: offer.salePrice,
                      image: offer.image,
                      offerImageUrl: offer.image,
                    })
                  }
                  onQuantityChange={(value) => {
                    if (item) {
                      removeFromCart(offer.id);
                      addComboToCart(offer.id, value, {
                        id: offer.id,
                        comboName: offer.title,
                        badge: offer.badge,
                        mrp: offer.mrp,
                        originalPrice: offer.mrp,
                        salePrice: offer.salePrice,
                        offerPrice: offer.salePrice,
                        image: offer.image,
                        offerImageUrl: offer.image,
                      });
                    }
                  }}
                  onRemove={() => removeFromCart(offer.id)}
                />
              );
            })}
          </div>
        )}
      </main>
      <MobileBottomNav active="Offer" />
    </div>
  );
}
