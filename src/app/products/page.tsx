import { MobileProductsSection } from "@/features/customer-flow/sections/mobile/mobile-products-section";
import { DesktopProductsSection } from "@/features/customer-flow/sections/desktop/desktop-products-section";
import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
export default function ProductsPage() {
  return (
    <AuthenticatedRoute>
      <MobileProductsSection />
      <DesktopProductsSection />
    </AuthenticatedRoute>
  );
}
