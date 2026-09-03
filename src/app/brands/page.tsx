import { MobileBrandsSection } from "@/features/customer-flow/sections/mobile/mobile-brands-section";
import { DesktopBrandsSection } from "@/features/customer-flow/sections/desktop/desktop-brands-section";
import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
export default function BrandsPage() {
  return (
    <AuthenticatedRoute>
      <MobileBrandsSection />
      <DesktopBrandsSection />
    </AuthenticatedRoute>
  );
}
