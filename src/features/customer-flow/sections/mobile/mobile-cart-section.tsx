"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConfirmationDialog } from "@/features/customer-flow/components/confirmation-dialog";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { QuantityStepper } from "@/features/customer-flow/components/quantity-stepper";
import { brands, products } from "@/features/customer-flow/data/catalogue";
import { comboOffers, giftOffer } from "@/features/customer-flow/data/offers";
import { buildCartRows } from "@/features/customer-flow/helpers/cart-view-model";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatMrp } from "@/features/customer-flow/utils/currency";
// import { MobileStatusBar } from "@/features/customer-flow/components/navigation/mobile-system-chrome";
export function MobileCartSection() {
  const router = useRouter();
  const { state, setCartQuantity, removeFromCart, submitRequirement, dismissConfirmation } =
    useCustomerFlow();
  const rows = buildCartRows(state.cart, products, brands, comboOffers, giftOffer);
  return (
    <div className="min-h-dvh bg-white pb-52 lg:hidden">
      <div className="mx-auto max-w-[390px]">{/* <MobileStatusBar /> */}</div>
      <header className="mx-auto w-full max-w-[390px] px-6 pt-4 pb-4">
        <h1 className="text-[32px] leading-none font-black uppercase">Requirement</h1>
        <p className="mt-2 text-[13px] text-[#777]">Checklist</p>
      </header>
      <main className="mx-auto w-full max-w-[390px] px-6 pt-4">
        {rows.length === 0 ? (
          <div className="pt-20 text-center">
            <div className="mx-auto grid size-24 place-items-center rounded-full bg-[#f4f1ec]">
              <Image src="/customer-flow/icons/empty.svg" alt="" width={50} height={50} />
            </div>
            <h2 className="mt-7 text-2xl font-bold">Your cart is empty</h2>
            <p className="mx-auto mt-3 max-w-[280px] text-sm leading-6 text-[#777]">
              Browse the catalogue and add products to your requirement.
            </p>
            <Link
              href="/categories"
              className="mt-7 inline-flex h-[54px] items-center rounded-full bg-black px-8 text-sm font-bold text-white"
            >
              Browse Catalogue
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold">Selected Items</h2>
            <p className="mt-1 text-sm text-[#777]">Products, combo offers and gifts</p>
            <div className="mt-5 space-y-4">
              {rows.map(({ id, type, name, detail, price, image, quantity }) => (
                <article
                  key={id}
                  className="grid grid-cols-[72px_1fr_auto] gap-3 rounded-[14px] border border-black/10 p-3"
                >
                  <div className="relative h-[100px] rounded-[9px] bg-[#f4f1ec]">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="72px"
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="min-w-0 py-2">
                    <p className="text-[10px] font-bold tracking-[0.12em] text-[#9d7658] uppercase">
                      {type === "product"
                        ? "Regular item"
                        : type === "combo"
                          ? "Combo offer"
                          : "Gift offer"}
                    </p>
                    <h3 className="truncate text-sm font-bold">{name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-[#777]">{detail}</p>
                    <p className="mt-2 text-sm font-bold">
                      {price === 0 ? "Free gift" : formatMrp(price)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between py-1">
                    <button
                      type="button"
                      aria-label={`Remove ${name}`}
                      onClick={() => removeFromCart(id)}
                      className="text-lg text-[#9c3e39]"
                    >
                      <Image src="/customer-flow/icons/remove.svg" alt="" width={16} height={16} />
                    </button>
                    {type !== "gift" && (
                      <QuantityStepper
                        compact
                        value={quantity}
                        onChange={(value) => setCartQuantity(id, value)}
                      />
                    )}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </main>
      {rows.length > 0 && (
        <div className="fixed right-0 bottom-[109px] left-0 z-30 mx-auto max-w-[390px] bg-white px-6 py-4 shadow-[0_-8px_24px_rgba(0,0,0,0.07)]">
          <button
            type="button"
            onClick={submitRequirement}
            className="h-[52px] w-full rounded-full bg-black text-sm font-bold text-white"
          >
            Send Requirement
          </button>
        </div>
      )}
      <MobileBottomNav active="Cart" />
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
