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
          <div className="customer-icon-circle lg:hidden">
            <Image src="/customer-flow/icons/error.svg" alt="" width={24} height={24} />
          </div>
          <h2 className="mt-8 text-[28px] font-bold md:text-3xl lg:mt-0 lg:text-lg">
            Verification Failed
          </h2>
          <p
            role="alert"
            className="text-common-gray lg:text-common-error mt-4 max-w-[280px] text-sm leading-6 md:max-w-sm md:text-base lg:max-w-none"
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
            className="customer-continue-button md:max-w-sm"
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
    router.push("/digilocker");
  }
  return (
    <form onSubmit={submit} className="mt-10 md:mt-12">
      <label htmlFor="otp" className="sr-only">
        Verification Code
      </label>
      <div className="relative grid grid-cols-4 gap-3 md:gap-4">
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
            className={`customer-otp-box ${index === otp.length ? "customer-otp-box-active" : ""} ${otp[index] ? "customer-otp-box-filled" : ""}`}
          >
            {otp[index] ?? "•"}
          </span>
        ))}
      </div>
      <p className="sr-only">Prototype code: 1234</p>
      <button type="submit" className="customer-continue-button mt-10 md:mt-12">
        Verify &amp; Proceed
      </button>
    </form>
  );
}
