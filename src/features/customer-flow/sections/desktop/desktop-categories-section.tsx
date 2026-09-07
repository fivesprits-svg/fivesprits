"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories } from "@/features/customer-flow/data/catalogue";
import { DesktopHeader } from "@/features/customer-flow/components/layout/desktop-header";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function DesktopCategoriesSection() {
  const router = useRouter();
  const { selectCategory } = useCustomerFlow();
  return (
    <div className="hidden min-h-dvh bg-[#f8f9fa] text-gray-900 md:block">
      {/* Header */}
      <DesktopHeader />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* 1. SEAMLESS MIXED EDITORIAL HERO */}
        <section className="relative pt-4 pb-12">
          <div className="grid grid-cols-12 items-center gap-8 lg:gap-10">
            {/* Left Column */}
            <div className="col-span-12 space-y-6 lg:col-span-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-outfit inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3.5 py-1 text-[11px] font-bold tracking-widest text-[#a67854] uppercase shadow-xs">
                  ✦ Curated Spirits Vault
                </span>
              </div>

              <h1 className="font-unbounded text-3xl leading-[1.12] font-black tracking-tight text-gray-900 lg:text-5xl">
                EXCEPTIONAL SPIRITS. <br />
                <span className="font-serif font-normal text-[#a67854] italic">
                  CURATED FOR CONNOISSEURS.
                </span>
              </h1>

              <p className="font-geist max-w-xl text-sm leading-relaxed text-gray-600 lg:text-base">
                Explore an exclusive catalogue of fine single malts, aged rums, reserve wines, and
                craft brews. Seamlessly browse by category, check available houses, and manage your
                member selections.
              </p>

              {/* Quick Select Category Chips */}
              <div className="space-y-2 pt-1">
                <p className="font-outfit text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                  Quick Select Category:
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        selectCategory(cat.id);
                        router.push(`/brands?categoryId=${cat.id}`);
                      }}
                      className="font-geist inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-700 shadow-xs transition-all hover:border-[#a67854] hover:bg-[#a67854] hover:text-white"
                    >
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="#categories"
                  className="font-outfit inline-flex h-12 items-center justify-center rounded-full bg-gray-900 px-8 text-xs font-bold tracking-wider text-white uppercase shadow-md transition hover:bg-[#a67854]"
                >
                  Explore Categories ↓
                </a>
                <Link
                  href="/offers"
                  className="font-outfit group inline-flex h-12 items-center gap-2 rounded-full border border-gray-300 bg-white px-7 text-xs font-bold tracking-wider text-gray-800 uppercase shadow-xs transition hover:border-gray-400 hover:bg-gray-50"
                >
                  <span>Exclusive Offers</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

            {/* Right Column - 3 Overlapping Raw Image Cards (Large Size) */}
            <div className="col-span-12 lg:col-span-6">
              <div className="group/cards relative flex h-[440px] w-full items-center justify-center px-4 sm:h-[500px] lg:h-[540px]">
                {/* Background Ambient Glow */}
                <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(166,120,84,0.18),transparent_70%)] blur-3xl" />

                {/* CARD 1: LEFT CARD (Barrel Room Cellar - Large) */}
                <div className="absolute top-10 left-0 z-10 w-[220px] -rotate-6 overflow-hidden rounded-3xl border-2 border-white/95 bg-white p-2 shadow-2xl transition-all duration-500 ease-out group-hover/cards:-translate-x-6 group-hover/cards:-translate-y-3 group-hover/cards:-rotate-10 group-hover/cards:shadow-[0_25px_50px_rgba(0,0,0,0.25)] sm:top-14 sm:-left-2 sm:w-[270px] lg:-left-4 lg:w-[290px]">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-900">
                    <Image
                      src="/customer-flow/hero/barrel-room.jpg"
                      alt="Barrel Room Cellar"
                      fill
                      sizes="(max-width: 1024px) 300px, 320px"
                      className="object-cover transition-transform duration-500 group-hover/cards:scale-105"
                    />
                  </div>
                </div>

                {/* CARD 2: CENTER CARD (Aurum Reserve Bottle - Large Focus) */}
                <div className="relative z-30 w-[235px] -translate-y-4 rotate-0 overflow-hidden rounded-3xl border-2 border-white bg-white p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out group-hover/cards:-translate-y-8 group-hover/cards:scale-105 group-hover/cards:shadow-[0_30px_60px_rgba(0,0,0,0.3)] sm:w-[290px] lg:w-[315px]">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-900">
                    <Image
                      src="/customer-flow/hero/aurum-reserve.jpg"
                      alt="Aurum Reserve 18Y"
                      fill
                      sizes="(max-width: 1024px) 320px, 340px"
                      priority
                      className="object-cover transition-transform duration-500 group-hover/cards:scale-105"
                    />
                  </div>
                </div>

                {/* CARD 3: RIGHT CARD (Spirit Club Tasting - Large) */}
                <div className="absolute top-10 right-0 z-20 w-[220px] rotate-6 overflow-hidden rounded-3xl border-2 border-white/95 bg-white p-2 shadow-2xl transition-all duration-500 ease-out group-hover/cards:translate-x-6 group-hover/cards:-translate-y-3 group-hover/cards:rotate-10 group-hover/cards:shadow-[0_25px_50px_rgba(0,0,0,0.25)] sm:top-14 sm:-right-2 sm:w-[270px] lg:-right-4 lg:w-[290px]">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-900">
                    <Image
                      src="/customer-flow/hero/spirit-club.jpg"
                      alt="Spirit Club Cheers"
                      fill
                      sizes="(max-width: 1024px) 300px, 320px"
                      className="object-cover transition-transform duration-500 group-hover/cards:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. THE CATEGORIES SECTION */}
        <section id="categories" className="scroll-mt-24 pb-8">
          <div className="flex flex-col justify-between gap-4 border-b border-gray-200/80 pb-6 md:flex-row md:items-end">
            <div>
              <p className="font-outfit text-xs font-bold tracking-[0.25em] text-[#a67854] uppercase">
                INSPIRED STYLE
              </p>
              <h2 className="font-unbounded mt-1 text-3xl font-black text-gray-900 lg:text-4xl">
                THE <span className="font-serif font-normal text-[#c9a07e] italic">CATEGORIES</span>
              </h2>
              <p className="font-geist mt-1.5 max-w-xl text-xs text-gray-600 lg:text-sm">
                From crisp lagers to full-bodied red wines and complex peated scotches, discover our
                library of spirits.
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e8d5c4] bg-[#f7f4ee] px-3.5 py-1.5 text-xs font-semibold text-[#a67854]">
              {categories.length} categories available
            </span>
          </div>

          {/* Categories 4x2 Grid */}
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  selectCategory(category.id);
                  router.push(`/brands?categoryId=${category.id}`);
                }}
                className="group flex cursor-pointer flex-col items-center justify-between rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#a67854]/60 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-50 p-2 transition-colors group-hover:bg-gray-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
                    className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="font-geist mt-3 text-xs font-bold tracking-widest text-gray-900 uppercase transition-colors group-hover:text-[#a67854]">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. THE ART OF AGING (BARREL ROOM) */}
        <section className="my-14 overflow-hidden rounded-3xl border border-white/10 bg-[#141517] p-8 text-white shadow-2xl lg:p-12">
          <div className="grid grid-cols-12 items-center gap-8">
            <div className="col-span-12 space-y-4 lg:col-span-6">
              <span className="font-outfit inline-flex items-center gap-1.5 rounded-full border border-[#c9a07e]/40 bg-[#c9a07e]/10 px-3 py-1 text-[11px] font-bold tracking-widest text-[#c9a07e] uppercase">
                BARREL ROOM
              </span>

              <h2 className="font-unbounded text-3xl leading-tight font-black text-white lg:text-4xl">
                THE ART OF <span className="text-[#c9a07e]">AGING</span>
              </h2>

              <p className="font-geist max-w-md text-xs leading-relaxed text-gray-300 lg:text-sm">
                Experience our curated selection of spirits aged for over two decades in rare oak
                casks. A testament to patience, craft, and the passage of time.
              </p>

              <div className="pt-2">
                <Link
                  href="/brands?categoryId=whisky"
                  className="font-outfit inline-flex h-11 items-center gap-2 rounded-full bg-white px-7 text-xs font-bold tracking-wider text-black uppercase transition hover:bg-[#c9a07e]"
                >
                  <span>Explore Collection</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg">
                <Image
                  src="/customer-flow/hero/barrel-room.jpg"
                  alt="Distillery Barrel Room"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. FOOTER */}
        <footer className="mt-20 border-t border-gray-200 pt-12 pb-6">
          <div className="grid grid-cols-12 gap-8 pb-10">
            <div className="col-span-12 md:col-span-5">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.svg"
                  alt="Five Spirit"
                  width={32}
                  height={53}
                  className="h-10 w-auto object-contain"
                />
                <span className="font-unbounded text-xl font-black tracking-tight text-black">
                  Five Spirit
                </span>
              </div>
              <p className="font-geist mt-3 max-w-sm text-xs leading-relaxed text-gray-500">
                Discovers the world&apos;s finest selection of spirits and beverages. Curated with
                passion for enthusiasts who appreciate quality and sophistication in every pour.
              </p>
            </div>

            <div className="col-span-4 md:col-span-2">
              <p className="font-outfit text-xs font-bold tracking-wider text-gray-900 uppercase">
                Explore
              </p>
              <ul className="font-geist mt-3 space-y-2 text-xs text-gray-500">
                <li>
                  <Link href="/categories" className="hover:text-black">
                    Catalogue
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-black">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/offers" className="hover:text-black">
                    Exclusive Offers
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-4 md:col-span-2">
              <p className="font-outfit text-xs font-bold tracking-wider text-gray-900 uppercase">
                Support
              </p>
              <ul className="font-geist mt-3 space-y-2 text-xs text-gray-500">
                <li>
                  <Link href="/profile" className="hover:text-black">
                    Account Verification
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-black">
                    Requirement FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-black">
                    Permit Support
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-4 md:col-span-3">
              <p className="font-outfit text-xs font-bold tracking-wider text-gray-900 uppercase">
                Compliance & Legal
              </p>
              <ul className="font-geist mt-3 space-y-2 text-xs text-gray-500">
                <li>
                  <span>State Excise Policy</span>
                </li>
                <li>
                  <span>Age Verification (21+)</span>
                </li>
                <li>
                  <span>Terms of Service</span>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
