"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { AuthPageSkeleton } from "@/features/customer-flow/components/ui/skeleton";
import {
  isSessionLoggedIn,
  isDigilockerCompleted,
  isProfileCompleted,
  canGuestViewPath,
} from "@/features/customer-flow/utils/auth-guards";

export function AuthenticatedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { state, hydrated } = useCustomerFlow();

  const loggedIn = isSessionLoggedIn(state.userDetails);
  const digilockerDone = isDigilockerCompleted(state.userDetails);
  const profileDone = isProfileCompleted(state.userDetails);

  const isAllowed = loggedIn && digilockerDone && profileDone;
  const isGuest = Boolean(state.userDetails?.isGuest);
  const canGuestViewPage = canGuestViewPath(pathname);

  useEffect(() => {
    if (!hydrated) return;

    if (!loggedIn) {
      router.replace("/");
      return;
    }

    if (isGuest && !canGuestViewPage) {
      router.replace("/categories");
      return;
    }

    if (!digilockerDone) {
      router.replace("/digilocker");
      return;
    }

    if (!profileDone) {
      if (state.userDetails?.ageVerified) {
        router.replace("/profile-setup");
      } else {
        router.replace("/age-verification");
      }
      return;
    }
  }, [
    hydrated,
    loggedIn,
    digilockerDone,
    profileDone,
    isGuest,
    canGuestViewPage,
    state.userDetails?.ageVerified,
    router,
  ]);

  if (!hydrated || !isAllowed || (isGuest && !canGuestViewPage)) return <AuthPageSkeleton />;
  return <>{children}</>;
}
