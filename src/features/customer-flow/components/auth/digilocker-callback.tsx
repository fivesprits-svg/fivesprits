"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { completeDigilockerKyc } from "@/features/customer-flow/services/digilocker-api";

const INVALID_CALLBACK_MESSAGE =
  "This KYC return link is invalid. Please start verification again.";
const COMPLETION_ERROR_MESSAGE = "We could not complete verification. Please try again.";

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

export function DigilockerCallback() {
  const router = useRouter();
  const { setUserDetails } = useCustomerFlow();
  const [message, setMessage] = useState("Verifying your DigiLocker documents…");

  useEffect(() => {
    const callbackToken = new URLSearchParams(window.location.search).get("callbackToken");

    if (!callbackToken) {
      queueMicrotask(() => setMessage(INVALID_CALLBACK_MESSAGE));
      return;
    }

    void completeDigilockerKyc(callbackToken)
      .then(({ attemptId, user }) => {
        sessionStorage.setItem("digilockerAttemptId", attemptId);

        // Update Redux state with user details from DigiLocker
        if (user) {
          const age = calculateAge(user.dob || "");
          const isAgeVerified = age >= 25;

          setUserDetails({
            ...user,
            ageVerified: isAgeVerified,
            verificationComplete: true,
            digilockerStatus: user.digilockerStatus || "VERIFIED",
          });

          // Redirect to onboarding which will check and move to next step
          router.replace("/onboarding");
          return;
        }

        router.replace("/onboarding");
      })
      .catch(() => {
        setMessage(COMPLETION_ERROR_MESSAGE);
      });
  }, [router, setUserDetails]);

  return (
    <main id="main-content" className="px-6 py-12">
      <p className="customer-section-description mx-auto max-w-lg text-center">{message}</p>
    </main>
  );
}
