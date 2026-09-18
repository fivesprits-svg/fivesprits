"use client";

import { useState } from "react";
import Image from "next/image";
import { formatMrp } from "@/features/customer-flow/utils/currency";
import { ImageSkeleton } from "@/features/customer-flow/components/ui/skeleton";
import { ImagePlaceholder } from "@/features/customer-flow/components/ui/image-placeholder";
import type { RegularCartItem } from "@/features/customer-flow/helpers/cart-view-model";

interface RegularCartItemCardProps {
  item: RegularCartItem;
  onSetQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  variant?: "desktop" | "mobile";
}

export function RegularCartItemCard({
  item,
  onSetQuantity,
  onRemove,
  variant = "desktop",
}: RegularCartItemCardProps) {
  const { id, product, brand, quantity, isOutOfStock, priceChange } = item;
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (variant === "mobile") {
    return (
      <article
        className={`flex items-center justify-between rounded-[22px] border p-3 shadow-xs ${isOutOfStock ? "border-amber-200 bg-amber-50/40" : "border-gray-200/90 bg-white"}`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-[14px] bg-[#FAF6F0] p-1">
            {product.image && !imageError ? (
              <>
                {!imageLoaded && <ImageSkeleton className="absolute inset-0" />}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              </>
            ) : (
              <ImagePlaceholder compact type="product" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-geist truncate text-xs font-bold text-gray-950">{product.name}</h3>
            <p className="font-geist text-[10px] text-gray-500">
              {product.pack} {brand ? `• ${brand.name}` : ""}
            </p>
            {(() => {
              const mrp = Number(product.mrp ?? 0);
              const salePrice = Number(product.saleAmount ?? mrp);
              const isDifferent = mrp > 0 && salePrice > 0 && mrp !== salePrice;

              return (
                <div className="mt-1 flex items-baseline gap-1.5">
                  {isDifferent && (
                    <span className="font-geist text-[10px] text-gray-400 line-through">
                      {formatMrp(mrp)}
                    </span>
                  )}
                  <span className="font-geist text-xs font-black text-gray-950">
                    {formatMrp(salePrice || mrp)}
                  </span>
                </div>
              );
            })()}
            {isOutOfStock ? (
              <p className="font-geist mt-1 text-[10px] font-bold text-amber-800" role="status">
                Out of stock
              </p>
            ) : priceChange ? (
              <p className="font-geist mt-1 text-[10px] font-semibold text-amber-800" role="status">
                Price updated: {formatMrp(priceChange.snapshot)} → {formatMrp(priceChange.current)}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onRemove(id)}
            aria-label={`Remove ${product.name}`}
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
              disabled={quantity <= 1 || isOutOfStock}
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
              disabled={isOutOfStock}
            >
              +
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`flex items-center justify-between gap-5 rounded-[22px] border p-4 shadow-xs transition ${isOutOfStock ? "border-amber-200 bg-amber-50/40" : "border-gray-200/90 bg-white hover:border-[#a67854]/40 hover:shadow-sm"}`}
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative size-18 shrink-0 overflow-hidden rounded-[16px] bg-[#FAF6F0] p-1.5">
          {product.image && !imageError ? (
            <>
              {!imageLoaded && <ImageSkeleton className="absolute inset-0" />}
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="72px"
                className="object-contain p-1"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            <ImagePlaceholder compact type="product" />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-geist truncate text-base font-bold text-gray-950">{product.name}</h3>
          <p className="font-geist text-xs text-gray-500">
            {product.pack} {brand ? `• ${brand.name}` : ""}
          </p>
          {(() => {
            const mrp = Number(product.mrp ?? 0);
            const salePrice = Number(product.saleAmount ?? mrp);
            const isDifferent = mrp > 0 && salePrice > 0 && mrp !== salePrice;

            return (
              <div className="mt-1.5 flex items-baseline gap-2">
                {isDifferent && (
                  <span className="font-geist text-xs text-gray-400 line-through">
                    {formatMrp(mrp)}
                  </span>
                )}
                <span className="font-geist text-base font-black text-gray-950">
                  {formatMrp(salePrice || mrp)}
                </span>
              </div>
            );
          })()}
          {isOutOfStock ? (
            <p className="font-geist mt-1.5 text-xs font-bold text-amber-800" role="status">
              Out of stock — remove this item to update your cart.
            </p>
          ) : priceChange ? (
            <p className="font-geist mt-1.5 text-xs font-semibold text-amber-800" role="status">
              Price updated: {formatMrp(priceChange.snapshot)} → {formatMrp(priceChange.current)}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex h-9 items-center justify-between rounded-full bg-[#FAF6F0] px-3">
          <button
            type="button"
            onClick={() => onSetQuantity(id, Math.max(1, quantity - 1))}
            className="grid size-6 cursor-pointer place-items-center text-base font-semibold text-[#a67854] disabled:opacity-40"
            disabled={quantity <= 1 || isOutOfStock}
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
            disabled={isOutOfStock}
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() => onRemove(id)}
          aria-label={`Remove ${product.name}`}
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
    </article>
  );
}
