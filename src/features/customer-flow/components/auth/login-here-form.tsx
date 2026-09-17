"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { useToast } from "@/features/customer-flow/components/ui/toast";
import { customerLoginApi } from "@/features/customer-flow/services/auth-api";

export function LoginFormHere() {
  const router = useRouter();
  const { state, loginHere, updateFormDraft } = useCustomerFlow();
  const { success, error: showError } = useToast();
  const draft = state.userDetails?.formDrafts?.loginHere;
  const [phoneValue, setPhoneValue] = useState(draft?.phoneValue ?? "");
  const [countryData, setCountryData] = useState<{
    countryCode: string;
    dialCode: string;
  }>({ countryCode: "in", dialCode: "91" });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState<{ mobile?: string; password?: string }>({});

  function syncDraft(
    nextPhone: string,
    nextCountry: { countryCode: string; dialCode: string },
    nextPassword: string,
  ) {
    updateFormDraft({
      type: "login-here",
      data: {
        phoneValue: nextPhone,
        countryCode: nextCountry.countryCode,
        dialCode: nextCountry.dialCode,
        password: nextPassword,
      },
    });
  }

  function handlePhoneChange(
    value: string,
    data: { countryCode: string; dialCode: string; name?: string; format?: string },
  ) {
    const nextCountry = { countryCode: data.countryCode, dialCode: data.dialCode };
    setCountryData(nextCountry);
    setPhoneValue(value);
    syncDraft(value, nextCountry, password);
    if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: undefined }));
    if (apiError) setApiError("");
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const nextPass = e.target.value;
    setPassword(nextPass);
    syncDraft(phoneValue, countryData, nextPass);
    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
    if (apiError) setApiError("");
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const newErrors: { mobile?: string; password?: string } = {};

    const cleanDigits = phoneValue.replace(/\D/g, "");
    if (!cleanDigits) {
      newErrors.mobile = "Mobile number is required.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setApiError("");
    setLoading(true);

    const fullPhone = phoneValue.startsWith("+") ? phoneValue : `+${phoneValue}`;
    const normalizedMobile = cleanDigits.length > 10 ? cleanDigits.slice(-10) : cleanDigits;

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
        document.cookie = `customer_access_token=${res.data.accessToken}; path=/; max-age=86400; SameSite=Lax`;
      }

      loginHere(fullPhone, password, res.data?.user);
      success("Logged in successfully.");
      router.replace("/digilocker");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid mobile number or password.";
      setApiError(message);
      showError(message);
    } finally {
      setLoading(false);
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
            disabled={loading}
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
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
            aria-invalid={Boolean(errors.password)}
            className="customer-input pr-12"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer p-1 text-gray-500 transition hover:text-gray-800 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="size-5 text-gray-500 hover:text-gray-700" />
            ) : (
              <Eye className="size-5 text-gray-500 hover:text-gray-700" />
            )}
          </button>
        </div>
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
          className="text-common-black cursor-pointer font-semibold underline"
          disabled={loading}
        >
          {" "}
          Register{" "}
        </button>{" "}
      </p>
    </form>
  );
}
