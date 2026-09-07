import { MobileBrandsSection } from "@/features/customer-flow/sections/mobile/mobile-brands-section";
import { DesktopBrandsSection } from "@/features/customer-flow/sections/desktop/desktop-brands-section";
import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { fetchCategoryByIdApi } from "@/features/customer-flow/services/categories-api";
import { fetchBrandsApi } from "@/features/customer-flow/services/brands-api";

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: Promise<{ categoryId?: string }>;
}) {
  const params = await searchParams;
  const categoryId = params.categoryId || "whisky";

  const [category, brands] = await Promise.all([
    fetchCategoryByIdApi(categoryId),
    fetchBrandsApi({ categoryId }),
  ]);

  return (
    <AuthenticatedRoute>
      <MobileBrandsSection category={category} brands={brands} />
      <DesktopBrandsSection category={category} brands={brands} />
    </AuthenticatedRoute>
  );
}
