"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { categories } from "@/features/customer-flow/data/catalogue";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { MobileStatusBar } from "@/features/customer-flow/components/navigation/mobile-system-chrome";
export function MobileCategoriesSection() {
  const router = useRouter();
  const { selectCategory } = useCustomerFlow();
  return (
    <section className="mx-auto min-h-dvh w-full max-w-[390px] overflow-hidden bg-white pb-28 lg:hidden">
      <MobileStatusBar />
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
        <div className="mt-4 grid grid-cols-4 gap-x-2 gap-y-5">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                selectCategory(category.id);
                router.push("/brands");
              }}
              className="text-center"
            >
              <span className="relative mx-auto block size-[72px] overflow-hidden rounded-full bg-[#f6f1eb]">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="50vw"
                  loading="eager"
                  className="object-cover"
                />
              </span>
              <span className="mt-2 block text-[11px] font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
      <MobileBottomNav active="Product" />
    </section>
  );
}
