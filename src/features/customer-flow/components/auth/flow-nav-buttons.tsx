"use client";
import { useRouter } from "next/navigation";

type FlowNavButtonsProps = {
  backHref?: string;
  submitLabel: string;
  onSubmit?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
};

export function FlowNavButtons({
  backHref,
  submitLabel,
  onSubmit,
  disabled = false,
  loading = false,
  loadingLabel,
}: FlowNavButtonsProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <div className="customer-form-nav">
      <button type="button" onClick={handleBack} className="customer-form-nav-back">
        Back
      </button>
      <button
        type="submit"
        disabled={disabled || loading}
        onClick={onSubmit}
        className="customer-form-nav-submit"
      >
        {loading && loadingLabel ? loadingLabel : submitLabel}
      </button>
    </div>
  );
}
