"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { verifyOtpApi } from "@/features/customer-flow/services/auth-api";
import { FlowNavButtons } from "@/features/customer-flow/components/auth/flow-nav-buttons";
import {
  MobileHomeIndicator,
  // MobileStatusBar,
} from "@/features/customer-flow/components/navigation/mobile-system-chrome";

export function OtpForm() {
  const router = useRouter();
  const { state, verifyOtp, updateFormDraft } = useCustomerFlow();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex min-h-dvh flex-col bg-[#faf9f6] md:static md:mt-8 md:block md:min-h-0 md:bg-transparent">
        {/* <MobileStatusBar /> */}
        <div className="flex flex-1 flex-col items-center justify-center px-10 text-center md:block md:px-0 md:text-left">
          <div className="customer-icon-circle bg-[#faf3eb] md:hidden">
            <Image src="/customer-flow/icons/error.svg" alt="" width={24} height={24} />
          </div>
          <h2 className="mt-8 text-[28px] font-bold md:mt-0 md:text-lg">Verification Failed</h2>
          <p
            role="alert"
            className="text-common-gray md:text-common-error mt-4 max-w-[280px] text-sm leading-6 md:max-w-none md:text-base"
          >
            {error}
          </p>
        </div>
        <div className="px-6 pb-10 md:px-0 md:pb-0">
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
            const next = event.target.value.replace(/\D/g, "").slice(0, 4);
            setOtp(next);
            updateFormDraft({ type: "otp", data: { otp: next } });
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
      <div className="mt-10 md:mt-12">
        <FlowNavButtons
          backHref="/"
          submitLabel="Verify & Proceed"
          loading={loading}
          loadingLabel="Verifying..."
        />
      </div>
    </form>
  );
}
