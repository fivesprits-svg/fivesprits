"use client";
import { useSearchParams } from "next/navigation";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { CatalogueCard } from "@/features/customer-flow/components/catalogue-card";
import { getBrand, getProductsByBrand } from "@/features/customer-flow/data/catalogue";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatMrp } from "@/features/customer-flow/utils/currency";
import type { Brand, Product } from "@/features/customer-flow/types";

export function MobileProductsSection({
  brand: propBrand,
  products: propProducts,
}: {
  brand?: Brand | null;
  products?: Product[];
} = {}) {
  const searchParams = useSearchParams();
  const { addToCart, removeFromCart, state } = useCustomerFlow();
  const brandId = searchParams.get("brandId") ?? "amber-reserve";
  const categoryId = searchParams.get("categoryId") ?? "whisky";

  const brand = propBrand ?? getBrand(brandId) ?? null;
  const products =
    propProducts && propProducts.length > 0 ? propProducts : getProductsByBrand(brandId);

  const cartLines = state.cart;
  const requestedIds = new Set(cartLines.map((line) => line.productId).filter((id) => id != null));

  return (
    <div className="min-h-dvh bg-white pb-28 md:hidden">
      <MobileHeader
        title={brand?.name ?? "Products"}
        backHref={`/brands?categoryId=${categoryId}`}
      />
      <main className="mx-auto w-full max-w-[390px] px-6 pt-5">
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => {
            const quantity = 1;
            const isRequested = requestedIds.has(product.id);
            const item = cartLines.find((line) => line.productId === product.id);
            return (
              <CatalogueCard
                key={product.id}
                variant="product"
                image={product.image}
                title={product.name}
                subtitle={product.pack}
                price={formatMrp(product.mrp)}
                originalPrice={isRequested ? formatMrp(product.mrp) : undefined}
                actionLabel={isRequested ? "Requested" : "Add"}
                actionVariant={isRequested ? "requested" : "add"}
                onAction={() => {
                  if (!isRequested) {
                    addToCart(product.id, quantity);
                  }
                }}
                quantity={item?.quantity}
                onQuantityChange={(value) => {
                  if (item) {
                    removeFromCart(product.id);
                    addToCart(product.id, value);
                  }
                }}
                onRemove={() => {
                  removeFromCart(product.id);
                }}
              />
            );
          })}
        </div>
      </main>
      <MobileBottomNav active="Product" />
    </div>
  );
}
