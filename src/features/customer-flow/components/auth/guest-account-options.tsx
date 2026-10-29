"use client";

import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function GuestAccountOptions() {
  const router = useRouter();
  const { logout } = useCustomerFlow();

  function continueTo(path: "/" | "/login-here") {
    logout();
    router.replace(path);
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#f8f9fa] px-6 py-10">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm sm:p-9">
        <p className="font-outfit text-xs font-bold tracking-[0.18em] text-[#a67854] uppercase">
          The Five Spirits
        </p>
        <h1 className="font-unbounded mt-3 text-2xl leading-tight font-black text-gray-900">
          Continue with an account
        </h1>
        <p className="font-geist mt-3 text-sm leading-6 text-gray-500">
          Sign in to view your profile and manage your product requests, or register to get started.
        </p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => continueTo("/login-here")}
            className="customer-continue-button cursor-pointer text-base"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => continueTo("/")}
            className="font-outfit flex h-[50px] cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-base font-semibold text-gray-900 transition hover:border-gray-900"
          >
            Register
          </button>
        </div>
      </section>
    </main>
  );
}
