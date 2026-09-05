"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { Breadcrumb } from "@/features/customer-flow/components/navigation/breadcrumb";
import { QuantityStepper } from "@/features/customer-flow/components/quantity-stepper";
import { MaxLimitDialog } from "@/features/customer-flow/components/offers/max-limit-dialog";
import { giftOffer, giftProducts } from "@/features/customer-flow/data/offers";
import { formatMrp } from "@/features/customer-flow/utils/currency";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import {
  quantitiesToSelection,
  selectionToQuantities,
} from "@/features/customer-flow/helpers/gift-selection";

export function DesktopGiftSelectionSection() {
  const { state, addGiftToCart } = useCustomerFlow();
  const [showMaxLimitDialog, setShowMaxLimitDialog] = useState(false);
  const savedSelection = state.cart.find(
    (line) => line.productId === giftOffer.id,
  )?.selectedProductIds;
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    selectionToQuantities(savedSelection),
  );
  const selected = useMemo(
    () => Object.values(quantities).reduce((sum, value) => sum + value, 0),
    [quantities],
  );

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    const currentQuantity = quantities[productId] ?? 0;
    const delta = newQuantity - currentQuantity;
    if (delta > 0 && selected + delta > 6) {
      setShowMaxLimitDialog(true);
      return;
    }
    setQuantities((current) => ({ ...current, [productId]: newQuantity }));
  };

  return (
    <div className="hidden md:block">
      <PortalShell title="Select Products" eyebrow="Gift offer" backHref="/offers/gifts">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { label: "Offers", href: "/offers" },
              { label: "Gift Offers", href: "/offers/gifts" },
              { label: "Gift Selection" },
            ]}
          />

          {/* Header Section */}
          <div className="mb-6 flex items-end justify-between border-b border-gray-200/80 pb-5">
            <div>
              <div className="mb-1.5 flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#a67854]" />
                <span className="font-outfit text-xs font-bold tracking-wider text-[#a67854] uppercase">
                  EXCLUSIVE REWARDS
                </span>
              </div>
              <h1 className="font-unbounded text-2xl font-black tracking-tight text-gray-900 lg:text-3xl">
                Choose any 6 items
              </h1>
              <p className="font-geist mt-1 text-xs text-gray-500 lg:text-sm">
                Complete the selection to unlock your {giftOffer.gift}.
              </p>
            </div>
            <div className="rounded-full bg-[#FAF6F0] px-5 py-2 text-xs font-black tracking-wide text-[#755337] shadow-xs">
              {selected} / 6 Selected
            </div>
          </div>

          {/* Compact Product Cards Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {giftProducts.map((product) => {
              const quantity = quantities[product.id] ?? 0;
              return (
                <article
                  key={product.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-[22px] border border-gray-200/90 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-3.5"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[16px] bg-[#f5f3ef]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-contain p-3 transition-transform duration-300 group-hover:scale-105 sm:p-4"
                      />
                    </div>
                    <h2 className="font-geist mt-2.5 truncate text-sm font-bold text-gray-950">
                      {product.name}
                    </h2>
                    <p className="font-geist text-[11px] text-gray-500">{product.pack}</p>
                  </div>

                  <div className="mt-3 border-t border-gray-100 pt-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-geist text-[11px] text-gray-400 line-through">
                          {formatMrp(product.mrp)}
                        </span>
                        <span className="font-geist text-sm font-black text-[#c2966e] sm:text-base">
                          {formatMrp(product.salePrice)}
                        </span>
                      </div>

                      {quantity > 0 ? (
                        <QuantityStepper
                          compact
                          value={quantity}
                          onChange={(value) => handleUpdateQuantity(product.id, value)}
                          onRemove={() =>
                            setQuantities((current) => ({ ...current, [product.id]: 0 }))
                          }
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(product.id, 1)}
                          className="font-outfit flex h-8 items-center justify-center rounded-full bg-black px-5 text-xs font-bold text-white transition hover:bg-gray-800 active:scale-[0.99] sm:h-9"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Sticky Bottom Progress & Action Bar */}
          <div className="sticky bottom-6 mt-8 flex items-center justify-between rounded-[24px] border border-gray-200/90 bg-white p-4 shadow-xl sm:p-5">
            <div>
              <p className="font-geist text-base font-black text-gray-950 sm:text-lg">
                {selected} / 6 Selected
              </p>
              <p className="font-geist text-xs text-gray-500 sm:text-sm">
                {selected >= 6
                  ? "Gift unlocked! 🎉 Eligible for 1 " + giftOffer.gift
                  : `${6 - selected} More Required for free gift`}
              </p>
            </div>
            <Link
              href={selected >= 6 ? "/cart" : "#"}
              onClick={(e) => {
                if (selected < 6) {
                  e.preventDefault();
                } else {
                  addGiftToCart(giftOffer.id, quantitiesToSelection(quantities));
                }
              }}
              aria-disabled={selected < 6}
              className={`font-outfit flex h-11 min-w-40 items-center justify-center rounded-full text-sm font-bold tracking-wide transition sm:h-12 sm:min-w-44 ${
                selected >= 6
                  ? "bg-black text-white hover:bg-gray-800 active:scale-[0.99]"
                  : "pointer-events-none bg-gray-200 text-gray-400"
              }`}
            >
              Continue
            </Link>
          </div>
        </div>
      </PortalShell>

      {/* Max 6 Items Validation Popup Dialog */}
      <MaxLimitDialog
        open={showMaxLimitDialog}
        onClose={() => setShowMaxLimitDialog(false)}
        maxLimit={6}
        giftName={giftOffer.gift}
      />
    </div>
  );
}
