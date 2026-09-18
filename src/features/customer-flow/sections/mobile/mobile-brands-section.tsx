"use client";
import { CatalogueCard } from "@/features/customer-flow/components/catalogue-card";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { EmptyState } from "@/features/customer-flow/components/ui/empty-state";
import { ImagePlaceholder } from "@/features/customer-flow/components/ui/image-placeholder";
import { ImageSkeleton } from "@/features/customer-flow/components/ui/skeleton";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import type { Brand, Category } from "@/features/customer-flow/types";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { MobileHeader } from "../../components/navigation/mobile-header";

export function MobileBrandsSection({
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
    <div className="min-h-dvh w-full max-w-[390px] overflow-hidden bg-white pb-28 text-[#101010] md:hidden">
      <MobileHeader backHref="/categories" />
      <div className="relative px-4 pb-2">
        <div className="mt-3 flex items-start justify-between">
          <div className="pt-1">
            <h1 className="font-outfit text-[36px] leading-none font-black tracking-tight text-black uppercase lg:text-[42px]">
              {category?.name ?? "BEER"}
            </h1>
            <p className="font-outfit mt-2 text-xs font-bold tracking-widest text-[#c9a07e] uppercase">
              CHOOSE YOUR BRAND
            </p>
          </div>

          {/* Hero Right Column Image — always visible */}
          <div className="relative -mt-10 h-[170px] w-[135px] shrink-0">
            <ImageSkeleton className="absolute inset-0 rounded-2xl" />
            <Image
              src="/customer-flow/hero/hero-right-column.png"
              alt="Brand Collection Hero"
              fill
              priority
              sizes="135px"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <main className="px-4 pt-3">
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <CatalogueCard key={index} variant="brand" isLoading={true} image="" title="" />
            ))}
          </div>
        </main>
      ) : isEmpty ? (
        <EmptyState
          icon="/customer-flow/icons/brands0.svg"
          title="No Brands Available"
          description="We are currently curating our brand list. Please check back soon or explore our existing collections."
          actionLabel="Back to Collections"
          actionHref="/categories"
        />
      ) : (
        /* Brands 2-Column Grid */
        <main className="px-4 pt-3">
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-5">
            {brands?.map((brand) => (
              <button
                key={brand?.id}
                type="button"
                onClick={() => {
                  selectBrand(brand.id);
                  router.push(`/products?brandId=${brand.id}&categoryId=${categoryId}`);
                }}
                className="group flex cursor-pointer flex-col items-center text-center"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] border border-gray-100/90 bg-[#FAF9F7] p-2 transition-all duration-200 group-hover:scale-105 group-hover:border-[#c9a07e] active:scale-95">
                  {/* Background */}
                  <Image
                    src="/customer-flow/hero/bg-remover.png"
                    alt=""
                    fill
                    sizes="160px"
                    className="object-contain opacity-5"
                  />

                  {brand.image ? (
                    <>
                      <ImageSkeleton className="absolute inset-0" />

                      <Image
                        src={brand.image}
                        alt={brand.name}
                        fill
                        sizes="160px"
                        className="relative z-10 object-contain transition-transform duration-200 group-hover:scale-105"
                      />
                    </>
                  ) : (
                    <div className="relative z-10 h-full w-full">
                      <ImagePlaceholder type="brand" />
                    </div>
                  )}
                </div>
                <span className="font-geist mt-2.5 w-full truncate text-center text-sm font-bold text-black">
                  {brand.name}
                </span>
              </button>
            ))}
          </div>
        </main>
      )}

      <MobileBottomNav active="Product" />
    </div>
  );
}
