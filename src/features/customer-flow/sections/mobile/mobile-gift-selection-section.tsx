"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { QuantityStepper } from "@/features/customer-flow/components/quantity-stepper";
import { giftOffer, giftProducts } from "@/features/customer-flow/data/offers";
import { formatMrp } from "@/features/customer-flow/utils/currency";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import {
  quantitiesToSelection,
  selectionToQuantities,
} from "@/features/customer-flow/helpers/gift-selection";

export function MobileGiftSelectionSection() {
  const { state, addGiftToCart } = useCustomerFlow();
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
  return (
    <div className="min-h-dvh bg-white pb-48 md:hidden">
      <MobileHeader title="Select Product" backHref="/offers/gifts" />
      <main className="mx-auto w-full max-w-[390px] px-6">
        <p className="text-center text-[12px] text-[#777]">Choose any 6 items</p>
        <article className="mt-4 overflow-hidden rounded-[20px] border border-black/10 bg-white p-3">
          <div className="relative h-40 overflow-hidden rounded-[14px] bg-[#f5f3ef]">
            <Image
              src={giftOffer.image}
              alt="Premium trolley gift"
              fill
              sizes="342px"
              className="object-cover"
            />
          </div>
          <h2 className="mt-3 text-lg font-bold">{giftOffer.title}</h2>
          <p className="mt-2 text-xl font-black text-[#9d7658]">{giftOffer.benefit}</p>
          <p className="mt-2 text-sm leading-5 text-[#666]">{giftOffer.description}</p>
        </article>
        <div id="gift-products" className="mt-4 grid grid-cols-2 gap-4">
          {giftProducts.map((product) => {
            const quantity = quantities[product.id] ?? 0;
            return (
              <article key={product.id} className="rounded-[16px] border border-black/10 p-3">
                <div className="relative h-[130px] rounded-[10px] bg-[#f5f3ef]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="141px"
                    className="object-contain p-3"
                  />
                </div>
                <h3 className="mt-3 min-h-10 text-sm font-bold">{product.name}</h3>
                <p className="text-xs text-[#777]">{product.pack}</p>
                <p className="mt-1">
                  <span className="mr-1 text-[11px] text-[#777] line-through">
                    {formatMrp(product.mrp)}
                  </span>
                  <span className="text-sm font-black">{formatMrp(product.salePrice)}</span>
                </p>
                <div className="mt-3">
                  {quantity > 0 ? (
                    <QuantityStepper
                      compact
                      value={quantity}
                      onChange={(value) =>
                        setQuantities((current) => ({ ...current, [product.id]: value }))
                      }
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setQuantities((current) => ({ ...current, [product.id]: 1 }))}
                      className="h-9 w-full rounded-full bg-black text-sm font-bold text-white"
                    >
                      Add
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </main>
      <div className="fixed right-0 bottom-[92px] left-0 z-30 mx-auto flex max-w-[390px] items-center justify-between border-t border-black/10 bg-white px-6 py-3">
        <div>
          <p className="text-sm font-bold">{Math.min(selected, 6)} / 6 Selected</p>
          <p className="text-[11px] text-[#777]">
            {selected >= 6
              ? "Eligible for 1 Premium Trolley"
              : `${6 - selected} More Required for free gift`}
          </p>
        </div>
        <Link
          href={selected >= 6 ? "/cart" : "#gift-products"}
          onClick={() => {
            if (selected >= 6) addGiftToCart(giftOffer.id, quantitiesToSelection(quantities));
          }}
          aria-disabled={selected < 6}
          className={`grid h-11 min-w-32 place-items-center rounded-full text-sm font-bold ${selected >= 6 ? "bg-black text-white" : "pointer-events-none bg-black/15 text-black/35"}`}
        >
          Continue
        </Link>
      </div>
      <MobileBottomNav active="Offer" />
    </div>
  );
}
