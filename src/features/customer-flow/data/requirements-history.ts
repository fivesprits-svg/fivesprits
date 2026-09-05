export type PastRequirementItem = {
  name: string;
  pack: string;
  quantity: number;
  price: number;
  image: string;
};

export type RequirementHistoryEntry = {
  id: string;
  requirementNo: string;
  date: string;
  status: "Fulfilled" | "In Review" | "Dispatched";
  permitNumber: string;
  deliveryAddress: string;
  totalItems: number;
  totalOriginalMrp: number;
  totalSalePrice: number;
  items: PastRequirementItem[];
};

export const sampleRequirementHistory: RequirementHistoryEntry[] = [
  {
    id: "req-1",
    requirementNo: "REQ-2026-8941",
    date: "28 Aug 2026",
    status: "Fulfilled",
    permitNumber: "PRM-2024-00587",
    deliveryAddress: "42, MG Road, Sector 15, Gurugram, Haryana",
    totalItems: 4,
    totalOriginalMrp: 18500,
    totalSalePrice: 15400,
    items: [
      {
        name: "Amber Reserve Whisky",
        pack: "750 ml",
        quantity: 2,
        price: 2450,
        image: "/customer-flow/products/reserve-whisky.png",
      },
      {
        name: "Budweiser Magnum Strong",
        pack: "650 ml",
        quantity: 2,
        price: 260,
        image: "/customer-flow/categories/beer.png",
      },
      {
        name: "Reserve Sparkling Combo",
        pack: "Combo Pack",
        quantity: 1,
        price: 10500,
        image: "/customer-flow/hero/aurum-reserve.jpg",
      },
    ],
  },
  {
    id: "req-2",
    requirementNo: "REQ-2026-7120",
    date: "12 Jul 2026",
    status: "Fulfilled",
    permitNumber: "PRM-2024-00587",
    deliveryAddress: "42, MG Road, Sector 15, Gurugram, Haryana",
    totalItems: 3,
    totalOriginalMrp: 8600,
    totalSalePrice: 7200,
    items: [
      {
        name: "Island Cask Caribbean Spiced",
        pack: "750 ml",
        quantity: 2,
        price: 1940,
        image: "/customer-flow/products/amber-rum.png",
      },
      {
        name: "Heineken Silver Smooth",
        pack: "330 ml",
        quantity: 4,
        price: 190,
        image: "/customer-flow/categories/beer.png",
      },
    ],
  },
];
