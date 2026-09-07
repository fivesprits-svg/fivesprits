"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConfirmationDialog } from "@/features/customer-flow/components/confirmation-dialog";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { Breadcrumb } from "@/features/customer-flow/components/navigation/breadcrumb";
import { brands, products } from "@/features/customer-flow/data/catalogue";
import { comboOffers, giftOffer } from "@/features/customer-flow/data/offers";
import { sampleRequirementHistory } from "@/features/customer-flow/data/requirements-history";
import { buildStructuredCart } from "@/features/customer-flow/helpers/cart-view-model";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatMrp } from "@/features/customer-flow/utils/currency";

export function DesktopCartSection() {
  const router = useRouter();
  const {
    state,
    addToCart,
    setCartQuantity,
    removeFromCart,
    submitRequirement,
    dismissConfirmation,
  } = useCustomerFlow();

  const isRegularUser = Boolean(state.session?.cameFromLoginHere || state.session?.mobile);

  const {
    regularItems,
    comboItems,
    giftItems,
    totalItemsCount,
    totalOriginalMrp,
    totalSalePrice,
    availableItemsCount,
    availableOriginalMrp,
    availableSalePrice,
    requestedItemsCount,
    requestedOriginalMrp,
    requestedSalePrice,
  } = buildStructuredCart(state.cart, products, brands, comboOffers, giftOffer);

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
                <div className="space-y-8">
                  <div className="rounded-2xl border border-gray-200/80 bg-white p-12 text-center shadow-sm">
                    <h2 className="font-unbounded text-lg font-bold text-gray-900">
                      Your requirement list is empty
                    </h2>
                    <p className="font-geist mt-1 text-xs text-gray-500">
                      Explore categories and add your preferred bottles or offers to this list.
                    </p>
                    <Link
                      href="/categories"
                      className="font-outfit mt-5 inline-flex h-11 items-center rounded-full bg-black px-6 text-xs font-bold tracking-wider text-white uppercase transition hover:bg-[#a67854]"
                    >
                      Browse Categories
                    </Link>
                  </div>

                  {/* Requirement History for Regular Users when cart is empty */}
                  {isRegularUser && (
                    <div className="space-y-4 pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="font-unbounded text-lg font-bold text-gray-950">
                            Requirement History
                          </h2>
                          <p className="font-geist text-xs text-gray-500">
                            Quickly re-order or review your past submitted inquiries
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {sampleRequirementHistory.map((history) => (
                          <article
                            key={history.id}
                            className="rounded-[24px] border border-gray-200/85 bg-[#FAF9F7] p-5 shadow-xs transition hover:border-[#a67854]/40"
                          >
                            <div className="flex items-center justify-between border-b border-gray-200/70 pb-3">
                              <div className="flex items-center gap-3">
                                <span className="font-geist text-sm font-black text-gray-950">
                                  #{history.requirementNo}
                                </span>
                                <span className="text-gray-300">•</span>
                                <span className="font-geist text-xs text-gray-500">
                                  {history.date}
                                </span>
                                {history.permitNumber && (
                                  <>
                                    <span className="text-gray-300">•</span>
                                  </>
                                )}
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
                                      <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="44px"
                                        className="object-contain p-1"
                                      />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="font-geist truncate font-bold text-gray-950">
                                        {item.name}
                                      </p>
                                      <p className="text-[11px] text-gray-400">{item.pack}</p>
                                    </div>
                                  </div>
                                  <div className="shrink-0 text-right">
                                    <span className="font-geist text-xs font-bold text-gray-700">
                                      x{item.quantity}
                                    </span>
                                    <p className="font-geist text-xs font-bold text-[#a67854]">
                                      {formatMrp(item.price)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Summary & Repeat Button */}
                            <div className="mt-4 flex items-center justify-between border-t border-gray-200/70 pt-3">
                              <div className="flex items-center gap-4">
                                <span className="font-geist text-xs text-gray-500">
                                  {history.totalItems} Items Total
                                </span>
                                <span className="font-geist text-base font-black text-gray-950">
                                  {formatMrp(history.totalSalePrice)}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  history.items.forEach((item) => {
                                    const found = products.find((p) => p.name === item.name);
                                    if (found) {
                                      addToCart(found.id, item.quantity);
                                    }
                                  });
                                }}
                                className="font-outfit rounded-full bg-black px-5 py-2 text-xs font-bold text-white transition hover:bg-[#a67854]"
                              >
                                Repeat Inquiry
                              </button>
                            </div>
                          </article>
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
                        {regularItems.map(({ id, product, brand, quantity }) => (
                          <article
                            key={id}
                            className="flex items-center justify-between gap-5 rounded-[22px] border border-gray-200/90 bg-white p-4 shadow-xs transition hover:border-[#a67854]/40 hover:shadow-sm"
                          >
                            <div className="flex min-w-0 items-center gap-4">
                              <div className="relative size-18 shrink-0 overflow-hidden rounded-[16px] bg-[#FAF6F0] p-1.5">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  sizes="72px"
                                  className="object-contain p-1"
                                />
                              </div>
                              <div className="min-w-0">
                                <h3 className="font-geist truncate text-base font-bold text-gray-950">
                                  {product.name}
                                </h3>
                                <p className="font-geist text-xs text-gray-500">
                                  {product.pack} {brand ? `• ${brand.name}` : ""}
                                </p>
                                <div className="mt-1.5 flex items-baseline gap-2">
                                  <span className="font-geist text-xs text-gray-400 line-through">
                                    {formatMrp(Math.round(product.mrp * 1.15))}
                                  </span>
                                  <span className="font-geist text-base font-black text-gray-950">
                                    {formatMrp(product.mrp)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="flex h-9 items-center justify-between rounded-full bg-[#FAF6F0] px-3">
                                <button
                                  type="button"
                                  onClick={() => setCartQuantity(id, Math.max(1, quantity - 1))}
                                  className="grid size-6 place-items-center text-base font-semibold text-[#a67854] disabled:opacity-40"
                                  disabled={quantity <= 1}
                                  aria-label="Decrease quantity"
                                >
                                  −
                                </button>
                                <span className="font-geist px-3 text-xs font-black text-black">
                                  {String(quantity).padStart(2, "0")}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setCartQuantity(id, quantity + 1)}
                                  className="grid size-6 place-items-center text-base font-semibold text-[#a67854]"
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromCart(id)}
                                aria-label={`Remove ${product.name}`}
                                className="grid size-9 place-items-center rounded-2xl bg-[#FAF6F0] text-gray-400 transition hover:text-red-500"
                              >
                                <Image
                                  src="/customer-flow/icons/delete-btn.svg"
                                  alt="Delete"
                                  width={18}
                                  height={18}
                                  className="size-4.5 opacity-70"
                                />
                              </button>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. GIFT OFFER */}
                  {giftItems.length > 0 && (
                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-base">🎁</span>
                        <h2 className="font-outfit text-xs font-black tracking-wider text-gray-950 uppercase">
                          GIFT OFFER
                        </h2>
                      </div>

                      <div className="space-y-4">
                        {giftItems.map((gift) => (
                          <article
                            key={gift.id}
                            className="rounded-[28px] border border-[#eee4d8] bg-[#FAF6F0] p-5 shadow-sm"
                          >
                            <div className="grid grid-cols-[300px_1fr] items-start gap-5">
                              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-white">
                                <Image
                                  src={gift.offer.image}
                                  alt={gift.offer.gift}
                                  fill
                                  sizes="300px"
                                  className="object-cover"
                                />
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
                                          <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            sizes="40px"
                                            className="object-contain p-1"
                                          />
                                        </div>
                                        <div className="min-w-0">
                                          <h4 className="font-geist truncate text-xs font-bold text-gray-950">
                                            {product.name}
                                          </h4>
                                          <p className="font-geist text-[10px] text-gray-500">
                                            {product.pack}
                                          </p>
                                          <span className="font-geist text-xs font-black text-[#c2966e]">
                                            {formatMrp(
                                              "salePrice" in product
                                                ? product.salePrice
                                                : product.mrp,
                                            )}
                                          </span>
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
                                    <div className="flex items-baseline gap-2">
                                      <span className="font-geist text-xs text-gray-400 line-through">
                                        {formatMrp(gift.totalMrp)}
                                      </span>
                                      <span className="font-geist text-lg font-black text-[#c2966e]">
                                        {formatMrp(gift.totalSalePrice)}
                                      </span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeFromCart(gift.id)}
                                      aria-label="Remove gift offer"
                                      className="grid size-9 place-items-center rounded-2xl bg-white text-gray-400 shadow-2xs transition hover:text-red-500"
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
                        {comboItems.map(({ id, offer, quantity }) => (
                          <article
                            key={id}
                            className="rounded-[28px] border border-gray-200/90 bg-white p-5 shadow-sm"
                          >
                            <div className="grid grid-cols-[240px_1fr] items-center gap-5">
                              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-[#f5f3ef]">
                                <Image
                                  src={offer.image}
                                  alt={offer.title}
                                  fill
                                  sizes="240px"
                                  className="object-cover"
                                />
                              </div>

                              <div>
                                <span className="font-outfit inline-block rounded-full bg-[#c2966e] px-3.5 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase shadow-xs">
                                  {offer.badge}
                                </span>
                                <h3 className="font-geist mt-2.5 text-base font-extrabold text-gray-950">
                                  {offer.title}
                                </h3>

                                <div className="mt-3 space-y-1.5 rounded-2xl bg-[#FAF6F0] p-3.5">
                                  {offer.items.map((item) => (
                                    <div key={item} className="flex items-start gap-2.5">
                                      <svg
                                        className="mt-0.5 size-4 shrink-0 text-[#c2966e]"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <span className="font-geist text-xs font-medium text-gray-800">
                                        {item}
                                      </span>
                                    </div>
                                  ))}
                                </div>

                                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                                  <div className="flex items-baseline gap-2.5">
                                    <span className="font-geist text-sm text-gray-400 line-through">
                                      {formatMrp(offer.mrp)}
                                    </span>
                                    <span className="font-geist text-lg font-black text-[#c2966e]">
                                      {formatMrp(offer.salePrice)}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <div className="flex h-9 items-center justify-between rounded-full bg-[#FAF6F0] px-3">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setCartQuantity(id, Math.max(1, quantity - 1))
                                        }
                                        className="grid size-6 place-items-center text-base font-semibold text-[#a67854] disabled:opacity-40"
                                        disabled={quantity <= 1}
                                        aria-label="Decrease quantity"
                                      >
                                        −
                                      </button>
                                      <span className="font-geist px-3 text-xs font-black text-black">
                                        {String(quantity).padStart(2, "0")}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => setCartQuantity(id, quantity + 1)}
                                        className="grid size-6 place-items-center text-base font-semibold text-[#a67854]"
                                        aria-label="Increase quantity"
                                      >
                                        +
                                      </button>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => removeFromCart(id)}
                                      aria-label={`Remove ${offer.title}`}
                                      className="grid size-9 place-items-center rounded-2xl bg-[#FAF6F0] text-gray-400 transition hover:text-red-500"
                                    >
                                      <Image
                                        src="/customer-flow/icons/delete-btn.svg"
                                        alt="Delete"
                                        width={18}
                                        height={18}
                                        className="size-4.5 opacity-70"
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Requirement History for Regular Users when cart is populated */}
                  {isRegularUser && (
                    <div className="space-y-4 border-t border-gray-200/70 pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="font-unbounded text-lg font-bold text-gray-950">
                            Requirement History
                          </h2>
                          <p className="font-geist text-xs text-gray-500">
                            Quickly re-order or review your past submitted inquiries
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {sampleRequirementHistory.map((history) => (
                          <article
                            key={history.id}
                            className="rounded-[24px] border border-gray-200/85 bg-[#FAF9F7] p-5 shadow-xs transition hover:border-[#a67854]/40"
                          >
                            <div className="flex items-center justify-between border-b border-gray-200/70 pb-3">
                              <div className="flex items-center gap-3">
                                <span className="font-geist text-sm font-black text-gray-950">
                                  #{history.requirementNo}
                                </span>
                                <span className="text-gray-300">•</span>
                                <span className="font-geist text-xs text-gray-500">
                                  {history.date}
                                </span>
                                {history.permitNumber && (
                                  <>
                                    <span className="text-gray-300">•</span>
                                  </>
                                )}
                              </div>
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                                <span className="size-1.5 rounded-full bg-emerald-500" />
                                {history.status}
                              </span>
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
                                      <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="44px"
                                        className="object-contain p-1"
                                      />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="font-geist truncate font-bold text-gray-950">
                                        {item.name}
                                      </p>
                                      <p className="text-[11px] text-gray-400">{item.pack}</p>
                                    </div>
                                  </div>
                                  <div className="shrink-0 text-right">
                                    <span className="font-geist text-xs font-bold text-gray-700">
                                      x{item.quantity}
                                    </span>
                                    <p className="font-geist text-xs font-bold text-[#a67854]">
                                      {formatMrp(item.price)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Summary & Repeat Button */}
                            <div className="mt-4 flex items-center justify-between border-t border-gray-200/70 pt-3">
                              <div className="flex items-center gap-4">
                                <span className="font-geist text-xs text-gray-500">
                                  {history.totalItems} Items Total
                                </span>
                                <span className="font-geist text-base font-black text-gray-950">
                                  {formatMrp(history.totalSalePrice)}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  history.items.forEach((item) => {
                                    const found = products.find((p) => p.name === item.name);
                                    if (found) {
                                      addToCart(found.id, item.quantity);
                                    }
                                  });
                                }}
                                className="font-outfit rounded-full bg-black px-5 py-2 text-xs font-bold text-white transition hover:bg-[#a67854]"
                              >
                                Repeat Inquiry
                              </button>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Sidebar Summary Card */}
            <aside className="sticky top-24 rounded-[28px] border border-[#E8E8E8] bg-[#F8F8F8] p-6 shadow-xs">
              <div className="space-y-3">
                {availableItemsCount > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-geist text-base font-semibold text-[#8C827A] line-through">
                        {formatMrp(availableOriginalMrp)}
                      </span>
                      <span className="font-geist text-base font-bold text-[#a67854]">
                        {formatMrp(availableSalePrice)}
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
                      <span className="font-geist text-base font-semibold text-[#8C827A] line-through">
                        {formatMrp(requestedOriginalMrp)}
                      </span>
                      <span className="font-geist text-base font-bold text-[#a67854]">
                        {formatMrp(requestedSalePrice)}
                      </span>
                    </div>
                    <span className="font-geist text-base font-bold text-[#a67854]">
                      {requestedItemsCount} Requested {requestedItemsCount === 1 ? "item" : "items"}
                    </span>
                  </div>
                )}
              </div>

              <div className="my-4 h-px bg-[#E8E3DC]" />

              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="font-geist text-xl font-bold text-[#8C827A] line-through">
                    {formatMrp(totalOriginalMrp)}
                  </span>
                  <span className="font-geist text-3xl font-black tracking-tight text-gray-950">
                    {formatMrp(totalSalePrice)}
                  </span>
                </div>
                <span className="font-geist text-2xl font-black text-gray-950">Total</span>
              </div>

              <button
                type="button"
                disabled={totalItemsCount === 0}
                onClick={submitRequirement}
                className="font-outfit mt-6 flex h-12 w-full items-center justify-center rounded-full bg-black text-sm font-bold tracking-wide text-white shadow-sm transition hover:bg-gray-800 disabled:opacity-40"
              >
                Send Requirement
              </button>
            </aside>
          </div>
        </div>

        <ConfirmationDialog
          open={state.showConfirmation}
          onClose={() => {
            dismissConfirmation();
            router.push("/categories");
          }}
        />
      </PortalShell>
    </div>
  );
}
