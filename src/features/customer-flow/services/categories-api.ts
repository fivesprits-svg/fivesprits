import { apiFetch } from "./api-client";
import type { Category } from "@/features/customer-flow/types";

export interface BackendCategory {
  _id: string;
  categoryName: string;
  categoryImageUrl?: string;
  image?: string;
  active?: boolean;
}

const categoryRequests = new Map<string, Promise<Category[]>>();
const categoryByIdRequests = new Map<string, Promise<Category | null>>();

export async function fetchCategoriesApi(params?: {
  search?: string;
  status?: string;
}): Promise<Category[]> {
  const requestKey = JSON.stringify({ search: params?.search ?? "", status: params?.status ?? "" });
  const cachedRequest = categoryRequests.get(requestKey);
  if (cachedRequest) return cachedRequest;

  const request = fetchCategories(params);
  categoryRequests.set(requestKey, request);
  return request;
}

async function fetchCategories(params?: { search?: string; status?: string }): Promise<Category[]> {
  try {
    const searchParams = new URLSearchParams({
      limit: "5000",
      ...(params?.status ? { status: params.status } : {}),
      ...(params?.search ? { search: params.search } : {}),
    });

    const res = await apiFetch<{ items: BackendCategory[] }>(
      `/categories?${searchParams.toString()}`,
      { cache: "no-store" },
    );
    const items = res.data?.items;

    if (items && Array.isArray(items)) {
      return items.map((item) => ({
        id: String(item._id),
        name: item.categoryName,
        image: item.categoryImageUrl || item.image || "",
      }));
    }
    return [];
  } catch (err) {
    console.error("fetchCategoriesApi error:", err);
    return [];
  }
}

export async function fetchCategoryByIdApi(id: string): Promise<Category | null> {
  const cachedRequest = categoryByIdRequests.get(id);
  if (cachedRequest) return cachedRequest;

  const request = fetchCategoryById(id);
  categoryByIdRequests.set(id, request);
  return request;
}

async function fetchCategoryById(id: string): Promise<Category | null> {
  try {
    const res = await apiFetch<BackendCategory>(`/categories/${id}`);
    if (res.data) {
      return {
        id: String(res.data._id),
        name: res.data.categoryName,
        image: res.data.categoryImageUrl || res.data.image || "",
      };
    }
    return null;
  } catch (err) {
    console.error(`fetchCategoryByIdApi(${id}) error:`, err);
    return null;
  }
}
