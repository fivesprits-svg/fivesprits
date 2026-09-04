"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { getBrandsByCategory, getCategory } from "@/features/customer-flow/data/catalogue";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
export function MobileBrandsSection() {
  const router = useRouter();
  const { state, selectBrand } = useCustomerFlow();
  const categoryId = state.selectedCategoryId ?? "whisky";
  const category = getCategory(categoryId);
  return (
    <div className="min-h-dvh bg-white pb-28 text-[#101010] lg:hidden">
      <MobileHeader title={category?.name ?? "Whiskey"} backHref="/categories" />
      <main className="mx-auto w-full max-w-[390px] px-6 pt-5">
        <p className="text-[13px] text-[#777]">Choose your brand</p>
        <div className="mt-6 grid grid-cols-2 gap-x-2.5 gap-y-[30px]">
          {getBrandsByCategory(categoryId).map((brand) => (
            <button
              key={brand.id}
              type="button"
              onClick={() => {
                selectBrand(brand.id);
                router.push("/products");
              }}
              className="group cursor-pointer text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              <span className="relative block h-28 overflow-hidden rounded-[14px] bg-[#f4f1ec]">
                <Image
                  src={brand.image}
                  alt=""
                  fill
                  sizes="50vw"
                  loading="eager"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </span>
              <span className="mt-2 block text-[14px] font-semibold">{brand.name}</span>
            </button>
          ))}
        </div>
      </main>
      <MobileBottomNav active="Product" />
    </div>
  );
}
