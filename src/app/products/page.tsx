import { MobileProductsSection } from "@/features/customer-flow/sections/mobile/mobile-products-section";
import { DesktopProductsSection } from "@/features/customer-flow/sections/desktop/desktop-products-section";
import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { fetchCategoryByIdApi } from "@/features/customer-flow/services/categories-api";
import { fetchBrandByIdApi } from "@/features/customer-flow/services/brands-api";
import { fetchProductsApi } from "@/features/customer-flow/services/products-api";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ brandId?: string; categoryId?: string }>;
}) {
  const params = await searchParams;
  const brandId = params.brandId || "amber-reserve";
  const categoryId = params.categoryId || "whisky";

  const [category, brand, products] = await Promise.all([
    fetchCategoryByIdApi(categoryId),
    fetchBrandByIdApi(brandId),
    fetchProductsApi({ brandId, categoryId }),
  ]);

  return (
    <AuthenticatedRoute>
      <MobileProductsSection brand={brand} products={products} />
      <DesktopProductsSection category={category} brand={brand} products={products} />
    </AuthenticatedRoute>
  );
}
