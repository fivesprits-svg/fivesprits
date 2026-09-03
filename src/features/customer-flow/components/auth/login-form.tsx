"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { validateLogin } from "@/features/customer-flow/utils/validation";

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
        <span className="mb-2.5 block text-xs text-[#7e7e86]">User Name</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter full name"
          className="h-12 w-full rounded-2xl border border-[#e5e7eb] px-4 text-sm outline-none focus:border-black"
        />
        {errors.name && (
          <span role="alert" className="mt-1 block text-xs text-red-600">
            {errors.name}
          </span>
        )}
      </label>
      <label className="block">
        <span className="mb-2.5 block text-xs text-[#7e7e86]">Mobile Number</span>
        <input
          value={mobile}
          onChange={(event) => setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))}
          inputMode="numeric"
          placeholder="Enter mobile number"
          className="h-12 w-full rounded-2xl border border-[#e5e7eb] px-4 text-sm outline-none focus:border-black"
        />
        {errors.mobile && (
          <span role="alert" className="mt-1 block text-xs text-red-600">
            {errors.mobile}
          </span>
        )}
      </label>
      <button className="mt-4 h-[61px] w-full rounded-full bg-black text-base font-semibold text-white">
        Continue
      </button>
      <p className="text-center text-[11px] text-[#6b7280]">
        We&apos;ll send you a one-time verification code to Admin.
      </p>
    </form>
  );
}
