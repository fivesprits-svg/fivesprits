"use client";

import { ConfirmationDialog } from "@/features/customer-flow/components/confirmation-dialog";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { EmptyState } from "@/features/customer-flow/components/ui/empty-state";
import { ButtonSpinner } from "@/features/customer-flow/components/ui/skeleton";
import { useCartSection } from "@/features/customer-flow/hooks/use-cart-section";
import { RegularCartItemCard } from "@/features/customer-flow/components/cart/regular-cart-item-card";
import { GiftCartItemCard } from "@/features/customer-flow/components/cart/gift-cart-item-card";
import { ComboCartItemCard } from "@/features/customer-flow/components/cart/combo-cart-item-card";
import { RequirementHistoryCard } from "@/features/customer-flow/components/cart/requirement-history-card";
import { CartSummarySidebar } from "@/features/customer-flow/components/cart/cart-summary-sidebar";

export function MobileCartSection() {
  const {
    structuredCart,
    requirementHistory,
    isRegularUser,
    submitting,
    logoutLoading,
    showConfirmPopup,
    setShowConfirmPopup,
    setCartQuantity,
    removeFromCart,
    handleLogout,
    handleConfirmSubmit,
    handleDismissConfirmation,
  } = useCartSection();

  const { regularItems, comboItems, giftItems, totalItemsCount } = structuredCart;

  return (
    <div className="min-h-dvh w-full bg-white pb-48 md:hidden">
      <div className="relative px-4 pb-2">
        <div className="mt-3">
          <h1 className="font-outfit text-[36px] leading-none font-black tracking-tight text-black uppercase">
            Requirement
          </h1>
          <p className="font-outfit mt-2 text-xs font-bold tracking-widest text-[#c9a07e] uppercase">
            CHECKLIST
          </p>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[390px] px-4 pt-3">
        {totalItemsCount === 0 ? (
          <div className="space-y-8">
            <EmptyState
              icon="/customer-flow/icons/requirement0.svg"
              title="No Offers Available"
              description="No offers or products in your requirement list yet. Browse our catalogue to discover the best deals."
              actionLabel="Browse Catalogue"
              actionHref="/categories"
            />

            {/* Requirement History for Regular Users when cart is empty */}
            {isRegularUser && requirementHistory.length > 0 && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-unbounded text-base font-bold text-gray-950">
                    Requirement History
                  </h2>
                  <p className="font-geist text-xs text-gray-500">
                    Review your past submitted inquiries
                  </p>
                </div>

                <div className="space-y-3">
                  {requirementHistory.map((history) => (
                    <RequirementHistoryCard key={history.id} history={history} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* 1. REGULAR ITEMS */}
            {regularItems.length > 0 && (
              <div>
                <h2 className="font-geist text-sm font-extrabold text-gray-950">Regular Items</h2>
                <p className="font-geist text-[11px] text-gray-400">Individually selected items</p>

                <div className="mt-2.5 space-y-2.5">
                  {regularItems.map((item) => (
                    <RegularCartItemCard
                      key={item.id}
                      item={item}
                      onSetQuantity={setCartQuantity}
                      onRemove={removeFromCart}
                      variant="mobile"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 2. GIFT OFFER SECTION */}
            {giftItems.length > 0 && (
              <div>
                <div className="mb-2.5 flex items-center gap-1.5">
                  <h2 className="font-outfit text-xs font-black tracking-wider text-gray-950 uppercase">
                    GIFT OFFER
                  </h2>
                </div>

                <div className="space-y-4">
                  {giftItems.map((gift) => (
                    <GiftCartItemCard
                      key={gift.id}
                      gift={gift}
                      onRemove={removeFromCart}
                      variant="mobile"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 3. COMBO OFFER SECTION */}
            {comboItems.length > 0 && (
              <div>
                <h2 className="font-outfit mb-2.5 text-xs font-black tracking-wider text-gray-950 uppercase">
                  COMBO OFFER
                </h2>

                <div className="space-y-4">
                  {comboItems.map((combo) => (
                    <ComboCartItemCard
                      key={combo.id}
                      item={combo}
                      onSetQuantity={setCartQuantity}
                      onRemove={removeFromCart}
                      variant="mobile"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 4. SUMMARY CARD */}
            <CartSummarySidebar structuredCart={structuredCart} showButton={false} />

            {/* Requirement History for Regular Users when cart is populated */}
            {isRegularUser && requirementHistory.length > 0 && (
              <div className="space-y-4 border-t border-gray-100 pt-6">
                <div>
                  <h2 className="font-unbounded text-base font-bold text-gray-950">
                    Requirement History
                  </h2>
                  <p className="font-geist text-xs text-gray-500">
                    Review your past submitted inquiries
                  </p>
                </div>

                <div className="space-y-3">
                  {requirementHistory.map((history) => (
                    <RequirementHistoryCard key={history.id} history={history} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Sticky Action Button */}
      {totalItemsCount > 0 && (
        <div className="fixed right-0 bottom-[92px] left-0 z-30 mx-auto max-w-[390px] border-t border-gray-100 bg-white/95 px-6 py-3 backdrop-blur-xs">
          <button
            type="button"
            disabled={submitting}
            onClick={() => setShowConfirmPopup(true)}
            className="font-outfit flex h-12 w-full items-center justify-center rounded-full bg-black text-sm font-bold tracking-wide text-white shadow-md transition hover:bg-gray-800 active:scale-[0.99] disabled:opacity-70"
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
        </div>
      )}

      <MobileBottomNav active="Request" />
      <ConfirmationDialog
        open={showConfirmPopup}
        loading={submitting}
        logoutLoading={logoutLoading}
        onConfirm={handleConfirmSubmit}
        onDismiss={handleDismissConfirmation}
        onLogout={handleLogout}
      />
    </div>
  );
}
