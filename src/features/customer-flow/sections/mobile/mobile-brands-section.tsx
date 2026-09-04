"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { CatalogueCard } from "@/features/customer-flow/components/catalogue-card";
import { getBrandsByCategory, getCategory } from "@/features/customer-flow/data/catalogue";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function MobileBrandsSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectBrand } = useCustomerFlow();
  const categoryId = searchParams.get("categoryId") ?? "whisky";
  const category = getCategory(categoryId);

  return (
    <div className="min-h-dvh bg-white pb-28 text-[#101010] lg:hidden">
      <MobileHeader title={category?.name ?? "Whiskey"} backHref="/categories" />
      <main className="mx-auto w-full max-w-[390px] px-6 pt-5">
        <p className="text-[13px] text-[#777]">Choose your brand</p>
        <div className="mt-6 grid grid-cols-2 justify-items-center gap-x-4 gap-y-6">
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
      </main>
      <MobileBottomNav active="Product" />
    </div>
  );
}
