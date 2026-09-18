"use client";

import { formatMrp } from "@/features/customer-flow/utils/currency";
import { ButtonSpinner } from "@/features/customer-flow/components/ui/skeleton";
import type { StructuredCart } from "@/features/customer-flow/helpers/cart-view-model";

interface CartSummarySidebarProps {
  structuredCart: StructuredCart;
  submitting?: boolean;
  onOpenConfirm?: () => void;
  showButton?: boolean;
}

export function CartSummarySidebar({
  structuredCart,
  submitting = false,
  onOpenConfirm,
  showButton = true,
}: CartSummarySidebarProps) {
  const {
    totalOriginalMrp,
    totalSalePrice,
    availableItemsCount,
    availableOriginalMrp,
    availableSalePrice,
    requestedItemsCount,
    requestedOriginalMrp,
    requestedSalePrice,
    unavailableItemsCount,
  } = structuredCart;

  return (
    <aside className="rounded-[28px] border border-[#E8E8E8] bg-[#F8F8F8] p-5 shadow-xs md:sticky md:top-24 md:p-6">
      <div className="space-y-3">
        {availableItemsCount > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              {availableOriginalMrp > 0 && (
                <span className="font-geist text-base font-semibold text-[#8C827A] line-through">
                  {formatMrp(availableOriginalMrp)}
                </span>
              )}
              <span className="font-geist text-base font-bold text-[#a67854]">
                {formatMrp(availableSalePrice || availableOriginalMrp)}
              </span>
            </div>
            <span className="font-geist text-base font-semibold text-[#8C827A]">
              {availableItemsCount} Available {availableItemsCount === 1 ? "item" : "items"}
            </span>
          </div>
        )}

        {requestedItemsCount > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              {requestedOriginalMrp > 0 && (
                <span className="font-geist text-base font-semibold text-[#8C827A] line-through">
                  {formatMrp(requestedOriginalMrp)}
                </span>
              )}
              <span className="font-geist text-base font-bold text-[#a67854]">
                {formatMrp(requestedSalePrice || requestedOriginalMrp)}
              </span>
            </div>
            <span className="font-geist text-base font-bold text-[#a67854]">
              {requestedItemsCount} Requested {requestedItemsCount === 1 ? "item" : "items"}
            </span>
          </div>
        )}
      </div>

      <div className="my-4 h-px bg-[#E8E3DC]" />

      {unavailableItemsCount > 0 && (
        <p
          className="font-geist mb-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900"
          role="status"
        >
          {unavailableItemsCount} out-of-stock{" "}
          {unavailableItemsCount === 1 ? "item is" : "items are"} excluded from your requirement.
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          {totalOriginalMrp > 0 && totalOriginalMrp !== totalSalePrice && (
            <span className="font-geist text-xl font-bold text-[#8C827A] line-through">
              {formatMrp(totalOriginalMrp)}
            </span>
          )}
          <span className="font-geist text-2xl font-black tracking-tight text-gray-950">
            {formatMrp(totalSalePrice || totalOriginalMrp)}
          </span>
        </div>
        <span className="font-geist text-2xl font-black text-gray-950">Total</span>
      </div>

      {showButton && onOpenConfirm && (
        <button
          type="button"
          disabled={availableItemsCount === 0 || submitting}
          onClick={onOpenConfirm}
          className="font-outfit mt-6 flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-black text-sm font-bold tracking-wide text-white shadow-sm transition hover:bg-gray-800 disabled:opacity-40"
        >
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <ButtonSpinner />
              Sending...
            </span>
          ) : (
            "Send Requirement"
          )}
        </button>
      )}
    </aside>
  );
}
