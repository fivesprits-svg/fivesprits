"use client";

import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { MobileOfferHero } from "@/features/customer-flow/components/offers/mobile-offer-hero";
import { OfferTabs } from "@/features/customer-flow/components/offers/offer-tabs";
import { ComboOfferCard } from "@/features/customer-flow/components/offers/combo-offer-card";
import { comboOffers } from "@/features/customer-flow/data/offers";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function MobileOffersSection() {
  const { addComboToCart, removeFromCart, state } = useCustomerFlow();
  const cartLines = state.cart;

  return (
    <div className="min-h-dvh bg-white pb-28 md:hidden">
      <MobileHeader title="Offers" />
      <main className="mx-auto w-full max-w-[390px] px-6">
        <OfferTabs active="combo" />
        <MobileOfferHero />
        <div className="mt-4 space-y-4">
          {comboOffers.map((offer) => {
            const item = cartLines.find((line) => line.productId === offer.id);
            return (
              <ComboOfferCard
                key={offer.id}
                offer={offer}
                quantity={item?.quantity}
                onAdd={() => addComboToCart(offer.id, 1)}
                onQuantityChange={(value) => {
                  if (item) {
                    removeFromCart(offer.id);
                    addComboToCart(offer.id, value);
                  }
                }}
                onRemove={() => removeFromCart(offer.id)}
              />
            );
          })}
        </div>
      </main>
      <MobileBottomNav active="Offer" />
    </div>
  );
}
