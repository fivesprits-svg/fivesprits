"use client";
import Image from "next/image";

export function QuantityStepper({
  value,
  onChange,
  onRemove,
  compact = false,
}: {
  value: number;
  onChange: (value: number) => void;
  onRemove?: () => void;
  compact?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-2" aria-label="Quantity selector">
      <div
        className={`inline-flex items-center justify-between rounded-full bg-[#FAF6F0] ${
          compact ? "h-8 px-2.5" : "h-10 px-3.5"
        }`}
      >
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={value <= 1}
          onClick={() => value > 1 && onChange(value - 1)}
          className={`${
            compact ? "size-6 text-base" : "size-7 text-lg"
          } grid place-items-center font-semibold text-[#a67854] transition hover:scale-110 active:scale-95 disabled:opacity-40`}
        >
          −
        </button>
        <output
          className={`font-geist text-center font-black text-black ${
            compact ? "min-w-6 text-xs" : "min-w-8 text-sm sm:text-base"
          }`}
        >
          {String(value).padStart(2, "0")}
        </output>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => onChange(value + 1)}
          className={`${
            compact ? "size-6 text-base" : "size-7 text-lg"
          } grid place-items-center font-semibold text-[#a67854] transition hover:scale-110 active:scale-95`}
        >
          +
        </button>
      </div>

      {onRemove && (
        <button
          type="button"
          aria-label="Remove item"
          onClick={onRemove}
          className={`${
            compact ? "size-8 rounded-xl" : "size-10 rounded-2xl"
          } grid shrink-0 place-items-center bg-[#FAF6F0] transition hover:bg-[#f3ede3] active:scale-95`}
        >
          <Image
            src="/customer-flow/icons/delete-btn.svg"
            alt="Remove"
            width={compact ? 16 : 18}
            height={compact ? 16 : 18}
            className={`${compact ? "size-4" : "size-[18px]"} object-contain`}
          />
        </button>
      )}
    </div>
  );
}
