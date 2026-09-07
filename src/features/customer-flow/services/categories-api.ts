import { apiFetch } from "./api-client";
import { categories as defaultCategories } from "@/features/customer-flow/data/catalogue";
import type { Category } from "@/features/customer-flow/types";

export interface BackendCategory {
  _id: string;
  categoryName: string;
  categoryImageUrl?: string;
  image?: string;
  active?: boolean;
}

export async function fetchCategoriesApi(params?: {
  search?: string;
  status?: string;
}): Promise<Category[]> {
  try {
    const searchParams = new URLSearchParams({
      limit: "100",
      ...(params?.status ? { status: params.status } : { status: "ACTIVE" }),
      ...(params?.search ? { search: params.search } : {}),
    });

    const res = await apiFetch<{ items: BackendCategory[] }>(
      `/categories?${searchParams.toString()}`,
    );
    const items = res.data?.items;

    if (items && Array.isArray(items) && items.length > 0) {
      return items.map((item, index) => {
        const fallback = defaultCategories[index % defaultCategories.length];
        return {
          id: String(item._id),
          name: item.categoryName,
          image:
            item.categoryImageUrl ||
            item.image ||
            fallback?.image ||
            "/customer-flow/categories/whisky.png",
        };
      });
    }
  } catch (err) {
    console.warn("fetchCategoriesApi error, using fallback data:", err);
  }

  // Fallback to static catalogue
  if (params?.search) {
    const q = params.search.toLowerCase();
    return defaultCategories.filter((c) => c.name.toLowerCase().includes(q));
  }
  return defaultCategories;
}

export async function fetchCategoryByIdApi(id: string): Promise<Category | null> {
  try {
    const res = await apiFetch<BackendCategory>(`/categories/${id}`);
    if (res.data) {
      return {
        id: String(res.data._id),
        name: res.data.categoryName,
        image:
          res.data.categoryImageUrl || res.data.image || "/customer-flow/categories/whisky.png",
      };
    }
  } catch (err) {
    console.warn(`fetchCategoryByIdApi(${id}) error, checking fallback:`, err);
  }
  return defaultCategories.find((c) => c.id === id) || null;
}
