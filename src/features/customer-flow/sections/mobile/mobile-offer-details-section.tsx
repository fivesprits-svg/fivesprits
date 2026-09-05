"use client";

import Image from "next/image";
import { useState } from "react";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { QuantityStepper } from "@/features/customer-flow/components/quantity-stepper";
import type { ComboOffer } from "@/features/customer-flow/data/offers";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatMrp } from "@/features/customer-flow/utils/currency";

export function MobileOfferDetailsSection({ offer }: { offer: ComboOffer }) {
  const [quantity, setQuantity] = useState(1);
  const { addComboToCart } = useCustomerFlow();
  return (
    <div className="min-h-dvh bg-white pb-28 md:hidden">
      <MobileHeader title="Offer Details" backHref="/offers" />
      <main className="mx-auto w-full max-w-[390px] px-6 pt-3">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-[#f5f3ef]">
          <Image src={offer.image} alt={offer.title} fill sizes="342px" className="object-cover" />
        </div>
        <div className="mt-4">
          <span className="font-outfit inline-block rounded-full bg-[#c2966e] px-3.5 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase shadow-xs">
            {offer.badge}
          </span>
        </div>
        <h1 className="font-geist mt-3 text-xl font-extrabold tracking-tight text-gray-950">
          {offer.title}
        </h1>
        <div className="mt-3.5 space-y-2 rounded-2xl bg-[#FAF6F0] p-3.5">
          {offer.items.map((item) => (
            <div key={item} className="flex items-start gap-2.5">
              <svg
                className="mt-0.5 size-4 shrink-0 text-[#c2966e]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-geist text-xs leading-snug font-medium text-gray-800">
                {item}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-baseline gap-2.5">
          <span className="font-geist text-base font-medium text-gray-400 line-through">
            {formatMrp(offer.mrp)}
          </span>
          <span className="font-geist text-2xl font-black text-[#c2966e]">
            {formatMrp(offer.salePrice)}
          </span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <button
            type="button"
            onClick={() => addComboToCart(offer.id, quantity)}
            className="font-outfit h-12 flex-1 rounded-full bg-black text-sm font-bold text-white transition hover:bg-gray-800 active:scale-[0.99]"
          >
            Add Offer to Cart
          </button>
        </div>
      </main>
      <MobileBottomNav active="Offer" />
    </div>
  );
}
