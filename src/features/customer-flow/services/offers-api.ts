import { apiFetch } from "./api-client";
import {
  comboOffers as defaultComboOffers,
  giftOffer as defaultGiftOffer,
  giftProducts as defaultGiftProducts,
  type ComboOffer,
  type GiftProduct,
} from "@/features/customer-flow/data/offers";

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

export async function fetchComboOffersApi(search?: string): Promise<ComboOffer[]> {
  try {
    const searchParams = new URLSearchParams({
      limit: "100",
      status: "ACTIVE",
      ...(search ? { search } : {}),
    });

    const res = await apiFetch<{ items: BackendComboOffer[] }>(
      `/combo-offers?${searchParams.toString()}`,
    );
    const items = res.data?.items;

    if (items && Array.isArray(items) && items.length > 0) {
      return items.map((item, index) => {
        const fallback = defaultComboOffers[index % defaultComboOffers.length];
        const mrp = Number(item.originalPrice ?? fallback?.mrp ?? 5000);
        const salePrice = Number(item.offerPrice ?? fallback?.salePrice ?? 4000);
        const discountPct =
          item.discount ?? (mrp > salePrice ? Math.round(((mrp - salePrice) / mrp) * 100) : 15);
        const productItems =
          item.products && item.products.length > 0
            ? item.products.map(
                (p) => `${p.quantity || 1} × ${p.productName}${p.size ? ` (${p.size})` : ""}`,
              )
            : fallback?.items || ["Exclusive Combo Selection"];

        return {
          id: String(item._id),
          title: item.comboName || item.name || fallback?.title || "Exclusive Combo Offer",
          badge: `${discountPct}% discount on combo`,
          items: productItems,
          mrp,
          salePrice,
          image:
            item.offerImageUrl ||
            item.image ||
            fallback?.image ||
            "/customer-flow/figma-images/422fad509d4091ef4daca825cec07b2ea792418f.png",
        };
      });
    }
  } catch (err) {
    console.warn("fetchComboOffersApi error, using fallback data:", err);
  }

  if (search) {
    const q = search.toLowerCase();
    return defaultComboOffers.filter((o) => o.title.toLowerCase().includes(q));
  }
  return defaultComboOffers;
}

export async function fetchComboOfferByIdApi(id: string): Promise<ComboOffer | null> {
  try {
    const res = await apiFetch<BackendComboOffer>(`/combo-offers/${id}`);
    if (res.data) {
      const item = res.data;
      const mrp = Number(item.originalPrice ?? 5000);
      const salePrice = Number(item.offerPrice ?? 4000);
      const discountPct =
        item.discount ?? (mrp > salePrice ? Math.round(((mrp - salePrice) / mrp) * 100) : 15);
      const productItems =
        item.products && item.products.length > 0
          ? item.products.map(
              (p) => `${p.quantity || 1} × ${p.productName}${p.size ? ` (${p.size})` : ""}`,
            )
          : ["Exclusive Combo Selection"];

      return {
        id: String(item._id),
        title: item.comboName || item.name || "Exclusive Combo Offer",
        badge: `${discountPct}% discount on combo`,
        items: productItems,
        mrp,
        salePrice,
        image:
          item.offerImageUrl ||
          item.image ||
          "/customer-flow/figma-images/422fad509d4091ef4daca825cec07b2ea792418f.png",
      };
    }
  } catch (err) {
    console.warn(`fetchComboOfferByIdApi(${id}) error, checking fallback:`, err);
  }
  return defaultComboOffers.find((o) => o.id === id) || null;
}

export async function fetchGiftOffersApi(): Promise<{
  giftOffer: GiftOfferDetail;
  giftProducts: GiftProduct[];
}> {
  try {
    const res = await apiFetch<{ items: BackendGiftOffer[] }>(
      "/gift-offers?limit=10&status=ACTIVE",
    );
    const items = res.data?.items;

    if (items && Array.isArray(items) && items.length > 0) {
      const first = items[0];
      const parsedOffer: GiftOfferDetail = {
        id: String(first._id),
        title: first.giftName || defaultGiftOffer.title,
        benefit: first.offerLabel || `Get a ${first.giftItemName || "Complimentary Gift"}`,
        description: first.giftDescription || first.description || defaultGiftOffer.description,
        terms: first.terms || defaultGiftOffer.terms,
        gift: first.giftItemName || first.giftName || defaultGiftOffer.gift,
        requiredQuantity: first.minQuantity || 6,
        image: first.offerImageUrl || defaultGiftOffer.image,
      };

      let parsedProducts: GiftProduct[] = [];
      if (first.products && first.products.length > 0) {
        parsedProducts = first.products.map((p, idx) => ({
          id: p.productId || `gift-prod-${idx}`,
          name: p.productName || "Eligible Product",
          pack: p.size || "700ml",
          mrp: Number(p.mrpAmount || 5150),
          salePrice: Number(p.saleAmount || 3890),
          image:
            p.productImageUrl ||
            defaultGiftProducts[idx % defaultGiftProducts.length]?.image ||
            "/customer-flow/figma-images/6090d85d008480b7542f3321501e11f02b5d09a7.png",
        }));
      } else {
        parsedProducts = defaultGiftProducts;
      }

      return { giftOffer: parsedOffer, giftProducts: parsedProducts };
    }
  } catch (err) {
    console.warn("fetchGiftOffersApi error, using fallback data:", err);
  }

  return { giftOffer: defaultGiftOffer, giftProducts: defaultGiftProducts };
}
