"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { useToast } from "@/features/customer-flow/components/ui/toast";
import { AuthRequestError } from "@/features/customer-flow/components/auth/auth-request-error";
import { validateLogin } from "@/features/customer-flow/utils/login-validation";
import { requestOtpApi } from "@/features/customer-flow/services/auth-api";

export function LoginForm() {
  const router = useRouter();
  const { state, login, loginAsGuest, updateFormDraft } = useCustomerFlow();
  const { success } = useToast();
  const loginDraft = state.userDetails?.formDrafts?.login;
  const [name, setName] = useState(loginDraft?.name ?? "");
  const [mobile, setMobile] = useState(loginDraft?.mobile ?? "");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState<ReturnType<typeof validateLogin>>({});

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setApiError("");
    const next = validateLogin(name, mobile);
    setErrors(next);
    if (!next.name && !next.mobile) {
      setLoading(true);
      try {
        await requestOtpApi({
          username: name.trim(),
          mobileNumber: mobile,
        });
        login(name.trim(), mobile);
        success("Verification code sent. Check your request to get the OTP.");
        router.push("/otp");
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to generate OTP. Please try again.";
        setApiError(message);
      } finally {
        setLoading(false);
      }
    }
  }

  function continueAsGuest() {
    const guestToken = process.env.NEXT_PUBLIC_API_GUEST_TOKEN;
    if (!guestToken) {
      const message = "Guest access is not configured. Please try signing in instead.";
      setApiError(message);
      return;
    }
    loginAsGuest(guestToken);
    router.push("/categories");
  }
  return (
    <form
      onSubmit={submit}
      className="auth-login-form mt-8 space-y-[15px] md:mt-10 md:min-h-[472px] md:space-y-5"
      noValidate
    >
      <label className="block">
        <span className="customer-input-label mb-2.5 block md:text-sm">
          User Name <span className="text-red-500">*</span>
        </span>
        <input
          value={name}
          onChange={(event) => {
            const next = event.target.value;
            setName(next);
            updateFormDraft({ type: "login", data: { name: next, mobile } });
            if (next.trim() && errors.name) {
              setErrors((prev) => ({ ...prev, name: undefined }));
            }
          }}
          placeholder="Enter full name"
          aria-invalid={Boolean(errors.name)}
          className="customer-input"
          disabled={loading}
        />
        {errors.name && (
          <span
            role="alert"
            className="text-common-error mt-1.5 block text-xs font-medium md:text-sm"
          >
            {errors.name}
          </span>
        )}
      </label>

      <label className="block">
        <span className="customer-input-label mb-2.5 block md:text-sm">
          Mobile Number <span className="text-red-500">*</span>
        </span>
        <input
          value={mobile}
          onChange={(event) => {
            const next = event.target.value.replace(/\D/g, "").slice(0, 10);
            setMobile(next);
            updateFormDraft({ type: "login", data: { name, mobile: next } });

            if (errors.mobile) {
              if (next.length === 0) {
                setErrors((prev) => ({
                  ...prev,
                  mobile: "Mobile number is required",
                }));
              } else if (next.length < 10) {
                setErrors((prev) => ({
                  ...prev,
                  mobile: "Mobile number must be exactly 10 digits.",
                }));
              } else {
                setErrors((prev) => ({
                  ...prev,
                  mobile: undefined,
                }));
              }
            }
          }}
          inputMode="numeric"
          placeholder="Enter mobile number"
          aria-invalid={Boolean(errors.mobile)}
          className="customer-input"
          disabled={loading}
        />
        {errors.mobile && (
          <span
            role="alert"
            className="text-common-error mt-1.5 block text-xs font-medium md:text-sm"
          >
            {errors.mobile}
          </span>
        )}
      </label>

      <AuthRequestError message={apiError} />

      <button
        type="submit"
        disabled={loading}
        className="customer-continue-button mt-4 flex items-center justify-center gap-2 disabled:opacity-60 md:mt-6"
      >
        {loading ? (
          <>
            <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Sending Code...</span>
          </>
        ) : (
          <span>Continue</span>
        )}
      </button>
      <div className="space-y-3 pt-1 text-center">
        <p className="font-geist text-common-gray m-0 text-sm leading-5 md:text-base">
          We&apos;ll send you a one-time verification code to Admin.
        </p>
        <p className="font-geist text-common-gray m-0 text-sm leading-5 md:text-base">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login-here")}
            className="text-common-black cursor-pointer font-semibold underline"
            disabled={loading}
          >
            Login here
          </button>
        </p>
        <button
          type="button"
          onClick={continueAsGuest}
          className="text-common-black block w-full cursor-pointer text-center text-sm font-semibold underline disabled:opacity-60 md:text-base"
          disabled={loading}
        >
          Continue as guest
        </button>
      </div>
    </form>
  );
}
