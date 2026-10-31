"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MobileBrandsSection } from "@/features/customer-flow/sections/mobile/mobile-brands-section";
import { DesktopBrandsSection } from "@/features/customer-flow/sections/desktop/desktop-brands-section";
import { AuthenticatedRoute } from "@/features/customer-flow/components/layout/authenticated-route";
import { fetchCategoryByIdApi } from "@/features/customer-flow/services/categories-api";
import { fetchBrandsApi } from "@/features/customer-flow/services/brands-api";
import { canRenderCatalogueResults } from "@/features/customer-flow/helpers/catalogue-request";
import type { Brand, Category } from "@/features/customer-flow/types";

function BrandsContent() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId") || undefined;

  const [category, setCategory] = useState<Category | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCategoryId, setLoadedCategoryId] = useState<string | null>(null);
  const activeCategoryId = categoryId ?? "";
  const canRenderResults = canRenderCatalogueResults(loadedCategoryId, activeCategoryId, isLoading);

  useEffect(() => {
    let active = true;
    Promise.all([
      categoryId ? fetchCategoryByIdApi(categoryId) : Promise.resolve(null),
      fetchBrandsApi(categoryId ? { categoryId } : undefined),
    ])
      .then(([catData, brandData]) => {
        if (active) {
          setCategory(catData);
          setBrands(brandData);
          setLoadedCategoryId(activeCategoryId);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("fetchBrands error:", err);
        if (active) {
          setCategory(null);
          setBrands([]);
          setLoadedCategoryId(activeCategoryId);
          setIsLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [categoryId, activeCategoryId]);

  return (
    <>
      <MobileBrandsSection category={category} brands={brands} isLoading={!canRenderResults} />
      <DesktopBrandsSection category={category} brands={brands} isLoading={!canRenderResults} />
    </>
  );
}

export default function BrandsPage() {
  return (
    <AuthenticatedRoute>
      <Suspense fallback={null}>
        <BrandsContent />
      </Suspense>
    </AuthenticatedRoute>
  );
}
