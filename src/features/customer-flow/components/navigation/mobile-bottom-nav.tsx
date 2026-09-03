"use client";
import Link from "next/link";
import Image from "next/image";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { MobileHomeIndicator } from "@/features/customer-flow/components/navigation/mobile-system-chrome";

const items = [
  { href: "/categories", label: "Product", icon: "/customer-flow/icons/home.svg" },
  { href: "/offers", label: "Offer", icon: "/customer-flow/icons/offer.svg" },
  { href: "/cart", label: "Cart", icon: "/customer-flow/icons/cart.svg" },
  { href: "/profile", label: "Profile", icon: "/customer-flow/icons/profile.svg" },
];

export function MobileBottomNav({ active }: { active: string }) {
  const { cartCount } = useCustomerFlow();
  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed right-6 bottom-7 left-6 z-40 flex h-[68px] items-center justify-around rounded-full bg-black px-4 shadow-[0_12px_32px_rgba(0,0,0,0.28)] lg:hidden"
      >
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`relative flex min-w-16 items-center justify-center gap-2 text-xs font-semibold ${active === item.label ? "text-[#c9a07e]" : "text-white"}`}
          >
            <Image src={item.icon} alt="" width={20} height={20} />
            <span className={active === item.label ? "block" : "sr-only"}>{item.label}</span>
            {item.label === "Cart" && cartCount > 0 && (
              <span className="absolute -top-3 right-1 grid size-5 place-items-center rounded-full bg-[#c9a07e] text-[10px] text-black">
                {cartCount}
              </span>
            )}
          </Link>
        ))}
      </nav>
      <MobileHomeIndicator />
    </>
  );
}
