"use client";
import Link from "next/link";
import Image from "next/image";
import { MobileStatusBar } from "@/features/customer-flow/components/navigation/mobile-system-chrome";
export function MobileHeader({ title, backHref }: { title: string; backHref?: string }) {
  return (
    <header className="lg:hidden">
      <MobileStatusBar />
      <div className="relative flex h-14 items-center justify-center px-6">
        {backHref && (
          <Link
            href={backHref}
            aria-label="Go back"
            className="absolute left-6 grid size-10 place-items-center rounded-full bg-[#f7f4ee]"
          >
            <Image src="/customer-flow/icons/back.svg" alt="" width={16} height={16} />
          </Link>
        )}
        <h1 className="text-[17px] font-semibold">{title}</h1>
      </div>
    </header>
  );
}
