"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { AuthPageSkeleton } from "@/features/customer-flow/components/ui/skeleton";
export function GuestRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { state, hydrated } = useCustomerFlow();
  const isLoggedIn = state.session?.verified || state.session?.profileComplete;
  useEffect(() => {
    if (hydrated && isLoggedIn) router.replace("/categories");
  }, [hydrated, isLoggedIn, router]);
  if (!hydrated || isLoggedIn) return <AuthPageSkeleton />;
  return children;
}
