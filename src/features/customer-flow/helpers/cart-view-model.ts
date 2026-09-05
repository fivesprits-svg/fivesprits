import type { ComboOffer, GiftProduct } from "@/features/customer-flow/data/offers";
import { giftProducts as allGiftProducts } from "@/features/customer-flow/data/offers";
import type { Brand, CartLine, Product } from "@/features/customer-flow/types";

type GiftOffer = {
  id: string;
  title: string;
  benefit?: string;
  gift: string;
  image: string;
};

export type CartRow = {
  id: string;
  type: "product" | "combo" | "gift";
  name: string;
  detail: string;
  price: number;
  image: string;
  quantity: number;
};

export type RegularCartItem = {
  id: string;
  product: Product;
  brand?: Brand;
  quantity: number;
  isRequested?: boolean;
};

export type ComboCartItem = {
  id: string;
  offer: ComboOffer;
  quantity: number;
};

export type SelectedGiftProduct = {
  product: GiftProduct | Product;
  count: number;
};

export type GiftCartItem = {
  id: string;
  offer: GiftOffer;
  selectedProducts: SelectedGiftProduct[];
  totalMrp: number;
  totalSalePrice: number;
  quantity: number;
};

export type StructuredCart = {
  regularItems: RegularCartItem[];
  comboItems: ComboCartItem[];
  giftItems: GiftCartItem[];
  totalItemsCount: number;
  totalOriginalMrp: number;
  totalSalePrice: number;
  availableItemsCount: number;
  requestedItemsCount: number;
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

export function buildStructuredCart(
  lines: CartLine[],
  products: Product[],
  brands: Brand[],
  comboOffers: ComboOffer[] = [],
  giftOffer?: GiftOffer,
): StructuredCart {
  const regularItems: RegularCartItem[] = [];
  const comboItems: ComboCartItem[] = [];
  const giftItems: GiftCartItem[] = [];

  let totalOriginalMrp = 0;
  let totalSalePrice = 0;
  let availableItemsCount = 0;
  const requestedItemsCount = 0;

  lines.forEach((line) => {
    const type = line.itemType ?? "product";

    if (type === "combo") {
      const offer = comboOffers.find((item) => item.id === line.productId);
      if (offer) {
        comboItems.push({
          id: offer.id,
          offer,
          quantity: line.quantity,
        });
        totalOriginalMrp += offer.mrp * line.quantity;
        totalSalePrice += offer.salePrice * line.quantity;
        availableItemsCount += line.quantity;
      }
      return;
    }

    if (type === "gift") {
      if (giftOffer && giftOffer.id === line.productId) {
        const counts: Record<string, number> = {};
        line.selectedProductIds?.forEach((id) => {
          counts[id] = (counts[id] ?? 0) + 1;
        });

        const selectedProducts: SelectedGiftProduct[] = Object.entries(counts).map(
          ([productId, count]) => {
            const giftProd = allGiftProducts.find((p) => p.id === productId) ??
              products.find((p) => p.id === productId) ?? {
                id: productId,
                name: "Premium Selection",
                pack: "750ml",
                mrp: 5150,
                salePrice: 3890,
                image: "/customer-flow/products/reserve-whisky.png",
              };
            return { product: giftProd, count };
          },
        );

        let giftMrp = 0;
        let giftSale = 0;
        selectedProducts.forEach(({ product, count }) => {
          giftMrp += product.mrp * count;
          giftSale +=
            (("salePrice" in product ? product.salePrice : product.mrp) ?? product.mrp) * count;
        });

        giftItems.push({
          id: giftOffer.id,
          offer: giftOffer,
          selectedProducts,
          totalMrp: giftMrp,
          totalSalePrice: giftSale,
          quantity: line.quantity,
        });

        totalOriginalMrp += giftMrp * line.quantity;
        totalSalePrice += giftSale * line.quantity;
        availableItemsCount += (line.selectedProductIds?.length ?? 0) * line.quantity;
      }
      return;
    }

    // Regular product
    const product = products.find((item) => item.id === line.productId);
    if (product) {
      const brand = brands.find((item) => item.id === product.brandId);
      regularItems.push({
        id: product.id,
        product,
        brand,
        quantity: line.quantity,
      });

      totalOriginalMrp += product.mrp * line.quantity;
      totalSalePrice += product.mrp * line.quantity;
      availableItemsCount += line.quantity;
    }
  });

  const totalItemsCount =
    regularItems.reduce((sum, item) => sum + item.quantity, 0) +
    comboItems.reduce((sum, item) => sum + item.quantity, 0) +
    giftItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    regularItems,
    comboItems,
    giftItems,
    totalItemsCount,
    totalOriginalMrp,
    totalSalePrice,
    availableItemsCount,
    requestedItemsCount,
  };
}
