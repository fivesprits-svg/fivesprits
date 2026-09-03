"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import {
  MobileHomeIndicator,
  MobileStatusBar,
} from "@/features/customer-flow/components/navigation/mobile-system-chrome";
export function OtpForm() {
  const router = useRouter();
  const { verifyOtp } = useCustomerFlow();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex min-h-dvh flex-col bg-[#faf9f6] lg:static lg:mt-8 lg:block lg:min-h-0 lg:bg-transparent">
        <MobileStatusBar />
        <div className="flex flex-1 flex-col items-center justify-center px-10 text-center lg:block lg:px-0 lg:text-left">
          <div className="grid size-28 place-items-center rounded-full border-[7px] border-[#efd8d5] lg:hidden">
            <Image src="/customer-flow/icons/error.svg" alt="" width={24} height={24} />
          </div>
          <h2 className="mt-8 text-[28px] font-bold lg:mt-0 lg:text-lg">Verification Failed</h2>
          <p
            role="alert"
            className="mt-4 max-w-[280px] text-sm leading-6 text-[#777] lg:max-w-none lg:text-red-600"
          >
            The verification code is incorrect. Please check the code shared by the administrator
            and try again.
          </p>
        </div>
        <div className="px-6 pb-10 lg:px-0 lg:pb-0">
          <button
            type="button"
            onClick={() => {
              setError("");
              setOtp("");
            }}
            className="h-[53px] w-full rounded-full bg-black font-semibold text-white"
          >
            Try Again
          </button>
        </div>
        <MobileHomeIndicator />
      </div>
    );
  }
  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (otp !== "1234") {
      setError("The verification code is incorrect. Please try again.");
      return;
    }
    verifyOtp();
    router.push("/categories");
  }
  return (
    <form onSubmit={submit} className="mt-10">
      <label htmlFor="otp" className="sr-only">
        Verification Code
      </label>
      <div className="relative grid grid-cols-4 gap-3">
        <input
          id="otp"
          value={otp}
          onChange={(event) => {
            setOtp(event.target.value.replace(/\D/g, "").slice(0, 4));
            setError("");
          }}
          inputMode="numeric"
          autoFocus
          className="absolute inset-0 z-10 size-full cursor-text opacity-0"
        />
        {[0, 1, 2, 3].map((index) => (
          <span
            key={index}
            className={`grid h-[66px] place-items-center rounded-[14px] border text-2xl font-bold ${index === otp.length ? "border-black" : "border-[#ddd]"}`}
          >
            {otp[index] ?? "•"}
          </span>
        ))}
      </div>
      <p className="sr-only">Prototype code: 1234</p>
      <button className="mt-10 h-[53px] w-full rounded-full bg-black font-semibold text-white">
        Verify &amp; Proceed
      </button>
    </form>
  );
}
