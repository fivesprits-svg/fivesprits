"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComboOffer } from "@/features/customer-flow/data/offers";
import { formatMrp } from "@/features/customer-flow/utils/currency";

type ComboOfferCardProps = {
  offer: ComboOffer;
  quantity?: number;
  onAdd: () => void;
  onQuantityChange: (value: number) => void;
  onRemove: () => void;
};

export function ComboOfferCard({
  offer,
  quantity,
  onAdd,
  onQuantityChange,
  onRemove,
}: ComboOfferCardProps) {
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-[28px] border border-gray-200/90 bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-4">
      <div>
        {/* Combo Hero Image */}
        <Link href={`/offers/${offer.id}`} className="block">
          <div className="relative aspect-[20/10] w-full overflow-hidden rounded-[20px] bg-[#f5f3ef]">
            <Image
              src={offer.image}
              alt={offer.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Discount Badge */}
        <div className="mt-3.5">
          <span className="font-outfit inline-block rounded-full bg-[#c2966e] px-3.5 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase shadow-xs">
            {offer.badge}
          </span>
        </div>

        {/* Title */}
        <Link href={`/offers/${offer.id}`} className="block">
          <h2 className="font-geist mt-2.5 text-lg font-extrabold tracking-tight text-gray-950 transition-colors group-hover:text-[#a67854] sm:text-xl">
            {offer.title}
          </h2>
        </Link>

        {/* Included Items Container */}
        <div className="mt-3 space-y-2 rounded-2xl bg-[#FAF6F0] p-3.5">
          {offer.items.map((item) => (
            <div key={item} className="flex items-start gap-2.5">
              <svg
                className="mt-0.5 size-4 shrink-0 text-[#c2966e]"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-geist text-xs leading-snug font-medium text-gray-800 sm:text-[13px]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-3">
          {/* Price Section - Left */}
          <div className="flex items-baseline gap-2.5">
            <span className="font-geist text-base font-medium text-gray-400 line-through sm:text-lg">
              {formatMrp(offer.mrp)}
            </span>

            <span className="font-geist text-2xl font-black text-[#c2966e] sm:text-3xl">
              {formatMrp(offer.salePrice)}
            </span>
          </div>

          {/* Add / Quantity Section - Right */}
          {quantity == null ? (
            <button
              type="button"
              onClick={onAdd}
              className="font-outfit flex h-11 shrink-0 items-center justify-center rounded-full bg-black px-7 text-sm font-bold tracking-wide text-white transition hover:bg-gray-800 active:scale-[0.99] sm:h-12 sm:px-8 sm:text-base"
            >
              Add
            </button>
          ) : (
            <div className="flex h-11 items-center gap-2 sm:h-12">
              <div className="flex h-full w-32 items-center justify-between rounded-full bg-[#FAF6F0] px-3 sm:w-36 sm:px-4">
                <button
                  type="button"
                  onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                  className="grid size-8 place-items-center text-xl font-semibold text-[#a67854] transition hover:scale-110 active:scale-95 disabled:opacity-40"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  −
                </button>

                <span className="font-geist text-sm font-black text-black sm:text-base">
                  {String(quantity).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  onClick={() => onQuantityChange(quantity + 1)}
                  className="grid size-8 place-items-center text-xl font-semibold text-[#a67854] transition hover:scale-110 active:scale-95"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={onRemove}
                className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#FAF6F0] transition hover:bg-[#f3ede3] active:scale-95 sm:size-12"
                aria-label="Remove offer"
              >
                <Image
                  src="/customer-flow/icons/delete-btn.svg"
                  alt="Remove"
                  width={20}
                  height={20}
                  className="size-5 object-contain"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
