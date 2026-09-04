"use client";
import { useState } from "react";
import Image from "next/image";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { QuantityStepper } from "@/features/customer-flow/components/quantity-stepper";
import { getBrand, getProductsByBrand } from "@/features/customer-flow/data/catalogue";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatMrp } from "@/features/customer-flow/utils/currency";
export function MobileProductsSection() {
  const { state, addToCart } = useCustomerFlow();
  const brandId = state.selectedBrandId ?? "amber-reserve";
  const brand = getBrand(brandId);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  return (
    <div className="min-h-dvh bg-white pb-28 lg:hidden">
      <MobileHeader title={brand?.name ?? "Products"} backHref="/brands" />
      <main className="mx-auto grid w-full max-w-[390px] grid-cols-2 gap-4 px-6 pt-5">
        {getProductsByBrand(brandId).map((product) => {
          const quantity = quantities[product.id] ?? 1;
          return (
            <article
              key={product.id}
              className="flex min-h-[318px] cursor-pointer flex-col rounded-[14px] border border-black/10 bg-white p-3"
            >
              <div className="relative h-40 rounded-[10px] bg-[#f5f3ef]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="50vw"
                  loading="eager"
                  className="object-contain p-3"
                />
              </div>
              <h2 className="mt-3 min-h-10 text-[14px] leading-[18px] font-semibold">
                {product.name}
              </h2>
              <p className="text-[12px] text-[#777]">{product.pack}</p>
              <p className="mt-1 text-[15px] font-bold">{formatMrp(product.mrp)}</p>
              <div className="mt-auto border-t border-black/10 pt-3">
                <div className="flex items-center gap-2">
                  <QuantityStepper
                    compact
                    value={quantity}
                    onChange={(value) =>
                      setQuantities((current) => ({ ...current, [product.id]: value }))
                    }
                  />
                  <button
                    type="button"
                    aria-label={`Add ${product.name} to cart`}
                    onClick={() => addToCart(product.id, quantity)}
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-black text-lg text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </main>
      <MobileBottomNav active="Product" />
    </div>
  );
}
