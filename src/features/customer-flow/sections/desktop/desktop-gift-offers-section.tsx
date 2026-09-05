import Image from "next/image";
import Link from "next/link";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { Breadcrumb } from "@/features/customer-flow/components/navigation/breadcrumb";
import { giftOffer } from "@/features/customer-flow/data/offers";

export function DesktopGiftOffersSection() {
  return (
    <div className="hidden md:block">
      <PortalShell title="Offers" eyebrow="Exclusive rewards">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <Breadcrumb items={[{ label: "Offers" }]} />

          {/* Header Title Section - Gifts specific */}
          <div className="mb-6 flex items-end justify-between border-b border-gray-200/80 pb-5">
            <div>
              <p className="font-outfit text-xs font-extrabold tracking-wider text-[#a67854] uppercase sm:text-sm">
                EXCLUSIVE REWARDS
              </p>
              <h1 className="font-unbounded mt-1 text-3xl font-black tracking-tight text-gray-950 uppercase sm:text-4xl lg:text-5xl">
                GIFTS
              </h1>
              <p className="font-geist mt-1.5 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
                Unlock premium gifts with your purchases.
              </p>
            </div>
            <div className="flex rounded-full border border-gray-200 bg-white p-1 text-xs font-bold shadow-sm">
              <Link href="/offers" className="px-5 py-2 text-gray-600 transition hover:text-black">
                Combo Offers
              </Link>
              <span className="rounded-full bg-gray-900 px-5 py-2 text-white">Gift Offers</span>
            </div>
          </div>

          {/* Gift Offer Card matching Combo aesthetic */}
          <article className="grid items-center gap-6 overflow-hidden rounded-[28px] border border-gray-200/90 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md lg:grid-cols-[1fr_1.15fr] lg:p-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-[#f5f3ef] lg:h-full lg:min-h-[380px]">
              <Image
                src={giftOffer.image}
                alt="Premium trolley gift"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div>
                <span className="font-outfit inline-block rounded-full bg-[#c2966e] px-3.5 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase shadow-xs">
                  Gift Offer
                </span>
              </div>
              <h2 className="font-geist mt-3 text-2xl font-black tracking-tight text-gray-950 lg:text-3xl">
                {giftOffer.title}
              </h2>
              <p className="font-geist mt-2 text-xl font-extrabold text-[#c2966e] lg:text-2xl">
                {giftOffer.benefit}
              </p>
              <div className="mt-4 rounded-2xl bg-[#FAF6F0] p-4">
                <p className="font-geist text-sm leading-relaxed font-medium text-gray-800">
                  {giftOffer.description}
                </p>
                <p className="font-geist mt-2 text-xs text-gray-500">{giftOffer.terms}</p>
              </div>
              <div className="mt-6 flex items-center justify-end">
                <Link
                  href="/offers/gifts/select"
                  className="font-outfit flex h-11 items-center justify-center rounded-full bg-black px-8 text-sm font-bold tracking-wide text-white transition hover:bg-gray-800 active:scale-[0.99] sm:h-12 sm:text-base"
                >
                  View Offer
                </Link>
              </div>
            </div>
          </article>
        </div>
      </PortalShell>
    </div>
  );
}
