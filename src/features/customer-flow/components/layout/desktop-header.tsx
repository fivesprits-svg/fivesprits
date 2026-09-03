"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function DesktopHeader() {
  const router = useRouter();
  const { cartCount, logout } = useCustomerFlow();
  return (
    <header className="hidden border-b border-black/10 bg-white lg:block">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <Link href="/categories" className="flex items-baseline gap-2">
          <span className="text-2xl font-black">FIVE</span>
          <span className="text-sm font-semibold tracking-[0.24em] text-[#a67854]">SPIRITS</span>
        </Link>
        <nav className="flex items-center gap-8 text-sm font-semibold">
          <Link href="/categories">Categories</Link>
          <Link href="/products">Products</Link>
          <Link href="/offers">Offers</Link>
          <Link href="/cart">Cart ({cartCount})</Link>
        </nav>
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
