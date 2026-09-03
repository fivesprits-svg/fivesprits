"use client";
export function QuantityStepper({
  value,
  onChange,
  compact = false,
}: {
  value: number;
  onChange: (value: number) => void;
  compact?: boolean;
}) {
  return (
    <div
      className="inline-flex items-center overflow-hidden rounded-full border border-[#d8c9a9] bg-white"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= 1}
        onClick={() => value > 1 && onChange(value - 1)}
        className={`${compact ? "size-8" : "size-10"} grid place-items-center text-lg text-[#4b2d17] transition hover:bg-[#f7f1e7] focus-visible:outline-2 focus-visible:outline-[#a86d2a] disabled:opacity-35`}
      >
        −
      </button>
      <output
        className={`${compact ? "min-w-8" : "min-w-10"} text-center text-sm font-semibold text-[#24170e]`}
      >
        {value}
      </output>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className={`${compact ? "size-8" : "size-10"} grid place-items-center text-lg text-[#4b2d17] transition hover:bg-[#f7f1e7] focus-visible:outline-2 focus-visible:outline-[#a86d2a]`}
      >
        +
      </button>
    </div>
  );
}
