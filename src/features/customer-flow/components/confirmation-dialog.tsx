"use client";
import Image from "next/image";
import { PrimaryButton } from "@/features/customer-flow/components/form-controls";
export function ConfirmationDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#1f130c]/65 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        className="w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-2xl"
      >
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#e8f4e7]">
          <Image src="/customer-flow/icons/success.svg" alt="" width={24} height={24} />
        </div>
        <h2 id="success-title" className="mt-5 text-xl font-extrabold text-[#2f1d12]">
          Requirement Sent
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#75614f]">
          Your product requirement has been submitted successfully.
        </p>
        <PrimaryButton onClick={onClose} className="mt-6 w-full">
          Continue Browsing
        </PrimaryButton>
      </div>
    </div>
  );
}
