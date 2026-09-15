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
  hideBack?: boolean;
  onBack?: () => void;
};

export function FlowNavButtons({
  backHref,
  submitLabel,
  onSubmit,
  disabled = false,
  loading = false,
  loadingLabel,
  hideBack = false,
  onBack,
}: FlowNavButtonsProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <div className={`customer-form-nav ${hideBack ? "!flex-col" : ""}`}>
      {!hideBack && (
        <button
          type="button"
          onClick={handleBack}
          className="customer-form-nav-back"
          disabled={loading}
        >
          Back
        </button>
      )}
      <button
        type="submit"
        disabled={disabled || loading}
        onClick={onSubmit}
        className={`customer-form-nav-submit ${hideBack ? "!w-full" : ""}`}
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
