import type { CustomerFlowAction, CustomerFlowState } from "@/features/customer-flow/types";

export const initialCustomerFlowState: CustomerFlowState = {
  userDetails: null,
  selectedCategoryId: null,
  selectedBrandId: null,
  cart: [],
  showConfirmation: false,
};

export function customerFlowReducer(
  state: CustomerFlowState,
  action: CustomerFlowAction,
): CustomerFlowState {
  switch (action.type) {
    case "userDetails/set": {
      const incoming = action.userDetails;
      const prev = state.userDetails ?? {};
      const resolvedName =
        incoming.name ||
        incoming.username ||
        (incoming.firstName || incoming.lastName
          ? `${incoming.firstName || ""} ${incoming.lastName || ""}`.trim()
          : undefined) ||
        prev.name ||
        "";
      const resolvedMobile = incoming.mobile || incoming.mobileNumber || prev.mobile || "";

      return {
        ...state,
        userDetails: {
          ...prev,
          ...incoming,
          name: resolvedName,
          mobile: resolvedMobile,
          verified: incoming.verified ?? prev?.verified ?? true,
          ...(prev?.formDrafts || incoming.formDrafts
            ? { formDrafts: incoming.formDrafts || prev?.formDrafts }
            : {}),
        },
      };
    }
    case "session/login":
      return {
        ...state,
        userDetails: {
          ...(state.userDetails || {}),
          name: action.name,
          mobile: action.mobile,
          verified: false,
          ...(state.userDetails?.formDrafts ? { formDrafts: state.userDetails.formDrafts } : {}),
        },
      };
    case "session/login-here":
      return {
        ...state,
        userDetails: {
          ...(state.userDetails || {}),
          name: state.userDetails?.name || "",
          mobile: action.mobile,
          verified: true,
          cameFromLoginHere: true,
          ...(state.userDetails?.formDrafts ? { formDrafts: state.userDetails.formDrafts } : {}),
        },
      };
    case "session/verify":
      return state.userDetails
        ? { ...state, userDetails: { ...state.userDetails, verified: true } }
        : state;
    case "session/verify-aadhaar":
      return state.userDetails
        ? {
            ...state,
            userDetails: {
              ...state.userDetails,
              aadhaarNumber: action.aadhaarNumber,
              aadhaarVerified: true,
            },
          }
        : state;
    case "session/verify-digilocker-otp":
      return state.userDetails
        ? { ...state, userDetails: { ...state.userDetails, digilockerOtpVerified: true } }
        : state;
    case "session/verification-complete":
      return state.userDetails
        ? {
            ...state,
            userDetails: {
              ...state.userDetails,
              verificationComplete: true,
              dateOfBirth: action.dateOfBirth,
              age: action.age,
            },
          }
        : state;
    case "session/verify-age":
      return state.userDetails
        ? { ...state, userDetails: { ...state.userDetails, ageVerified: true } }
        : state;
    case "session/profile-complete":
      return state.userDetails
        ? { ...state, userDetails: { ...state.userDetails, profileComplete: true } }
        : state;
    case "selection/category":
      return { ...state, selectedCategoryId: action.categoryId, selectedBrandId: null };
    case "selection/brand":
      return { ...state, selectedBrandId: action.brandId };
    case "cart/gift": {
      const giftLine = {
        productId: action.productId,
        itemType: "gift" as const,
        quantity: 1,
        selectedProductIds: action.selectedProductIds,
      };
      return {
        ...state,
        cart: state.cart.some((line) => line.productId === action.productId)
          ? state.cart.map((line) => (line.productId === action.productId ? giftLine : line))
          : [...state.cart, giftLine],
      };
    }
    case "cart/add": {
      const current = state.cart.find((line) => line.productId === action.productId);
      return {
        ...state,
        cart: current
          ? state.cart.map((line) =>
              line.productId === action.productId
                ? {
                    ...line,
                    quantity: line.quantity + Math.max(1, action.quantity),
                    selectedProductIds: action.selectedProductIds ?? line.selectedProductIds,
                    productDetails: action.productDetails ?? line.productDetails,
                  }
                : line,
            )
          : [
              ...state.cart,
              {
                productId: action.productId,
                quantity: Math.max(1, action.quantity),
                ...(action.itemType ? { itemType: action.itemType } : {}),
                ...(action.selectedProductIds
                  ? { selectedProductIds: action.selectedProductIds }
                  : {}),
                ...(action.productDetails ? { productDetails: action.productDetails } : {}),
              },
            ],
      };
    }
    case "cart/quantity":
      return {
        ...state,
        cart: state.cart.map((line) =>
          line.productId === action.productId
            ? { ...line, quantity: Math.max(1, action.quantity) }
            : line,
        ),
      };
    case "cart/remove":
      return { ...state, cart: state.cart.filter((line) => line.productId !== action.productId) };
    case "cart/set":
      return { ...state, cart: action.cart };
    case "cart/clear":
      return { ...state, cart: [] };
    case "requirement/submit":
      return { ...state, cart: [], showConfirmation: true };
    case "confirmation/dismiss":
      return { ...state, showConfirmation: false };
    case "session/logout":
      return initialCustomerFlowState;
    case "form-draft/login":
      return {
        ...state,
        userDetails: state.userDetails
          ? {
              ...state.userDetails,
              formDrafts: {
                ...state.userDetails.formDrafts,
                login: { name: action.name, mobile: action.mobile },
              },
            }
          : {
              name: "",
              mobile: "",
              verified: false,
              formDrafts: { login: { name: action.name, mobile: action.mobile } },
            },
      };
    case "form-draft/login-here":
      return {
        ...state,
        userDetails: state.userDetails
          ? {
              ...state.userDetails,
              formDrafts: {
                ...state.userDetails.formDrafts,
                loginHere: {
                  phoneValue: action.phoneValue,
                  countryCode: action.countryCode,
                  dialCode: action.dialCode,
                  password: action.password,
                },
              },
            }
          : {
              name: "",
              mobile: "",
              verified: false,
              formDrafts: {
                loginHere: {
                  phoneValue: action.phoneValue,
                  countryCode: action.countryCode,
                  dialCode: action.dialCode,
                  password: action.password,
                },
              },
            },
      };
    case "form-draft/otp":
      return state.userDetails
        ? {
            ...state,
            userDetails: {
              ...state.userDetails,
              formDrafts: { ...state.userDetails.formDrafts, otp: action.otp },
            },
          }
        : state;
    case "form-draft/digilocker-otp":
      return state.userDetails
        ? {
            ...state,
            userDetails: {
              ...state.userDetails,
              formDrafts: { ...state.userDetails.formDrafts, digilockerOtp: action.otp },
            },
          }
        : state;
    case "form-draft/aadhaar":
      return state.userDetails
        ? {
            ...state,
            userDetails: {
              ...state.userDetails,
              formDrafts: { ...state.userDetails.formDrafts, aadhaar: action.aadhaar },
            },
          }
        : state;
    case "form-draft/age-verification":
      return state.userDetails
        ? {
            ...state,
            userDetails: {
              ...state.userDetails,
              formDrafts: {
                ...state.userDetails.formDrafts,
                ageVerification: { confirmed: action.confirmed },
              },
            },
          }
        : state;
  }
}
