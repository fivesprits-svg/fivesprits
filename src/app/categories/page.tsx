import { DesktopCategoriesSection } from "@/features/customer-flow/sections/desktop/desktop-categories-section";
import { MobileCategoriesSection } from "@/features/customer-flow/sections/mobile/mobile-categories-section";
import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
export default function CategoriesPage() {
  return (
    <AuthenticatedRoute>
      <main id="main-content">
        <MobileCategoriesSection />
        <DesktopCategoriesSection />
      </main>
    </AuthenticatedRoute>
  );
}
