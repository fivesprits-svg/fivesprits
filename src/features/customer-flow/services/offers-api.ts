import { apiFetch } from "./api-client";
import type { ComboOffer, GiftProduct as BaseGiftProduct } from "@/features/customer-flow/types";

export interface BackendComboOffer {
  _id: string;
  comboName?: string;
  name?: string;
  description?: string;
  offerImageUrl?: string;
  image?: string;
  originalPrice?: number;
  offerPrice?: number;
  discount?: number;
  products?: Array<{
    productId?: string;
    productName?: string;
    quantity?: number;
    mrpAmount?: number;
    saleAmount?: number;
    size?: string;
  }>;
  status?: string;
}

export interface BackendGiftOffer {
  _id: string;
  giftName?: string;
  giftItemName?: string;
  offerLabel?: string;
  giftDescription?: string;
  description?: string;
  terms?: string;
  offerImageUrl?: string;
  minQuantity?: number;
  products?: Array<{
    productId?: string;
    productName?: string;
    quantity?: number;
    mrpAmount?: number;
    saleAmount?: number;
    size?: string;
    productImageUrl?: string;
  }>;
  status?: string;
}

export type GiftOfferDetail = {
  id: string;
  title: string;
  benefit?: string;
  description?: string;
  terms?: string;
  gift: string;
  requiredQuantity: number;
  image: string;
};

export type GiftProduct = {
  id: string;
  name: string;
  pack: string;
  mrp: number;
  salePrice: number;
  image: string;
};

export async function fetchComboOffersApi(search?: string): Promise<ComboOffer[]> {
  try {
    const searchParams = new URLSearchParams({
      limit: "5000",
      status: "ACTIVE",
      ...(search ? { search } : {}),
    });

    const res = await apiFetch<{ items: BackendComboOffer[] }>(
      `/combo-offers?${searchParams.toString()}`,
    );
    const items = res.data?.items;

    if (items && Array.isArray(items)) {
      return items.map((item) => {
        const mrp = Number(item.originalPrice ?? 0);
        const salePrice = Number(item.offerPrice ?? 0);
        const discountPct =
          item.discount ??
          (mrp > salePrice && mrp > 0 ? Math.round(((mrp - salePrice) / mrp) * 100) : 0);
        const productItems =
          item.products && item.products.length > 0
            ? item.products.map(
                (p) => `${p.quantity || 1} × ${p.productName}${p.size ? ` (${p.size})` : ""}`,
              )
            : [];

        return {
          id: String(item._id),
          title: item.comboName || item.name || "Exclusive Combo Offer",
          badge: `${discountPct}% discount on combo`,
          items: productItems,
          mrp,
          salePrice,
          image: item.offerImageUrl || item.image || "",
        };
      });
    }
    return [];
  } catch (err) {
    console.error("fetchComboOffersApi error:", err);
    return [];
  }
}

export async function fetchComboOfferByIdApi(id: string): Promise<ComboOffer | null> {
  try {
    const res = await apiFetch<BackendComboOffer>(`/combo-offers/${id}`);
    if (res.data) {
      const item = res.data;
      const mrp = Number(item.originalPrice ?? 0);
      const salePrice = Number(item.offerPrice ?? 0);
      const discountPct =
        item.discount ??
        (mrp > salePrice && mrp > 0 ? Math.round(((mrp - salePrice) / mrp) * 100) : 0);
      const productItems =
        item.products && item.products.length > 0
          ? item.products.map(
              (p) => `${p.quantity || 1} × ${p.productName}${p.size ? ` (${p.size})` : ""}`,
            )
          : [];

      return {
        id: String(item._id),
        title: item.comboName || item.name || "Exclusive Combo Offer",
        badge: `${discountPct}% discount on combo`,
        items: productItems,
        mrp,
        salePrice,
        image: item.offerImageUrl || item.image || "",
      };
    }
    return null;
  } catch (err) {
    console.error(`fetchComboOfferByIdApi(${id}) error:`, err);
    return null;
  }
}

export async function fetchGiftOffersApi(): Promise<{
  giftOffer: GiftOfferDetail | null;
  giftProducts: BaseGiftProduct[];
}> {
  try {
    const res = await apiFetch<{ items: BackendGiftOffer[] }>(
      "/gift-offers?limit=5000&status=ACTIVE",
    );
    const items = res.data?.items;

    if (items && Array.isArray(items) && items.length > 0) {
      const first = items[0];
      const parsedOffer: GiftOfferDetail = {
        id: String(first._id),
        title: first.giftName || "Gift Offer",
        benefit:
          first.offerLabel || (first.giftItemName ? `Get a ${first.giftItemName}` : "Gift Offer"),
        description: first.giftDescription || first.description || "",
        terms: first.terms || "",
        gift: first.giftItemName || first.giftName || "Gift",
        requiredQuantity: first.minQuantity || 6,
        image: first.offerImageUrl || "",
      };

      const parsedProducts: BaseGiftProduct[] =
        first.products && first.products.length > 0
          ? first.products.map((p, idx) => ({
              id: p.productId || `gift-prod-${idx}`,
              name: p.productName || "Eligible Product",
              pack: p.size || "700ml",
              mrp: Number(p.mrpAmount || 0),
              salePrice: Number(p.saleAmount || 0),
              image: p.productImageUrl || "",
            }))
          : [];

      return { giftOffer: parsedOffer, giftProducts: parsedProducts };
    }
    return { giftOffer: null, giftProducts: [] };
  } catch (err) {
    console.error("fetchGiftOffersApi error:", err);
    return { giftOffer: null, giftProducts: [] };
  }
}
