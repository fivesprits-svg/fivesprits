"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { customerLoginApi } from "@/features/customer-flow/services/auth-api";

export function LoginFormHere() {
  const router = useRouter();
  const { loginHere } = useCustomerFlow();
  const [phoneValue, setPhoneValue] = useState("");
  const [countryData, setCountryData] = useState<{
    countryCode: string;
    dialCode: string;
  }>({ countryCode: "in", dialCode: "91" });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState<{ mobile?: string; password?: string }>({});

  function handlePhoneChange(
    value: string,
    data: { countryCode: string; dialCode: string; name?: string; format?: string },
  ) {
    setPhoneValue(value);
    setCountryData({ countryCode: data.countryCode, dialCode: data.dialCode });
    if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: undefined }));
    setApiError("");
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setApiError("");
    const next: { mobile?: string; password?: string } = {};
    const cleanDigits = phoneValue.replace(/\D/g, "");
    const fullPhone = `+${countryData.dialCode}${phoneValue}`;
    const normalizedMobile = cleanDigits.length >= 10 ? cleanDigits.slice(-10) : cleanDigits;

    if (!phoneValue.trim()) next.mobile = "Please enter your mobile number";
    else if (cleanDigits.length < 7) next.mobile = "Enter a valid phone number";
    if (!password.trim()) next.password = "Please enter your password";
    setErrors(next);

    if (!next.mobile && !next.password) {
      setLoading(true);
      try {
        let res;
        try {
          res = await customerLoginApi({
            mobileNumber: normalizedMobile,
            password,
          });
        } catch {
          // Fallback with full digits if not found with 10 digits
          res = await customerLoginApi({
            mobileNumber: cleanDigits,
            password,
          });
        }

        if (typeof window !== "undefined" && res.data?.accessToken) {
          window.localStorage.setItem("customer_access_token", res.data.accessToken);
          window.localStorage.setItem("customer_user", JSON.stringify(res.data.user));
        }

        loginHere(fullPhone, password);
        router.push("/digilocker");
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Invalid mobile number or password.";
        setApiError(message);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-[15px] md:mt-10 md:space-y-5" noValidate>
      <label className="block">
        <span className="customer-input-label mb-2.5 block md:text-sm">Mobile Number</span>
        <div className="phone-input-wrapper">
          <PhoneInput
            country="in"
            value={phoneValue}
            onChange={handlePhoneChange}
            placeholder="Enter mobile number"
            enableSearch
            searchPlaceholder="Search countries"
            containerStyle={{ width: "100%" }}
            inputStyle={{
              width: "100%",
              height: "48px",
              fontSize: "15px",
              fontFamily: "var(--font-family-geist)",
              borderRadius: "16px",
              border: "1px solid var(--color-common-border)",
              paddingLeft: "48px",
            }}
            buttonStyle={{
              border: "none",
              borderRight: "1px solid var(--color-common-border)",
              borderRadius: "16px 0 0 16px",
              backgroundColor: "transparent",
            }}
            dropdownStyle={{
              borderRadius: "12px",
              border: "1px solid var(--color-common-border)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
        </div>
        {errors.mobile && (
          <span
            role="alert"
            className="text-common-error mt-1.5 block text-xs font-medium md:text-sm"
          >
            {errors.mobile}
          </span>
        )}
      </label>
      <label className="block">
        <span className="customer-input-label mb-2.5 block md:text-sm">Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
          aria-invalid={Boolean(errors.password)}
          className="customer-input"
        />
        {errors.password && (
          <span
            role="alert"
            className="text-common-error mt-1.5 block text-xs font-medium md:text-sm"
          >
            {errors.password}
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
            <span>Signing in...</span>
          </>
        ) : (
          <span>Continue</span>
        )}
      </button>
      <p className="font-geist text-common-gray text-center text-sm md:text-base">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-common-black font-semibold underline"
        >
          {" "}
          Register{" "}
        </button>{" "}
      </p>
    </form>
  );
}
