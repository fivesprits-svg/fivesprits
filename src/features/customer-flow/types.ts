import type { CartLine, CustomerSession } from "@/features/customer-flow/types/state";
export type { Brand, Category, Product } from "@/features/customer-flow/types/catalogue";
export type { CartLine, CustomerSession } from "@/features/customer-flow/types/state";

export type CustomerFlowState = {
  session: CustomerSession | null;
  selectedCategoryId: string | null;
  selectedBrandId: string | null;
  cart: CartLine[];
  showConfirmation: boolean;
};

export type CustomerFlowAction =
  | { type: "session/login"; name: string; mobile: string }
  | { type: "session/verify" }
  | { type: "session/verify-aadhaar"; aadhaarNumber: string }
  | { type: "session/verify-digilocker-otp" }
  | { type: "session/verification-complete"; dateOfBirth: string; age: number }
  | { type: "session/verify-age" }
  | { type: "session/profile-complete" }
  | { type: "selection/category"; categoryId: string }
  | { type: "selection/brand"; brandId: string }
  | {
      type: "cart/add";
      productId: string;
      quantity: number;
      itemType?: CartLine["itemType"];
      selectedProductIds?: string[];
    }
  | { type: "cart/gift"; productId: string; selectedProductIds: string[] }
  | { type: "cart/quantity"; productId: string; quantity: number }
  | { type: "cart/remove"; productId: string }
  | { type: "requirement/submit" }
  | { type: "confirmation/dismiss" }
  | { type: "session/logout" };
