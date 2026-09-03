import Image from "next/image";
import Link from "next/link";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { OfferTabs } from "@/features/customer-flow/components/offers/offer-tabs";

export function MobileEmptyOffersSection() {
  return (
    <div className="min-h-dvh bg-white pb-28 lg:hidden">
      <MobileHeader title="Offers" />
      <main className="mx-auto w-full max-w-[390px] px-6">
        <OfferTabs active="combo" />
        <div className="pt-28 text-center">
          <div className="mx-auto grid size-24 place-items-center rounded-full bg-[#f4f1ec]">
            <Image src="/customer-flow/icons/empty.svg" alt="" width={50} height={50} />
          </div>
          <h1 className="mt-7 text-2xl font-bold">No Offers Available</h1>
          <p className="mx-auto mt-3 max-w-[300px] text-sm leading-6 text-[#777]">
            We are currently preparing exclusive new offers for our members. Please check back soon
            or explore our latest catalogue.
          </p>
          <Link
            href="/categories"
            className="mt-7 inline-grid h-[54px] place-items-center rounded-full bg-black px-8 text-sm font-bold text-white"
          >
            Explore Catalogue
          </Link>
        </div>
      </main>
      <MobileBottomNav active="Offer" />
    </div>
  );
}
