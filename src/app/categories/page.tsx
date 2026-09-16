import { DesktopCategoriesSection } from "@/features/customer-flow/sections/desktop/desktop-categories-section";
import { MobileCategoriesSection } from "@/features/customer-flow/sections/mobile/mobile-categories-section";
import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { fetchCategoriesApi } from "@/features/customer-flow/services/categories-api";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categoriesList = await fetchCategoriesApi();

  return (
    <AuthenticatedRoute>
      <main id="main-content">
        <MobileCategoriesSection categoriesList={categoriesList} />
        <DesktopCategoriesSection categoriesList={categoriesList} />
      </main>
    </AuthenticatedRoute>
  );
}
