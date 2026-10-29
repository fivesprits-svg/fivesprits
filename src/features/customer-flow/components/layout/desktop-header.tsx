"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function DesktopHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, state, logout } = useCustomerFlow();
  const [showGuestAccountPopup, setShowGuestAccountPopup] = useState(false);

  function isActive(href: string) {
    if (href === "/cart") return pathname === "/cart";
    if (href === "/combo-offers" || href === "/offers") {
      return (
        pathname === "/combo-offers" ||
        pathname.startsWith("/combo-offers/") ||
        pathname === "/gift-offers" ||
        pathname.startsWith("/gift-offers/") ||
        pathname === "/offers" ||
        pathname.startsWith("/offers/")
      );
    }
    return pathname === href || pathname.startsWith(href + "/");
  }

  const userName = state.userDetails?.name || "Rajesh Kumar";
  const isGuest = Boolean(state.userDetails?.isGuest);

  function continueAsAccount(path: "/" | "/login-here") {
    logout();
    router.push(path);
  }

  return (
    <header className="sticky top-0 z-50 hidden border-b border-black/10 bg-white md:block">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-14 sm:px-20 md:px-20 lg:px-26 2xl:px-26">
        <Link href="/categories" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="The Five Spirits"
            width={32}
            height={53}
            className="h-10 w-auto object-contain"
            priority
          />
          <span className="font-unbounded text-xl font-black tracking-tight text-black">
            The Five Spirits
          </span>
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
            href="/combo-offers"
            className={`pb-1 transition-colors hover:text-[#a67854] ${
              isActive("/combo-offers") ? "border-b-2 border-black text-black" : "text-gray-500"
            }`}
          >
            Offers
          </Link>
          {!isGuest && (
            <>
              <Link
                href="/cart"
                className={`pb-1 transition-colors hover:text-[#a67854] ${
                  isActive("/cart") ? "border-b-2 border-black text-black" : "text-gray-500"
                }`}
              >
                Request ({cartCount})
              </Link>
            </>
          )}
        </nav>

        {/* My Account */}
        <div className="relative flex items-center gap-3">
          {isGuest ? (
            <>
              <button
                type="button"
                onClick={() => setShowGuestAccountPopup((visible) => !visible)}
                aria-expanded={showGuestAccountPopup}
                aria-haspopup="menu"
                className="flex cursor-pointer items-center gap-2.5 rounded-full border border-gray-200 bg-gray-50 py-1.5 pr-4 pl-2 text-gray-800 transition-all hover:border-gray-400 hover:bg-gray-100"
              >
                <div className="grid size-7 place-items-center rounded-full bg-gray-200 text-xs font-bold text-gray-800">
                  {userName.slice(0, 1).toUpperCase()}
                </div>
                <span className="font-geist text-xs font-semibold">My Account</span>
              </button>
              {showGuestAccountPopup && (
                <div
                  role="menu"
                  aria-label="Account options"
                  className="absolute top-full right-0 z-50 mt-2 w-48 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl shadow-black/10"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => continueAsAccount("/login-here")}
                    className="font-geist w-full cursor-pointer rounded-xl px-4 py-3 text-left text-sm font-semibold text-gray-800 transition hover:bg-[#f7f4ee] hover:text-[#a67854]"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => continueAsAccount("/")}
                    className="font-geist w-full cursor-pointer rounded-xl px-4 py-3 text-left text-sm font-semibold text-gray-800 transition hover:bg-[#f7f4ee] hover:text-[#a67854]"
                  >
                    Register
                  </button>
                </div>
              )}
            </>
          ) : (
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
          )}
        </div>
      </div>
    </header>
  );
}
