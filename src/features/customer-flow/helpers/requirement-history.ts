import type { RequirementHistoryEntry } from "@/features/customer-flow/types";
import type { OrderHistoryEntry } from "@/features/customer-flow/services/orders-api";

export function mapRequirementHistory(orders: OrderHistoryEntry[]): RequirementHistoryEntry[] {
  return orders.map((order) => ({
    id: order._id,
    requirementNo: order.orderNumber ?? order._id,
    date: order.createdAt
      ? new Date(order.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "",
    status: (order.status as RequirementHistoryEntry["status"]) ?? "In Review",
    permitNumber: order.permitNumber ?? "",
    deliveryAddress: order.deliveryAddress ?? "",
    totalItems: order.totalItems ?? order.items?.length ?? 0,
    totalOriginalMrp: order.totalMrp ?? 0,
    totalSalePrice: order.totalSalePrice ?? 0,
    items: (order.items ?? []).map((rawItem) => {
      const item = (rawItem ?? {}) as unknown as Record<string, unknown>;
      const rawProduct = (
        typeof item.productId === "object" && item.productId !== null ? item.productId : {}
      ) as Record<string, unknown>;
      const details = (item.productDetails ?? {}) as Record<string, unknown>;
      const rawSize =
        item.pack || details.pack || details.size || rawProduct.pack || rawProduct.size || "";

      return {
        name: String(
          item.name ||
            details.name ||
            details.productName ||
            details.comboName ||
            details.giftName ||
            rawProduct.name ||
            rawProduct.title ||
            item.productId ||
            "Product",
        ),
        pack: rawSize
          ? /^\d+$/.test(String(rawSize).trim())
            ? `${rawSize}ml`
            : String(rawSize)
          : "",
        quantity: Number(item.quantity ?? 1),
        price: Number(
          item.salePrice ??
            item.price ??
            item.mrp ??
            details.salePrice ??
            details.saleAmount ??
            details.mrp ??
            details.mrpAmount ??
            0,
        ),
        image: String(
          item.image ||
            item.productImageUrl ||
            item.imageUrl ||
            details.image ||
            details.productImageUrl ||
            details.offerImageUrl ||
            details.imageUrl ||
            rawProduct.image ||
            rawProduct.productImageUrl ||
            rawProduct.imageUrl ||
            "",
        ),
      };
    }),
  }));
}
