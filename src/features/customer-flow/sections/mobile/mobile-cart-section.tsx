"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConfirmationDialog } from "@/features/customer-flow/components/confirmation-dialog";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { brands, products } from "@/features/customer-flow/data/catalogue";
import { comboOffers, giftOffer } from "@/features/customer-flow/data/offers";
import { buildStructuredCart } from "@/features/customer-flow/helpers/cart-view-model";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatMrp } from "@/features/customer-flow/utils/currency";

export function MobileCartSection() {
  const router = useRouter();
  const { state, setCartQuantity, removeFromCart, submitRequirement, dismissConfirmation } =
    useCustomerFlow();

  const {
    regularItems,
    comboItems,
    giftItems,
    totalItemsCount,
    totalOriginalMrp,
    totalSalePrice,
    availableItemsCount,
  } = buildStructuredCart(state.cart, products, brands, comboOffers, giftOffer);

  return (
    <div className="min-h-dvh bg-white pb-48 md:hidden">
      {/* Header matching mockup */}
      <header className="mx-auto w-full max-w-[390px] px-6 pt-5 pb-2">
        <h1 className="font-unbounded text-3xl font-black tracking-tight text-gray-950 uppercase">
          Requirement
        </h1>
        <p className="font-outfit mt-1 text-xs font-bold tracking-widest text-[#a67854] uppercase">
          CHECKLIST
        </p>
      </header>

      <main className="mx-auto w-full max-w-[390px] px-6 pt-3">
        {totalItemsCount === 0 ? (
          <div className="pt-16 text-center">
            <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#f4f1ec]">
              <Image src="/customer-flow/icons/empty.svg" alt="" width={40} height={40} />
            </div>
            <h2 className="font-geist mt-6 text-xl font-bold text-gray-950">Your cart is empty</h2>
            <p className="font-geist mx-auto mt-2 max-w-[260px] text-xs leading-relaxed text-gray-500">
              Browse the catalogue and add products or curated offers to your requirement list.
            </p>
            <Link
              href="/categories"
              className="font-outfit mt-6 inline-flex h-12 items-center rounded-full bg-black px-7 text-xs font-bold tracking-wider text-white uppercase"
            >
              Browse Catalogue
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 1. REGULAR ITEMS SECTION */}
            {regularItems.length > 0 && (
              <div>
                <h2 className="font-geist text-base font-extrabold text-gray-950">Regular Items</h2>
                <p className="font-geist text-xs text-gray-400">Individually selected items</p>

                <div className="mt-3 space-y-3">
                  {regularItems.map(({ id, product, brand, quantity }) => (
                    <article
                      key={id}
                      className="flex items-center justify-between gap-3 rounded-[22px] border border-gray-200/90 bg-white p-3 shadow-xs"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="relative size-[68px] shrink-0 overflow-hidden rounded-[14px] bg-[#FAF6F0] p-1">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="68px"
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-geist truncate text-sm font-bold text-gray-950">
                            {product.name}
                          </h3>
                          <p className="font-geist text-[11px] text-gray-500">
                            {product.pack} {brand ? `• ${brand.name}` : ""}
                          </p>
                          <div className="mt-1 flex items-baseline gap-1.5">
                            <span className="font-geist text-[11px] text-gray-400 line-through">
                              {formatMrp(Math.round(product.mrp * 1.15))}
                            </span>
                            <span className="font-geist text-sm font-black text-gray-950">
                              {formatMrp(product.mrp)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between self-stretch py-0.5">
                        <button
                          type="button"
                          onClick={() => removeFromCart(id)}
                          aria-label={`Remove ${product.name}`}
                          className="grid size-7 place-items-center text-gray-400 hover:text-red-500"
                        >
                          <Image
                            src="/customer-flow/icons/delete-btn.svg"
                            alt="Delete"
                            width={16}
                            height={16}
                            className="size-4 opacity-60 hover:opacity-100"
                          />
                        </button>

                        <div className="flex h-8 items-center justify-between rounded-full bg-[#FAF6F0] px-2.5">
                          <button
                            type="button"
                            onClick={() => setCartQuantity(id, Math.max(1, quantity - 1))}
                            className="grid size-5 place-items-center text-sm font-semibold text-[#a67854] disabled:opacity-40"
                            disabled={quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="font-geist px-2 text-xs font-black text-black">
                            {String(quantity).padStart(2, "0")}
                          </span>
                          <button
                            type="button"
                            onClick={() => setCartQuantity(id, quantity + 1)}
                            className="grid size-5 place-items-center text-sm font-semibold text-[#a67854]"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* 2. GIFT OFFER SECTION */}
            {giftItems.length > 0 && (
              <div>
                <div className="mb-2.5 flex items-center gap-1.5">
                  <span className="text-sm">🎁</span>
                  <h2 className="font-outfit text-xs font-black tracking-wider text-gray-950 uppercase">
                    GIFT OFFER
                  </h2>
                </div>

                <div className="space-y-4">
                  {giftItems.map((gift) => (
                    <article
                      key={gift.id}
                      className="rounded-[26px] border border-[#eee4d8] bg-[#FAF6F0] p-4 shadow-xs"
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[18px] bg-white">
                        <Image
                          src={gift.offer.image}
                          alt={gift.offer.gift}
                          fill
                          sizes="342px"
                          className="object-cover"
                        />
                      </div>

                      <div className="mt-3">
                        <p className="font-geist text-xs font-bold text-gray-950">
                          Offer Name : {gift.offer.title}
                        </p>
                        <p className="font-geist mt-0.5 text-xs font-bold text-[#c2966e]">
                          Gift : {gift.offer.gift}
                        </p>
                      </div>

                      {/* Selected Items nested cards */}
                      <div className="mt-3 space-y-2">
                        {gift.selectedProducts.map(({ product, count }) => (
                          <div
                            key={product.id}
                            className="flex items-center justify-between gap-3 rounded-xl bg-white p-2.5 shadow-2xs"
                          >
                            <div className="flex min-w-0 items-center gap-2.5">
                              <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-[#FAF6F0]">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  sizes="44px"
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
                                <div className="flex items-baseline gap-1.5">
                                  <span className="font-geist text-[10px] text-gray-400 line-through">
                                    {formatMrp(product.mrp)}
                                  </span>
                                  <span className="font-geist text-xs font-black text-[#c2966e]">
                                    {formatMrp(
                                      "salePrice" in product ? product.salePrice : product.mrp,
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <span className="rounded-lg bg-gray-50 px-2 py-1 text-xs font-bold text-gray-700">
                              x{count}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Unlocked message */}
                      <div className="mt-3 border-t border-[#e8dfd5]/60 pt-2">
                        <p className="font-geist text-[11px] text-gray-500">
                          Gift Offer Complete — gift unlocked
                        </p>
                        <p className="font-geist mt-0.5 text-xs font-bold text-[#d93829]">
                          1 {gift.offer.gift} Free Gift added
                        </p>
                      </div>

                      {/* Gift Price Row */}
                      <div className="mt-3 flex items-center justify-between pt-2">
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
                          className="grid size-8 place-items-center rounded-xl bg-white text-gray-400 shadow-2xs hover:text-red-500"
                        >
                          <Image
                            src="/customer-flow/icons/delete-btn.svg"
                            alt="Delete"
                            width={16}
                            height={16}
                            className="size-4 opacity-70"
                          />
                        </button>
                      </div>
                    </article>
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
                  {comboItems.map(({ id, offer, quantity }) => (
                    <article
                      key={id}
                      className="rounded-[26px] border border-gray-200/90 bg-white p-4 shadow-sm"
                    >
                      <div className="relative aspect-[16/8] w-full overflow-hidden rounded-[18px] bg-[#f5f3ef]">
                        <Image
                          src={offer.image}
                          alt={offer.title}
                          fill
                          sizes="342px"
                          className="object-cover"
                        />
                      </div>

                      <div className="mt-3">
                        <span className="font-outfit inline-block rounded-full bg-[#c2966e] px-3 py-0.5 text-[10px] font-extrabold tracking-wider text-white uppercase shadow-xs">
                          {offer.badge}
                        </span>
                      </div>

                      <h3 className="font-geist mt-2 text-sm leading-snug font-extrabold text-gray-950">
                        {offer.title}
                      </h3>

                      <div className="mt-2.5 space-y-1.5 rounded-2xl bg-[#FAF6F0] p-3">
                        {offer.items.map((item) => (
                          <div key={item} className="flex items-start gap-2">
                            <svg
                              className="mt-0.5 size-3.5 shrink-0 text-[#c2966e]"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="font-geist text-[11px] font-medium text-gray-800">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                        <div className="flex items-baseline gap-2">
                          <span className="font-geist text-xs text-gray-400 line-through">
                            {formatMrp(offer.mrp)}
                          </span>
                          <span className="font-geist text-base font-black text-[#c2966e]">
                            {formatMrp(offer.salePrice)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex h-8 items-center justify-between rounded-full bg-[#FAF6F0] px-2.5">
                            <button
                              type="button"
                              onClick={() => setCartQuantity(id, Math.max(1, quantity - 1))}
                              className="grid size-5 place-items-center text-sm font-semibold text-[#a67854] disabled:opacity-40"
                              disabled={quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="font-geist px-2 text-xs font-black text-black">
                              {String(quantity).padStart(2, "0")}
                            </span>
                            <button
                              type="button"
                              onClick={() => setCartQuantity(id, quantity + 1)}
                              className="grid size-5 place-items-center text-sm font-semibold text-[#a67854]"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(id)}
                            aria-label={`Remove ${offer.title}`}
                            className="grid size-8 place-items-center rounded-xl bg-[#FAF6F0] text-gray-400 hover:text-red-500"
                          >
                            <Image
                              src="/customer-flow/icons/delete-btn.svg"
                              alt="Delete"
                              width={16}
                              height={16}
                              className="size-4 opacity-70"
                            />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* 4. SUMMARY BOX */}
            <div className="rounded-[26px] border border-[#E8E8E8] bg-[#F8F8F8] p-5 shadow-xs">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-geist text-sm font-semibold text-[#8C827A] line-through">
                      {formatMrp(totalOriginalMrp)}
                    </span>
                    <span className="font-geist text-sm font-bold text-[#a67854]">
                      {formatMrp(totalSalePrice)}
                    </span>
                  </div>
                  <span className="font-geist text-sm font-semibold text-[#8C827A]">
                    {availableItemsCount} Available items
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-geist text-sm font-semibold text-[#8C827A] line-through">
                      ₹645
                    </span>
                    <span className="font-geist text-sm font-bold text-[#a67854]">₹645</span>
                  </div>
                  <span className="font-geist text-sm font-bold text-[#a67854]">
                    1 Requested item
                  </span>
                </div>
              </div>

              <div className="my-3.5 h-px bg-[#E8E3DC]" />

              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="font-geist text-lg font-bold text-[#8C827A] line-through">
                    {formatMrp(totalOriginalMrp + 645)}
                  </span>
                  <span className="font-geist text-2xl font-black tracking-tight text-gray-950">
                    {formatMrp(totalSalePrice + 645)}
                  </span>
                </div>
                <span className="font-geist text-xl font-black text-gray-950">Total</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Sticky Action Button */}
      {totalItemsCount > 0 && (
        <div className="fixed right-0 bottom-[92px] left-0 z-30 mx-auto max-w-[390px] border-t border-gray-100 bg-white/95 px-6 py-3 backdrop-blur-xs">
          <button
            type="button"
            onClick={submitRequirement}
            className="font-outfit flex h-12 w-full items-center justify-center rounded-full bg-black text-sm font-bold tracking-wide text-white shadow-md transition hover:bg-gray-800 active:scale-[0.99]"
          >
            Send Requirement
          </button>
        </div>
      )}

      <MobileBottomNav active="Inquiry" />
      <ConfirmationDialog
        open={state.showConfirmation}
        onClose={() => {
          dismissConfirmation();
          router.push("/categories");
        }}
      />
    </div>
  );
}
