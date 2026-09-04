"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { categories } from "@/features/customer-flow/data/catalogue";
import { DesktopHeader } from "@/features/customer-flow/components/layout/desktop-header";
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
        <div className="mt-7 grid grid-cols-4 gap-5">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                selectCategory(category.id);
                router.push("/brands");
              }}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-black/10 bg-white text-left"
            >
              <span className="relative block aspect-[4/3] overflow-hidden bg-[#eeeae4]">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </span>
              <span className="flex items-center justify-between p-5 text-base font-bold">
                {category.name}
                <span>→</span>
              </span>
            </button>
          ))}
        </div>
      </main>
    </section>
  );
}
