"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function DesktopHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount, logout } = useCustomerFlow();

  function isActive(href: string) {
    if (href === "/cart") return pathname === "/cart";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="hidden border-b border-black/10 bg-white lg:block">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <Link href="/categories" className="flex items-baseline gap-2">
          <span className="text-2xl font-black">FIVE</span>
          <span className="text-sm font-semibold tracking-[0.24em] text-[#a67854]">SPIRITS</span>
        </Link>
        <nav className="flex items-center gap-8 text-sm font-semibold">
          <Link
            href="/categories"
            className={`pb-1 ${isActive("/categories") ? "border-b-2 border-black" : ""}`}
          >
            Categories
          </Link>
          {/* <Link
            href="/products"
            className={`pb-1 ${isActive("/products") ? "border-b-2 border-black" : ""}`}
          >
            Products
          </Link> */}
          <Link
            href="/offers"
            className={`pb-1 ${isActive("/offers") ? "border-b-2 border-black" : ""}`}
          >
            Offers
          </Link>
          <Link
            href="/cart"
            className={`pb-1 ${isActive("/cart") ? "border-b-2 border-black" : ""}`}
          >
            Cart ({cartCount})
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="cursor-pointer rounded-full border border-[#C9A07E] bg-[#f7f4ee] px-5 py-2.5 text-sm font-semibold"
          >
            Logout
          </button>
          <Link
            href="/profile"
            className={
              "flex size-10 items-center justify-center rounded-full border border-[#C9A07E] bg-[#f7f4ee] transition-colors"
            }
            aria-label="Profile"
          >
            <Image
              src="/customer-flow/icons/profile.svg"
              alt=""
              width={20}
              height={20}
              className={"brightness-0"}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
