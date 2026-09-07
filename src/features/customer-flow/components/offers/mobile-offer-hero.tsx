export function MobileOfferHero({ gift = false }: { gift?: boolean }) {
  return (
    <section className="relative mt-3 h-[150px] overflow-hidden rounded-[20px] bg-[#f7f1e9] px-5 py-6">
      <div className="relative z-10 max-w-[180px]">
        <p className="text-[13px] font-semibold text-[#9d7658]">
          {gift ? "Exclusive Rewards" : "Limited Time Deals"}
        </p>
        <h1 className="mt-1 text-[30px] leading-none font-black tracking-[-0.04em]">
          {gift ? "GIFTS" : "OFFERS"}
        </h1>
        <p className="mt-4 text-[15px] leading-[21px] font-medium">
          {gift
            ? "Unlock premium gifts with your purchases."
            : "Best deals on your favorite premium brands."}
        </p>
      </div>
      <div className="absolute top-[-10px] right-8 h-[145px] w-[76px] bg-[url('/customer-flow/figma-images/cf84e700c08cfaf02eebfd4a7ee03b1e9f44af72.png')] bg-contain bg-center bg-no-repeat" />
      <div className="absolute right-0 bottom-0 h-24 w-40 bg-[url('/customer-flow/figma-images/ba4157e75a3049e6aed3b253c5145beaaa70bbdd.png')] bg-contain bg-right-bottom bg-no-repeat opacity-40" />
    </section>
  );
}
