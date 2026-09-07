import { apiFetch } from "./api-client";
import {
  products as defaultProducts,
  getProductsByBrand,
} from "@/features/customer-flow/data/catalogue";
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
}

export async function fetchProductsApi(params?: {
  brandId?: string;
  categoryId?: string;
  search?: string;
  status?: string;
}): Promise<Product[]> {
  try {
    const searchParams = new URLSearchParams({
      limit: "100",
      ...(params?.status ? { status: params.status } : { status: "ACTIVE" }),
      ...(params?.brandId ? { brandId: params.brandId } : {}),
      ...(params?.categoryId ? { categoryId: params.categoryId } : {}),
      ...(params?.search ? { search: params.search } : {}),
    });

    const res = await apiFetch<{ items: BackendProduct[] }>(`/products?${searchParams.toString()}`);
    const items = res.data?.items;

    if (items && Array.isArray(items) && items.length > 0) {
      return items.map((item, index) => {
        const fallback = defaultProducts[index % defaultProducts.length];
        const price = Number(
          item.saleAmount ?? item.mrpAmount ?? item.mrp ?? fallback?.mrp ?? 1000,
        );
        return {
          id: String(item._id),
          brandId: String(item.brandId),
          name: item.name,
          pack: item.size || item.pack || "750ml",
          mrp: price,
          image:
            item.productImageUrl ||
            item.image ||
            fallback?.image ||
            "/customer-flow/products/amber-reserve-12.png",
        };
      });
    }
  } catch (err) {
    console.warn("fetchProductsApi error, using fallback data:", err);
  }

  // Fallback to static products
  if (params?.brandId) {
    const staticList = getProductsByBrand(params.brandId);
    if (params.search) {
      const q = params.search.toLowerCase();
      return staticList.filter((p) => p.name.toLowerCase().includes(q));
    }
    return staticList;
  }

  if (params?.search) {
    const q = params.search.toLowerCase();
    return defaultProducts.filter((p) => p.name.toLowerCase().includes(q));
  }

  return defaultProducts;
}

export async function fetchProductByIdApi(id: string): Promise<Product | null> {
  try {
    const res = await apiFetch<BackendProduct>(`/products/${id}`);
    if (res.data) {
      return {
        id: String(res.data._id),
        brandId: String(res.data.brandId),
        name: res.data.name,
        pack: res.data.size || res.data.pack || "750ml",
        mrp: Number(res.data.saleAmount ?? res.data.mrpAmount ?? res.data.mrp ?? 1000),
        image:
          res.data.productImageUrl ||
          res.data.image ||
          "/customer-flow/products/amber-reserve-12.png",
      };
    }
  } catch (err) {
    console.warn(`fetchProductByIdApi(${id}) error, checking fallback:`, err);
  }
  return defaultProducts.find((p) => p.id === id) || null;
}
