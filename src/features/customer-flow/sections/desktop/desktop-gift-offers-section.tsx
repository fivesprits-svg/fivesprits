import Image from "next/image";
import Link from "next/link";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { giftOffer } from "@/features/customer-flow/data/offers";

export function DesktopGiftOffersSection() {
  return (
    <div className="hidden lg:block">
      <PortalShell title="Offers" eyebrow="Exclusive rewards">
        <div className="flex items-end justify-between border-b border-black/10 pb-8">
          <div>
            <h1 className="text-4xl font-black tracking-[-0.04em]">Premium Gifts</h1>
            <p className="mt-3 text-[#6f6f70]">Unlock premium gifts with your purchases.</p>
          </div>
          <div className="flex rounded-full border border-black/10 bg-white p-1 text-sm font-bold">
            <Link href="/offers" className="px-6 py-3">
              Combo Offers
            </Link>
            <span className="rounded-full bg-black px-6 py-3 text-white">Gift Offers</span>
          </div>
        </div>
        <article className="mt-8 grid overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_12px_40px_rgba(25,20,15,0.05)] lg:grid-cols-[1.1fr_1fr]">
          <div className="relative min-h-[440px] bg-[#f3f0eb]">
            <Image
              src={giftOffer.image}
              alt="Premium trolley gift"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-12">
            <span className="w-fit rounded-full bg-[#f7eee6] px-3 py-1.5 text-xs font-bold text-[#9d7658]">
              GIFT OFFER
            </span>
            <h2 className="mt-5 text-4xl font-black">{giftOffer.title}</h2>
            <p className="mt-4 text-2xl font-black text-[#9d7658]">{giftOffer.benefit}</p>
            <p className="mt-5 max-w-lg leading-7 text-[#666]">{giftOffer.description}</p>
            <p className="mt-3 text-sm text-[#888]">{giftOffer.terms}</p>
            <Link
              href="/offers/gifts/select"
              className="mt-8 grid h-13 w-48 place-items-center rounded-full bg-black text-sm font-bold text-white"
            >
              View Offer
            </Link>
          </div>
        </article>
      </PortalShell>
    </div>
  );
}
