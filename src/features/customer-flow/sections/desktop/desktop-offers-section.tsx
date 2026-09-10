"use client";

import Link from "next/link";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { Breadcrumb } from "@/features/customer-flow/components/navigation/breadcrumb";
import { ComboOfferCard } from "@/features/customer-flow/components/offers/combo-offer-card";
import {
  comboOffers as defaultComboOffers,
  type ComboOffer,
} from "@/features/customer-flow/data/offers";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function DesktopOffersSection({
  offersList = defaultComboOffers,
}: {
  offersList?: ComboOffer[];
} = {}) {
  const { addComboToCart, removeFromCart, state } = useCustomerFlow();

  const cartLines = state.cart;

  return (
    <div className="hidden md:block">
      <PortalShell title="Offers" eyebrow="Limited time">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <Breadcrumb items={[{ label: "Offers" }]} />

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
                href="/offers/gifts"
                className="px-5 py-2 text-gray-600 transition hover:text-black"
              >
                Gift Offers
              </Link>
            </div>
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-2 gap-6">
            {offersList.map((offer) => {
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
        </div>
      </PortalShell>
    </div>
  );
}
