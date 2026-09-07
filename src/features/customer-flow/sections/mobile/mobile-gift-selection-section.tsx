"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { QuantityStepper } from "@/features/customer-flow/components/quantity-stepper";
import { MaxLimitDialog } from "@/features/customer-flow/components/offers/max-limit-dialog";
import { giftOffer, giftProducts } from "@/features/customer-flow/data/offers";
import { formatMrp } from "@/features/customer-flow/utils/currency";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import {
  quantitiesToSelection,
  selectionToQuantities,
} from "@/features/customer-flow/helpers/gift-selection";

export function MobileGiftSelectionSection() {
  const { state, addGiftToCart } = useCustomerFlow();
  const [showMaxLimitDialog, setShowMaxLimitDialog] = useState(false);
  const savedSelection = state.cart.find(
    (line) => line.productId === giftOffer.id,
  )?.selectedProductIds;
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    selectionToQuantities(savedSelection),
  );
  const selected = useMemo(
    () => Object.values(quantities).reduce((total, quantity) => total + quantity, 0),
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
    <div className="min-h-dvh bg-white pb-48 md:hidden">
      <MobileHeader title="Select Product" backHref="/offers/gifts" />
      <main className="mx-auto w-full max-w-[390px] px-6">
        <div className="pt-2 text-center">
          <p className="font-outfit text-[11px] font-extrabold tracking-wider text-[#a67854] uppercase">
            EXCLUSIVE REWARDS
          </p>
          <h1 className="font-geist text-lg font-black text-gray-950">Choose any 6 items</h1>
          <p className="font-geist mt-0.5 text-xs text-gray-500">
            Complete the selection to unlock your {giftOffer.gift}.
          </p>
        </div>

        <div id="gift-products" className="mt-4 grid grid-cols-2 gap-3">
          {giftProducts.map((product) => {
            const quantity = quantities[product.id] ?? 0;
            return (
              <article
                key={product.id}
                className="flex flex-col justify-between rounded-[18px] border border-gray-200/90 bg-white p-2.5 shadow-sm"
              >
                <div>
                  <div className="relative aspect-square overflow-hidden rounded-[14px] bg-[#f5f3ef]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="141px"
                      className="object-contain p-3"
                    />
                  </div>
                  <h3 className="font-geist mt-2 truncate text-xs font-bold text-gray-950">
                    {product.name}
                  </h3>
                  <p className="font-geist text-[10px] text-gray-500">{product.pack}</p>
                </div>
                <div className="mt-2 border-t border-gray-100 pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="font-geist text-[10px] text-gray-400 line-through">
                      {formatMrp(product.mrp)}
                    </span>
                    <span className="font-geist text-xs font-black text-[#c2966e]">
                      {formatMrp(product.salePrice)}
                    </span>
                  </div>
                  <div className="mt-2">
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
                        className="font-outfit flex h-8 w-full items-center justify-center rounded-full bg-black text-xs font-bold text-white transition hover:bg-gray-800"
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
      </main>

      {/* Mobile Bottom Bar */}
      <div className="fixed right-0 bottom-[92px] left-0 z-30 mx-auto flex max-w-[390px] items-center justify-between border-t border-gray-200/90 bg-white px-5 py-3 shadow-lg">
        <div>
          <p className="font-geist text-sm font-black text-gray-950">{selected} / 6 Selected</p>
          <p className="font-geist text-[11px] text-gray-500">
            {selected >= 6 ? "Gift unlocked! 🎉" : `${6 - selected} More Required for free gift`}
          </p>
        </div>
        <Link
          href={selected >= 6 ? "/cart" : "#gift-products"}
          onClick={(e) => {
            if (selected < 6) {
              e.preventDefault();
            } else {
              addGiftToCart(giftOffer.id, quantitiesToSelection(quantities));
            }
          }}
          aria-disabled={selected < 6}
          className={`font-outfit flex h-10 min-w-28 items-center justify-center rounded-full text-xs font-bold ${
            selected >= 6 ? "bg-black text-white" : "pointer-events-none bg-gray-200 text-gray-400"
          }`}
        >
          Continue
        </Link>
      </div>
      <MobileBottomNav active="Offer" />

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
