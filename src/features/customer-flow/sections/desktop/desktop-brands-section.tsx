"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { CatalogueCard } from "@/features/customer-flow/components/catalogue-card";
import { Breadcrumb } from "@/features/customer-flow/components/navigation/breadcrumb";
import { EmptyState } from "@/features/customer-flow/components/ui/empty-state";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import type { Brand, Category } from "@/features/customer-flow/types";

export function DesktopBrandsSection({
  category: propCategory = null,
  brands: propBrands = [],
  isLoading = false,
}: {
  category?: Category | null;
  brands?: Brand[];
  isLoading?: boolean;
} = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectBrand } = useCustomerFlow();
  const categoryId = searchParams.get("categoryId") ?? "";

  const category = propCategory ?? null;
  const brands = propBrands ?? [];
  const isEmpty = !isLoading && brands.length === 0;

  return (
    <div className="hidden md:block">
      <PortalShell title="Brands" eyebrow="Catalogue" backHref="/categories">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { label: "Categories", href: "/categories" },
              { label: category?.name ?? "Collection" },
            ]}
          />

          {/* Header Title Section — always visible */}
          <div className="mb-6 flex items-end justify-between border-b border-gray-200/80 pb-5">
            <div>
              <div className="mb-1.5 flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#a67854]" />
                <span className="font-outfit text-xs font-bold tracking-wider text-[#a67854] uppercase">
                  {category?.name ?? "Spirits"} Houses
                </span>
              </div>
              <h1 className="font-unbounded text-2xl font-black tracking-tight text-gray-900 lg:text-3xl">
                Explore {category?.name ?? "Collection"}
              </h1>
              <p className="font-geist mt-1 text-xs text-gray-500 lg:text-sm">
                Select a house to view its available collection and vintage reserves.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e8d5c4] bg-[#f7f4ee] px-3.5 py-1.5 text-xs font-semibold text-[#a67854]">
              {isLoading ? "Loading..." : `${brands.length} brands available`}
            </span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 items-stretch gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <CatalogueCard key={index} variant="brand" isLoading={true} image="" title="" />
              ))}
            </div>
          ) : isEmpty ? (
            /* Empty state with hero image */
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
              <EmptyState
                icon="/customer-flow/icons/brands0.svg"
                title="No Brands Available"
                description="We are currently curating our brand list. Please check back soon or explore our existing collections."
                actionLabel="Back to Collections"
                actionHref="/categories"
              />
              <div className="relative mx-auto hidden aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-3xl bg-[#FAF6F0] lg:block">
                <Image
                  src="/customer-flow/hero/hero-right-column.png"
                  alt="Brand Collection Hero"
                  fill
                  sizes="360px"
                  priority
                  className="object-contain p-6"
                />
              </div>
            </div>
          ) : (
            /* Brands Grid */
            <div className="grid grid-cols-2 items-stretch gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {brands.map((brand) => (
                <CatalogueCard
                  key={brand.id}
                  variant="brand"
                  image={brand.image}
                  title={brand.name}
                  onClick={() => {
                    selectBrand(brand.id);
                    router.push(`/products?brandId=${brand.id}&categoryId=${categoryId}`);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </PortalShell>
    </div>
  );
}
