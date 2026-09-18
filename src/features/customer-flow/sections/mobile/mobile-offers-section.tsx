"use client";

import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileOfferHero } from "@/features/customer-flow/components/offers/mobile-offer-hero";
import { OfferTabs } from "@/features/customer-flow/components/offers/offer-tabs";
import { ComboOfferCard } from "@/features/customer-flow/components/offers/combo-offer-card";
import type { ComboOffer } from "@/features/customer-flow/types";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { EmptyState } from "@/features/customer-flow/components/ui/empty-state";

export function MobileOffersSection({
  offersList = [],
  isLoading = false,
}: {
  offersList?: ComboOffer[];
  isLoading?: boolean;
} = {}) {
  const { addComboToCart, setCartQuantity, removeFromCart, state } = useCustomerFlow();

  const cartLines = state.cart;
  const isEmpty = !isLoading && offersList.length === 0;

  return (
    <div className="min-h-dvh bg-white pb-28 md:hidden">
      {/* <MobileHeader title="Offers" backHref="" /> */}
      <main className="mx-auto w-full max-w-[390px] px-6 pt-2">
        <OfferTabs active="combo" />
        <MobileOfferHero />
        {isLoading ? (
          <div className="mt-4 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <ComboOfferCard
                key={i}
                isLoading={true}
                offer={{} as ComboOffer}
                onAdd={() => {}}
                onQuantityChange={() => {}}
                onRemove={() => {}}
              />
            ))}
          </div>
        ) : isEmpty ? (
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
              const item = cartLines.find(
                (line) =>
                  line.productId === offer.id ||
                  line.productId === (offer as unknown as { _id?: string })._id,
              );
              return (
                <ComboOfferCard
                  key={offer.id}
                  offer={offer}
                  quantity={item?.quantity}
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
                    if (value <= 0) {
                      removeFromCart(offer.id);
                    } else {
                      setCartQuantity(offer.id, value);
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
