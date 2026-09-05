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
        <article className="mx-auto grid max-w-5xl overflow-hidden rounded-[28px] border border-gray-200/90 bg-white shadow-sm lg:grid-cols-[1fr_1.15fr]">
          {/* Reduced image height */}
          <div className="relative h-[360px] w-full bg-[#f3f0eb] lg:h-full lg:min-h-[400px]">
            <Image src={offer.image} alt={offer.title} fill sizes="50vw" className="object-cover" />
          </div>

          <div className="flex flex-col justify-center p-8 lg:p-10">
            <span className="font-outfit w-fit rounded-full bg-[#c2966e] px-3.5 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase shadow-xs">
              {offer.badge}
            </span>

            <h1 className="font-geist mt-3 text-2xl font-black tracking-tight text-gray-950 lg:text-3xl">
              {offer.title}
            </h1>

            <div className="mt-5 space-y-2.5 rounded-2xl bg-[#FAF6F0] p-4">
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
                  <span className="font-geist text-xs font-medium text-gray-800 sm:text-sm">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Price on left, Stepper & Add button on right */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5">
              <div>
                <p className="font-geist text-xs font-medium text-gray-400 line-through sm:text-sm">
                  {formatMrp(offer.mrp)}
                </p>
                <p className="font-geist text-2xl font-black text-[#c2966e] lg:text-3xl">
                  {formatMrp(offer.salePrice)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <QuantityStepper value={quantity} onChange={setQuantity} />
                <button
                  type="button"
                  onClick={() => addComboToCart(offer.id, quantity)}
                  className="font-outfit h-11 rounded-full bg-black px-7 text-sm font-bold text-white transition hover:bg-gray-800 active:scale-[0.99] sm:h-12 sm:px-8 sm:text-base"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </article>
      </PortalShell>
    </div>
  );
}
