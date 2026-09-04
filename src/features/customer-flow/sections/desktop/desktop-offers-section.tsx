"use client";

import Image from "next/image";
import Link from "next/link";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { Breadcrumb } from "@/features/customer-flow/components/navigation/breadcrumb";
import { comboOffers } from "@/features/customer-flow/data/offers";
import { formatMrp } from "@/features/customer-flow/utils/currency";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function DesktopOffersSection() {
  const { addComboToCart } = useCustomerFlow();
  return (
    <div className="hidden md:block">
      <PortalShell title="Offers" eyebrow="Limited time">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <Breadcrumb items={[{ label: "Exclusive Offers" }]} />

          {/* Header Title Section */}
          <div className="mb-6 flex items-end justify-between border-b border-gray-200/80 pb-5">
            <div>
              <div className="mb-1.5 flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#a67854]" />
                <span className="font-outfit text-xs font-bold tracking-wider text-[#a67854] uppercase">
                  Curated Specials
                </span>
              </div>
              <h1 className="font-unbounded text-2xl font-black tracking-tight text-gray-900 lg:text-3xl">
                Exclusive Offers
              </h1>
              <p className="font-geist mt-1 text-xs text-gray-500 lg:text-sm">
                Best deals and bundled values on your favorite premium spirit houses.
              </p>
            </div>
            <div className="flex rounded-full border border-gray-200 bg-white p-1 text-xs font-bold shadow-sm">
              <span className="rounded-full bg-gray-900 px-5 py-2 text-white">Combo Offers</span>
              <Link
                href="/offers/gifts"
                className="px-5 py-2 text-gray-600 transition hover:text-black"
              >
                Gift Offers
              </Link>
            </div>
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-2 gap-6">
            {comboOffers.map((offer) => (
              <article
                key={offer.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#a67854]/40 hover:shadow-md"
              >
                <div className="relative h-60 bg-gray-50 transition-colors group-hover:bg-gray-100">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="font-outfit absolute top-3 left-3 rounded-md bg-[#a67854] px-2.5 py-1 text-xs font-bold tracking-wider text-white uppercase shadow-sm">
                    {offer.badge}
                  </span>
                </div>
                <div className="p-5">
                  <Link
                    href={`/offers/${offer.id}`}
                    className="font-unbounded block text-lg font-bold text-gray-900 transition-colors hover:text-[#a67854]"
                  >
                    {offer.title}
                  </Link>
                  <ul className="font-geist mt-3 space-y-1.5 text-xs text-gray-600">
                    {offer.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="size-1 rounded-full bg-[#a67854]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <span className="font-geist mr-2 text-xs text-gray-400 line-through">
                        {formatMrp(offer.mrp)}
                      </span>
                      <span className="font-geist text-lg font-bold text-gray-900">
                        {formatMrp(offer.salePrice)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => addComboToCart(offer.id, 1)}
                      className="font-outfit rounded-xl bg-gray-900 px-6 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition hover:bg-[#a67854]"
                    >
                      Add Offer
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </PortalShell>
    </div>
  );
}
