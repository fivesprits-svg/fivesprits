"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

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
    <form onSubmit={submit} className="mt-8 space-y-[15px] md:mt-10 md:space-y-5" noValidate>
      <label className="block">
        <span className="customer-input-label mb-2.5 block md:text-sm">Customer Name</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
          className="customer-input"
        />
      </label>
      <label className="block">
        <span className="customer-input-label mb-2.5 block md:text-sm">Mobile Number</span>
        <input
          defaultValue={state.session?.mobile ?? ""}
          readOnly
          className="customer-input cursor-not-allowed bg-gray-50"
        />
      </label>
      <button
        type="submit"
        disabled={loading || !name.trim()}
        className="customer-continue-button mt-4 md:mt-6"
      >
        {loading ? "Saving..." : "Save & Continue"}
      </button>
    </form>
  );
}
