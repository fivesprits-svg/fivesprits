"use client";

import { useEffect } from "react";

interface MaxLimitDialogProps {
  open: boolean;
  onClose: () => void;
  maxLimit?: number;
  giftName?: string;
}

export function MaxLimitDialog({
  open,
  onClose,
  maxLimit = 6,
  giftName = "Premium Trolley",
}: MaxLimitDialogProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-xs transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="max-limit-title"
        className="relative w-full max-w-sm transform rounded-[28px] bg-white p-6 text-center shadow-2xl transition-all duration-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 grid size-8 place-items-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
        >
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Warning Icon Badge */}
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-amber-50 ring-8 ring-amber-50/50">
          <svg
            className="size-7 text-[#a67854]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 id="max-limit-title" className="font-unbounded mt-4 text-lg font-bold text-gray-950">
          Max {maxLimit} Items Allowed
        </h2>

        {/* Description */}
        <p className="font-geist mt-2 text-xs leading-relaxed text-gray-600">
          You have already selected the maximum limit of{" "}
          <strong className="font-bold text-gray-900">{maxLimit} items</strong> for this gift offer
          to unlock your <strong className="font-bold text-[#a67854]">{giftName}</strong>.
        </p>

        <div className="mt-3 rounded-2xl bg-[#FAF6F0] p-3 text-left">
          <p className="font-geist text-[11px] font-semibold text-[#8C6D4F]">
            💡 <span className="text-[#5c442c]">Tip:</span> To add a different product, decrease the
            quantity of an already selected item first.
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onClose}
          className="font-outfit mt-5 flex h-11 w-full items-center justify-center rounded-full bg-black text-xs font-bold tracking-wider text-white uppercase shadow-md transition hover:bg-gray-800 active:scale-[0.99]"
        >
          Got It
        </button>
      </div>
    </div>
  );
}
