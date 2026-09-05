"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { Breadcrumb } from "@/features/customer-flow/components/navigation/breadcrumb";
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
    <div className="hidden md:block">
      <PortalShell title="Select Products" eyebrow="Gift offer" backHref="/offers/gifts">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[{ label: "Exclusive Offers", href: "/offers" }, { label: "Gift Selection" }]}
          />

          <div className="mb-6 flex items-end justify-between border-b border-gray-200/80 pb-5">
            <div>
              <div className="mb-1.5 flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#a67854]" />
                <span className="font-outfit text-xs font-bold tracking-wider text-[#a67854] uppercase">
                  Gift Selection
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
              {Math.min(selected, 6)} / 6 Selected
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-6">
            {giftProducts.map((product) => {
              const quantity = quantities[product.id] ?? 0;
              return (
                <article
                  key={product.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-[28px] border border-gray-200/90 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div>
                    <div className="relative aspect-square overflow-hidden rounded-[20px] bg-[#f3f0eb]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="33vw"
                        className="object-contain p-7 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h2 className="font-geist mt-4 text-base font-bold text-gray-950">
                      {product.name}
                    </h2>
                    <p className="font-geist text-xs text-gray-500">{product.pack}</p>
                  </div>

                  <div className="mt-4 border-t border-gray-100 pt-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-baseline gap-2">
                        <span className="font-geist text-xs text-gray-400 line-through">
                          {formatMrp(product.mrp)}
                        </span>
                        <span className="font-geist text-lg font-black text-[#c2966e]">
                          {formatMrp(product.salePrice)}
                        </span>
                      </div>

                      {quantity > 0 ? (
                        <QuantityStepper
                          value={quantity}
                          onChange={(value) =>
                            setQuantities((current) => ({ ...current, [product.id]: value }))
                          }
                          onRemove={() =>
                            setQuantities((current) => ({ ...current, [product.id]: 0 }))
                          }
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setQuantities((current) => ({ ...current, [product.id]: 1 }))
                          }
                          className="font-outfit flex h-10 items-center justify-center rounded-full bg-black px-6 text-xs font-bold text-white transition hover:bg-gray-800 active:scale-[0.99]"
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

          <div className="sticky bottom-6 mt-8 flex items-center justify-between rounded-[24px] border border-gray-200/90 bg-white p-5 shadow-lg">
            <div>
              <p className="font-geist text-base font-black text-gray-950">
                {selected >= 6 ? "Gift unlocked! 🎉" : `${6 - selected} more required`}
              </p>
              <p className="font-geist text-xs text-gray-500">Eligible for 1 {giftOffer.gift}</p>
            </div>
            <Link
              href={selected >= 6 ? "/cart" : "#"}
              onClick={() => {
                if (selected >= 6) addGiftToCart(giftOffer.id, quantitiesToSelection(quantities));
              }}
              aria-disabled={selected < 6}
              className={`font-outfit grid h-12 min-w-44 place-items-center rounded-full text-sm font-bold tracking-wide transition ${
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
    </div>
  );
}
