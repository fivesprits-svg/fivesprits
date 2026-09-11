export type CartItemType = "product" | "combo" | "gift" | "request";
export type CartLine = {
  productId: string;
  quantity: number;
  itemType?: CartItemType;
  selectedProductIds?: string[];
};
export type CustomerSession = {
  name: string;
  firstName?: string;
  lastName?: string;
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
  formDrafts?: {
    login?: { name: string; mobile: string };
    loginHere?: { phoneValue: string; countryCode: string; dialCode: string; password: string };
    otp?: string;
    digilockerOtp?: string;
    aadhaar?: string;
    ageVerification?: { confirmed: boolean };
  };
};
