"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatDisplayMobile } from "@/features/customer-flow/utils/validation";

export function ProfileSetupForm() {
  const router = useRouter();
  const { state, completeProfile } = useCustomerFlow();
  const [name, setName] = useState(state.session?.name ?? "");
  const [loading, setLoading] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    completeProfile();
    router.push("/categories");
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-5" noValidate>
      <div className="space-y-3">
        <label className="block">
          <span className="customer-input-label mb-1.5 block text-xs font-semibold">
            Customer Name
          </span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your full name"
            className="customer-input text-sm"
          />
        </label>

        <label className="block">
          <span className="customer-input-label mb-1.5 block text-xs font-semibold">
            Mobile Number
          </span>
          <div className="relative">
            <input
              defaultValue={formatDisplayMobile(state.session?.mobile)}
              readOnly
              className="customer-input cursor-not-allowed bg-gray-50/80 pr-10 text-sm font-medium text-gray-700"
            />
            <Image
              src="/customer-flow/icons/lock.svg"
              alt="Verified"
              width={16}
              height={16}
              className="absolute top-1/2 right-3.5 -translate-y-1/2 opacity-40"
            />
          </div>
        </label>
      </div>

      <div className="pt-3">
        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="customer-continue-button w-full"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </form>
  );
}
