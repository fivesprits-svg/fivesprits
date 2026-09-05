"use client";
import { DesktopHeader } from "@/features/customer-flow/components/layout/desktop-header";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
// import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
export function PortalShell({
  title,
  backHref,
  className,
  children,
}: {
  title: string;
  eyebrow?: string;
  backHref?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-white text-[#111] md:bg-[#f8f9fa]">
      <MobileHeader title={title} backHref={backHref} />
      <DesktopHeader />
      <main
        id="main-content"
        className={`mx-auto w-full max-w-[390px] px-6 pt-5 pb-28 md:max-w-7xl md:px-6 md:py-6 ${className || ""}`}
      >
        <div className="md:mt-1">{children}</div>
      </main>
      <MobileBottomNav active={title === "Your Cart" ? "Cart" : "Product"} />
    </div>
  );
}
