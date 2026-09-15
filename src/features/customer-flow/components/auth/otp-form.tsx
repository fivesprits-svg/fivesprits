"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { useToast } from "@/features/customer-flow/components/ui/toast";
import { verifyOtpApi } from "@/features/customer-flow/services/auth-api";
import { FlowNavButtons } from "@/features/customer-flow/components/auth/flow-nav-buttons";

export function OtpForm() {
  const router = useRouter();
  const { state, verifyOtp, updateFormDraft } = useCustomerFlow();
  const { success, error: showError } = useToast();
  const otpDraft = state.userDetails?.formDrafts?.otp;
  const [otp, setOtp] = useState(otpDraft ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!otp || otp.trim().length === 0) {
      setError("Verification code is required");
      return;
    }
    if (otp.length < 4) {
      setError("Please enter the complete 4-digit verification code.");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtpApi({
        username: state.userDetails?.name || "",
        mobileNumber: state.userDetails?.mobile || "",
        otp,
      });

      if (typeof window !== "undefined" && res.data?.accessToken) {
        window.localStorage.setItem("customer_access_token", res.data.accessToken);
        window.localStorage.setItem("customer_user", JSON.stringify(res.data.user));
      }

      verifyOtp(res.data?.user);
      success("Mobile number verified. Welcome to The Five Spirits!");
      router.replace("/digilocker");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "The verification code is incorrect. Please check the code shared by the administrator and try again.";
      setError(message);
      showError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 md:mt-10" noValidate>
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
                otp[index]
              ) : isActive ? (
                <span className="customer-otp-cursor" aria-hidden="true" />
              ) : (
                "•"
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

      <p className="sr-only">Prototype code: 1234</p>
      <div className="mt-8 md:mt-10">
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
