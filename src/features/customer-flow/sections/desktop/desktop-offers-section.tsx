"use client";

import Image from "next/image";
import Link from "next/link";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { comboOffers } from "@/features/customer-flow/data/offers";
import { formatMrp } from "@/features/customer-flow/utils/currency";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function DesktopOffersSection() {
  const { addComboToCart } = useCustomerFlow();
  return (
    <div className="hidden lg:block">
      <PortalShell title="Offers" eyebrow="Limited time">
        <div className="flex items-end justify-between border-b border-black/10 pb-8">
          <div>
            <h1 className="text-5xl font-black tracking-[-0.04em]">Exclusive Offers</h1>
            <p className="mt-3 text-[#6f6f70]">Best deals on your favorite premium brands.</p>
          </div>
          <div className="flex rounded-full border border-black/10 bg-white p-1 text-sm font-bold">
            <span className="rounded-full bg-black px-6 py-3 text-white">Combo Offers</span>
            <Link href="/offers/gifts" className="px-6 py-3">
              Gift Offers
            </Link>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-7">
          {comboOffers.map((offer) => (
            <article
              key={offer.id}
              className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_12px_40px_rgba(25,20,15,0.05)]"
            >
              <div className="relative h-64 bg-[#f3f0eb]">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="rounded-full bg-[#f7eee6] px-3 py-1.5 text-xs font-bold text-[#9d7658]">
                  {offer.badge}
                </span>
                <Link href={`/offers/${offer.id}`} className="mt-4 block text-2xl font-black">
                  {offer.title}
                </Link>
                <ul className="mt-4 space-y-2 text-sm text-[#666]">
                  {offer.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
                  <p>
                    <span className="mr-2 text-[#888] line-through">{formatMrp(offer.mrp)}</span>
                    <span className="text-2xl font-black">{formatMrp(offer.salePrice)}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => addComboToCart(offer.id, 1)}
                    className="rounded-full bg-black px-7 py-3 text-sm font-bold text-white"
                  >
                    Add Offer
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </PortalShell>
    </div>
  );
}
