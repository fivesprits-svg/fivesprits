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
    <div className="min-h-dvh bg-white pb-28 lg:hidden">
      <MobileHeader title="Offer Details" backHref="/offers" />
      <main className="mx-auto w-full max-w-[390px] px-6 pt-3">
        <div className="relative h-64 overflow-hidden rounded-[20px] bg-[#f5f3ef]">
          <Image src={offer.image} alt={offer.title} fill sizes="342px" className="object-cover" />
        </div>
        <span className="mt-5 inline-flex rounded-full bg-[#f7eee6] px-3 py-1.5 text-xs font-bold text-[#9d7658]">
          {offer.badge}
        </span>
        <h1 className="mt-4 text-2xl leading-8 font-black">{offer.title}</h1>
        <ul className="mt-5 space-y-3 text-sm text-[#666]">
          {offer.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-[#c9a07e]">●</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex items-end justify-between border-t border-black/10 pt-5">
          <div>
            <p className="text-xs text-[#777] line-through">{formatMrp(offer.mrp)}</p>
            <p className="text-3xl font-black">{formatMrp(offer.salePrice)}</p>
          </div>
          <QuantityStepper value={quantity} onChange={setQuantity} />
        </div>
        <button
          type="button"
          onClick={() => addComboToCart(offer.id, quantity)}
          className="mt-6 h-13 w-full rounded-full bg-black text-sm font-bold text-white"
        >
          Add Offer to Cart
        </button>
      </main>
      <MobileBottomNav active="Offer" />
    </div>
  );
}
