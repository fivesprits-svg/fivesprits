"use client";
import { MobileHomeIndicator } from "@/features/customer-flow/components/navigation/mobile-system-chrome";

export function AuthPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="customer-page-container md:hidden">
      {/* <MobileStatusBar /> */}
      {children}
      <MobileHomeIndicator />
    </section>
  );
}

export function DesktopAuthPageLayout({
  children,
  maxWidth = "max-w-lg",
  className = "",
}: {
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}) {
  return (
    <section className="hidden min-h-dvh items-center justify-center bg-[#f8f9fa] px-6 py-8 md:flex">
      <div className={`w-full ${maxWidth} ${className}`}>{children}</div>
    </section>
  );
}
