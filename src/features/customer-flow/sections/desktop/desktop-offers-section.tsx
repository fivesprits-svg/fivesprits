"use client";

import Link from "next/link";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { Breadcrumb } from "@/features/customer-flow/components/navigation/breadcrumb";
import { ComboOfferCard } from "@/features/customer-flow/components/offers/combo-offer-card";
import type { ComboOffer } from "@/features/customer-flow/types";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { EmptyState } from "@/features/customer-flow/components/ui/empty-state";

export function DesktopOffersSection({
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
    <div className="hidden md:block">
      <PortalShell title="Offers" eyebrow="Limited time">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <Breadcrumb items={[{ label: "combo-Offers" }]} />

          {/* Header Title Section */}
          <div className="mb-6 flex items-end justify-between border-b border-gray-200/80 pb-5">
            <div>
              <p className="font-outfit text-xs font-bold tracking-wider text-[#a67854] uppercase">
                LIMITED TIME DEALS
              </p>
              <h1 className="font-unbounded text-common-black mt-1 text-2xl font-black tracking-tight uppercase lg:text-3xl">
                OFFERS
              </h1>
              <p className="font-geist mt-1.5 max-w-md text-xs leading-relaxed text-gray-500 sm:text-sm">
                Best deals on your favorite premium brands.
              </p>
            </div>
            <div className="flex rounded-full border border-gray-200 bg-white p-1 text-xs font-bold shadow-sm">
              <span className="rounded-full bg-gray-900 px-5 py-2 text-white">Combo Offers</span>
              <Link
                href="/gift-offers"
                className="px-5 py-2 text-gray-600 transition hover:text-black"
              >
                Gift Offers
              </Link>
            </div>
          </div>

          {/* Offers Grid or Empty State */}
          {isLoading ? (
            <div className="grid grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
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
              description="There are currently no active combo offers. Please check back soon or browse our categories."
              actionLabel="Browse Categories"
              actionHref="/categories"
            />
          ) : (
            <div className="grid grid-cols-2 gap-6">
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
        </div>
      </PortalShell>
    </div>
  );
}
