"use client";

import Image from "next/image";
import { useState } from "react";
import type { RequirementHistoryEntry } from "@/features/customer-flow/types";
import { formatMrp } from "@/features/customer-flow/utils/currency";
import { ImagePlaceholder } from "@/features/customer-flow/components/ui/image-placeholder";
import { ImageSkeleton } from "@/features/customer-flow/components/ui/skeleton";

interface RequirementHistoryCardProps {
  history: RequirementHistoryEntry;
}

function HistoryItemThumbnail({ src, alt }: { src?: string; alt: string }) {
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
        sizes="44px"
        className="object-contain p-1"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </>
  );
}

export function RequirementHistoryCard({ history }: RequirementHistoryCardProps) {
  return (
    <article className="rounded-[24px] border border-gray-200/85 bg-[#FAF9F7] p-4 shadow-xs transition hover:border-[#a67854]/40 sm:p-5">
      <div className="flex items-center justify-between border-b border-gray-200/70 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-geist text-sm font-black text-gray-950">
            #{history.requirementNo}
          </span>
          <span className="text-gray-300">•</span>
          <span className="font-geist text-xs text-gray-500">{history.date}</span>
        </div>
      </div>

      {/* Items list */}
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {history.items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-xl bg-white p-3 text-xs shadow-2xs"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-[#FAF6F0]">
                <HistoryItemThumbnail src={item.image} alt={item.name} />
              </div>
              <div className="min-w-0">
                <p className="font-geist truncate font-bold text-gray-950">{item.name}</p>
                <p className="text-[11px] text-gray-400">{item.pack}</p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className="font-geist text-xs font-bold text-gray-700">x{item.quantity}</span>
              <p className="font-geist text-xs font-bold text-[#a67854]">{formatMrp(item.price)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-200/70 pt-3">
        <div className="flex items-center gap-4">
          <span className="font-geist text-xs text-gray-500">{history.totalItems} Items Total</span>
          <span className="font-geist text-base font-black text-gray-950">
            {formatMrp(history.totalSalePrice)}
          </span>
        </div>
      </div>
    </article>
  );
}
