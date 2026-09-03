"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { QuantityStepper } from "@/features/customer-flow/components/quantity-stepper";
import { giftOffer, giftProducts } from "@/features/customer-flow/data/offers";
import { formatMrp } from "@/features/customer-flow/utils/currency";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import {
  quantitiesToSelection,
  selectionToQuantities,
} from "@/features/customer-flow/helpers/gift-selection";

export function DesktopGiftSelectionSection() {
  const { state, addGiftToCart } = useCustomerFlow();
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
  return (
    <div className="hidden lg:block">
      <PortalShell title="Select Products" eyebrow="Gift offer" backHref="/offers/gifts">
        <div className="flex items-end justify-between border-b border-black/10 pb-8">
          <div>
            <h1 className="text-5xl font-black tracking-[-0.04em]">Choose any 6 items</h1>
            <p className="mt-3 text-[#6f6f70]">
              Complete the selection to unlock your {giftOffer.gift}.
            </p>
          </div>
          <div className="rounded-full bg-[#eee7df] px-5 py-3 text-sm font-black text-[#755337]">
            {Math.min(selected, 6)} / 6 Selected
          </div>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-6">
          {giftProducts.map((product) => {
            const quantity = quantities[product.id] ?? 0;
            return (
              <article
                key={product.id}
                className="rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_12px_40px_rgba(25,20,15,0.05)]"
              >
                <div className="relative aspect-square rounded-[18px] bg-[#f3f0eb]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="33vw"
                    className="object-contain p-7"
                  />
                </div>
                <h2 className="mt-5 text-lg font-bold">{product.name}</h2>
                <p className="text-sm text-[#777]">{product.pack}</p>
                <p className="mt-2">
                  <span className="mr-2 text-sm text-[#888] line-through">
                    {formatMrp(product.mrp)}
                  </span>
                  <span className="text-xl font-black">{formatMrp(product.salePrice)}</span>
                </p>
                <div className="mt-5">
                  {quantity > 0 ? (
                    <QuantityStepper
                      value={quantity}
                      onChange={(value) =>
                        setQuantities((current) => ({ ...current, [product.id]: value }))
                      }
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setQuantities((current) => ({ ...current, [product.id]: 1 }))}
                      className="h-11 w-full rounded-full bg-black text-sm font-bold text-white"
                    >
                      Add
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <div className="sticky bottom-5 mt-8 flex items-center justify-between rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_16px_50px_rgba(0,0,0,0.12)]">
          <div>
            <p className="font-black">
              {selected >= 6 ? "Gift unlocked" : `${6 - selected} more required`}
            </p>
            <p className="text-sm text-[#777]">Eligible for 1 Premium Trolley</p>
          </div>
          <Link
            href={selected >= 6 ? "/cart" : "#"}
            onClick={() => {
              if (selected >= 6) addGiftToCart(giftOffer.id, quantitiesToSelection(quantities));
            }}
            aria-disabled={selected < 6}
            className={`grid h-12 min-w-44 place-items-center rounded-full text-sm font-bold ${selected >= 6 ? "bg-black text-white" : "pointer-events-none bg-black/15 text-black/35"}`}
          >
            Continue
          </Link>
        </div>
      </PortalShell>
    </div>
  );
}
