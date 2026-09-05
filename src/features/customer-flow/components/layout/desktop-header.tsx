"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatDisplayMobile } from "@/features/customer-flow/utils/validation";

export function DesktopHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount, logout, state } = useCustomerFlow();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function isActive(href: string) {
    if (href === "/cart") return pathname === "/cart";
    return pathname === href || pathname.startsWith(href + "/");
  }

  const userName = state.session?.name || "Rajesh Kumar";
  const userMobile = formatDisplayMobile(state.session?.mobile);

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

        <div className="relative flex items-center gap-3" ref={dropdownRef}>
          {/* Profile Button / Trigger */}
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 py-1.5 pr-3 pl-1.5 transition-colors hover:border-gray-400 hover:bg-gray-100"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            <div className="grid size-7 place-items-center rounded-full bg-gray-200 text-xs font-bold text-gray-800">
              {userName.slice(0, 1).toUpperCase()}
            </div>
            <span className="font-geist max-w-[120px] truncate text-xs font-semibold text-gray-800">
              {userName}
            </span>
            <svg
              className={`size-3.5 text-gray-500 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Profile Dropdown Menu */}
          {dropdownOpen && (
            <div
              className="animate-in fade-in slide-in-from-top-1 absolute top-full right-0 z-50 mt-2 w-56 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl shadow-black/10 duration-150"
              role="menu"
            >
              {/* User Brief */}
              <div className="border-b border-gray-100 px-3 py-2.5">
                <p className="font-geist truncate text-xs font-bold text-gray-900">{userName}</p>
                <p className="font-geist mt-0.5 truncate text-[11px] text-gray-500">{userMobile}</p>
                <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  <span className="size-1 rounded-full bg-emerald-500" />
                  <span>Verified Customer</span>
                </div>
              </div>

              {/* Menu Links */}
              <div className="py-1">
                <Link
                  href="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-black"
                  role="menuitem"
                >
                  <Image
                    src="/customer-flow/icons/profile.svg"
                    alt=""
                    width={15}
                    height={15}
                    className="opacity-70"
                  />
                  <span>My Profile</span>
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-black"
                  role="menuitem"
                >
                  <Image
                    src="/customer-flow/icons/cart-mobile.svg"
                    alt=""
                    width={15}
                    height={15}
                    className="opacity-70"
                  />
                  <span>Requirements ({cartCount})</span>
                </Link>
              </div>

              {/* Logout Button */}
              <div className="border-t border-gray-100 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                    router.push("/");
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                  role="menuitem"
                >
                  <Image
                    src="/customer-flow/icons/log-out.svg"
                    alt=""
                    width={15}
                    height={15}
                    className="text-red-500"
                  />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
