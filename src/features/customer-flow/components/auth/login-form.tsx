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
    <form onSubmit={submit} className="mt-8 space-y-[15px]" noValidate>
      <label className="block">
        <span className="customer-input-label mb-2.5 block">User Name</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter full name"
          aria-invalid={Boolean(errors.name)}
          className="customer-input"
        />
        {errors.name && (
          <span role="alert" className="text-common-error mt-1.5 block text-xs font-medium">
            {errors.name}
          </span>
        )}
      </label>
      <label className="block">
        <span className="customer-input-label mb-2.5 block">Mobile Number</span>
        <input
          value={mobile}
          onChange={(event) => setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))}
          inputMode="numeric"
          placeholder="Enter mobile number"
          aria-invalid={Boolean(errors.mobile)}
          className="customer-input"
        />
        {errors.mobile && (
          <span role="alert" className="text-common-error mt-1.5 block text-xs font-medium">
            {errors.mobile}
          </span>
        )}
      </label>
      <button type="submit" className="customer-continue-button mt-4">
        Continue
      </button>
      <p className="font-geist text-common-gray text-center text-[11px]">
        We&apos;ll send you a one-time verification code to Admin.
      </p>
    </form>
  );
}
