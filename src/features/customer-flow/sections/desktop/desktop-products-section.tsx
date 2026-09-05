"use client";

import { useSearchParams } from "next/navigation";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { CatalogueCard } from "@/features/customer-flow/components/catalogue-card";
import { Breadcrumb } from "@/features/customer-flow/components/navigation/breadcrumb";
import { getBrand, getCategory, getProductsByBrand } from "@/features/customer-flow/data/catalogue";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatMrp } from "@/features/customer-flow/utils/currency";

export function DesktopProductsSection() {
  const searchParams = useSearchParams();
  const { addToCart, removeFromCart, state } = useCustomerFlow();
  const brandId = searchParams.get("brandId") ?? "amber-reserve";
  const categoryId = searchParams.get("categoryId") ?? "whisky";
  const brand = getBrand(brandId);
  const category = getCategory(categoryId);
  const products = getProductsByBrand(brandId);
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
              <h1 className="font-unbounded text-2xl font-black tracking-tight text-gray-900 lg:text-3xl">
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

          {/* Products Grid */}
          <div className="grid grid-cols-2 items-stretch gap-5 sm:grid-cols-3 lg:grid-cols-4">
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
        </div>
      </PortalShell>
    </div>
  );
}
