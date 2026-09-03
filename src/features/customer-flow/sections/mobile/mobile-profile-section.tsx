"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function MobileProfileSection() {
  const router = useRouter();
  const { state, logout } = useCustomerFlow();
  const [confirming, setConfirming] = useState(false);
  return (
    <div className="min-h-dvh bg-white pb-28 lg:hidden">
      <MobileHeader title="My Profile" backHref="/categories" />
      <main className="mx-auto w-full max-w-[390px] px-6 pt-6">
        <div className="text-center">
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#ece7e1] text-2xl font-bold">
            {state.session?.name?.slice(0, 1).toUpperCase()}
          </div>
          <h1 className="mt-3 text-lg font-bold">{state.session?.name}</h1>
        </div>
        <div className="mt-9 space-y-5">
          <label className="block text-xs text-[#777]">
            Customer Name
            <span className="mt-2 flex h-[49px] items-center rounded-xl border border-black/10 px-4 text-base text-black">
              {state.session?.name}
              <Image
                className="ml-auto"
                src="/customer-flow/icons/lock.svg"
                alt="Locked"
                width={20}
                height={20}
              />
            </span>
          </label>
          <label className="block text-xs text-[#777]">
            Mobile Number
            <span className="mt-2 flex h-[49px] items-center rounded-xl border border-black/10 px-4 text-base text-black">
              +91 {state.session?.mobile}
              <Image
                className="ml-auto"
                src="/customer-flow/icons/lock.svg"
                alt="Locked"
                width={20}
                height={20}
              />
            </span>
          </label>
        </div>
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="mt-12 h-[50px] w-full rounded-xl border border-[#b0443d] text-sm font-bold text-[#b0443d]"
        >
          Logout
        </button>
      </main>
      <MobileBottomNav active="Profile" />
      {confirming && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            className="w-full max-w-[342px] rounded-[18px] bg-white p-7"
          >
            <h2 id="logout-title" className="text-xl font-bold">
              Logout Confirmation
            </h2>
            <p className="mt-3 text-sm text-[#777]">Are you sure you want to logout?</p>
            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="h-10 rounded-full border border-black/15 px-6 text-sm font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="h-10 rounded-full bg-black px-6 text-sm font-bold text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
