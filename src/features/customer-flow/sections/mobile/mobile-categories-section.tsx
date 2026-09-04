"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { categories } from "@/features/customer-flow/data/catalogue";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { CatalogueCard } from "@/features/customer-flow/components/catalogue-card";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function MobileCategoriesSection() {
  const router = useRouter();
  const { selectCategory } = useCustomerFlow();
  return (
    <section className="mx-auto min-h-dvh w-full max-w-[390px] overflow-hidden bg-white pb-28 lg:hidden">
      <div className="relative h-[310px] px-6 pt-8">
        <div className="relative z-10">
          <p className="text-sm text-[#7e7e86]">Welcome to</p>
          <h1 className="mt-1 text-[40px] leading-10 font-black text-[#c9a07e]">Five</h1>
          <p className="text-[34px] leading-9 font-bold">Spirit</p>
          <p className="mt-14 text-lg leading-6 font-semibold">
            Your favorite
            <br />
            drinks Catalogue
          </p>
        </div>
        <Image
          src="/customer-flow/products/reserve-whisky.png"
          alt=""
          width={190}
          height={270}
          loading="eager"
          className="absolute top-8 right-0 h-[270px] w-[190px] object-contain"
        />
      </div>
      <div className="px-6">
        <h2 className="text-xl font-bold">Categories</h2>
        <div className="mt-4 grid grid-cols-4 justify-items-center gap-x-2 gap-y-5">
          {categories.map((category) => (
            <CatalogueCard
              key={category.id}
              variant="category"
              image={category.image}
              title={category.name}
              onClick={() => {
                selectCategory(category.id);
                router.push(`/brands?categoryId=${category.id}`);
              }}
            />
          ))}
        </div>
      </div>
      <MobileBottomNav active="Product" />
    </section>
  );
}
