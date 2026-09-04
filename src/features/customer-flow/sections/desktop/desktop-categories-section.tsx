"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { categories } from "@/features/customer-flow/data/catalogue";
import { DesktopHeader } from "@/features/customer-flow/components/layout/desktop-header";
import { CatalogueCard } from "@/features/customer-flow/components/catalogue-card";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function DesktopCategoriesSection() {
  const router = useRouter();
  const { selectCategory } = useCustomerFlow();
  return (
    <section className="hidden min-h-dvh bg-[#f7f7f5] lg:block">
      <DesktopHeader />
      <main className="mx-auto max-w-7xl px-8 py-12">
        <div className="grid grid-cols-[1fr_420px] items-center overflow-hidden rounded-[32px] bg-black px-14 text-white">
          <div className="py-14">
            <p className="text-sm font-bold tracking-[0.3em] text-[#c9a07e]">
              FIVE SPIRITS CATALOGUE
            </p>
            <h1 className="mt-5 max-w-xl text-5xl leading-tight font-black">
              Discover your next favourite bottle.
            </h1>
            <p className="mt-4 max-w-lg text-white/65">
              Explore our curated categories and send your requirements directly to our team.
            </p>
          </div>
          <div className="relative h-full min-h-[300px]">
            <Image
              src="/customer-flow/products/reserve-whisky.png"
              alt=""
              fill
              sizes="420px"
              className="object-contain object-bottom"
            />
          </div>
        </div>
        <div className="mt-12 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-[#a67854]">EXPLORE</p>
            <h2 className="mt-2 text-3xl font-black">Shop by category</h2>
          </div>
          <p className="text-sm text-[#6b7280]">{categories.length} curated collections</p>
        </div>
        <div className="mt-7 grid grid-cols-4 justify-items-center gap-5">
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
      </main>
    </section>
  );
}
