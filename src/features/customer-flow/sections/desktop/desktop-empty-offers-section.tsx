import Link from "next/link";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";

export function DesktopEmptyOffersSection() {
  return (
    <div className="hidden lg:block">
      <PortalShell title="Offers" eyebrow="Limited time">
        <div className="rounded-[30px] border border-black/10 bg-white px-10 py-28 text-center shadow-[0_12px_40px_rgba(25,20,15,0.05)]">
          <p className="text-xs font-bold tracking-[0.2em] text-[#a67854] uppercase">Offers</p>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.04em]">No Offers Available</h1>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#6f6f70]">
            We are currently preparing exclusive new offers for our members. Please check back soon
            or explore our latest catalogue.
          </p>
          <Link
            href="/categories"
            className="mt-8 inline-grid h-13 place-items-center rounded-full bg-black px-8 text-sm font-bold text-white"
          >
            Explore Catalogue
          </Link>
        </div>
      </PortalShell>
    </div>
  );
}
