"use client";

import { useState } from "react";
import Image from "next/image";
import { formatMrp } from "@/features/customer-flow/utils/currency";
import { ImageSkeleton } from "@/features/customer-flow/components/ui/skeleton";
import { ImagePlaceholder } from "@/features/customer-flow/components/ui/image-placeholder";
import type { GiftCartItem } from "@/features/customer-flow/helpers/cart-view-model";

interface GiftCartItemCardProps {
  gift: GiftCartItem;
  onRemove: (id: string) => void;
  variant?: "desktop" | "mobile";
}

function GiftCoverImage({ src, alt, sizes }: { src?: string; alt: string; sizes: string }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!src || imageError) {
    return <ImagePlaceholder type="gift" />;
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

function GiftItemThumbnail({ src, alt, sizes }: { src?: string; alt: string; sizes: string }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!src || imageError) {
    return <ImagePlaceholder compact type="product" />;
  }

  return (
    <>
      {!imageLoaded && <ImageSkeleton className="absolute inset-0" />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-contain p-1"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </>
  );
}

export function GiftCartItemCard({ gift, onRemove, variant = "desktop" }: GiftCartItemCardProps) {
  if (variant === "mobile") {
    return (
      <article className="rounded-[26px] border border-[#eee4d8] bg-[#FAF6F0] p-4 shadow-xs">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[18px] bg-white">
          <GiftCoverImage src={gift.offer.image} alt={gift.offer.gift} sizes="342px" />
        </div>

        <div className="mt-3">
          <p className="font-geist text-xs font-bold text-gray-950">
            Offer Name : {gift.offer.title}
          </p>
          <p className="font-geist mt-0.5 text-xs font-bold text-[#c2966e]">
            Gift : {gift.offer.gift}
          </p>
        </div>

        {/* Selected Items nested cards */}
        <div className="mt-3 space-y-2">
          {gift.selectedProducts.map(({ product, count }) => (
            <div
              key={product.id}
              className="flex items-center justify-between gap-3 rounded-xl bg-white p-2.5 shadow-2xs"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-[#FAF6F0]">
                  <GiftItemThumbnail src={product.image} alt={product.name} sizes="44px" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-geist truncate text-xs font-bold text-gray-950">
                    {product.name}
                  </h4>
                  <p className="font-geist text-[10px] text-gray-500">{product.pack}</p>
                  {(() => {
                    const itemMrp = Number(product.mrp ?? 0);
                    const itemSale = Number(
                      "salePrice" in product
                        ? product.salePrice
                        : "saleAmount" in product
                          ? product.saleAmount
                          : itemMrp,
                    );
                    const isDifferent = itemMrp > 0 && itemSale > 0 && itemMrp !== itemSale;
                    return (
                      <div className="flex items-baseline gap-1.5">
                        {isDifferent && (
                          <span className="font-geist text-[10px] text-gray-400 line-through">
                            {formatMrp(itemMrp)}
                          </span>
                        )}
                        <span className="font-geist text-xs font-black text-[#c2966e]">
                          {formatMrp(itemSale || itemMrp)}
                        </span>
                      </div>
                    );
                  })()}
                </div>
              </div>
              <span className="rounded-lg bg-gray-50 px-2 py-1 text-xs font-bold text-gray-700">
                x{count}
              </span>
            </div>
          ))}
        </div>

        {/* Unlocked message */}
        <div className="mt-3 border-t border-[#e8dfd5]/60 pt-2">
          <p className="font-geist text-[11px] text-gray-500">
            Gift Offer Complete — gift unlocked
          </p>
          <p className="font-geist mt-0.5 text-xs font-bold text-[#d93829]">
            1 {gift.offer.gift} Free Gift added
          </p>
        </div>

        {/* Price Row */}
        <div className="mt-3 flex items-center justify-between pt-2">
          {(() => {
            const isDifferent =
              gift.totalMrp > 0 && gift.totalSalePrice > 0 && gift.totalMrp !== gift.totalSalePrice;
            return (
              <div className="flex items-baseline gap-2">
                {isDifferent && (
                  <span className="font-geist text-xs text-gray-400 line-through">
                    {formatMrp(gift.totalMrp)}
                  </span>
                )}
                <span className="font-geist text-lg font-black text-[#c2966e]">
                  {formatMrp(gift.totalSalePrice || gift.totalMrp)}
                </span>
              </div>
            );
          })()}
          <button
            type="button"
            onClick={() => onRemove(gift.id)}
            aria-label="Remove gift offer"
            className="grid size-8 place-items-center rounded-xl bg-white text-gray-400 shadow-2xs hover:text-red-500"
          >
            <Image
              src="/customer-flow/icons/delete-btn.svg"
              alt="Delete"
              width={16}
              height={16}
              className="size-4 opacity-70"
            />
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-[28px] border border-[#eee4d8] bg-[#FAF6F0] p-5 shadow-sm">
      <div className="grid grid-cols-[300px_1fr] items-start gap-5">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-white">
          <GiftCoverImage src={gift.offer.image} alt={gift.offer.gift} sizes="300px" />
        </div>

        <div>
          <p className="font-geist text-sm font-bold text-gray-950">
            Offer Name : {gift.offer.title}
          </p>
          <p className="font-geist mt-0.5 text-xs font-bold text-[#c2966e]">
            Gift : {gift.offer.gift}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {gift.selectedProducts.map(({ product, count }) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-2.5 rounded-xl bg-white p-2.5 shadow-2xs"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-[#FAF6F0]">
                    <GiftItemThumbnail src={product.image} alt={product.name} sizes="40px" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-geist truncate text-xs font-bold text-gray-950">
                      {product.name}
                    </h4>
                    <p className="font-geist text-[10px] text-gray-500">{product.pack}</p>
                    {(() => {
                      const itemMrp = Number(product.mrp ?? 0);
                      const itemSale = Number(
                        "salePrice" in product
                          ? product.salePrice
                          : "saleAmount" in product
                            ? product.saleAmount
                            : itemMrp,
                      );
                      const isDifferent = itemMrp > 0 && itemSale > 0 && itemMrp !== itemSale;
                      return (
                        <div className="flex items-baseline gap-1.5">
                          {isDifferent && (
                            <span className="font-geist text-[10px] text-gray-400 line-through">
                              {formatMrp(itemMrp)}
                            </span>
                          )}
                          <span className="font-geist text-xs font-black text-[#c2966e]">
                            {formatMrp(itemSale || itemMrp)}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                </div>
                <span className="rounded-lg bg-gray-50 px-2 py-1 text-xs font-bold text-gray-700">
                  x{count}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[#e8dfd5] pt-3">
            <div>
              <p className="font-geist text-xs text-gray-500">
                Gift Offer Complete — gift unlocked
              </p>
              <p className="font-geist mt-0.5 text-xs font-bold text-[#d93829]">
                1 {gift.offer.gift} Free Gift added
              </p>
            </div>

            <div className="flex items-center gap-4">
              {(() => {
                const isDifferent =
                  gift.totalMrp > 0 &&
                  gift.totalSalePrice > 0 &&
                  gift.totalMrp !== gift.totalSalePrice;
                return (
                  <div className="flex items-baseline gap-2">
                    {isDifferent && (
                      <span className="font-geist text-xs text-gray-400 line-through">
                        {formatMrp(gift.totalMrp)}
                      </span>
                    )}
                    <span className="font-geist text-lg font-black text-[#c2966e]">
                      {formatMrp(gift.totalSalePrice || gift.totalMrp)}
                    </span>
                  </div>
                );
              })()}
              <button
                type="button"
                onClick={() => onRemove(gift.id)}
                aria-label="Remove gift offer"
                className="grid size-9 cursor-pointer place-items-center rounded-2xl bg-white text-gray-400 shadow-2xs transition hover:text-red-500"
              >
                <Image
                  src="/customer-flow/icons/delete-btn.svg"
                  alt="Delete"
                  width={16}
                  height={16}
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
