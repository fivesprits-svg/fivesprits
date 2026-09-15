"use client";

import { CartSummarySidebar } from "@/features/customer-flow/components/cart/cart-summary-sidebar";
import { ComboCartItemCard } from "@/features/customer-flow/components/cart/combo-cart-item-card";
import { GiftCartItemCard } from "@/features/customer-flow/components/cart/gift-cart-item-card";
import { RegularCartItemCard } from "@/features/customer-flow/components/cart/regular-cart-item-card";
import { RequirementHistoryCard } from "@/features/customer-flow/components/cart/requirement-history-card";
import { ConfirmationDialog } from "@/features/customer-flow/components/confirmation-dialog";
import { Breadcrumb } from "@/features/customer-flow/components/navigation/breadcrumb";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { EmptyState } from "@/features/customer-flow/components/ui/empty-state";
import { useCartSection } from "@/features/customer-flow/hooks/use-cart-section";

export function DesktopCartSection() {
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
    <div className="hidden md:block">
      <PortalShell title="Requirement" eyebrow="Checklist" backHref="/products">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <Breadcrumb items={[{ label: "Requirement Checklist" }]} />

          <div className="grid grid-cols-[1fr_380px] items-start gap-8">
            <section>
              {/* Header Title */}
              <div className="mb-6 border-b border-gray-200/80 pb-5">
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#a67854]" />
                  <span className="font-outfit text-xs font-bold tracking-wider text-[#a67854] uppercase">
                    CHECKLIST
                  </span>
                </div>
                <h1 className="font-unbounded text-2xl font-black tracking-tight text-gray-900 lg:text-3xl">
                  Requirement Details
                </h1>
                <p className="font-geist mt-1 text-xs text-gray-500 lg:text-sm">
                  Review selected items, bundled gifts, and combo offers before submitting your
                  requirement.
                </p>
              </div>

              {totalItemsCount === 0 ? (
                <div>
                  <EmptyState
                    icon="/customer-flow/icons/requirement0.svg"
                    title="No Offers Available"
                    description="No offers or products in your requirement list yet. Browse our catalogue to discover the best deals."
                    actionLabel="Browse Catalogue"
                    actionHref="/categories"
                  />

                  {/* Requirement History for Regular Users when cart is empty */}
                  {isRegularUser && requirementHistory.length > 0 && (
                    <div className="mt-8 space-y-4">
                      <div>
                        <h2 className="font-unbounded text-lg font-bold text-gray-950">
                          Requirement History
                        </h2>
                        <p className="font-geist text-xs text-gray-500">
                          Quickly re-order or review your past submitted inquiries
                        </p>
                      </div>

                      <div className="space-y-4">
                        {requirementHistory.map((history) => (
                          <RequirementHistoryCard key={history.id} history={history} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-8">
                  {/* 1. REGULAR ITEMS */}
                  {regularItems.length > 0 && (
                    <div>
                      <h2 className="font-geist text-base font-extrabold text-gray-950">
                        Regular Items
                      </h2>
                      <p className="font-geist text-xs text-gray-400">
                        Individually selected items
                      </p>

                      <div className="mt-3 space-y-3">
                        {regularItems.map((item) => (
                          <RegularCartItemCard
                            key={item.id}
                            item={item}
                            onSetQuantity={setCartQuantity}
                            onRemove={removeFromCart}
                            variant="desktop"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. GIFT OFFER */}
                  {giftItems.length > 0 && (
                    <div>
                      <div className="mb-3 flex items-center gap-2">
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
                            variant="desktop"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. COMBO OFFER */}
                  {comboItems.length > 0 && (
                    <div>
                      <h2 className="font-outfit mb-3 text-xs font-black tracking-wider text-gray-950 uppercase">
                        COMBO OFFER
                      </h2>

                      <div className="space-y-4">
                        {comboItems.map((combo) => (
                          <ComboCartItemCard
                            key={combo.id}
                            item={combo}
                            onSetQuantity={setCartQuantity}
                            onRemove={removeFromCart}
                            variant="desktop"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Requirement History for Regular Users when cart is populated */}
                  {isRegularUser && requirementHistory.length > 0 && (
                    <div className="space-y-4 border-t border-gray-200/70 pt-6">
                      <div>
                        <h2 className="font-unbounded text-lg font-bold text-gray-950">
                          Requirement History
                        </h2>
                        <p className="font-geist text-xs text-gray-500">
                          Quickly re-order or review your past submitted inquiries
                        </p>
                      </div>

                      <div className="space-y-4">
                        {requirementHistory.map((history) => (
                          <RequirementHistoryCard key={history.id} history={history} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Sidebar Summary Card */}
            <CartSummarySidebar
              structuredCart={structuredCart}
              submitting={submitting}
              onOpenConfirm={() => setShowConfirmPopup(true)}
            />
          </div>
        </div>

        <ConfirmationDialog
          open={showConfirmPopup}
          loading={submitting}
          logoutLoading={logoutLoading}
          onConfirm={handleConfirmSubmit}
          onDismiss={handleDismissConfirmation}
          onLogout={handleLogout}
        />
      </PortalShell>
    </div>
  );
}
