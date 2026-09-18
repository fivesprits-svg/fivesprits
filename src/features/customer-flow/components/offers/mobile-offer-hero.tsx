import Image from "next/image";

export function MobileOfferHero({ gift = false }: { gift?: boolean }) {
  return (
    <section className="relative mt-3 h-[150px] overflow-hidden rounded-[20px] px-4 py-6">
      <div className="relative z-10 max-w-[180px]">
        <p className="text-[13px] font-semibold text-[#9d7658]">
          {gift ? "Exclusive Rewards" : "Limited Time Deals"}
        </p>

        <h1 className="mt-1 text-[30px] leading-none font-black tracking-[-0.04em]">
          {gift ? "GIFTS" : "OFFERS"}
        </h1>

        <p className="mt-4 text-[15px] leading-[21px] font-medium text-[#7E7E86]">
          {gift
            ? "Unlock premium gifts with your purchases."
            : "Best deals on your favorite premium brands."}
        </p>
      </div>

      {/* Right-side Hero Image */}
      <div className="absolute top-[-10px] right-6 h-[145px] w-[100px]">
        <Image
          src="/customer-flow/hero/hero-right-visual_offer.png"
          alt="Offers"
          fill
          priority
          sizes="100px"
          className="object-cover"
        />
      </div>

      <div className="absolute right-0 bottom-0 h-24 w-40 opacity-40" />
    </section>
  );
}
