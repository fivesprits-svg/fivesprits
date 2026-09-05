"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { validateLogin } from "@/features/customer-flow/utils/login-validation";

export function LoginForm() {
  const router = useRouter();
  const { login } = useCustomerFlow();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState<ReturnType<typeof validateLogin>>({});
  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next = validateLogin(name, mobile);
    setErrors(next);
    if (!next.name && !next.mobile) {
      login(name.trim(), mobile);
      router.push("/otp");
    }
  }
  return (
    <form onSubmit={submit} className="mt-8 space-y-[15px] md:mt-10 md:space-y-5" noValidate>
      <label className="block">
        <span className="customer-input-label mb-2.5 block md:text-sm">User Name</span>
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            if (event.target.value.trim() && errors.name) {
              setErrors((prev) => ({ ...prev, name: undefined }));
            }
          }}
          placeholder="Enter full name"
          aria-invalid={Boolean(errors.name)}
          className="customer-input"
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
            if (/^\d{10}$/.test(next) && errors.mobile) {
              setErrors((prev) => ({ ...prev, mobile: undefined }));
            }
          }}
          inputMode="numeric"
          placeholder="Enter mobile number"
          aria-invalid={Boolean(errors.mobile)}
          className="customer-input"
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
      <button type="submit" className="customer-continue-button mt-4 md:mt-6">
        Continue
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
        >
          {" "}
          Login here{" "}
        </button>{" "}
      </p>
    </form>
  );
}
