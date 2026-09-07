"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { getBrandsByCategory, getCategory } from "@/features/customer-flow/data/catalogue";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function MobileBrandsSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectBrand } = useCustomerFlow();
  const categoryId = searchParams.get("categoryId") ?? "beer";
  const category = getCategory(categoryId);
  const brands = getBrandsByCategory(categoryId);

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[390px] overflow-hidden bg-white pb-28 text-[#101010] md:hidden">
      {/* Top Header with Back Button & Column Hero Image */}
      <div className="relative px-6 pt-5 pb-2">
        <Link
          href="/categories"
          aria-label="Go back"
          className="grid size-10 place-items-center rounded-full bg-[#FAF6F0] text-black transition active:scale-95"
        >
          <Image src="/customer-flow/icons/back.svg" alt="Back" width={16} height={16} />
        </Link>

        <div className="mt-3 flex items-start justify-between">
          <div className="pt-1">
            <h1 className="font-outfit text-[42px] leading-none font-black tracking-tight text-black uppercase">
              {category?.name ?? "BEER"}
            </h1>
            <p className="font-outfit mt-2 text-xs font-bold tracking-widest text-[#c9a07e] uppercase">
              CHOOSE YOUR BRAND
            </p>
          </div>

          {/* Hero Right Column Image */}
          <div className="relative -mt-10 h-[170px] w-[135px] shrink-0">
            <Image
              src="/customer-flow/hero/hero-right-column.webp"
              alt="Brand Collection Hero"
              fill
              priority
              sizes="135px"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Brands 2-Column Grid */}
      <main className="px-6 pt-3">
        <div className="grid grid-cols-2 gap-x-3.5 gap-y-5">
          {brands.map((brand) => (
            <button
              key={brand.id}
              type="button"
              onClick={() => {
                selectBrand(brand.id);
                router.push(`/products?brandId=${brand.id}&categoryId=${categoryId}`);
              }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] border border-gray-100/90 bg-[#FAF9F7] p-3 shadow-2xs transition-transform duration-200 group-hover:scale-105 active:scale-95">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  sizes="160px"
                  className="object-contain p-1.5 transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <span className="font-geist mt-2.5 w-full truncate text-center text-sm font-bold text-black">
                {brand.name}
              </span>
            </button>
          ))}
        </div>
      </main>

      <MobileBottomNav active="Product" />
    </div>
  );
}
