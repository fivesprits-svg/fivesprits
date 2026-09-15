"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { Breadcrumb } from "@/features/customer-flow/components/navigation/breadcrumb";
import type { ComboOffer } from "@/features/customer-flow/types";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { QuantityStepper } from "@/features/customer-flow/components/quantity-stepper";
import { formatMrp } from "@/features/customer-flow/utils/currency";
import { ImageSkeleton, ButtonSpinner } from "@/features/customer-flow/components/ui/skeleton";
import { ImagePlaceholder } from "@/features/customer-flow/components/ui/image-placeholder";

export function DesktopOfferDetailsSection({ offer }: { offer: ComboOffer }) {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const { addComboToCart } = useCustomerFlow();

  return (
    <div className="hidden md:block">
      <PortalShell title="Offers" eyebrow="Limited time" backHref="/combo-offers">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { label: "combo-Offers", href: "/combo-offers" },
              { label: offer.title || "Offer Details" },
            ]}
          />

          {/* Header Title Section */}
          <div className="mb-6 flex items-end justify-between border-b border-gray-200/80 pb-5">
            <div>
              <p className="font-outfit text-xs font-bold tracking-wider text-[#a67854] uppercase">
                LIMITED TIME DEALS
              </p>
              <h1 className="font-unbounded text-common-black mt-1 text-2xl font-black tracking-tight uppercase lg:text-3xl">
                OFFERS
              </h1>
              <p className="font-geist mt-1.5 max-w-md text-xs leading-relaxed text-gray-500 sm:text-sm">
                Best deals on your favorite premium brands.
              </p>
            </div>
            <div className="flex rounded-full border border-gray-200 bg-white p-1 text-xs font-bold shadow-sm">
              <Link
                href="/combo-offers"
                className="rounded-full bg-gray-900 px-5 py-2 text-white transition hover:bg-gray-800"
              >
                Combo Offers
              </Link>
              <Link
                href="/gift-offers"
                className="px-5 py-2 text-gray-600 transition hover:text-black"
              >
                Gift Offers
              </Link>
            </div>
          </div>

          <article className="mx-auto grid max-w-5xl overflow-hidden rounded-[28px] border border-gray-200/90 bg-white shadow-sm lg:grid-cols-[1fr_1.15fr]">
            {/* Reduced image height */}
            <div className="relative h-[360px] w-full overflow-hidden bg-[#f3f0eb] lg:h-full lg:min-h-[400px]">
              {offer.image ? (
                <>
                  <ImageSkeleton className="absolute inset-0" />
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </>
              ) : (
                <ImagePlaceholder type="combo" />
              )}
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
                    disabled={adding}
                    onClick={async () => {
                      try {
                        setAdding(true);
                        await addComboToCart(offer.id, quantity, {
                          id: offer.id,
                          comboName: offer.title,
                          badge: offer.badge,
                          mrp: offer.mrp,
                          originalPrice: offer.mrp,
                          salePrice: offer.salePrice,
                          offerPrice: offer.salePrice,
                          image: offer.image,
                          offerImageUrl: offer.image,
                        });
                      } finally {
                        setAdding(false);
                      }
                    }}
                    className="font-outfit h-11 rounded-full bg-black px-7 text-sm font-bold text-white transition hover:bg-gray-800 active:scale-[0.99] disabled:opacity-70 sm:h-12 sm:px-8 sm:text-base"
                  >
                    {adding ? (
                      <span className="inline-flex items-center gap-2">
                        <ButtonSpinner />
                        Adding...
                      </span>
                    ) : (
                      "Add"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </PortalShell>
    </div>
  );
}
