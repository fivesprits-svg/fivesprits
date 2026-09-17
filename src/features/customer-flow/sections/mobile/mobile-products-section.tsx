"use client";
import { useSearchParams } from "next/navigation";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { CatalogueCard } from "@/features/customer-flow/components/catalogue-card";
import { EmptyState } from "@/features/customer-flow/components/ui/empty-state";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import type { Brand, Product } from "@/features/customer-flow/types";

export function MobileProductsSection({
  brand: propBrand = null,
  products: propProducts = [],
}: {
  brand?: Brand | null;
  products?: Product[];
} = {}) {
  const searchParams = useSearchParams();
  const { addToCart, setCartQuantity, removeFromCart, state } = useCustomerFlow();
  const categoryId = searchParams.get("categoryId") ?? "";

  const brand = propBrand ?? null;
  const products = propProducts ?? [];
  const isEmpty = products.length === 0;

  const cartLines = state.cart;

  return (
    <div className="min-h-dvh bg-white pb-28 md:hidden">
      <MobileHeader
        title={brand?.name ?? "Products"}
        backHref={`/brands?categoryId=${categoryId}`}
        isSearchEnabled={true}
      />
      <main className="mx-auto w-full max-w-[390px] px-6 pt-5">
        {isEmpty ? (
          <EmptyState
            icon="/customer-flow/icons/category0.svg"
            title="No Products Yet"
            description="We're currently curating this selection. Please check back soon or explore our other collections."
            actionLabel="Browse Categories"
            actionHref="/categories"
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => {
              const isOutOfStock = Boolean(product.outOfStock);
              const item = cartLines.find(
                (line) =>
                  line.productId === product.id ||
                  line.productId === (product as unknown as { _id?: string })._id,
              );
              return (
                <CatalogueCard
                  key={product.id}
                  variant="product"
                  image={product.image}
                  title={product.name}
                  subtitle={product.pack}
                  mrp={product.mrp}
                  salePrice={product.saleAmount ?? product.mrp}
                  actionLabel={isOutOfStock ? "Requested" : "Add"}
                  actionVariant={isOutOfStock ? "requested" : "add"}
                  disabled={isOutOfStock}
                  outOfStock={isOutOfStock}
                  onAction={() => {
                    if (!item && !isOutOfStock) {
                      addToCart(product.id, 1, {
                        id: product.id,
                        _id: product.id,
                        name: product.name,
                        pack: product.pack,
                        mrp: product.mrp,
                        mrpAmount: product.mrp,
                        salePrice: product.saleAmount ?? product.mrp,
                        saleAmount: product.saleAmount ?? product.mrp,
                        image: product.image,
                        productImageUrl: product.image,
                        brandId: product.brandId,
                      });
                    }
                  }}
                  quantity={isOutOfStock ? undefined : item?.quantity}
                  onQuantityChange={(value) => {
                    if (value <= 0) {
                      removeFromCart(product.id);
                    } else {
                      setCartQuantity(product.id, value);
                    }
                  }}
                  onRemove={() => {
                    removeFromCart(product.id);
                  }}
                />
              );
            })}
          </div>
        )}
      </main>
      <MobileBottomNav active="Product" />
    </div>
  );
}
