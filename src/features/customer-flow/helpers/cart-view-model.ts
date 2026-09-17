import type {
  Brand,
  CartLine,
  Product,
  ComboOffer,
  GiftProduct,
  GiftOffer,
} from "@/features/customer-flow/types";

export type CartRow = {
  id: string;
  type: "product" | "combo" | "gift" | "request";
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
  availableOriginalMrp: number;
  availableSalePrice: number;
  requestedItemsCount: number;
  requestedOriginalMrp: number;
  requestedSalePrice: number;
};

export type ComboDetails = {
  comboName?: string;
  originalPrice?: number;
  offerPrice?: number;
  offerImageUrl?: string;
  products?: Array<{
    productId?: string;
    productName?: string;
    productImageUrl?: string;
    quantity?: number;
  }>;
};

export type GiftDetails = {
  giftName?: string;
  giftItemName?: string;
  offerImageUrl?: string;
  products?: Array<{
    productId?: string;
    productName?: string;
    size?: string;
    mrpAmount?: number;
    saleAmount?: number;
    productImageUrl?: string;
  }>;
};

function resolveProduct(line: CartLine, products: Product[]): Product | undefined {
  const details = (line.productDetails ?? {}) as Record<string, unknown>;
  const isCombo = line.itemType === "combo";
  const isGift = line.itemType === "gift";

  if (Object.keys(details).length > 0) {
    if (isCombo) {
      return {
        id: line.productId,
        brandId: "",
        name: String(details.comboName ?? "Combo Offer"),
        pack: "Bundle",
        mrp: Number(details.originalPrice ?? details.mrpAmount ?? 0),
        saleAmount: Number(details.offerPrice ?? details.saleAmount ?? 0),
        image: String(details.offerImageUrl ?? ""),
      };
    }

    if (isGift) {
      return {
        id: line.productId,
        brandId: "",
        name: String(details.giftName ?? "Gift Offer"),
        pack: "Gift",
        mrp: Number(details.giftItemValue ?? 0),
        saleAmount: Number(details.offerPrice ?? details.saleAmount ?? 0),
        image: String(details.offerImageUrl ?? ""),
      };
    }

    const rawSize = details.size ?? details.pack;
    const pack = rawSize
      ? /^\d+$/.test(String(rawSize).trim())
        ? `${rawSize}ml`
        : String(rawSize)
      : "750ml";
    const mrp = Number(
      details.mrpAmount ?? details.saleAmount ?? details.mrp ?? details.price ?? 0,
    );
    const saleAmount = Number(details.salePrice ?? details.saleAmount ?? details.offerPrice ?? mrp);
    const image = String(details.productImageUrl || details.image || details.imageUrl || "");
    return {
      id: String(details._id || details.id || line.productId),
      brandId: String(details.brandId || ""),
      name: String(details.name || "Product"),
      pack,
      mrp,
      saleAmount,
      image,
    };
  }
  return (
    products.find((item) => item.id === line.productId) ??
    (line.productId
      ? {
          id: line.productId,
          brandId: "",
          name: "Product",
          pack: "750ml",
          mrp: 0,
          saleAmount: 0,
          image: "",
        }
      : undefined)
  );
}

function resolveBrand(line: CartLine, product: Product, brands: Brand[]): Brand | undefined {
  const details = line.productDetails as Record<string, unknown> | undefined;
  const existingBrand = brands.find((item) => item.id === product.brandId);
  if (existingBrand) return existingBrand;
  if (details?.brandName || details?.brandId) {
    return {
      id: String(details.brandId || product.brandId || ""),
      categoryId: String(details.categoryId || ""),
      name: String(details.brandName || "Brand"),
      image: "",
    };
  }
  return undefined;
}

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
      const offerDetails = line.productDetails as ComboDetails | undefined;
      const offer: ComboOffer | undefined = offerDetails?.comboName
        ? {
            id: line.productId,
            title: offerDetails.comboName,
            items: offerDetails.products?.map((p) => p.productName || "").filter(Boolean) ?? [],
            mrp: Number(offerDetails.originalPrice ?? 0),
            salePrice: Number(offerDetails.offerPrice ?? 0),
            image: offerDetails.offerImageUrl ?? "",
            badge: "Bundle",
          }
        : comboOffers.find((item) => item.id === line.productId);

      if (offer) {
        return [
          {
            id: offer.id,
            type,
            name: offer.title,
            detail: offer.items.join(" · "),
            price: offer.salePrice,
            image:
              offerDetails?.offerImageUrl ||
              offerDetails?.products?.[0]?.productImageUrl ||
              offer.image,
            quantity: line.quantity,
          },
        ];
      }
      return [];
    }
    if (type === "gift") {
      const offerDetails = line.productDetails as GiftDetails | undefined;
      const offer: GiftOffer | undefined = offerDetails?.giftName
        ? {
            id: line.productId,
            title: offerDetails.giftName,
            gift: offerDetails.giftItemName ?? "Gift",
            image: offerDetails.offerImageUrl ?? "",
          }
        : giftOffer;

      if (offer && (offerDetails || (giftOffer && giftOffer.id === line.productId))) {
        const selectedCount = line.selectedProductIds?.length ?? 0;
        return [
          {
            id: line.productId,
            type,
            name: offer.title,
            detail: `${selectedCount} selected ${selectedCount === 1 ? "item" : "items"} · ${offer.gift} unlocked`,
            price: 0,
            image:
              offerDetails?.offerImageUrl ||
              offerDetails?.products?.[0]?.productImageUrl ||
              offer.image,
            quantity: line.quantity,
          },
        ];
      }
      return [];
    }
    const product = resolveProduct(line, products);
    if (!product) return [];
    const brand = resolveBrand(line, product, brands);
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
  products: Product[] = [],
  brands: Brand[] = [],
  comboOffers: ComboOffer[] = [],
  giftOffer?: GiftOffer,
): StructuredCart {
  const regularItems: RegularCartItem[] = [];
  const comboItems: ComboCartItem[] = [];
  const giftItems: GiftCartItem[] = [];

  let availableOriginalMrp = 0;
  let availableSalePrice = 0;
  let availableItemsCount = 0;

  let requestedOriginalMrp = 0;
  let requestedSalePrice = 0;
  let requestedItemsCount = 0;

  lines.forEach((line) => {
    const type = line.itemType ?? "product";

    if (type === "combo") {
      const offerDetails = line.productDetails as ComboDetails | undefined;
      const offer: ComboOffer | undefined = offerDetails?.comboName
        ? {
            id: line.productId,
            title: offerDetails.comboName,
            items: offerDetails.products?.map((p) => p.productName || "").filter(Boolean) ?? [],
            mrp: Number(offerDetails.originalPrice ?? 0),
            salePrice: Number(offerDetails.offerPrice ?? 0),
            image: offerDetails.offerImageUrl ?? "",
            badge: "Bundle",
          }
        : comboOffers.find((item) => item.id === line.productId);

      if (offer) {
        comboItems.push({
          id: offer.id,
          offer,
          quantity: line.quantity,
        });
        availableOriginalMrp += offer.mrp * line.quantity;
        availableSalePrice += offer.salePrice * line.quantity;
        availableItemsCount += line.quantity;
      }
      return;
    }

    if (type === "gift") {
      const offerDetails = line.productDetails as GiftDetails | undefined;
      const offer: GiftOffer | undefined = offerDetails?.giftName
        ? {
            id: line.productId,
            title: offerDetails.giftName,
            gift: offerDetails.giftItemName ?? "Gift",
            image: offerDetails.offerImageUrl ?? "",
          }
        : giftOffer;

      if (offer && (offerDetails || (giftOffer && giftOffer.id === line.productId))) {
        const counts: Record<string, number> = {};
        line.selectedProductIds?.forEach((id) => {
          counts[id] = (counts[id] ?? 0) + 1;
        });

        const selectedProducts: SelectedGiftProduct[] = Object.entries(counts).map(
          ([productId, count]) => {
            const rawProd =
              offerDetails?.products?.find((p) => p.productId === productId || p.productName) ??
              products.find((p) => p.id === productId);

            const anyProd = rawProd as Record<string, unknown> | undefined;
            const resolved: GiftProduct = anyProd
              ? {
                  id: productId,
                  name: String(anyProd.productName || anyProd.name || "Eligible Product"),
                  pack: String(anyProd.size || anyProd.pack || "750ml"),
                  mrp: Number(anyProd.mrpAmount ?? anyProd.mrp ?? 0),
                  salePrice: Number(anyProd.saleAmount ?? anyProd.salePrice ?? anyProd.mrp ?? 0),
                  image: String(anyProd.productImageUrl || anyProd.image || ""),
                }
              : {
                  id: productId,
                  name: "Selected Product",
                  pack: "",
                  mrp: 0,
                  salePrice: 0,
                  image: "",
                };

            return { product: resolved, count };
          },
        );

        let giftMrp = 0;
        let giftSale = 0;
        selectedProducts.forEach(({ product, count }) => {
          giftMrp += Number(product.mrp) * count;
          giftSale +=
            Number(("salePrice" in product ? product.salePrice : product.mrp) ?? product.mrp) *
            count;
        });

        giftItems.push({
          id: line.productId,
          offer,
          selectedProducts,
          totalMrp: giftMrp,
          totalSalePrice: giftSale,
          quantity: line.quantity,
        });

        availableOriginalMrp += giftMrp * line.quantity;
        availableSalePrice += giftSale * line.quantity;
        availableItemsCount += (line.selectedProductIds?.length ?? 0) * line.quantity;
      }
      return;
    }

    // Regular product
    const product = resolveProduct(line, products);
    if (product) {
      const brand = resolveBrand(line, product, brands);
      const isRequested = line.itemType === "request";

      regularItems.push({
        id: product.id,
        product,
        brand,
        quantity: line.quantity,
        isRequested,
      });

      if (isRequested) {
        requestedOriginalMrp += product.mrp * line.quantity;
        requestedSalePrice += product.mrp * line.quantity;
        requestedItemsCount += line.quantity;
      } else {
        availableOriginalMrp += product.mrp * line.quantity;
        availableSalePrice += product.saleAmount * line.quantity;
        availableItemsCount += line.quantity;
      }
    }
  });

  const totalItemsCount =
    regularItems.reduce((sum, item) => sum + item.quantity, 0) +
    comboItems.reduce((sum, item) => sum + item.quantity, 0) +
    giftItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalOriginalMrp = availableOriginalMrp + requestedOriginalMrp;
  const totalSalePrice = availableSalePrice + requestedSalePrice;

  return {
    regularItems,
    comboItems,
    giftItems,
    totalItemsCount,
    totalOriginalMrp,
    totalSalePrice,
    availableItemsCount,
    availableOriginalMrp,
    availableSalePrice,
    requestedItemsCount,
    requestedOriginalMrp,
    requestedSalePrice,
  };
}
