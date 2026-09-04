"use client";
import { useState } from "react";
import Image from "next/image";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { QuantityStepper } from "@/features/customer-flow/components/quantity-stepper";
import { getBrand, getProductsByBrand } from "@/features/customer-flow/data/catalogue";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatMrp } from "@/features/customer-flow/utils/currency";
export function DesktopProductsSection() {
  const { state, addToCart } = useCustomerFlow();
  const brandId = state.selectedBrandId ?? "amber-reserve";
  const brand = getBrand(brandId);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  return (
    <div className="hidden lg:block">
      <PortalShell title="Products" eyebrow="Collection" backHref="/brands">
        <div className="flex items-end justify-between border-b border-black/10 pb-8">
          <div>
            <h1 className="text-4xl font-black tracking-[-0.04em]">{brand?.name}</h1>
            <p className="mt-3 text-[#6f6f70]">
              Choose quantities and add products to your requirement list.
            </p>
          </div>
          <p className="rounded-full bg-[#eee7df] px-4 py-2 text-xs font-bold text-[#755337]">
            MRP for reference only
          </p>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-6 xl:grid-cols-4">
          {getProductsByBrand(brandId).map((product) => {
            const quantity = quantities[product.id] ?? 1;
            return (
              <article
                key={product.id}
                className="flex cursor-pointer flex-col overflow-hidden rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_12px_40px_rgba(25,20,15,0.05)]"
              >
                <div className="relative aspect-square rounded-[18px] bg-[#f3f0eb]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="25vw"
                    className="object-contain p-7"
                  />
                </div>
                <p className="mt-5 text-xs font-bold tracking-[0.15em] text-[#9a7657] uppercase">
                  {product.pack}
                </p>
                <h2 className="mt-1 text-lg font-bold">{product.name}</h2>
                <p className="mt-2 text-xl font-black">{formatMrp(product.mrp)}</p>
                <div className="mt-5 flex items-center gap-3">
                  <QuantityStepper
                    value={quantity}
                    onChange={(value) =>
                      setQuantities((current) => ({ ...current, [product.id]: value }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => addToCart(product.id, quantity)}
                    className="min-h-11 flex-1 rounded-full bg-black px-4 text-sm font-bold text-white"
                  >
                    Add
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </PortalShell>
    </div>
  );
}
