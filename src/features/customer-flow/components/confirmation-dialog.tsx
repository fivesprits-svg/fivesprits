"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ButtonSpinner } from "@/features/customer-flow/components/ui/skeleton";

type ConfirmStep = "confirm";
type SuccessStep = "success";
type Step = ConfirmStep | SuccessStep;

interface ConfirmationDialogProps {
  open: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
  onLogout: () => void;
  loading?: boolean;
}

export function ConfirmationDialog({
  open,
  onConfirm,
  onDismiss,
  onLogout,
  loading = false,
}: ConfirmationDialogProps) {
  const [step, setStep] = useState<Step>("confirm");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setStep("confirm");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-[2px]">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-[340px] rounded-[24px] bg-white p-7 text-center shadow-[0_8px_32px_rgba(0,0,0,0.18)] sm:max-w-sm"
      >
        {step === "confirm" ? (
          <ConfirmStepContent
            onConfirm={() => {
              setStep("success");
              onConfirm();
            }}
            loading={loading}
            onDismiss={onDismiss}
          />
        ) : (
          <SuccessStepContent onDismiss={onDismiss} onLogout={onLogout} />
        )}
      </div>
    </div>
  );
}

function ConfirmStepContent({
  onConfirm,
  loading,
  onDismiss,
}: {
  onConfirm: () => void;
  loading: boolean;
  onDismiss: () => void;
}) {
  return (
    <>
      <div className="mx-auto grid size-[72px] place-items-center rounded-full bg-[#F7F2EC]">
        <Image src="/customer-flow/icons/Doc.svg" alt="" width={32} height={32} />
      </div>
      <h2 className="mt-5 text-[22px] font-bold text-[#1a1a1a]">Send Requirement?</h2>
      <p className="mt-3 text-sm leading-relaxed text-[#6b6b6b]">
        Are you sure you want to submit this requirement to the administrator?
      </p>
      <div className="mt-7 space-y-3">
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className="font-outfit flex h-12 w-full items-center justify-center rounded-2xl bg-[#1a1a1a] text-sm font-bold tracking-wide text-white transition hover:bg-black/80 active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <ButtonSpinner />
              Sending...
            </span>
          ) : (
            "Send Requirement"
          )}
        </button>
        <button
          type="button"
          onClick={onDismiss}
          disabled={loading}
          className="font-outfit flex h-12 w-full items-center justify-center rounded-2xl bg-[#f5f0eb] text-sm font-bold tracking-wide text-[#1a1a1a] transition hover:bg-[#ece5db] active:scale-[0.98] disabled:opacity-60"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

function SuccessStepContent({
  onDismiss,
  onLogout,
}: {
  onDismiss: () => void;
  onLogout: () => void;
}) {
  return (
    <>
      <div className="mx-auto grid size-[72px] place-items-center rounded-full bg-[#F7F2EC]">
        <Image src="/customer-flow/icons/check-circle.svg" alt="" width={32} height={32} />
      </div>
      <h2 className="mt-5 text-[22px] font-bold text-[#1a1a1a]">Sent Successfully</h2>
      <p className="font-poppins mt-3 text-[13px] leading-[20px] font-medium text-[#858585]">
        Your requirement has been submitted to the administrator.
      </p>
      <div className="mt-7 space-y-3">
        <button
          type="button"
          onClick={onDismiss}
          className="font-outfit flex h-12 w-full items-center justify-center rounded-2xl bg-[#1a1a1a] text-sm font-bold tracking-wide text-white transition hover:bg-black/80 active:scale-[0.98]"
        >
          OK
        </button>
        <button
          type="button"
          onClick={onLogout}
          className="font-outfit flex h-12 w-full items-center justify-center rounded-2xl bg-[#f5f0eb] text-sm font-bold tracking-wide text-[#1a1a1a] transition hover:bg-[#ece5db] active:scale-[0.98]"
        >
          Logout
        </button>
      </div>
    </>
  );
}
