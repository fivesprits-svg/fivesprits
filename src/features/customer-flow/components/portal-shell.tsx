"use client";
import { DesktopHeader } from "@/features/customer-flow/components/layout/desktop-header";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
export function PortalShell({
  title,
  eyebrow,
  backHref,
  children,
}: {
  title: string;
  eyebrow?: string;
  backHref?: string;
  children: React.ReactNode;
}) {
  const { state } = useCustomerFlow();
  return (
    <div className="min-h-dvh bg-white text-[#111] lg:bg-[#f7f7f5]">
      <MobileHeader title={title} backHref={backHref} />
      <DesktopHeader />
      <main
        id="main-content"
        className="mx-auto w-full max-w-[390px] px-6 pt-5 pb-28 lg:max-w-7xl lg:px-8 lg:py-12"
      >
        {state.session && (
          <p className="mb-2 text-xs text-[#7e7e86] lg:text-sm">Hello, {state.session.name}</p>
        )}
        {eyebrow && (
          <p className="hidden text-xs font-bold tracking-[0.2em] text-[#a67854] uppercase lg:block">
            {eyebrow}
          </p>
        )}
        <div className="lg:mt-2">{children}</div>
      </main>
      <MobileBottomNav active={title === "Your Cart" ? "Cart" : "Product"} />
    </div>
  );
}
