export type CartItemType = "product" | "combo" | "gift";
export type CartLine = {
  productId: string;
  quantity: number;
  itemType?: CartItemType;
  selectedProductIds?: string[];
};
export type CustomerSession = {
  name: string;
  mobile: string;
  verified: boolean;
  cameFromLoginHere?: boolean;
  aadhaarNumber?: string;
  aadhaarVerified?: boolean;
  digilockerOtpVerified?: boolean;
  verificationComplete?: boolean;
  dateOfBirth?: string;
  age?: number;
  ageVerified?: boolean;
  profileComplete?: boolean;
};
