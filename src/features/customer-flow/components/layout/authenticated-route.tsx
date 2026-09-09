"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { AuthPageSkeleton } from "@/features/customer-flow/components/ui/skeleton";
export function AuthenticatedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { state, hydrated } = useCustomerFlow();
  const isAllowed = state.session?.verified || state.session?.profileComplete;
  useEffect(() => {
    if (hydrated && !isAllowed) router.replace("/");
  }, [hydrated, isAllowed, router]);
  if (!hydrated || !isAllowed) return <AuthPageSkeleton />;
  return children;
}
