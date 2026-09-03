import type { ComboOffer } from "@/features/customer-flow/data/offers";
import type { Brand, CartLine, Product } from "@/features/customer-flow/types";

type GiftOffer = { id: string; title: string; gift: string; image: string };
export type CartRow = {
  id: string;
  type: "product" | "combo" | "gift";
  name: string;
  detail: string;
  price: number;
  image: string;
  quantity: number;
};

export function buildCartRows(
  lines: CartLine[],
  products: Product[],
  brands: Brand[],
  comboOffers: ComboOffer[] = [],
  giftOffer?: GiftOffer,
): CartRow[] {
  return lines.flatMap<CartRow>((line) => {
    const type = line.itemType ?? "product";
    if (type === "combo") {
      const offer = comboOffers.find((item) => item.id === line.productId);
      return offer
        ? [
            {
              id: offer.id,
              type,
              name: offer.title,
              detail: offer.items.join(" · "),
              price: offer.salePrice,
              image: offer.image,
              quantity: line.quantity,
            },
          ]
        : [];
    }
    if (type === "gift") {
      if (!giftOffer || giftOffer.id !== line.productId) return [];
      const selectedCount = line.selectedProductIds?.length ?? 0;
      return [
        {
          id: giftOffer.id,
          type,
          name: giftOffer.title,
          detail: `${selectedCount} selected ${selectedCount === 1 ? "item" : "items"} · ${giftOffer.gift} unlocked`,
          price: 0,
          image: giftOffer.image,
          quantity: line.quantity,
        },
      ];
    }
    const product = products.find((item) => item.id === line.productId);
    if (!product) return [];
    const brand = brands.find((item) => item.id === product.brandId);
    return [
      {
        id: product.id,
        type,
        name: product.name,
        detail: `${brand?.name ?? "Product"} · ${product.pack}`,
        price: product.mrp,
        image: product.image,
        quantity: line.quantity,
      },
    ];
  });
}
