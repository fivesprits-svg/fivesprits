import Image from "next/image";
import Link from "next/link";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { MobileOfferHero } from "@/features/customer-flow/components/offers/mobile-offer-hero";
import { OfferTabs } from "@/features/customer-flow/components/offers/offer-tabs";
import { giftOffer } from "@/features/customer-flow/data/offers";

export function MobileGiftOffersSection() {
  return (
    <div className="min-h-dvh bg-white pb-28 lg:hidden">
      <MobileHeader title="Offers" />
      <main className="mx-auto w-full max-w-[390px] px-6">
        <OfferTabs active="gift" />
        <MobileOfferHero gift />
        <article className="mt-4 overflow-hidden rounded-[20px] border border-black/10 bg-white p-3">
          <div className="relative h-40 overflow-hidden rounded-[14px] bg-[#f5f3ef]">
            <Image
              src={giftOffer.image}
              alt="Premium trolley gift"
              fill
              sizes="342px"
              className="object-cover"
            />
          </div>
          <div className="mt-3 inline-flex rounded-full bg-[#f7eee6] px-2.5 py-1 text-[11px] font-bold text-[#9d7658]">
            GIFT OFFER
          </div>
          <h2 className="mt-3 text-lg font-bold">{giftOffer.title}</h2>
          <p className="mt-2 text-[20px] font-black text-[#9d7658]">{giftOffer.benefit}</p>
          <p className="mt-3 text-sm leading-5 text-[#666]">{giftOffer.description}</p>
          <p className="mt-3 text-[11px] text-[#888]">{giftOffer.terms}</p>
          <Link
            href="/offers/gifts/select"
            className="mt-4 grid h-11 place-items-center rounded-full bg-black text-sm font-bold text-white"
          >
            View Offer
          </Link>
        </article>
      </main>
      <MobileBottomNav active="Offer" />
    </div>
  );
}
