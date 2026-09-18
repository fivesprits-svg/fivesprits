"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { validateAadhaar, formatAadhaar } from "@/features/customer-flow/utils/validation";
import { FlowNavButtons } from "@/features/customer-flow/components/auth/flow-nav-buttons";

export function AadhaarForm() {
  const router = useRouter();
  const { state, verifyAadhaar, updateFormDraft, logout } = useCustomerFlow();
  const draft = state.userDetails?.formDrafts?.aadhaar;
  const [aadhaar, setAadhaar] = useState(draft ?? "");
  const [errors, setErrors] = useState<ReturnType<typeof validateAadhaar>>({});
  const [loading, setLoading] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next = validateAadhaar(aadhaar);
    setErrors(next);
    if (!next.aadhaar) {
      setLoading(true);
      verifyAadhaar(aadhaar.replace(/\s/g, ""));
      router.push("/digilocker/otp");
    }
  }

  const handleLogout = () => {
    logout();
    router.replace(state.userDetails?.cameFromLoginHere ? "/login-here" : "/");
  };

  return (
    <form onSubmit={submit} className="space-y-4 md:space-y-5" noValidate>
      <label className="block">
        <span className="customer-input-label mb-2.5 block md:text-sm">
          Aadhaar Card <span className="text-red-500">*</span>
        </span>
        <input
          value={aadhaar}
          onChange={(event) => {
            const next = formatAadhaar(event.target.value);
            setAadhaar(next);
            updateFormDraft({ type: "aadhaar", data: { aadhaar: next } });
            setErrors({});
          }}
          placeholder="Enter aadhaar card number"
          inputMode="numeric"
          aria-invalid={Boolean(errors.aadhaar)}
          className="customer-input"
        />
        {errors.aadhaar && (
          <span
            role="alert"
            className="text-common-error mt-1.5 block text-xs font-medium md:text-sm"
          >
            {errors.aadhaar}
          </span>
        )}
      </label>
      <FlowNavButtons
        hideBack
        submitLabel="Proceed"
        loading={loading}
        loadingLabel="Processing..."
      />
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={handleLogout}
          className="font-geist text-common-gray hover:text-common-black text-xs transition-colors md:text-sm"
        >
          Want to use a different number? <span className="font-semibold underline">Log out</span>
        </button>
      </div>
    </form>
  );
}
