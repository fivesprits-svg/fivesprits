"use client";

import Link from "next/link";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { Breadcrumb } from "@/features/customer-flow/components/navigation/breadcrumb";
import { ComboOfferCard } from "@/features/customer-flow/components/offers/combo-offer-card";
import { comboOffers } from "@/features/customer-flow/data/offers";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function DesktopOffersSection() {
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
              <p className="font-outfit text-xs font-extrabold tracking-wider text-[#a67854] uppercase sm:text-sm">
                LIMITED TIME DEALS
              </p>
              <h1 className="font-unbounded mt-1 text-3xl font-black tracking-tight text-gray-950 uppercase sm:text-4xl lg:text-5xl">
                OFFERS
              </h1>
              <p className="font-geist mt-1.5 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
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
        </div>
      </PortalShell>
    </div>
  );
}
