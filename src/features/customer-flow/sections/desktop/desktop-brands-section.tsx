"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { CatalogueCard } from "@/features/customer-flow/components/catalogue-card";
import { getBrandsByCategory, getCategory } from "@/features/customer-flow/data/catalogue";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function DesktopBrandsSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectBrand } = useCustomerFlow();
  const categoryId = searchParams.get("categoryId") ?? "whisky";
  const category = getCategory(categoryId);

  return (
    <div className="hidden lg:block">
      <PortalShell title="Brands" eyebrow="Catalogue" backHref="/categories">
        <div className="flex items-end justify-between border-b border-black/10 pb-8">
          <div>
            <h1 className="text-4xl font-black tracking-[-0.04em]">Explore {category?.name}</h1>
            <p className="mt-3 text-[#6f6f70]">Select a house to view its available collection.</p>
          </div>
          <p className="text-sm font-semibold text-[#8b6545]">
            {getBrandsByCategory(categoryId).length} brands available
          </p>
        </div>
        <div className="mt-8 grid grid-cols-4 justify-items-center gap-6">
          {getBrandsByCategory(categoryId).map((brand) => (
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
      </PortalShell>
    </div>
  );
}
