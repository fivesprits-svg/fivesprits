"use client";

import Image from "next/image";
import { useState } from "react";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { QuantityStepper } from "@/features/customer-flow/components/quantity-stepper";
import type { ComboOffer } from "@/features/customer-flow/data/offers";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatMrp } from "@/features/customer-flow/utils/currency";

export function DesktopOfferDetailsSection({ offer }: { offer: ComboOffer }) {
  const [quantity, setQuantity] = useState(1);
  const { addComboToCart } = useCustomerFlow();
  return (
    <div className="hidden md:block">
      <PortalShell title="Offer Details" eyebrow="Combo offer" backHref="/offers">
        <article className="grid overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_12px_40px_rgba(25,20,15,0.05)] lg:grid-cols-[1.1fr_1fr]">
          <div className="relative min-h-[540px] bg-[#f3f0eb]">
            <Image src={offer.image} alt={offer.title} fill sizes="50vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center p-12">
            <span className="w-fit rounded-full bg-[#f7eee6] px-3 py-1.5 text-xs font-bold text-[#9d7658]">
              {offer.badge}
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.03em]">{offer.title}</h1>
            <ul className="mt-6 space-y-3 text-[#666]">
              {offer.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <div className="mt-8 flex items-end justify-between border-t border-black/10 pt-6">
              <div>
                <p className="text-[#888] line-through">{formatMrp(offer.mrp)}</p>
                <p className="text-3xl font-black">{formatMrp(offer.salePrice)}</p>
              </div>
              <QuantityStepper value={quantity} onChange={setQuantity} />
            </div>
            <button
              type="button"
              onClick={() => addComboToCart(offer.id, quantity)}
              className="mt-8 h-14 rounded-full bg-black font-bold text-white"
            >
              Add Offer to Cart
            </button>
          </div>
        </article>
      </PortalShell>
    </div>
  );
}
