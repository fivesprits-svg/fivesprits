import { apiFetch } from "./api-client";
import type { Product } from "@/features/customer-flow/types";
import { sortCatalogueItems } from "@/features/customer-flow/utils/catalogue-sort";

export interface BackendProduct {
  _id: string;
  name: string;
  brandId: string;
  brandName?: string;
  categoryId: string;
  categoryName?: string;
  size?: string;
  pack?: string;
  unitTypeId?: string | { _id: string; customId?: string; name?: string };
  unitTypeName?: string;
  unitName?: string;
  unitType?: { unitTypeName?: string; name?: string };
  mrpAmount?: number;
  saleAmount?: number;
  mrp?: number;
  productImageUrl?: string;
  image?: string;
  active?: boolean;
  outOfStock?: boolean;
}

export function mapBackendProduct(item: BackendProduct): Product {
  const mrp = Number(item.mrpAmount ?? item.mrp ?? 0);
  const saleAmount = Number(item.saleAmount ?? item.mrpAmount ?? item.mrp ?? 0);
  const unitTypeIdName = typeof item.unitTypeId === "object" ? item.unitTypeId.name : undefined;
  const unitType =
    item.unitTypeName ||
    item.unitName ||
    unitTypeIdName ||
    item.unitType?.unitTypeName ||
    item.unitType?.name;

  return {
    id: String(item._id),
    brandId: String(item.brandId),
    name: item.name,
    displayName: item.brandName || item.name,
    pack: item.size || item.pack || "750ml",
    unitType,
    mrp: mrp || saleAmount,
    saleAmount: saleAmount || mrp,
    image: item.productImageUrl || item.image || "",
    outOfStock: Boolean(item.outOfStock),
  };
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
      return sortCatalogueItems(items.map(mapBackendProduct));
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
      return mapBackendProduct(res.data);
    }
    return null;
  } catch (err) {
    console.error(`fetchProductByIdApi(${id}) error:`, err);
    return null;
  }
}
