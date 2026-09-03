"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { ResendTimer } from "@/features/customer-flow/components/ui/resend-timer";
import {
  MobileHomeIndicator,
  MobileStatusBar,
} from "@/features/customer-flow/components/navigation/mobile-system-chrome";

export function DigilockerOtpForm() {
  const router = useRouter();
  const { verifyDigilockerOtp } = useCustomerFlow();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (otp.length !== 4) {
      setError("Please enter the complete 4-digit code.");
      return;
    }
    setLoading(true);
    verifyDigilockerOtp();
    router.push("/digilocker/verification");
  }

  function handleResend() {
    setOtp("");
    setError("");
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex min-h-dvh flex-col bg-[#faf9f6] lg:static lg:mt-8 lg:block lg:min-h-0 lg:bg-transparent">
        <MobileStatusBar />
        <div className="flex flex-1 flex-col items-center justify-center px-10 text-center lg:block lg:px-0 lg:text-left">
          <div className="customer-icon-circle lg:hidden">
            <Image src="/customer-flow/icons/error.svg" alt="" width={24} height={24} />
          </div>
          <h2 className="mt-8 text-[28px] font-bold lg:mt-0 lg:text-lg">Verification Failed</h2>
          <p
            role="alert"
            className="text-common-gray lg:text-common-error mt-4 max-w-[280px] text-sm leading-6 lg:max-w-none"
          >
            The verification code is incorrect. Please check the code and try again.
          </p>
        </div>
        <div className="px-6 pb-10 lg:px-0 lg:pb-0">
          <button
            type="button"
            onClick={() => {
              setError("");
              setOtp("");
            }}
            className="customer-continue-button"
          >
            Try Again
          </button>
        </div>
        <MobileHomeIndicator />
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-10">
      <label htmlFor="digilocker-otp" className="sr-only">
        Verification Code
      </label>
      <div className="relative grid grid-cols-4 gap-3">
        <input
          id="digilocker-otp"
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
            {otp[index] ? <span>{otp[index]}</span> : <span className="customer-otp-dot" />}
          </span>
        ))}
      </div>
      <div className="mt-6">
        <ResendTimer initialSeconds={60} onResend={handleResend} />
      </div>
      <button type="submit" disabled={loading} className="customer-continue-button mt-8">
        {loading ? "Verifying..." : "Verify & Proceed"}
      </button>
    </form>
  );
}
