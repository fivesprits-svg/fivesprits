"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { useToast } from "@/features/customer-flow/components/ui/toast";
import { validateLogin } from "@/features/customer-flow/utils/login-validation";
import { requestOtpApi } from "@/features/customer-flow/services/auth-api";

export function LoginForm() {
  const router = useRouter();
  const { state, login, updateFormDraft } = useCustomerFlow();
  const { success, error: showError } = useToast();
  const loginDraft = state.session?.formDrafts?.login;
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
        showError(message);
      } finally {
        setLoading(false);
      }
    }
  }
  return (
    <form onSubmit={submit} className="mt-8 space-y-[15px] md:mt-10 md:space-y-5" noValidate>
      <label className="block">
        <span className="customer-input-label mb-2.5 block md:text-sm">User Name</span>
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
        <span className="customer-input-label mb-2.5 block md:text-sm">Mobile Number</span>
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
                  mobile: "Mobile Number is required",
                }));
              } else if (next.length < 10) {
                setErrors((prev) => ({
                  ...prev,
                  mobile: "Mobile Number must be 10 digits",
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

      {apiError && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-3 text-center text-xs font-medium text-red-700 md:text-sm"
        >
          {apiError}
        </div>
      )}

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
      <p className="font-geist text-common-gray text-center text-[11px] md:text-sm">
        We&apos;ll send you a one-time verification code to Admin.
      </p>
      <p className="font-geist text-common-gray mt-3 text-center text-sm md:text-base">
        {" "}
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/login-here")}
          className="text-common-black cursor-pointer font-semibold underline"
          disabled={loading}
        >
          {" "}
          Login here{" "}
        </button>{" "}
      </p>
    </form>
  );
}
