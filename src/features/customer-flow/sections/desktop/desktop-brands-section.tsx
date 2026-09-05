"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { CatalogueCard } from "@/features/customer-flow/components/catalogue-card";
import { Breadcrumb } from "@/features/customer-flow/components/navigation/breadcrumb";
import { getBrandsByCategory, getCategory } from "@/features/customer-flow/data/catalogue";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function DesktopBrandsSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectBrand } = useCustomerFlow();
  const categoryId = searchParams.get("categoryId") ?? "whisky";
  const category = getCategory(categoryId);
  const brands = getBrandsByCategory(categoryId);

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

          {/* Header Title Section */}
          <div className="mb-6 flex items-end justify-between border-b border-gray-200/80 pb-5">
            <div>
              <div className="mb-1.5 flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#a67854]" />
                <span className="font-outfit text-xs font-bold tracking-wider text-[#a67854] uppercase">
                  {category?.name} Houses
                </span>
              </div>
              <h1 className="font-unbounded text-2xl font-black tracking-tight text-gray-900 lg:text-3xl">
                Explore {category?.name}
              </h1>
              <p className="font-geist mt-1 text-xs text-gray-500 lg:text-sm">
                Select a house to view its available collection and vintage reserves.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e8d5c4] bg-[#f7f4ee] px-3.5 py-1.5 text-xs font-semibold text-[#a67854]">
              {brands.length} brands available
            </span>
          </div>

          {/* Brands Grid */}
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
        </div>
      </PortalShell>
    </div>
  );
}
