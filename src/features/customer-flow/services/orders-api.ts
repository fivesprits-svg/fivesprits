import { apiFetch } from "./api-client";

export interface OrderItemPayload {
  productId: string;
  quantity: number;
  itemType: string;
  selectedProductIds?: string[];
  mrp: number;
  salePrice: number;
}

export interface SubmitOrderPayload {
  items: OrderItemPayload[];
  deliveryAddress: string;
  permitNumber: string;
}

export interface SubmitOrderResponse {
  _id: string;
  orderNumber?: string;
  items?: unknown[];
  deliveryAddress?: string;
  permitNumber?: string;
  status?: string;
  createdAt?: string;
}

export async function submitOrderApi(payload: SubmitOrderPayload): Promise<SubmitOrderResponse> {
  const res = await apiFetch<SubmitOrderResponse>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.data;
}

export interface OrderHistoryItem {
  productId: string;
  quantity: number;
  itemType?: string;
  selectedProductIds?: string[];
  mrp?: number;
  salePrice?: number;
  name?: string;
  pack?: string;
  image?: string;
}

export interface OrderHistoryEntry {
  _id: string;
  orderNumber?: string;
  items: OrderHistoryItem[];
  deliveryAddress?: string;
  permitNumber?: string;
  status?: string;
  totalItems?: number;
  totalMrp?: number;
  totalSalePrice?: number;
  createdAt?: string;
}

export async function getOrderHistoryApi(): Promise<OrderHistoryEntry[]> {
  const res = await apiFetch<OrderHistoryEntry[] | { orders: OrderHistoryEntry[] }>("/orders/me", {
    method: "GET",
  });
  const data = res.data;
  return Array.isArray(data) ? data : (data?.orders ?? []);
}
