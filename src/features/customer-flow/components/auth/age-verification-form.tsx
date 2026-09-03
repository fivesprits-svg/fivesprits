"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function AgeVerificationForm() {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (confirmed) {
      router.push("/profile-setup");
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-6">
      <button
        type="button"
        onClick={() => setConfirmed(!confirmed)}
        className="border-common-border flex w-full items-start gap-4 rounded-2xl border p-5 text-left"
      >
        <div
          className={`customer-checkbox ${confirmed ? "customer-checkbox-checked" : ""}`}
          aria-checked={confirmed}
          role="checkbox"
        >
          {confirmed && (
            <Image src="/customer-flow/icons/success.svg" alt="" width={14} height={14} />
          )}
        </div>
        <span className="font-geist text-common-black text-[15px] leading-snug">
          I confirm that I am 25 years of age or older.
        </span>
      </button>
      <button
        type="submit"
        disabled={!confirmed}
        className={`customer-continue-button ${!confirmed ? "bg-gray-300" : ""}`}
      >
        Continue
      </button>
      <p className="text-common-gray text-center text-xs">
        By continuing, you agree to our <span className="underline">Terms of Service</span>
      </p>
    </form>
  );
}
