"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function LoginFormHere() {
  const router = useRouter();
  const { loginHere } = useCustomerFlow();
  const [phoneValue, setPhoneValue] = useState("");
  const [countryData, setCountryData] = useState<{
    countryCode: string;
    dialCode: string;
  }>({ countryCode: "in", dialCode: "91" });
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ mobile?: string; password?: string }>({});

  function handlePhoneChange(
    value: string,
    data: { countryCode: string; dialCode: string; name?: string; format?: string },
  ) {
    setPhoneValue(value);
    setCountryData({ countryCode: data.countryCode, dialCode: data.dialCode });
    if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: undefined }));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next: { mobile?: string; password?: string } = {};
    const fullPhone = `+${countryData.dialCode}${phoneValue}`;
    if (!phoneValue.trim()) next.mobile = "Please enter your mobile number";
    else if (phoneValue.replace(/\D/g, "").length < 7) next.mobile = "Enter a valid phone number";
    if (!password.trim()) next.password = "Please enter your password";
    setErrors(next);
    if (!next.mobile && !next.password) {
      loginHere(fullPhone, password);
      router.push("/digilocker");
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
      <button type="submit" className="customer-continue-button mt-4 md:mt-6">
        Continue
      </button>
    </form>
  );
}
