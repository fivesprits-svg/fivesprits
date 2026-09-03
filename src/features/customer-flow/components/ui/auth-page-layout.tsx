"use client";
import {
  MobileStatusBar,
  MobileHomeIndicator,
} from "@/features/customer-flow/components/navigation/mobile-system-chrome";

export function AuthPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="customer-page-container lg:hidden">
      <MobileStatusBar />
      {children}
      <MobileHomeIndicator />
    </section>
  );
}

export function DesktopAuthPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="hidden min-h-dvh items-center justify-center bg-[#f7f7f5] px-8 lg:flex">
      <div className="w-full max-w-lg">{children}</div>
    </section>
  );
}
