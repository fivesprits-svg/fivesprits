"use client";
import { useRouter } from "next/navigation";
import { ButtonSpinner } from "@/features/customer-flow/components/ui/skeleton";

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
      <button
        type="button"
        onClick={handleBack}
        className="customer-form-nav-back"
        disabled={loading}
      >
        Back
      </button>
      <button
        type="submit"
        disabled={disabled || loading}
        onClick={onSubmit}
        className="customer-form-nav-submit"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <ButtonSpinner />
            {loadingLabel || submitLabel}
          </span>
        ) : (
          submitLabel
        )}
      </button>
    </div>
  );
}
