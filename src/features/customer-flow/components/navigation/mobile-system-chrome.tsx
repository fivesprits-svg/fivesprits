import Image from "next/image";

export function MobileStatusBar() {
  return (
    <div className="flex h-11 items-center justify-between px-6 text-[12px] font-semibold md:hidden">
      <span>9:41 AM</span>
      <span className="flex items-center gap-1.5">
        <Image src="/customer-flow/icons/status-signal.svg" alt="" width={20} height={20} />
        <Image src="/customer-flow/icons/status-wifi.svg" alt="" width={20} height={20} />
        <Image src="/customer-flow/icons/status-battery.svg" alt="" width={28} height={20} />
      </span>
    </div>
  );
}

export function MobileHomeIndicator() {
  return <span data-testid="home-indicator" />;
}
