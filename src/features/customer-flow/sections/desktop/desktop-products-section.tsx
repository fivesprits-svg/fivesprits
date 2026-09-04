"use client";

import { useSearchParams } from "next/navigation";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { CatalogueCard } from "@/features/customer-flow/components/catalogue-card";
import { getBrand, getProductsByBrand } from "@/features/customer-flow/data/catalogue";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatMrp } from "@/features/customer-flow/utils/currency";

export function DesktopProductsSection() {
  const searchParams = useSearchParams();
  const { addToCart, removeFromCart, state } = useCustomerFlow();
  const brandId = searchParams.get("brandId") ?? "amber-reserve";
  const brand = getBrand(brandId);
  const products = getProductsByBrand(brandId);
  const cartLines = state.cart;

  return (
    <div className="hidden lg:block">
      <PortalShell title="Products" eyebrow="Collection" backHref="/brands?categoryId=whisky">
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

        <div className="mt-8 grid grid-cols-4 justify-items-center gap-6">
          {products.map((product) => {
            const item = cartLines.find((line) => line.productId === product.id);
            const isRequested = item != null;
            return (
              <CatalogueCard
                key={product.id}
                variant="product"
                image={product.image}
                title={product.name}
                subtitle={product.pack}
                price={formatMrp(product.mrp)}
                actionLabel="Add"
                actionVariant="add"
                quantity={item?.quantity}
                onAction={() => {
                  if (!isRequested) {
                    addToCart(product.id, 1);
                  }
                }}
                onQuantityChange={(value) => {
                  if (!item) {
                    return;
                  }
                  removeFromCart(product.id);
                  addToCart(product.id, value);
                }}
                onRemove={() => {
                  removeFromCart(product.id);
                }}
              />
            );
          })}
        </div>
      </PortalShell>
    </div>
  );
}
