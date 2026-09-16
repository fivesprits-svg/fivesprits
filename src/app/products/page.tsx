"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MobileProductsSection } from "@/features/customer-flow/sections/mobile/mobile-products-section";
import { DesktopProductsSection } from "@/features/customer-flow/sections/desktop/desktop-products-section";
import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { fetchCategoryByIdApi } from "@/features/customer-flow/services/categories-api";
import { fetchBrandByIdApi } from "@/features/customer-flow/services/brands-api";
import { fetchProductsApi } from "@/features/customer-flow/services/products-api";
import type { Brand, Category, Product } from "@/features/customer-flow/types";

function ProductsContent() {
  const searchParams = useSearchParams();
  const brandId = searchParams.get("brandId") || undefined;
  const categoryId = searchParams.get("categoryId") || undefined;

  const [category, setCategory] = useState<Category | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let active = true;
    Promise.all([
      categoryId ? fetchCategoryByIdApi(categoryId) : Promise.resolve(null),
      brandId ? fetchBrandByIdApi(brandId) : Promise.resolve(null),
      fetchProductsApi({
        ...(brandId ? { brandId } : {}),
        ...(categoryId ? { categoryId } : {}),
      }),
    ]).then(([catData, brandData, prodData]) => {
      if (active) {
        setCategory(catData);
        setBrand(brandData);
        setProducts(prodData);
      }
    });
    return () => {
      active = false;
    };
  }, [brandId, categoryId]);

  return (
    <>
      <MobileProductsSection brand={brand} products={products} />
      <DesktopProductsSection category={category} brand={brand} products={products} />
    </>
  );
}

export default function ProductsPage() {
  return (
    <AuthenticatedRoute>
      <Suspense fallback={null}>
        <ProductsContent />
      </Suspense>
    </AuthenticatedRoute>
  );
}
