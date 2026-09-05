export type ComboOffer = {
  id: string;
  title: string;
  badge: string;
  items: string[];
  mrp: number;
  salePrice: number;
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

export const comboOffers: ComboOffer[] = [
  {
    id: "reserve-sparkling-combo",
    title: "2 Reserve 750ml & 1 Sparling 750 ml combo",
    badge: "22% discount on combo",
    items: ["2 × Reserve Shiraz (750 ml)", "1 × Sparkling Brut Celebration (750 ml) FREE"],
    mrp: 5150,
    salePrice: 3890,
    image: "/customer-flow/figma-images/422fad509d4091ef4daca825cec07b2ea792418f.png",
  },
  {
    id: "oak-glasses-combo",
    title: "Set of 2 hand-blown crystal glasses with 1 × Oak 12 Year Old",
    badge: "22% discount on combo",
    items: ["1 × Macallan Sherry Oak 12Y (700 ml)", "2 × Crystal Nosing Glasses"],
    mrp: 8500,
    salePrice: 6999,
    image: "/customer-flow/figma-images/3c540eb5339d000d28544a42d56a5a2821941163.png",
  },
];

export const giftOffer = {
  id: "premium-trolley",
  title: "Buy Any 6 Eligible Items",
  benefit: "Get a Premium Trolley",
  description:
    "Purchase any 6 eligible items and receive a premium trolley as a complimentary gift.",
  terms: "Limited-time gift offer. Terms and eligibility apply.",
  gift: "Premium Trolley",
  requiredQuantity: 6,
  image: "/customer-flow/figma-images/b5cc1a9483ed729f12d4553c90b131047daba5b7.png",
} as const;

export const giftProducts: GiftProduct[] = [
  {
    id: "hennessy-vsop",
    name: "Hennessy V.S.O.P",
    pack: "700ml",
    mrp: 5150,
    salePrice: 3890,
    image: "/customer-flow/figma-images/6090d85d008480b7542f3321501e11f02b5d09a7.png",
  },
  {
    id: "moet-chandon",
    name: "Moët & Chandon",
    pack: "750ml",
    mrp: 5150,
    salePrice: 3890,
    image: "/customer-flow/figma-images/c2ca76acac57236b1f0c3a1fb1065bda155eedf6.png",
  },
  {
    id: "grey-goose",
    name: "Grey Goose Vodka",
    pack: "750ml",
    mrp: 5150,
    salePrice: 3890,
    image: "/customer-flow/figma-images/d49e01318383b96599a2c9e85e04ad37a6891ce4.png",
  },
  {
    id: "johnnie-walker-black",
    name: "Johnnie Walker Black",
    pack: "700ml",
    mrp: 5150,
    salePrice: 3890,
    image: "/customer-flow/figma-images/bbe3eaab1ae03c51110c6402d43c48429e357204.png",
  },
  {
    id: "remy-martin-vsop",
    name: "Rémy Martin VSOP",
    pack: "700ml",
    mrp: 5150,
    salePrice: 3890,
    image: "/customer-flow/figma-images/20b1d1e27c61ec04f5b1e245a349fc3d6b3a7dd7.png",
  },
  {
    id: "glenfiddich-12",
    name: "Glenfiddich 12yr",
    pack: "700ml",
    mrp: 5150,
    salePrice: 3890,
    image: "/customer-flow/figma-images/9d554afef701e184cd48debc27284b19c0cb9e9a.png",
  },
];
