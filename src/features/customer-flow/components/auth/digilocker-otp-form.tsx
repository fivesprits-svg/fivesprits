"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { ResendTimer } from "@/features/customer-flow/components/ui/resend-timer";
import { FlowNavButtons } from "@/features/customer-flow/components/auth/flow-nav-buttons";
import {
  MobileHomeIndicator,
  // MobileStatusBar,
} from "@/features/customer-flow/components/navigation/mobile-system-chrome";

export function DigilockerOtpForm() {
  const router = useRouter();
  const { state, verifyDigilockerOtp, updateFormDraft } = useCustomerFlow();
  const draft = state.session?.formDrafts?.digilockerOtp;
  const [otp, setOtp] = useState(draft ?? "");
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
      <div className="fixed inset-0 z-50 flex min-h-dvh flex-col bg-[#faf9f6] md:static md:mt-8 md:block md:min-h-0 md:bg-transparent">
        {/* <MobileStatusBar /> */}
        <div className="flex flex-1 flex-col items-center justify-center px-10 text-center md:block md:px-0 md:text-left">
          <div className="">
            <Image src="/customer-flow/icons/error.svg" alt="" width={24} height={24} />
          </div>
          <h2 className="mt-8 text-[28px] font-bold md:mt-0 md:text-lg">Verification Failed</h2>
          <p
            role="alert"
            className="text-common-gray md:text-common-error mt-4 max-w-[280px] text-sm leading-6 md:max-w-none md:text-base"
          >
            The verification code is incorrect. Please check the code and try again.
          </p>
        </div>
        <div className="px-6 pb-10 md:px-0 md:pb-0">
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
    <form onSubmit={submit} className="mt-8 md:mt-10">
      <label htmlFor="digilocker-otp" className="sr-only">
        Verification Code
      </label>
      <div className="relative grid grid-cols-4 gap-3 md:gap-4">
        <input
          id="digilocker-otp"
          value={otp}
          onChange={(event) => {
            const next = event.target.value.replace(/\D/g, "").slice(0, 4);
            setOtp(next);
            updateFormDraft({ type: "digilocker-otp", data: { otp: next } });
            setError("");
          }}
          inputMode="numeric"
          autoFocus
          className="absolute inset-0 z-10 size-full cursor-text opacity-0"
        />
        {[0, 1, 2, 3].map((index) => {
          const isActive = index === otp.length;
          const isFilled = Boolean(otp[index]);

          return (
            <span
              key={index}
              className={`customer-otp-box ${
                isActive ? "customer-otp-box-active" : ""
              } ${isFilled ? "customer-otp-box-filled" : ""}`}
            >
              {isFilled ? (
                <span>{otp[index]}</span>
              ) : isActive ? (
                <span className="customer-otp-cursor" aria-hidden="true" />
              ) : (
                <span className="customer-otp-dot" />
              )}
            </span>
          );
        })}
      </div>
      <div className="mt-6 md:mt-8">
        <ResendTimer initialSeconds={60} onResend={handleResend} />
      </div>
      <div className="mt-8 md:mt-10">
        <FlowNavButtons
          backHref="/digilocker"
          submitLabel="Verify & Proceed"
          loading={loading}
          loadingLabel="Verifying..."
        />
      </div>
    </form>
  );
}
