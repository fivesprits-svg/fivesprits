"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { MobileOfferHero } from "@/features/customer-flow/components/offers/mobile-offer-hero";
import { OfferTabs } from "@/features/customer-flow/components/offers/offer-tabs";
import { QuantityStepper } from "@/features/customer-flow/components/quantity-stepper";
import { comboOffers } from "@/features/customer-flow/data/offers";
import { formatMrp } from "@/features/customer-flow/utils/currency";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function MobileOffersSection() {
  const { addComboToCart } = useCustomerFlow();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  return (
    <div className="min-h-dvh bg-white pb-28 md:hidden">
      <MobileHeader title="Offers" />
      <main className="mx-auto w-full max-w-[390px] px-6">
        <OfferTabs active="combo" />
        <MobileOfferHero />
        <div className="mt-4 space-y-4">
          {comboOffers.map((offer) => {
            const quantity = quantities[offer.id] ?? 1;
            return (
              <article
                key={offer.id}
                className="overflow-hidden rounded-[20px] border border-black/10 bg-white p-3"
              >
                <div className="relative h-40 overflow-hidden rounded-[14px] bg-[#f5f3ef]">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="342px"
                    className="object-cover"
                  />
                </div>
                <div className="mt-3 inline-flex rounded-full bg-[#f7eee6] px-2.5 py-1 text-[11px] font-bold text-[#9d7658]">
                  {offer.badge}
                </div>
                <Link
                  href={`/offers/${offer.id}`}
                  className="mt-2 block text-[16px] leading-5 font-bold"
                >
                  {offer.title}
                </Link>
                <ul className="mt-3 space-y-2 text-[12px] text-[#666]">
                  {offer.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[#c9a07e]">●</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3">
                  <p>
                    <span className="mr-2 text-[12px] text-[#777] line-through">
                      {formatMrp(offer.mrp)}
                    </span>
                    <span className="text-lg font-black">{formatMrp(offer.salePrice)}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <QuantityStepper
                      compact
                      value={quantity}
                      onChange={(value) =>
                        setQuantities((current) => ({ ...current, [offer.id]: value }))
                      }
                    />
                    <button
                      type="button"
                      onClick={() => addComboToCart(offer.id, quantity)}
                      className="h-9 rounded-full bg-black px-5 text-sm font-bold text-white"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
      <MobileBottomNav active="Offer" />
    </div>
  );
}
