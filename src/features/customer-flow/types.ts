import type { CartLine, UserDetails } from "@/features/customer-flow/types/state";
export type { Brand, Category, Product } from "@/features/customer-flow/types/catalogue";
export type { CartLine, UserDetails } from "@/features/customer-flow/types/state";
export type { ComboOffer, GiftProduct, GiftOffer } from "@/features/customer-flow/types/offers";
export type {
  RequirementHistoryEntry,
  RequirementHistoryItem,
} from "@/features/customer-flow/types/requirements-history";

export type CustomerFlowState = {
  userDetails: UserDetails | null;
  accessToken: string | null;
  cartCount: number;
  selectedCategoryId: string | null;
  selectedBrandId: string | null;
  cart: CartLine[];
  showConfirmation: boolean;
};

export type CustomerFlowAction =
  | { type: "userDetails/set"; userDetails: Partial<UserDetails> }
  | { type: "session/login"; name: string; mobile: string }
  | { type: "session/login-here"; mobile: string; password: string; accessToken?: string }
  | { type: "session/set-access-token"; accessToken: string }
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
      productDetails?: Record<string, unknown>;
    }
  | { type: "cart/gift"; productId: string; selectedProductIds: string[] }
  | { type: "cart/quantity"; productId: string; quantity: number }
  | { type: "cart/remove"; productId: string }
  | { type: "cart/set"; cart: CartLine[] }
  | { type: "cart/clear" }
  | { type: "requirement/submit" }
  | { type: "confirmation/dismiss" }
  | { type: "session/logout" }
  | { type: "form-draft/login"; name: string; mobile: string }
  | {
      type: "form-draft/login-here";
      phoneValue: string;
      countryCode: string;
      dialCode: string;
      password: string;
    }
  | { type: "form-draft/otp"; otp: string }
  | { type: "form-draft/digilocker-otp"; otp: string }
  | { type: "form-draft/aadhaar"; aadhaar: string }
  | { type: "form-draft/age-verification"; confirmed: boolean };
