"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { useToast } from "@/features/customer-flow/components/ui/toast";
import { customerLoginApi } from "@/features/customer-flow/services/auth-api";

type CountryData = {
  countryCode: string;
  dialCode: string;
};

type FormErrors = {
  mobile?: string;
  password?: string;
};

export function LoginFormHere() {
  const router = useRouter();
  const { state, loginHere, updateFormDraft } = useCustomerFlow();
  const { success, error: showError } = useToast();

  const draft = state.userDetails?.formDrafts?.loginHere;

  const [phoneValue, setPhoneValue] = useState(draft?.phoneValue ?? "");
  const [countryData, setCountryData] = useState<CountryData>({
    countryCode: draft?.countryCode ?? "in",
    dialCode: draft?.dialCode ?? "91",
  });
  const [password, setPassword] = useState(draft?.password ?? "");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  function syncDraft(phone: string, country: CountryData, nextPassword: string) {
    updateFormDraft({
      type: "login-here",
      data: {
        phoneValue: phone,
        countryCode: country.countryCode,
        dialCode: country.dialCode,
        password: nextPassword,
      },
    });
  }

  function handlePhoneChange(
    value: string,
    data: {
      countryCode: string;
      dialCode: string;
      name?: string;
      format?: string;
    },
  ) {
    const nextCountry: CountryData = {
      countryCode: data.countryCode.toLowerCase(),
      dialCode: data.dialCode,
    };

    setPhoneValue(value);
    setCountryData(nextCountry);

    syncDraft(value, nextCountry, password);

    if (nextCountry.countryCode !== "in") {
      setErrors((prev) => ({
        ...prev,
        mobile: "Only Indian phone numbers are accepted.",
      }));
      return;
    }

    setErrors((prev) => ({
      ...prev,
      mobile: undefined,
    }));
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextPassword = event.target.value;

    setPassword(nextPassword);

    syncDraft(phoneValue, countryData, nextPassword);

    setErrors((prev) => ({
      ...prev,
      password: undefined,
    }));
  }

  function validateForm(): FormErrors {
    const newErrors: FormErrors = {};
    const cleanDigits = phoneValue.replace(/\D/g, "");
    const nationalNumber = cleanDigits.startsWith(countryData.dialCode)
      ? cleanDigits.slice(countryData.dialCode.length)
      : cleanDigits;

    if (!nationalNumber) {
      newErrors.mobile = "Mobile number is required.";
    } else if (countryData.countryCode.toLowerCase() !== "in") {
      newErrors.mobile = "Only Indian phone numbers are accepted.";
    } else if (!/^\d{10}$/.test(nationalNumber)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    return newErrors;
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = validateForm();

    // Stop here. API will NOT be called.
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const cleanDigits = phoneValue.replace(/\D/g, "");

    const fullPhone = phoneValue.startsWith("+") ? phoneValue : `+${phoneValue}`;

    const normalizedMobile = cleanDigits.length > 10 ? cleanDigits.slice(-10) : cleanDigits;

    try {
      let response;

      try {
        response = await customerLoginApi({
          mobileNumber: normalizedMobile,
          password,
        });
      } catch {
        response = await customerLoginApi({
          mobileNumber: cleanDigits,
          password,
        });
      }

      const accessToken = response.data?.accessToken;
      const user = response.data?.user;

      if (typeof window !== "undefined" && accessToken) {
        localStorage.setItem("customer_access_token", accessToken);

        localStorage.setItem("customer_user", JSON.stringify(user));

        document.cookie = [
          `customer_access_token=${accessToken}`,
          "path=/",
          "max-age=86400",
          "SameSite=Lax",
        ].join("; ");
      }

      loginHere(fullPhone, password, user, accessToken);

      success("Logged in successfully.");
      router.replace("/digilocker");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Invalid mobile number or password.";

      showError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} noValidate className="mt-8 space-y-[15px] md:mt-10 md:space-y-5">
      <label className="block">
        <span className="customer-input-label mb-2.5 block md:text-sm">
          Mobile Number <span className="text-red-500">*</span>
        </span>

        <div className="phone-input-wrapper">
          <PhoneInput
            country="in"
            value={phoneValue}
            onChange={handlePhoneChange}
            placeholder="Enter mobile number"
            enableSearch
            searchPlaceholder="Search countries"
            disabled={loading}
            containerStyle={{
              width: "100%",
            }}
            inputStyle={{
              width: "100%",
              height: "56px",
              fontSize: "15px",
              fontFamily: "var(--font-family-geist)",
              borderRadius: "16px",
              border: `1px solid ${
                errors.mobile ? "var(--color-common-error)" : "var(--color-common-border)"
              }`,
              paddingLeft: "48px",
            }}
            buttonStyle={{
              border: "none",
              borderRight: `1px solid ${
                errors.mobile ? "var(--color-common-error)" : "var(--color-common-border)"
              }`,
              borderRadius: "16px 0 0 16px",
              backgroundColor: "transparent",
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
        <span className="customer-input-label mb-2.5 block md:text-sm">
          Password <span className="text-red-500">*</span>
        </span>

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
            disabled={loading}
            className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer p-1 text-gray-500 transition hover:text-gray-800 focus:outline-none disabled:cursor-not-allowed"
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
          Register
        </button>
      </p>
    </form>
  );
}
