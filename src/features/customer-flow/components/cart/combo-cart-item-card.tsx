"use client";

import { useState } from "react";
import Image from "next/image";
import { formatMrp } from "@/features/customer-flow/utils/currency";
import { ImageSkeleton } from "@/features/customer-flow/components/ui/skeleton";
import { ImagePlaceholder } from "@/features/customer-flow/components/ui/image-placeholder";
import type { ComboCartItem } from "@/features/customer-flow/helpers/cart-view-model";

interface ComboCartItemCardProps {
  item: ComboCartItem;
  onSetQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  variant?: "desktop" | "mobile";
}

function ComboCoverImage({ src, alt, sizes }: { src?: string; alt: string; sizes: string }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!src || imageError) {
    return <ImagePlaceholder type="combo" />;
  }

  return (
    <>
      {!imageLoaded && <ImageSkeleton className="absolute inset-0" />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </>
  );
}

export function ComboCartItemCard({
  item,
  onSetQuantity,
  onRemove,
  variant = "desktop",
}: ComboCartItemCardProps) {
  const { id, offer, quantity } = item;

  if (variant === "mobile") {
    return (
      <article className="rounded-[26px] border border-gray-200/90 bg-white p-4 shadow-sm">
        <div className="relative aspect-[16/8] w-full overflow-hidden rounded-[18px] bg-[#f5f3ef]">
          <ComboCoverImage src={offer.image} alt={offer.title} sizes="342px" />
        </div>

        <div className="mt-3">
          <span className="font-outfit inline-block rounded-full bg-[#c2966e] px-3 py-0.5 text-[10px] font-extrabold tracking-wider text-white uppercase shadow-xs">
            {offer.badge}
          </span>
          <h3 className="font-geist mt-2 text-sm font-extrabold text-gray-950">{offer.title}</h3>

          <div className="mt-2.5 space-y-1 rounded-xl bg-[#FAF6F0] p-2.5">
            {offer.items.map((it) => (
              <div key={it} className="flex items-start gap-2">
                <svg
                  className="mt-0.5 size-3.5 shrink-0 text-[#c2966e]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-geist text-[11px] font-medium text-gray-800">{it}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2.5">
            <div className="flex items-baseline gap-1.5">
              {offer.mrp !== offer.salePrice && (
                <span className="font-geist text-xs text-gray-400 line-through">
                  {formatMrp(offer.mrp)}
                </span>
              )}
              <span className="font-geist text-base font-black text-[#c2966e]">
                {formatMrp(offer.salePrice || offer.mrp)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onRemove(id)}
                aria-label={`Remove ${offer.title}`}
                className="grid size-7 cursor-pointer place-items-center rounded-xl bg-[#FAF6F0] text-gray-400"
              >
                <Image
                  src="/customer-flow/icons/delete-btn.svg"
                  alt="Delete"
                  width={16}
                  height={16}
                  className="size-4 opacity-60 hover:opacity-100"
                />
              </button>

              <div className="flex h-8 items-center justify-between rounded-full bg-[#FAF6F0] px-2.5">
                <button
                  type="button"
                  onClick={() => onSetQuantity(id, Math.max(1, quantity - 1))}
                  className="grid size-5 place-items-center text-sm font-semibold text-[#a67854] disabled:opacity-40"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="font-geist px-2 text-xs font-black text-black">
                  {String(quantity).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => onSetQuantity(id, quantity + 1)}
                  className="grid size-5 place-items-center text-sm font-semibold text-[#a67854]"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-[28px] border border-gray-200/90 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-[240px_1fr] items-center gap-5">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-[#f5f3ef]">
          <ComboCoverImage src={offer.image} alt={offer.title} sizes="240px" />
        </div>

        <div>
          <span className="font-outfit inline-block rounded-full bg-[#c2966e] px-3.5 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase shadow-xs">
            {offer.badge}
          </span>
          <h3 className="font-geist mt-2.5 text-base font-extrabold text-gray-950">
            {offer.title}
          </h3>

          <div className="mt-3 space-y-1.5 rounded-2xl bg-[#FAF6F0] p-3.5">
            {offer.items.map((it) => (
              <div key={it} className="flex items-start gap-2.5">
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
                <span className="font-geist text-xs font-medium text-gray-800">{it}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-baseline gap-2.5">
              {offer.mrp !== offer.salePrice && (
                <span className="font-geist text-sm text-gray-400 line-through">
                  {formatMrp(offer.mrp)}
                </span>
              )}
              <span className="font-geist text-lg font-black text-[#c2966e]">
                {formatMrp(offer.salePrice || offer.mrp)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 items-center justify-between rounded-full bg-[#FAF6F0] px-3">
                <button
                  type="button"
                  onClick={() => onSetQuantity(id, Math.max(1, quantity - 1))}
                  className="grid size-6 cursor-pointer place-items-center text-base font-semibold text-[#a67854] disabled:opacity-40"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="font-geist px-3 text-xs font-black text-black">
                  {String(quantity).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => onSetQuantity(id, quantity + 1)}
                  className="grid size-6 cursor-pointer place-items-center text-base font-semibold text-[#a67854]"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => onRemove(id)}
                aria-label={`Remove ${offer.title}`}
                className="grid size-9 cursor-pointer place-items-center rounded-2xl bg-[#FAF6F0] text-gray-400 transition hover:text-red-500"
              >
                <Image
                  src="/customer-flow/icons/delete-btn.svg"
                  alt="Delete"
                  width={18}
                  height={18}
                  className="size-4.5 opacity-70"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
