"use client";
import Image from "next/image";
import { useState } from "react";
import {
  Skeleton,
  SkeletonCircle,
  ImageSkeleton,
} from "@/features/customer-flow/components/ui/skeleton";

type CatalogueCardProps = {
  image: string;
  title: string;
  subtitle?: string;
  price?: string;
  originalPrice?: string;
  badge?: string;
  onClick?: () => void;
  variant?: "category" | "brand" | "product";
  actionLabel?: string;
  actionVariant?: "add" | "request" | "requested";
  onAction?: () => void;
  quantity?: number;
  onQuantityChange?: (value: number) => void;
  onRemove?: () => void;
  isLoading?: boolean;
};

export function CatalogueCard({
  image,
  title,
  subtitle,
  price,
  originalPrice,
  badge,
  onClick,
  variant = "category",
  actionLabel,
  actionVariant = "add",
  onAction,
  quantity,
  onQuantityChange,
  onRemove,
  isLoading = false,
}: CatalogueCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) {
    if (variant === "category") {
      return <CategorySkeleton />;
    }
    if (variant === "brand") {
      return <BrandSkeleton />;
    }
    return <CardSkeleton />;
  }

  if (variant === "category") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-xl p-0 text-center transition-all hover:bg-white/60 sm:gap-2 sm:p-1.5"
      >
        <span className="relative size-[64px] overflow-hidden rounded-full border border-gray-200/80 bg-[#f6f1eb] p-1 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-[#a67854] group-hover:shadow-md sm:size-[76px] sm:border-2 sm:border-transparent lg:size-24">
          {!imageLoaded && <SkeletonCircle className="absolute inset-0" />}
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 68px, (max-width: 1024px) 18vw, 12vw"
            loading="eager"
            className={`rounded-full object-cover transition-all duration-300 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
          />
        </span>
        <span className="font-geist max-w-full truncate text-[11px] font-semibold tracking-tight text-gray-800 transition-colors group-hover:text-[#a67854] sm:text-xs lg:text-sm">
          {title}
        </span>
      </button>
    );
  }

  if (variant === "brand") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group flex w-full cursor-pointer flex-col items-center rounded-xl border border-gray-200/80 bg-white p-1.5 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#a67854]/50 hover:shadow-md sm:rounded-2xl sm:p-4"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg transition-colors sm:rounded-xl">
          {!imageLoaded && <ImageSkeleton className="absolute inset-0" />}
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="eager"
            className={`object-contain p-1 transition-transform duration-300 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <span className="font-geist mt-2.5 max-w-full truncate text-xs font-bold tracking-tight text-gray-900 transition-colors group-hover:text-[#a67854] sm:mt-3 sm:text-sm">
          {title}
        </span>
      </button>
    );
  }

  return (
    <article className="group flex h-full w-full cursor-pointer flex-col justify-between rounded-xl border border-gray-200/80 bg-white p-2.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#a67854]/40 hover:shadow-md sm:rounded-2xl sm:p-3.5">
      <div>
        {/* Product Image Box */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-50 p-1.5 transition-colors group-hover:bg-gray-100 sm:rounded-xl sm:p-2">
          {!imageLoaded && <ImageSkeleton className="absolute inset-0" />}
          {badge && (
            <span className="font-outfit absolute top-1.5 right-1.5 z-10 rounded-md bg-[#dc2626] px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase shadow-sm sm:top-2 sm:right-2 sm:text-[10px]">
              {badge}
            </span>
          )}

          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="eager"
            className={`object-contain p-1 transition-all duration-300 group-hover:scale-105 sm:p-2 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Product Info */}
        <div className="mt-2 sm:mt-2.5">
          <h2 className="font-geist text-xs leading-snug font-semibold text-gray-900 sm:text-sm">
            {title}
          </h2>

          {subtitle && (
            <p className="font-geist mt-0.5 text-[11px] font-normal text-gray-500 sm:text-xs">
              {subtitle}
            </p>
          )}

          <div className="mt-1 flex items-baseline gap-1.5 sm:gap-2">
            {originalPrice && (
              <span className="font-geist text-[11px] text-gray-400 line-through sm:text-xs">
                {originalPrice}
              </span>
            )}

            {price && (
              <span className="font-geist text-xs font-bold text-gray-900 sm:text-sm lg:text-base">
                {price}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions / Add to Cart */}
      <div className="mt-2 border-t border-gray-100 pt-2 sm:mt-2.5 sm:pt-2.5">
        {/* Show Add/Request button only when product is NOT in cart */}
        {quantity == null && actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className={`font-outfit flex h-9 w-full cursor-pointer items-center justify-center rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all duration-150 sm:h-10 sm:text-xs ${
              actionVariant === "request"
                ? "bg-[#a67854] text-white hover:bg-[#8f6442]"
                : actionVariant === "requested"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-900 text-white hover:bg-[#a67854]"
            }`}
          >
            {actionLabel}
          </button>
        )}

        {/* Show quantity controls only after product is added */}
        {quantity != null && onQuantityChange && (
          <div className="flex h-9 w-full items-center gap-2 sm:h-10">
            <div className="flex h-full flex-1 items-center justify-between rounded-full bg-[#FAF6F0] px-3.5 sm:px-4">
              <button
                type="button"
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                className="grid size-7 cursor-pointer place-items-center text-lg font-semibold text-[#a67854] transition hover:scale-110 active:scale-95 disabled:opacity-80"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >
                −
              </button>

              <span className="font-geist text-xs font-black text-black sm:text-sm">
                {String(quantity).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={() => onQuantityChange(quantity + 1)}
                className="grid size-7 cursor-pointer place-items-center text-lg font-semibold text-[#a67854] transition hover:scale-110 active:scale-95"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="grid size-9 shrink-0 place-items-center rounded-2xl bg-[#FAF6F0] transition hover:bg-[#f3ede3] active:scale-95 sm:size-10"
                aria-label="Remove product"
              >
                <Image
                  src="/customer-flow/icons/delete-btn.svg"
                  alt="Remove"
                  width={18}
                  height={18}
                  className="size-[18px] cursor-pointer object-contain sm:size-5"
                />
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function CategorySkeleton() {
  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      <SkeletonCircle className="size-[64px] sm:size-[76px] lg:size-24" />
      <Skeleton className="h-3 w-16 rounded sm:h-3.5" />
    </div>
  );
}

function BrandSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white p-1.5 shadow-sm sm:rounded-2xl sm:p-4">
      <Skeleton className="aspect-[16/10] w-full rounded-lg sm:rounded-xl" />
      <Skeleton className="mx-auto mt-2.5 h-3 w-20 rounded sm:mt-3 sm:h-3.5" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white p-2.5 shadow-sm sm:rounded-2xl sm:p-3.5">
      <Skeleton className="aspect-[4/3] w-full rounded-lg sm:rounded-xl" />
      <div className="mt-2 space-y-1.5 sm:mt-2.5">
        <Skeleton className="h-3.5 w-3/4 rounded sm:h-4" />
        <Skeleton className="h-3 w-1/2 rounded" />
        <Skeleton className="h-4 w-1/3 rounded sm:h-5" />
      </div>
      <div className="mt-2 border-t border-gray-100 pt-2 sm:mt-2.5 sm:pt-2.5">
        <Skeleton className="h-9 w-full rounded-xl sm:h-10" />
      </div>
    </div>
  );
}
