"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { getBrandsByCategory, getCategory } from "@/features/customer-flow/data/catalogue";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
export function DesktopBrandsSection() {
  const router = useRouter();
  const { state, selectBrand } = useCustomerFlow();
  const categoryId = state.selectedCategoryId ?? "whisky";
  const category = getCategory(categoryId);
  return (
    <div className="hidden lg:block">
      <PortalShell title="Brands" eyebrow="Catalogue" backHref="/categories">
        <div className="flex items-end justify-between border-b border-black/10 pb-8">
          <div>
            <h1 className="text-4xl font-black tracking-[-0.04em]">Explore {category?.name}</h1>
            <p className="mt-3 text-[#6f6f70]">Select a house to view its available collection.</p>
          </div>
          <p className="text-sm font-semibold text-[#8b6545]">
            {getBrandsByCategory(categoryId).length} brands available
          </p>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-6 xl:grid-cols-4">
          {getBrandsByCategory(categoryId).map((brand) => (
            <button
              key={brand.id}
              type="button"
              onClick={() => {
                selectBrand(brand.id);
                router.push("/products");
              }}
              className="group cursor-pointer overflow-hidden rounded-[24px] border border-black/10 bg-white text-left shadow-[0_12px_40px_rgba(25,20,15,0.05)] transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="relative block aspect-[4/3] overflow-hidden bg-[#f0ede8]">
                <Image
                  src={brand.image}
                  alt=""
                  fill
                  sizes="25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </span>
              <span className="flex items-center justify-between p-5">
                <span className="text-lg font-bold">{brand.name}</span>
                <span className="grid size-9 place-items-center rounded-full bg-black text-white">
                  →
                </span>
              </span>
            </button>
          ))}
        </div>
      </PortalShell>
    </div>
  );
}
