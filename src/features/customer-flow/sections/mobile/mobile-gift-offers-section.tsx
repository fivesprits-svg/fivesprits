"use client";

import Image from "next/image";
import Link from "next/link";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileOfferHero } from "@/features/customer-flow/components/offers/mobile-offer-hero";
import { OfferTabs } from "@/features/customer-flow/components/offers/offer-tabs";
import { type GiftOfferDetail } from "@/features/customer-flow/services/offers-api";
import { MobileHeader } from "../../components/navigation/mobile-header";
import { ImageSkeleton } from "@/features/customer-flow/components/ui/skeleton";
import { ImagePlaceholder } from "@/features/customer-flow/components/ui/image-placeholder";
import { EmptyState } from "@/features/customer-flow/components/ui/empty-state";

export function MobileGiftOffersSection({
  offer,
}: {
  offer?: GiftOfferDetail | null;
} = {}) {
  return (
    <div className="min-h-dvh bg-white pb-28 md:hidden">
      <MobileHeader title="Offers" backHref="" />
      <main className="mx-auto w-full max-w-[390px] px-6 pt-2">
        <OfferTabs active="gift" />
        <MobileOfferHero gift />
        {!offer ? (
          <EmptyState
            icon="sparkles"
            title="No Gift Offers Available"
            description="There are currently no active gift offers. Please check back soon."
            actionLabel="Browse Categories"
            actionHref="/categories"
          />
        ) : (
          <article className="mt-4 overflow-hidden rounded-[28px] border border-gray-200/90 bg-white p-3.5 shadow-sm">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-[#f5f3ef]">
              {offer.image ? (
                <>
                  <ImageSkeleton className="absolute inset-0" />
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="342px"
                    className="object-cover"
                  />
                </>
              ) : (
                <ImagePlaceholder type="gift" />
              )}
            </div>
            <div className="mt-3.5">
              <span className="font-outfit inline-block rounded-full bg-[#c2966e] px-3.5 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase shadow-xs">
                Gift Offer
              </span>
            </div>
            <h2 className="font-geist mt-2.5 text-lg font-extrabold tracking-tight text-gray-950">
              {offer.title}
            </h2>
            <p className="font-geist mt-1 text-base font-black text-[#c2966e]">{offer.benefit}</p>
            <div className="mt-3 rounded-2xl bg-[#FAF6F0] p-3.5">
              <p className="font-geist text-xs leading-relaxed font-medium text-gray-800">
                {offer.description}
              </p>
              <p className="font-geist mt-1.5 text-[11px] text-gray-500">{offer.terms}</p>
            </div>
            <Link
              href="/gift-offers/select"
              className="font-outfit mt-4 flex h-11 w-full cursor-pointer items-center justify-center rounded-full bg-black text-sm font-bold tracking-wide text-white transition hover:bg-gray-800 active:scale-[0.99]"
            >
              View Offer
            </Link>
          </article>
        )}
      </main>
      <MobileBottomNav active="Offer" />
    </div>
  );
}
