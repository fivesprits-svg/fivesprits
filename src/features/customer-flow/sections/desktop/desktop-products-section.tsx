"use client";

import { useSearchParams } from "next/navigation";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { CatalogueCard } from "@/features/customer-flow/components/catalogue-card";
import { Breadcrumb } from "@/features/customer-flow/components/navigation/breadcrumb";
import { EmptyState } from "@/features/customer-flow/components/ui/empty-state";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatMrp } from "@/features/customer-flow/utils/currency";
import type { Brand, Category, Product } from "@/features/customer-flow/types";

export function DesktopProductsSection({
  category: propCategory = null,
  brand: propBrand = null,
  products: propProducts = [],
}: {
  category?: Category | null;
  brand?: Brand | null;
  products?: Product[];
} = {}) {
  const searchParams = useSearchParams();
  const { addToCart, removeFromCart, state } = useCustomerFlow();
  const categoryId = searchParams.get("categoryId") ?? "";

  const category = propCategory ?? null;
  const brand = propBrand ?? null;
  const products = propProducts ?? [];
  const isEmpty = products.length === 0;

  const cartLines = state.cart;

  return (
    <div className="hidden md:block">
      <PortalShell
        title="Products"
        eyebrow="Collection"
        backHref={`/brands?categoryId=${categoryId}`}
      >
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { label: "Categories", href: "/categories" },
              {
                label: category?.name ?? "Collection",
                href: `/brands?categoryId=${categoryId}`,
              },
              { label: brand?.name ?? "Products" },
            ]}
          />

          {/* Header Title Section */}
          <div className="mb-6 flex items-end justify-between border-b border-gray-200/80 pb-5">
            <div>
              <div className="mb-1.5 flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#a67854]" />
                <span className="font-outfit text-xs font-bold tracking-wider text-[#a67854] uppercase">
                  {brand?.name} Selection
                </span>
              </div>
              <h1 className="font-unbounded text-2xl font-black tracking-tight text-gray-900 capitalize lg:text-3xl">
                {brand?.name}
              </h1>
              <p className="font-geist mt-1 text-xs text-gray-500 lg:text-sm">
                Choose quantities and add products directly to your requirement list.
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e8d5c4] bg-[#f7f4ee] px-3.5 py-1.5 text-xs font-semibold text-[#a67854]">
              {products.length} products available
            </span>
          </div>

          {isEmpty ? (
            <EmptyState
              icon="/customer-flow/icons/category0.svg"
              title="No Products Yet"
              description="We're currently curating this selection. Please check back soon or explore our other collections."
              actionLabel="Browse Categories"
              actionHref="/categories"
            />
          ) : (
            <>
              {/* Products Grid */}
              <div className="grid grid-cols-2 items-stretch gap-5 sm:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => {
                  const item = cartLines.find((line) => line.productId === product.id);
                  const isRequested = item != null;
                  const isOutOfStock = Boolean(product.outOfStock);
                  return (
                    <CatalogueCard
                      key={product.id}
                      variant="product"
                      image={product.image}
                      title={product.name}
                      subtitle={product.pack}
                      price={formatMrp(product.mrp)}
                      actionLabel={isOutOfStock ? "Requested" : "Add"}
                      actionVariant={isOutOfStock ? "requested" : "add"}
                      disabled={isOutOfStock}
                      outOfStock={isOutOfStock}
                      quantity={isOutOfStock ? undefined : item?.quantity}
                      onAction={() => {
                        if (!isRequested && !isOutOfStock) {
                          addToCart(product.id, 1, {
                            id: product.id,
                            _id: product.id,
                            name: product.name,
                            pack: product.pack,
                            mrp: product.mrp,
                            mrpAmount: product.mrp,
                            image: product.image,
                            productImageUrl: product.image,
                            brandId: product.brandId,
                          });
                        }
                      }}
                      onQuantityChange={(value) => {
                        if (!item) {
                          return;
                        }
                        removeFromCart(product.id);
                        addToCart(product.id, value, {
                          id: product.id,
                          _id: product.id,
                          name: product.name,
                          pack: product.pack,
                          mrp: product.mrp,
                          mrpAmount: product.mrp,
                          image: product.image,
                          productImageUrl: product.image,
                          brandId: product.brandId,
                        });
                      }}
                      onRemove={() => {
                        removeFromCart(product.id);
                      }}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </PortalShell>
    </div>
  );
}
