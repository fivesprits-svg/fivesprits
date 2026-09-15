"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { ResendTimer } from "@/features/customer-flow/components/ui/resend-timer";
import { FlowNavButtons } from "@/features/customer-flow/components/auth/flow-nav-buttons";

export function DigilockerOtpForm() {
  const router = useRouter();
  const { state, verifyDigilockerOtp, updateFormDraft } = useCustomerFlow();
  const draft = state.userDetails?.formDrafts?.digilockerOtp;
  const [otp, setOtp] = useState(draft ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!otp || otp.trim().length === 0) {
      setError("Verification code is required");
      return;
    }
    if (otp.length !== 4) {
      setError("Please enter the complete 4-digit verification code.");
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

  return (
    <form onSubmit={submit} className="mt-8 md:mt-10" noValidate>
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
            if (error) setError("");
          }}
          inputMode="numeric"
          autoFocus
          aria-invalid={Boolean(error)}
          className="absolute inset-0 z-10 size-full cursor-text opacity-0"
        />
        {[0, 1, 2, 3].map((index) => {
          const isActive = index === otp.length;
          const isFilled = Boolean(otp[index]);

          return (
            <span
              key={index}
              className={`customer-otp-box ${
                error ? "border-red-400 bg-red-50/20" : ""
              } ${isActive ? "customer-otp-box-active" : ""} ${
                isFilled ? "customer-otp-box-filled" : ""
              }`}
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

      {error && (
        <span
          role="alert"
          className="text-common-error mt-2.5 block text-xs font-medium md:text-sm"
        >
          {error}
        </span>
      )}

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
