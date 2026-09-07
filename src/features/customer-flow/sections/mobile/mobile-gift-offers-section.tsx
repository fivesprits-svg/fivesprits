import Image from "next/image";
import Link from "next/link";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { MobileOfferHero } from "@/features/customer-flow/components/offers/mobile-offer-hero";
import { OfferTabs } from "@/features/customer-flow/components/offers/offer-tabs";
import { giftOffer } from "@/features/customer-flow/data/offers";

export function MobileGiftOffersSection() {
  return (
    <div className="min-h-dvh bg-white pb-28 md:hidden">
      <MobileHeader title="Offers" />
      <main className="mx-auto w-full max-w-[390px] px-6">
        <OfferTabs active="gift" />
        <MobileOfferHero gift />
        <article className="mt-4 overflow-hidden rounded-[28px] border border-gray-200/90 bg-white p-3.5 shadow-sm">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-[#f5f3ef]">
            <Image
              src={giftOffer.image}
              alt="Premium trolley gift"
              fill
              sizes="342px"
              className="object-cover"
            />
          </div>
          <div className="mt-3.5">
            <span className="font-outfit inline-block rounded-full bg-[#c2966e] px-3.5 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase shadow-xs">
              Gift Offer
            </span>
          </div>
          <h2 className="font-geist mt-2.5 text-lg font-extrabold tracking-tight text-gray-950">
            {giftOffer.title}
          </h2>
          <p className="font-geist mt-1 text-base font-black text-[#c2966e]">{giftOffer.benefit}</p>
          <div className="mt-3 rounded-2xl bg-[#FAF6F0] p-3.5">
            <p className="font-geist text-xs leading-relaxed font-medium text-gray-800">
              {giftOffer.description}
            </p>
            <p className="font-geist mt-1.5 text-[11px] text-gray-500">{giftOffer.terms}</p>
          </div>
          <Link
            href="/offers/gifts/select"
            className="font-outfit mt-4 flex h-11 w-full items-center justify-center rounded-full bg-black text-sm font-bold tracking-wide text-white transition hover:bg-gray-800 active:scale-[0.99]"
          >
            View Offer
          </Link>
        </article>
      </main>
      <MobileBottomNav active="Offer" />
    </div>
  );
}
