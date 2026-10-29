import { GuestAccountOptions } from "@/features/customer-flow/components/auth/guest-account-options";
import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";

export default function GuestAccountPage() {
  return (
    <AuthenticatedRoute>
      <GuestAccountOptions />
    </AuthenticatedRoute>
  );
}
