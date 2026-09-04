"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { verifyOtpApi } from "@/features/customer-flow/services/auth-api";
import {
  MobileHomeIndicator,
  // MobileStatusBar,
} from "@/features/customer-flow/components/navigation/mobile-system-chrome";

export function OtpForm() {
  const router = useRouter();
  const { state, verifyOtp } = useCustomerFlow();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex min-h-dvh flex-col bg-[#faf9f6] lg:static lg:mt-8 lg:block lg:min-h-0 lg:bg-transparent">
        {/* <MobileStatusBar /> */}
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
            {error}
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

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (otp.length < 4) {
      setError("Please enter the complete 4-digit verification code.");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtpApi({
        username: state.session?.name || "",
        mobileNumber: state.session?.mobile || "",
        otp,
      });

      if (typeof window !== "undefined" && res.data?.accessToken) {
        window.localStorage.setItem("customer_access_token", res.data.accessToken);
        window.localStorage.setItem("customer_user", JSON.stringify(res.data.user));
      }

      verifyOtp();
      router.push("/digilocker");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "The verification code is incorrect. Please check the code shared by the administrator and try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
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
      <button
        type="submit"
        disabled={loading || otp.length < 4}
        className="customer-continue-button mt-10 flex items-center justify-center gap-2 disabled:opacity-60 md:mt-12"
      >
        {loading ? (
          <>
            <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Verifying...</span>
          </>
        ) : (
          <span>Verify &amp; Proceed</span>
        )}
      </button>
    </form>
  );
}
