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
  const brandId = params.brandId;
  const categoryId = params.categoryId;

  const [category, brand, products] = await Promise.all([
    categoryId ? fetchCategoryByIdApi(categoryId) : Promise.resolve(null),
    brandId ? fetchBrandByIdApi(brandId) : Promise.resolve(null),
    fetchProductsApi({
      ...(brandId ? { brandId } : {}),
      ...(categoryId ? { categoryId } : {}),
    }),
  ]);

  return (
    <AuthenticatedRoute>
      <MobileProductsSection brand={brand} products={products} />
      <DesktopProductsSection category={category} brand={brand} products={products} />
    </AuthenticatedRoute>
  );
}
