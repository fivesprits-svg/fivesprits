import Link from "next/link";

export function OfferTabs({ active }: { active: "combo" | "gift" }) {
  return (
    <nav
      aria-label="Offer type"
      className="grid h-10 grid-cols-2 rounded-full border border-black/10 bg-white p-1 text-xs font-semibold"
    >
      <Link
        href="/offers"
        className={`grid place-items-center rounded-full ${active === "combo" ? "bg-black text-white" : "text-[#666]"}`}
      >
        Combo offer
      </Link>
      <Link
        href="/offers/gifts"
        className={`grid place-items-center rounded-full ${active === "gift" ? "bg-black text-white" : "text-[#666]"}`}
      >
        Gift Offer
      </Link>
    </nav>
  );
}
