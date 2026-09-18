import { apiFetch } from "./api-client";

export interface CartItemPayload {
  productId: string;
  quantity: number;
  itemType: string;
  selectedProductIds?: string[];
  mrpAmount: number;
  salesAmount: number;
}

export interface CartItemResponse {
  productId: string;
  quantity: number;
  itemType?: string;
  selectedProductIds?: string[];
  mrpAmount?: number;
  saleAmount?: number;
  salePrice?: number;
  change?: { saleAmount?: { snapshot?: number; current?: number } };
  productDetails?: Record<string, unknown>;
}

export async function addToCartApi(items: CartItemPayload[]): Promise<CartItemResponse[]> {
  const res = await apiFetch<CartItemResponse[] | { items: CartItemResponse[] }>("/cart", {
    method: "POST",
    body: JSON.stringify({ items }),
  });
  const data = res.data;
  return Array.isArray(data) ? data : (data?.items ?? []);
}

export async function getCartApi(): Promise<CartItemResponse[]> {
  const res = await apiFetch<CartItemResponse[] | { items: CartItemResponse[] }>("/cart", {
    method: "GET",
  });
  const data = res.data;
  return Array.isArray(data) ? data : (data?.items ?? []);
}

export async function clearCartApi(): Promise<void> {
  await apiFetch("/cart", { method: "DELETE" });
}

export async function removeCartItemApi(productId: string): Promise<void> {
  await apiFetch(`/cart/${encodeURIComponent(productId)}`, { method: "DELETE" });
}

export async function updateCartItemApi(
  productId: string,
  payload: Partial<CartItemPayload>,
): Promise<CartItemResponse> {
  const res = await apiFetch<CartItemResponse>(`/cart/${encodeURIComponent(productId)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return res.data;
}
