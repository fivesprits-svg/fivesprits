"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConfirmationDialog } from "@/features/customer-flow/components/confirmation-dialog";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { QuantityStepper } from "@/features/customer-flow/components/quantity-stepper";
import { brands, products } from "@/features/customer-flow/data/catalogue";
import { comboOffers, giftOffer } from "@/features/customer-flow/data/offers";
import { buildCartRows } from "@/features/customer-flow/helpers/cart-view-model";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatMrp } from "@/features/customer-flow/utils/currency";
export function DesktopCartSection() {
  const router = useRouter();
  const { state, setCartQuantity, removeFromCart, submitRequirement, dismissConfirmation } =
    useCustomerFlow();
  const rows = buildCartRows(state.cart, products, brands, comboOffers, giftOffer);
  return (
    <div className="hidden lg:block">
      <PortalShell title="Your Cart" eyebrow="Requirement list" backHref="/products">
        <div className="grid grid-cols-[1fr_360px] gap-10">
          <section>
            <h1 className="text-4xl font-black tracking-[-0.04em]">Review your selection</h1>
            <p className="mt-3 text-[#6f6f70]">
              Update quantities before sending this list to the administrator.
            </p>
            {rows.length === 0 ? (
              <div className="mt-10 rounded-[24px] border border-black/10 bg-white p-16 text-center">
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <Link
                  href="/categories"
                  className="mt-6 inline-flex h-12 items-center rounded-full bg-black px-7 font-bold text-white"
                >
                  Browse Categories
                </Link>
              </div>
            ) : (
              <div className="mt-10 space-y-4">
                {rows.map(({ id, type, name, detail, price, image, quantity }) => (
                  <article
                    key={id}
                    className="grid grid-cols-[112px_1fr_auto] items-center gap-6 rounded-[22px] border border-black/10 bg-white p-4"
                  >
                    <div className="relative size-28 rounded-2xl bg-[#f3f0eb]">
                      <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="112px"
                        className="object-contain p-4"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-[0.14em] text-[#9a7657] uppercase">
                        {type === "product"
                          ? "Regular item"
                          : type === "combo"
                            ? "Combo offer"
                            : "Gift offer"}
                      </p>
                      <h2 className="mt-1 text-xl font-bold">{name}</h2>
                      <p className="mt-1 text-sm text-[#777]">{detail}</p>
                      <p className="mt-2 font-bold">
                        {price === 0 ? "Free gift" : formatMrp(price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {type !== "gift" && (
                        <QuantityStepper
                          value={quantity}
                          onChange={(value) => setCartQuantity(id, value)}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => removeFromCart(id)}
                        className="text-sm font-bold text-[#9c3e39]"
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
          <aside className="sticky top-28 h-fit rounded-[24px] bg-[#171717] p-7 text-white">
            <p className="text-xs font-bold tracking-[0.2em] text-[#c7a687] uppercase">Summary</p>
            <div className="mt-6 flex justify-between text-sm text-white/70">
              <span>Selected products</span>
              <span>{rows.length}</span>
            </div>
            <div className="my-6 h-px bg-white/15" />
            <p className="text-sm leading-6 text-white/65">
              This is a product requirement, not an online order. The administrator will contact you
              for processing.
            </p>
            <button
              type="button"
              disabled={rows.length === 0}
              onClick={submitRequirement}
              className="mt-7 h-14 w-full rounded-full bg-white font-bold text-black disabled:opacity-40"
            >
              Send Requirement
            </button>
          </aside>
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
