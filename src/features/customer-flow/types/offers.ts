export interface ComboOffer {
  id: string;
  title: string;
  badge: string;
  items: string[];
  mrp: number;
  salePrice: number;
  image: string;
}

export interface GiftProduct {
  id: string;
  name: string;
  pack: string;
  mrp: number;
  salePrice: number;
  image: string;
}

export interface GiftOffer {
  id: string;
  title: string;
  benefit?: string;
  gift: string;
  image: string;
}
