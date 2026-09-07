"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { categories } from "@/features/customer-flow/data/catalogue";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function MobileCategoriesSection() {
  const router = useRouter();
  const { selectCategory } = useCustomerFlow();

  return (
    <section className="mx-auto min-h-dvh w-full max-w-[390px] overflow-hidden bg-white pb-28 md:hidden">
      {/* Top Header Bar */}
      <header className="flex h-14 items-center justify-between px-6 pt-2">
        <div className="relative size-8">
          <Image src="/logo.svg" alt="Five Spirit" fill className="object-contain" priority />
        </div>
        <h1 className="font-unbounded text-lg font-black tracking-tight text-gray-950">
          Five Spirit
        </h1>
        <button
          type="button"
          aria-label="Search"
          className="grid size-9 place-items-center text-gray-800 transition active:scale-95"
        >
          <Image
            src="/customer-flow/icons/icon-search.svg"
            alt="Search"
            width={18}
            height={18}
            className="opacity-90"
          />
        </button>
      </header>

      {/* Hero Section with Visual Hero Image */}
      <div className="relative flex items-center justify-between px-6 pt-3 pb-6">
        <div className="relative z-10 max-w-[190px]">
          <p className="font-outfit text-xs font-bold tracking-widest text-[#7e7e86] uppercase">
            WELCOME TO
          </p>
          <div className="mt-1">
            <span className="font-outfit block text-[38px] leading-none font-black text-[#c9a07e]">
              FIVE
            </span>
            <span className="font-outfit block text-[38px] leading-none font-black text-black">
              SPIRIT
            </span>
          </div>
          <p className="font-geist mt-4 text-[15px] leading-snug font-bold text-black">
            Your favorite
            <br />
            drinks Catalogue
          </p>
        </div>

        {/* Right Visual Image */}
        <div className="relative h-[220px] w-[165px] shrink-0">
          <Image
            src="/customer-flow/hero/hero-right-visual.webp"
            alt="Five Spirit Catalogue Hero"
            fill
            priority
            sizes="165px"
            className="object-contain"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-6">
        <h2 className="font-outfit text-xl font-black text-black">Categories</h2>
        <div className="mt-4 grid grid-cols-4 gap-x-2.5 gap-y-4">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                selectCategory(category.id);
                router.push(`/brands?categoryId=${category.id}`);
              }}
              className="group flex flex-col items-center"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-[18px] border border-gray-100/90 bg-[#FAF9F7] p-2 shadow-2xs transition-transform active:scale-95">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="80px"
                  className="object-contain p-1 transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <span className="font-geist mt-2 w-full truncate text-center text-xs font-bold text-black">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <MobileBottomNav active="Product" />
    </section>
  );
}
