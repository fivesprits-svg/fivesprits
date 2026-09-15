"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { AuthPageSkeleton } from "@/features/customer-flow/components/ui/skeleton";
import {
  isSessionLoggedIn,
  isDigilockerCompleted,
  isProfileCompleted,
} from "@/features/customer-flow/utils/auth-guards";

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { state, hydrated } = useCustomerFlow();

  const loggedIn = isSessionLoggedIn(state.userDetails);
  const digilockerDone = isDigilockerCompleted(state.userDetails);
  const profileDone = isProfileCompleted(state.userDetails);

  useEffect(() => {
    if (!hydrated) return;

    if (loggedIn) {
      if (!digilockerDone) {
        router.replace("/digilocker");
      } else if (!profileDone) {
        if (state.userDetails?.ageVerified) {
          router.replace("/profile-setup");
        } else {
          router.replace("/age-verification");
        }
      } else {
        router.replace("/categories");
      }
    }
  }, [hydrated, loggedIn, digilockerDone, profileDone, state.userDetails?.ageVerified, router]);

  if (!hydrated || loggedIn) return <AuthPageSkeleton />;
  return <>{children}</>;
}
