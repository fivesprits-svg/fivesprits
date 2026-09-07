import { apiFetch } from "./api-client";
import {
  brands as defaultBrands,
  getBrandsByCategory,
} from "@/features/customer-flow/data/catalogue";
import type { Brand } from "@/features/customer-flow/types";

export interface BackendBrand {
  _id: string;
  categoryId: string;
  categoryName?: string;
  brandName: string;
  brandImageUrl?: string;
  image?: string;
  active?: boolean;
}

export async function fetchBrandsApi(params?: {
  categoryId?: string;
  search?: string;
  status?: string;
}): Promise<Brand[]> {
  try {
    const searchParams = new URLSearchParams({
      limit: "100",
      ...(params?.status ? { status: params.status } : { status: "ACTIVE" }),
      ...(params?.categoryId ? { categoryId: params.categoryId } : {}),
      ...(params?.search ? { search: params.search } : {}),
    });

    const res = await apiFetch<{ items: BackendBrand[] }>(`/brands?${searchParams.toString()}`);
    const items = res.data?.items;

    if (items && Array.isArray(items) && items.length > 0) {
      return items.map((item, index) => {
        const fallback = defaultBrands[index % defaultBrands.length];
        return {
          id: String(item._id),
          categoryId: String(item.categoryId),
          name: item.brandName,
          image:
            item.brandImageUrl ||
            item.image ||
            fallback?.image ||
            "/customer-flow/brands/amber-reserve.png",
        };
      });
    }
  } catch (err) {
    console.warn("fetchBrandsApi error, using fallback data:", err);
  }

  // Fallback to static brands
  if (params?.categoryId) {
    const staticList = getBrandsByCategory(params.categoryId);
    if (params.search) {
      const q = params.search.toLowerCase();
      return staticList.filter((b) => b.name.toLowerCase().includes(q));
    }
    return staticList;
  }

  if (params?.search) {
    const q = params.search.toLowerCase();
    return defaultBrands.filter((b) => b.name.toLowerCase().includes(q));
  }

  return defaultBrands;
}

export async function fetchBrandByIdApi(id: string): Promise<Brand | null> {
  try {
    const res = await apiFetch<BackendBrand>(`/brands/${id}`);
    if (res.data) {
      return {
        id: String(res.data._id),
        categoryId: String(res.data.categoryId),
        name: res.data.brandName,
        image:
          res.data.brandImageUrl || res.data.image || "/customer-flow/brands/amber-reserve.png",
      };
    }
  } catch (err) {
    console.warn(`fetchBrandByIdApi(${id}) error, checking fallback:`, err);
  }
  return defaultBrands.find((b) => b.id === id) || null;
}
