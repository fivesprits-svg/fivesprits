"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getDigilockerKycStatus,
  getNextKycPollDelay,
  isKycVerifiedForDocuments,
  type DigilockerKycStatus,
} from "@/features/customer-flow/services/digilocker-api";

type ViewState =
  "unavailable" | "loading" | "error" | "verified" | "pending" | "failed" | "restart";

export function DigilockerStatusCard() {
  const router = useRouter();
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
      setStatus(next);
      if (isKycVerifiedForDocuments(next, ["aadhaar"])) {
        sessionStorage.removeItem("digilockerAttemptId");
        window.location.href = "/onboarding";
        return;
      } else if (["FAILED"].includes(next.status)) setView("failed");
      else if (["EXPIRED", "CANCELLED"].includes(next.status)) setView("restart");
      else setView("pending");
    } catch {
      setView("error");
    }
  }, []);

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
    error: {
      title: "KYC is temporarily unavailable",
      text: "Please try again later.",
    },
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
              onClick={() => router.push("/onboarding")}
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
