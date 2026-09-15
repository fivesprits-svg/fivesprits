export interface RequirementHistoryItem {
  name: string;
  pack: string;
  quantity: number;
  price: number;
  image: string;
}

export interface RequirementHistoryEntry {
  id: string;
  requirementNo: string;
  date: string;
  status: "In Review" | "Approved" | "Cancelled" | "Delivered" | "Pending";
  permitNumber?: string;
  deliveryAddress?: string;
  totalItems: number;
  totalOriginalMrp: number;
  totalSalePrice: number;
  items: RequirementHistoryItem[];
}
