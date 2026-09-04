"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
export function AuthenticatedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { state, hydrated } = useCustomerFlow();
  const isAllowed = state.session?.verified || state.session?.profileComplete;
  useEffect(() => {
    if (hydrated && !isAllowed) router.replace("/");
  }, [hydrated, isAllowed, router]);
  if (!hydrated || !isAllowed)
    return (
      <main className="text-common-gray grid min-h-dvh place-items-center bg-white text-sm">
        Verifying access…
      </main>
    );
  return children;
}
