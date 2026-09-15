import { apiFetch } from "./api-client";
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
      limit: "5000",
      ...(params?.status ? { status: params.status } : {}),
      ...(params?.categoryId ? { categoryId: params.categoryId } : {}),
      ...(params?.search ? { search: params.search } : {}),
    });

    const res = await apiFetch<{ items: BackendBrand[] }>(`/brands?${searchParams.toString()}`);
    const items = res.data?.items;

    if (items && Array.isArray(items)) {
      return items.map((item) => ({
        id: String(item._id),
        categoryId: String(item.categoryId),
        name: item.brandName,
        image: item.brandImageUrl || item.image || "",
      }));
    }
    return [];
  } catch (err) {
    console.error("fetchBrandsApi error:", err);
    return [];
  }
}

export async function fetchBrandByIdApi(id: string): Promise<Brand | null> {
  try {
    const res = await apiFetch<BackendBrand>(`/brands/${id}`);
    if (res.data) {
      return {
        id: String(res.data._id),
        categoryId: String(res.data.categoryId),
        name: res.data.brandName,
        image: res.data.brandImageUrl || res.data.image || "",
      };
    }
    return null;
  } catch (err) {
    console.error(`fetchBrandByIdApi(${id}) error:`, err);
    return null;
  }
}
