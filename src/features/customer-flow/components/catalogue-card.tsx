"use client";
import Image from "next/image";

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
}: CatalogueCardProps) {
  if (variant === "category") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-xl p-0 text-center transition-all hover:bg-white/60 sm:gap-2 sm:p-1.5"
      >
        <span className="relative size-[64px] overflow-hidden rounded-full border border-gray-200/80 bg-[#f6f1eb] p-1 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-[#a67854] group-hover:shadow-md sm:size-[76px] sm:border-2 sm:border-transparent lg:size-24">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 68px, (max-width: 1024px) 18vw, 12vw"
            loading="eager"
            className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
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
        className="group flex h-full w-full cursor-pointer flex-col items-center justify-between rounded-xl border border-gray-200/80 bg-white p-2.5 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#a67854]/50 hover:shadow-md sm:rounded-2xl sm:p-4"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#f7f5f0] p-2 transition-colors group-hover:bg-[#f2ede4] sm:rounded-xl sm:p-3">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="eager"
            className="object-contain p-1 transition-transform duration-300 group-hover:scale-105 sm:p-2"
          />
        </div>
        <span className="font-geist mt-2 max-w-full truncate text-xs font-bold tracking-tight text-gray-900 transition-colors group-hover:text-[#a67854] sm:mt-3 sm:text-sm">
          {title}
        </span>
      </button>
    );
  }

  return (
    <article className="group flex h-full w-full flex-col justify-between rounded-xl border border-gray-200/80 bg-white p-2.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#a67854]/40 hover:shadow-md sm:rounded-2xl sm:p-3.5">
      <div>
        {/* Product Image Box */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-50 p-1.5 transition-colors group-hover:bg-gray-100 sm:rounded-xl sm:p-2">
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
            className="object-contain p-1 transition-transform duration-300 group-hover:scale-105 sm:p-2"
          />
        </div>

        {/* Product Info */}
        <div className="mt-2 sm:mt-2.5">
          <h2 className="font-geist line-clamp-2 min-h-[32px] text-xs leading-snug font-semibold text-gray-900 sm:min-h-[38px] sm:text-sm">
            {title}
          </h2>

          {subtitle && (
            <p className="font-geist mt-0.5 text-[11px] font-normal text-gray-500 sm:text-xs">
              {subtitle}
            </p>
          )}

          <div className="mt-1.5 flex items-baseline gap-1.5 sm:mt-2 sm:gap-2">
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
      <div className="mt-2.5 border-t border-gray-100 pt-2 sm:mt-3.5 sm:pt-3">
        {/* Show Add/Request button only when product is NOT in cart */}
        {quantity == null && actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className={`font-outfit flex h-8 w-full items-center justify-center rounded-lg text-[11px] font-bold tracking-wider uppercase transition-all duration-150 sm:h-9 sm:rounded-xl sm:text-xs ${
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
          <div className="flex h-8 w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-0.5 sm:h-9 sm:rounded-xl sm:p-1">
            <button
              type="button"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="grid size-6 place-items-center rounded-md border border-gray-200 bg-white text-xs font-bold text-gray-700 transition hover:bg-gray-100 sm:size-7 sm:rounded-lg"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span className="font-geist px-1 text-[11px] font-bold text-gray-900 sm:px-2 sm:text-xs">
              {String(quantity).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={() => onQuantityChange(quantity + 1)}
              className="grid size-6 place-items-center rounded-md border border-gray-200 bg-white text-xs font-bold text-gray-700 transition hover:bg-gray-100 sm:size-7 sm:rounded-lg"
              aria-label="Increase quantity"
            >
              +
            </button>

            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="grid size-6 place-items-center rounded-md text-red-500 transition hover:bg-red-50 sm:size-7 sm:rounded-lg"
                aria-label="Remove product"
              >
                <Image
                  src="/customer-flow/icons/delete-btn.svg"
                  alt="Remove"
                  width={16}
                  height={16}
                />
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
