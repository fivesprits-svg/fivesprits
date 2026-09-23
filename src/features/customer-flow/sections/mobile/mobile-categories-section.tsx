"use client";

import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { EmptyState } from "@/features/customer-flow/components/ui/empty-state";
import { ImageSkeleton } from "@/features/customer-flow/components/ui/skeleton";
import { fetchCategoriesApi } from "@/features/customer-flow/services/categories-api";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import type { Category } from "@/features/customer-flow/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function MobileCategoriesSection() {
  const router = useRouter();
  const { selectCategory } = useCustomerFlow();

  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchCategoriesApi()
      .then((data) => {
        if (!isMounted) return;

        setCategoriesList(data ?? []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("fetchCategoriesApi mobile error:", err);

        if (isMounted) {
          setCategoriesList([]);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const isEmpty = !isLoading && categoriesList.length === 0;

  return (
    <section className="mx-auto min-h-dvh w-full max-w-[390px] overflow-hidden bg-white pb-28 md:hidden">
      {/* Top Header Bar */}
      <header className="flex h-14 items-center px-6 pt-2">
        {/* Logo */}
        <div className="relative size-8">
          <Image src="/logo.svg" alt="The Five Spirits" fill className="object-contain" priority />
        </div>

        {/* Brand Name */}
        <h1 className="font-unbounded absolute left-1/2 -translate-x-1/2 text-lg font-black tracking-tight text-gray-950">
          The Five <span className="text-[#A67854]">Spirits</span>
        </h1>
      </header>

      {isLoading && categoriesList.length === 0 ? (
        <div className="space-y-6 px-6 py-4">
          <div className="h-40 w-full animate-pulse rounded-2xl bg-gray-100" />

          <div className="grid grid-cols-3 gap-2.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative aspect-square w-full animate-pulse rounded-[18px] bg-gray-100" />
                <div className="mt-2 h-3 w-12 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="relative flex items-center justify-between px-6 pb-2">
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

            <div className="relative h-[220px] w-[165px] shrink-0">
              <ImageSkeleton className="absolute inset-0 rounded-2xl" />

              <Image
                src="/customer-flow/hero/hero-right-visual.png"
                alt="The Five Spirits Catalogue Hero"
                fill
                priority
                sizes="220px"
                className="scale-125 object-contain"
              />
            </div>
          </div>

          {/* Categories Grid */}
          <div className="px-6">
            <h2 className="font-outfit text-xl font-black text-black">Categories</h2>

            {isEmpty ? (
              <EmptyState
                icon="/customer-flow/icons/category0.svg"
                title="No Products Yet"
                description="We're currently curating this selection. Please check back soon or explore our other collections."
                actionLabel="Browse Categories"
                actionHref="/categories"
              />
            ) : (
              <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-4">
                {categoriesList?.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      selectCategory(category.id);
                      router.push(`/brands?categoryId=${category.id}`);
                    }}
                    className="group flex cursor-pointer flex-col items-center"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px] border border-gray-100/90 bg-[#FAF9F7] p-2 shadow-2xs transition-all duration-200 hover:border-[#c9a07e] active:scale-95">
                      {/* Background */}
                      <Image
                        src="/customer-flow/hero/bg-remover.png"
                        alt=""
                        fill
                        sizes="80px"
                        className="object-contain opacity-5"
                      />

                      {/* Category Image */}
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="80px"
                        className="relative z-10 object-contain p-1 opacity-90 transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                    <span className="font-geist mt-2 line-clamp-2 min-h-[32px] w-full text-center text-xs leading-4 font-bold text-black">
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <MobileBottomNav active="Product" />
    </section>
  );
}
