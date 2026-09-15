"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatDisplayMobile } from "@/features/customer-flow/utils/validation";
import { FlowNavButtons } from "@/features/customer-flow/components/auth/flow-nav-buttons";

export function ProfileSetupForm() {
  const router = useRouter();
  const { state, completeProfile } = useCustomerFlow();
  const [name, setName] = useState(state.userDetails?.name ?? "");
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
              defaultValue={formatDisplayMobile(state.userDetails?.mobile)}
              className="customer-input text-sm"
            />
          </div>
        </label>
      </div>

      <div className="pt-3">
        <FlowNavButtons
          backHref="/age-verification"
          submitLabel="Save & Continue"
          loading={loading}
          loadingLabel="Saving..."
          disabled={!name.trim()}
        />
      </div>
    </form>
  );
}
