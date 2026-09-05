"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function DesktopHeader() {
  const pathname = usePathname();
  const { cartCount, state } = useCustomerFlow();

  function isActive(href: string) {
    if (href === "/cart") return pathname === "/cart";
    return pathname === href || pathname.startsWith(href + "/");
  }

  const userName = state.session?.name || "Rajesh Kumar";

  return (
    <header className="hidden border-b border-black/10 bg-white md:block">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/categories" className="flex items-baseline gap-2">
          <span className="text-xl font-black tracking-tight text-gray-900">FIVE</span>
          <span className="text-xs font-bold tracking-[0.24em] text-[#a67854]">SPIRITS</span>
        </Link>

        <nav className="flex items-center gap-8 text-xs font-bold tracking-wider uppercase">
          <Link
            href="/categories"
            className={`pb-1 transition-colors hover:text-[#a67854] ${
              isActive("/categories") ? "border-b-2 border-black text-black" : "text-gray-500"
            }`}
          >
            Categories
          </Link>
          <Link
            href="/offers"
            className={`pb-1 transition-colors hover:text-[#a67854] ${
              isActive("/offers") ? "border-b-2 border-black text-black" : "text-gray-500"
            }`}
          >
            Offers
          </Link>
          <Link
            href="/cart"
            className={`pb-1 transition-colors hover:text-[#a67854] ${
              isActive("/cart") ? "border-b-2 border-black text-black" : "text-gray-500"
            }`}
          >
            Cart ({cartCount})
          </Link>
        </nav>

        {/* My Account Direct Link */}
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className={`flex items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-2 transition-all ${
              isActive("/profile")
                ? "border-gray-900 bg-gray-900 text-white shadow-sm"
                : "border-gray-200 bg-gray-50 text-gray-800 hover:border-gray-400 hover:bg-gray-100"
            }`}
          >
            <div
              className={`grid size-7 place-items-center rounded-full text-xs font-bold transition-colors ${
                isActive("/profile") ? "bg-white/20 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {userName.slice(0, 1).toUpperCase()}
            </div>
            <span className="font-geist text-xs font-semibold">My Account</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
