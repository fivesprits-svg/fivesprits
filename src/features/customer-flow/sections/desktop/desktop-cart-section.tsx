"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConfirmationDialog } from "@/features/customer-flow/components/confirmation-dialog";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { QuantityStepper } from "@/features/customer-flow/components/quantity-stepper";
import { Breadcrumb } from "@/features/customer-flow/components/navigation/breadcrumb";
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
    <div className="hidden md:block">
      <PortalShell title="Your Cart" eyebrow="Requirement list" backHref="/products">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <Breadcrumb items={[{ label: "Your Cart" }]} />

          <div className="grid grid-cols-[1fr_360px] items-start gap-8">
            <section>
              <div className="mb-6 border-b border-gray-200/80 pb-5">
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#a67854]" />
                  <span className="font-outfit text-xs font-bold tracking-wider text-[#a67854] uppercase">
                    Review List
                  </span>
                </div>
                <h1 className="font-unbounded text-2xl font-black tracking-tight text-gray-900 lg:text-3xl">
                  Requirement Selection
                </h1>
                <p className="font-geist mt-1 text-xs text-gray-500 lg:text-sm">
                  Update quantities before submitting this requirement list to our concierge team.
                </p>
              </div>

              {rows.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-gray-200/80 bg-white p-12 text-center shadow-sm">
                  <h2 className="font-unbounded text-lg font-bold text-gray-900">
                    Your requirement list is empty
                  </h2>
                  <p className="font-geist mt-1 text-xs text-gray-500">
                    Explore categories and add your preferred bottles to this list.
                  </p>
                  <Link
                    href="/categories"
                    className="font-outfit mt-5 inline-flex h-11 items-center rounded-xl bg-gray-900 px-6 text-xs font-bold tracking-wider text-white uppercase transition hover:bg-[#a67854]"
                  >
                    Browse Categories
                  </Link>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {rows.map(({ id, type, name, detail, price, image, quantity }) => (
                    <article
                      key={id}
                      className="group flex items-center justify-between gap-5 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition hover:border-[#a67854]/40 hover:shadow-md"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-gray-50 p-2">
                          <Image
                            src={image}
                            alt={name}
                            fill
                            sizes="80px"
                            className="object-contain p-1"
                          />
                        </div>
                        <div>
                          <p className="font-outfit text-[11px] font-bold tracking-wider text-[#a67854] uppercase">
                            {type === "product"
                              ? "Regular Item"
                              : type === "combo"
                                ? "Combo Offer"
                                : "Gift Offer"}
                          </p>
                          <h2 className="font-geist line-clamp-1 text-sm font-semibold text-gray-900">
                            {name}
                          </h2>
                          <p className="font-geist text-xs text-gray-500">{detail}</p>
                          <p className="font-geist mt-1 text-sm font-bold text-gray-900">
                            {price === 0 ? "Free gift" : formatMrp(price)}
                          </p>
                        </div>
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
                          className="font-geist text-xs font-semibold text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* Sidebar Summary Card */}
            <aside className="sticky top-24 rounded-2xl border border-black/10 bg-gradient-to-br from-[#181614] via-[#201c18] to-[#12110f] p-6 text-white shadow-lg">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#c9a07e]" />
                <p className="font-outfit text-xs font-bold tracking-widest text-[#c9a07e] uppercase">
                  Order Summary
                </p>
              </div>

              <div className="mt-5 flex justify-between text-xs text-gray-300">
                <span>Selected Items</span>
                <span className="font-bold text-white">{rows.length} items</span>
              </div>

              <div className="my-5 h-px bg-white/10" />

              <p className="font-geist text-xs leading-relaxed text-gray-400">
                This is a customer spirit requirement request, not an instant checkout payment. Our
                state-licensed partner will verify your permit details and coordinate fulfillment.
              </p>

              <button
                type="button"
                disabled={rows.length === 0}
                onClick={submitRequirement}
                className="font-outfit mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-white text-xs font-bold tracking-wider text-black uppercase transition hover:bg-[#c9a07e] disabled:opacity-40"
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
