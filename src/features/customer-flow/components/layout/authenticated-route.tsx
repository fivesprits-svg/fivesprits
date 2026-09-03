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
      <main className="grid min-h-dvh place-items-center bg-white text-sm text-[#6b7280]">
        Verifying access…
      </main>
    );
  return children;
}
