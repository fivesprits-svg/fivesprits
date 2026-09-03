"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
export function AuthenticatedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { state, hydrated } = useCustomerFlow();
  useEffect(() => {
    if (hydrated && !state.session?.verified) router.replace("/");
  }, [hydrated, router, state.session?.verified]);
  if (!hydrated || !state.session?.verified)
    return (
      <main className="text-common-gray grid min-h-dvh place-items-center bg-white text-sm">
        Verifying access…
      </main>
    );
  return children;
}
