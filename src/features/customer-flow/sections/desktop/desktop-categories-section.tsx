"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories } from "@/features/customer-flow/data/catalogue";
import { DesktopHeader } from "@/features/customer-flow/components/layout/desktop-header";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function DesktopCategoriesSection() {
  const router = useRouter();
  const { selectCategory } = useCustomerFlow();
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
  );

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <div className="hidden min-h-dvh bg-[#faf9f6] text-gray-900 lg:block">
      {/* Header */}
      <DesktopHeader />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* 1. HERO SECTION */}
        <section className="grid grid-cols-12 items-center gap-10 py-6 lg:py-10">
          <div className="col-span-7 space-y-6">
            <p className="font-outfit text-xs font-bold tracking-[0.25em] text-[#a67854] uppercase">
              EST. 2024 — PREMIUM SELECTION
            </p>

            <h1 className="font-unbounded text-4xl leading-[1.1] font-black text-gray-900 lg:text-5xl">
              WELCOME TO <br />
              <span className="text-[#c9a07e]">FIVE SPIRIT</span>
            </h1>

            <p className="font-geist max-w-lg text-sm leading-relaxed text-gray-600 lg:text-base">
              Your favorite drinks catalogue curated for the most discerning palates. Explore our
              world-class inventory of fine spirits, rare vintages, and craft distillations.
            </p>

            <div className="flex items-center gap-6 pt-2">
              <a
                href="#categories"
                className="font-outfit flex h-12 items-center justify-center rounded-full bg-gray-900 px-8 text-xs font-bold tracking-widest text-white uppercase shadow-md transition hover:bg-[#a67854]"
              >
                Browse Catalogue
              </a>

              <Link
                href="/offers"
                className="group font-outfit flex items-center gap-2 text-xs font-bold tracking-wider text-gray-800 uppercase transition hover:text-[#a67854]"
              >
                <span>Our Story</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 border-t border-gray-200/80 pt-6">
              <div>
                <p className="font-unbounded text-2xl font-black text-gray-900">2,500+</p>
                <p className="font-outfit mt-0.5 text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                  Unique Labels
                </p>
              </div>

              <div>
                <p className="font-unbounded text-2xl font-black text-gray-900">12</p>
                <p className="font-outfit mt-0.5 text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                  Global Origins
                </p>
              </div>

              <div>
                <p className="font-unbounded text-2xl font-black text-gray-900">4.8/5</p>
                <p className="font-outfit mt-0.5 text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                  User Rating
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-gray-200 bg-gray-900 shadow-2xl transition hover:shadow-black/20">
              <Image
                src="/customer-flow/hero/aurum-reserve.jpg"
                alt="Aurum Reserve"
                fill
                sizes="(max-width: 1200px) 45vw, 400px"
                priority
                className="object-cover"
              />

              {/* Floating Featured Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-2.5 rounded-2xl border border-white/20 bg-black/60 px-3.5 py-2 backdrop-blur-md">
                <div className="grid size-6 place-items-center rounded-full bg-[#c9a07e] text-[10px] font-bold text-black">
                  ★
                </div>
                <div>
                  <p className="font-outfit text-[9px] font-bold tracking-widest text-[#c9a07e] uppercase">
                    Featured Selection
                  </p>
                  <p className="font-geist text-xs font-semibold text-white">
                    Aurum Reserve 18 Year
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. THE CATEGORIES SECTION */}
        <section id="categories" className="scroll-mt-24 pt-16 pb-8">
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

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by category..."
                className="h-10 w-full rounded-full border border-gray-200 bg-white pr-9 pl-4 text-xs font-medium text-gray-800 placeholder-gray-400 transition outline-none focus:border-[#a67854]"
              />
              <svg
                className="absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Categories 4x2 Grid */}
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:gap-6">
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  selectCategory(category.id);
                  router.push(`/brands?categoryId=${category.id}`);
                }}
                className="group flex cursor-pointer flex-col items-center justify-between rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#a67854]/60 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#f8f6f2] p-2 transition-colors group-hover:bg-[#f3eee7]">
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

          {filteredCategories.length === 0 && (
            <div className="py-12 text-center">
              <p className="font-geist text-sm text-gray-500">
                No categories found matching &ldquo;{searchQuery}&rdquo;.
              </p>
            </div>
          )}
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

        {/* 4. JOIN THE SPIRIT CLUB */}
        <section className="my-14 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div className="grid grid-cols-12 items-stretch">
            {/* Left Content */}
            <div className="col-span-12 flex flex-col justify-center bg-[#f4f3ef] p-8 lg:col-span-7 lg:p-12">
              <p className="font-outfit text-[11px] font-bold tracking-widest text-[#a67854] uppercase">
                MEMBERSHIP PRIVILEGES
              </p>

              <h2 className="font-unbounded mt-2 text-2xl font-black text-gray-900 lg:text-3xl">
                JOIN THE SPIRIT CLUB
              </h2>

              <p className="font-geist mt-2 text-xs leading-relaxed text-gray-600 lg:text-sm">
                Sign up for exclusive early access to rare bottle drops, member-only events, and
                seasonal tastings from our master blenders.
              </p>

              {subscribed ? (
                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800">
                  ✓ Thank you for subscribing! You will receive our next reserve release invitation.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-6 flex max-w-md items-center gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-11 flex-1 rounded-full border border-gray-300 bg-white px-4 text-xs font-medium text-gray-800 placeholder-gray-400 transition outline-none focus:border-[#a67854]"
                  />
                  <button
                    type="submit"
                    className="font-outfit h-11 rounded-full bg-gray-900 px-6 text-xs font-bold tracking-wider text-white uppercase transition hover:bg-[#a67854]"
                  >
                    Join Now
                  </button>
                </form>
              )}

              <p className="font-geist mt-3 text-[10px] tracking-wider text-gray-400 uppercase">
                Unsubscribe at any time. We value your privacy.
              </p>
            </div>

            {/* Right Cheers Photo */}
            <div className="relative col-span-12 min-h-[260px] lg:col-span-5">
              <Image
                src="/customer-flow/hero/spirit-club.jpg"
                alt="Spirit Club Tasting"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* 5. FOOTER */}
        <footer className="mt-20 border-t border-gray-200 pt-12 pb-6">
          <div className="grid grid-cols-12 gap-8 pb-10">
            <div className="col-span-12 md:col-span-5">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black tracking-tight text-gray-900">FIVE</span>
                <span className="text-xs font-bold tracking-[0.24em] text-[#a67854]">SPIRITS</span>
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

          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200/80 pt-6 text-xs text-gray-400 md:flex-row">
            <p>© 2026 Five Spirits. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span>🌐 English (US)</span>
              <span>•</span>
              <span>India (Excise Compliant)</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
