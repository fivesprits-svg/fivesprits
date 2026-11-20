"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import {
  getDigilockerKycStatus,
  getNextKycPollDelay,
  isKycVerifiedForDocuments,
  type DigilockerKycStatus,
} from "@/features/customer-flow/services/digilocker-api";

type ViewState =
  "unavailable" | "loading" | "error" | "verified" | "pending" | "failed" | "restart";

function calculateAge(dob: string): number {
  if (!dob) return 0;
  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function DigilockerStatusCard() {
  const { userDetails } = useCustomerFlow();
  const [status, setStatus] = useState<DigilockerKycStatus | null>(null);
  const [view, setView] = useState<ViewState>(() =>
    typeof window === "undefined" || sessionStorage.getItem("digilockerAttemptId")
      ? "loading"
      : "unavailable",
  );
  const polls = useRef(0);

  const refresh = useCallback(async () => {
    const attemptId = sessionStorage.getItem("digilockerAttemptId");
    if (!attemptId) return setView("unavailable");
    try {
      const next = await getDigilockerKycStatus(attemptId);
      console.log("Digilocker status::", next);
      setStatus(next);
      if (isKycVerifiedForDocuments(next, ["aadhaar"])) {
        // Clear the attempt ID from session storage
        sessionStorage.removeItem("digilockerAttemptId");

        // Check age from user details - 25+ goes to profile, otherwise age-verification
        const dob = userDetails?.dob || "";
        const age = calculateAge(dob);

        if (age >= 25) {
          window.location.href = "/profile-setup";
        } else {
          window.location.href = "/age-verification";
        }
        return;
      } else if (["FAILED"].includes(next.status)) setView("failed");
      else if (["EXPIRED", "CANCELLED"].includes(next.status)) setView("restart");
      else setView("pending");
    } catch {
      setView("error");
    }
  }, [userDetails]);
  console.log("status::", status);

  useEffect(() => {
    const timer = window.setTimeout(() => void refresh(), 0);
    return () => window.clearTimeout(timer);
  }, [refresh]);
  useEffect(() => {
    if (view !== "pending") return;
    const delay = getNextKycPollDelay(polls.current++);
    if (delay === null) return;
    const timer = window.setTimeout(() => void refresh(), delay);
    return () => window.clearTimeout(timer);
  }, [refresh, view, status]);

  const content: Record<ViewState, { title: string; text: string }> = {
    unavailable: {
      title: "Start DigiLocker verification",
      text: "No secure verification attempt is available in this session.",
    },
    loading: {
      title: "Checking verification status",
      text: "Please wait while we check your secure DigiLocker attempt.",
    },
    pending: {
      title:
        status?.status === "PROCESSING" ? "Verification is being processed" : "Waiting for consent",
      text: "Complete the steps in DigiLocker, then check this screen again.",
    },
    verified: {
      title: "Identity verified",
      text: "Your required DigiLocker documents have been verified.",
    },
    failed: {
      title: "Verification could not be completed",
      text: "Please try again or contact support.",
    },
    restart: {
      title: "Start a fresh verification",
      text: "This DigiLocker attempt is no longer active.",
    },
    error: { title: "KYC is temporarily unavailable", text: "Please try again later." },
  };
  const current = content[view];
  return (
    <section className="customer-desktop-card mx-auto max-w-lg text-center">
      <h1 className="font-unbounded text-common-black text-2xl font-black">{current.title}</h1>
      <p className="customer-section-description mt-4">{current.text}</p>
      {view === "loading" ? (
        <div className="border-common-border border-t-brand-primary mx-auto mt-8 size-8 animate-spin rounded-full border-4" />
      ) : (
        <div className="mt-8 flex justify-center gap-4">
          <button type="button" onClick={() => void refresh()} className="customer-form-nav-back">
            Check verification status
          </button>
          {["unavailable", "failed", "restart"].includes(view) && (
            <button
              type="button"
              onClick={() => router.push("/digilocker")}
              className="customer-form-nav-submit"
            >
              Start again
            </button>
          )}
        </div>
      )}
    </section>
  );
}
