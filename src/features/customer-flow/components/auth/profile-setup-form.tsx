"use client";
import { FlowNavButtons } from "@/features/customer-flow/components/auth/flow-nav-buttons";
import { OnboardingStep } from "@/features/customer-flow/components/onboarding/index";
import { updateProfileApi } from "@/features/customer-flow/services/profile-api";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatDisplayMobile } from "@/features/customer-flow/utils/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "../ui/toast";

interface ProfileSetupFormProps {
  onComplete?: (step: OnboardingStep) => void;
}

export function ProfileSetupForm({ onComplete }: ProfileSetupFormProps) {
  const router = useRouter();
  const { state, completeProfile } = useCustomerFlow();
  const { success, error: showError } = useToast();

  const userType = state.userDetails?.userType ?? "regular";
  const isRegularUser = userType === "regular";

  const [name, setName] = useState(state.userDetails?.name ?? "");
  const [permitNumber, setPermitNumber] = useState(state.userDetails?.permitNumber ?? "");
  const [address, setAddress] = useState(state.userDetails?.address ?? "");
  const [pincode, setPincode] = useState(state.userDetails?.pincode ?? "");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();

    // Regular users need permit number, address, and pincode
    if (isRegularUser && (!permitNumber.trim() || !address.trim() || !pincode.trim())) {
      showError("Please fill all required fields for regular customers.");
      return;
    }

    if (!name.trim()) return;
    setLoading(true);

    try {
      // Update profile with user-type-specific fields
      const payload = {
        name: name.trim(),
        ...(isRegularUser && {
          permitNumber: permitNumber.trim(),
          address: address.trim(),
          pincode: pincode.trim(),
        }),
      };

      await updateProfileApi(payload);
      completeProfile();

      success("Registration completed successfully! Welcome to The Five Spirits.");

      // Trigger callback for onboarding flow
      if (onComplete) {
        onComplete("profile");
      } else {
        // Fallback to old navigation
        router.push("/categories");
      }
    } catch (error) {
      showError(error instanceof Error ? error.message : "Failed to update profile.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-5" noValidate>
      <div className="space-y-3">
        <label className="block">
          <span className="customer-input-label mb-1.5 block text-xs font-semibold">
            Customer Name <span className="text-red-500">*</span>
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
              disabled
            />
          </div>
        </label>
      </div>

      {isRegularUser && (
        <div className="space-y-3 pt-3">
          <label className="block">
            <span className="customer-input-label mb-1.5 block text-xs font-semibold">
              Permit Number <span className="text-red-500">*</span>
            </span>
            <input
              value={permitNumber}
              onChange={(event) => setPermitNumber(event.target.value)}
              placeholder="Enter your permit number"
              className="customer-input text-sm"
            />
          </label>

          <label className="block">
            <span className="customer-input-label mb-1.5 block text-xs font-semibold">
              Address <span className="text-red-500">*</span>
            </span>
            <textarea
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Enter your full address"
              rows={3}
              className="customer-input resize-none text-sm"
            />
          </label>

          <label className="block">
            <span className="customer-input-label mb-1.5 block text-xs font-semibold">
              Pincode <span className="text-red-500">*</span>
            </span>
            <input
              value={pincode}
              onChange={(event) => setPincode(event.target.value)}
              placeholder="Enter your pincode"
              maxLength={6}
              className="customer-input text-sm"
            />
          </label>
        </div>
      )}

      <div className="pt-3">
        <FlowNavButtons
          backHref="/onboarding"
          submitLabel="Save & Continue"
          loading={loading}
          loadingLabel="Saving..."
          disabled={
            !name.trim() ||
            (isRegularUser && (!permitNumber.trim() || !address.trim() || !pincode.trim()))
          }
        />
      </div>
    </form>
  );
}
