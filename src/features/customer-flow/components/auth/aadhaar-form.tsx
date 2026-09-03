"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { validateAadhaar, formatAadhaar } from "@/features/customer-flow/utils/validation";

export function AadhaarForm() {
  const router = useRouter();
  const { verifyAadhaar } = useCustomerFlow();
  const [aadhaar, setAadhaar] = useState("");
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

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <label className="block">
        <span className="customer-input-label mb-2.5 block">Aadhaar Card</span>
        <input
          value={aadhaar}
          onChange={(event) => {
            setAadhaar(formatAadhaar(event.target.value));
            setErrors({});
          }}
          placeholder="Enter aadhaar card number"
          inputMode="numeric"
          aria-invalid={Boolean(errors.aadhaar)}
          className="customer-input"
        />
        {errors.aadhaar && (
          <span role="alert" className="text-common-error mt-1.5 block text-xs font-medium">
            {errors.aadhaar}
          </span>
        )}
      </label>
      <button type="submit" disabled={loading} className="customer-continue-button mt-4">
        {loading ? "Processing..." : "Proceed"}
      </button>
    </form>
  );
}
