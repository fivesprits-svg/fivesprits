import { apiFetch } from "./api-client";
import type { Product } from "@/features/customer-flow/types";

export interface BackendProduct {
  _id: string;
  name: string;
  brandId: string;
  brandName?: string;
  categoryId: string;
  categoryName?: string;
  size?: string;
  pack?: string;
  mrpAmount?: number;
  saleAmount?: number;
  mrp?: number;
  productImageUrl?: string;
  image?: string;
  active?: boolean;
  outOfStock?: boolean;
}

const productRequests = new Map<string, Promise<Product[]>>();
const productByIdRequests = new Map<string, Promise<Product | null>>();

export async function fetchProductsApi(params?: {
  brandId?: string;
  categoryId?: string;
  search?: string;
  status?: string;
}): Promise<Product[]> {
  const requestKey = JSON.stringify({
    brandId: params?.brandId ?? "",
    categoryId: params?.categoryId ?? "",
    search: params?.search ?? "",
    status: params?.status ?? "",
  });
  const cachedRequest = productRequests.get(requestKey);
  if (cachedRequest) return cachedRequest;

  const request = fetchProducts(params);
  productRequests.set(requestKey, request);
  return request;
}

async function fetchProducts(params?: {
  brandId?: string;
  categoryId?: string;
  search?: string;
  status?: string;
}): Promise<Product[]> {
  try {
    const searchParams = new URLSearchParams({
      limit: "5000",
      ...(params?.status ? { status: params.status } : {}),
      ...(params?.brandId ? { brandId: params.brandId } : {}),
      ...(params?.categoryId ? { categoryId: params.categoryId } : {}),
      ...(params?.search ? { search: params.search } : {}),
    });

    const res = await apiFetch<{ items: BackendProduct[] }>(`/products?${searchParams.toString()}`);
    const items = res.data?.items;

    if (items && Array.isArray(items)) {
      return items.map((item) => {
        const mrp = Number(item.mrpAmount ?? item.mrp ?? 0);
        const saleAmount = Number(item.saleAmount);
        return {
          id: String(item._id),
          brandId: String(item.brandId),
          name: item.name,
          pack: item.size || item.pack || "750ml",
          mrp: mrp || saleAmount,
          saleAmount: saleAmount || mrp,
          image: item.productImageUrl || item.image || "",
          outOfStock: Boolean(item.outOfStock),
        };
      });
    }
    return [];
  } catch (err) {
    console.error("fetchProductsApi error:", err);
    return [];
  }
}

export async function fetchProductByIdApi(id: string): Promise<Product | null> {
  const cachedRequest = productByIdRequests.get(id);
  if (cachedRequest) return cachedRequest;

  const request = fetchProductById(id);
  productByIdRequests.set(id, request);
  return request;
}

async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await apiFetch<BackendProduct>(`/products/${id}`);
    if (res.data) {
      const mrp = Number(res.data.mrpAmount ?? res.data.mrp ?? 0);
      const saleAmount = Number(res.data.saleAmount ?? res.data.mrpAmount ?? res.data.mrp ?? 0);
      return {
        id: String(res.data._id),
        brandId: String(res.data.brandId),
        name: res.data.name,
        pack: res.data.size || res.data.pack || "750ml",
        mrp: mrp || saleAmount,
        saleAmount: saleAmount || mrp,
        image: res.data.productImageUrl || res.data.image || "",
        outOfStock: Boolean(res.data.outOfStock),
      };
    }
    return null;
  } catch (err) {
    console.error(`fetchProductByIdApi(${id}) error:`, err);
    return null;
  }
}
