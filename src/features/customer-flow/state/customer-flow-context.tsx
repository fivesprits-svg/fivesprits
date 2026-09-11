"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import {
  customerFlowReducer,
  initialCustomerFlowState,
} from "@/features/customer-flow/state/customer-flow-reducer";
import {
  addToCartApi,
  getCartApi,
  removeCartItemApi,
  updateCartItemApi,
  clearCartApi,
  type CartItemPayload,
} from "@/features/customer-flow/services/cart-api";
import {
  submitOrderApi,
  getOrderHistoryApi,
  type SubmitOrderPayload,
} from "@/features/customer-flow/services/orders-api";
import { products as defaultProducts } from "@/features/customer-flow/data/catalogue";
import {
  comboOffers as defaultComboOffers,
  giftOffer as defaultGiftOffer,
  giftProducts as defaultGiftProducts,
} from "@/features/customer-flow/data/offers";

const STORAGE_KEY = "five-spirits-customer-flow-v1";

function lookupProductPrice(productId: string): { mrp: number; sale: number } {
  const product = defaultProducts.find((p) => p.id === productId);
  if (product) return { mrp: product.mrp, sale: product.mrp };
  return { mrp: 0, sale: 0 };
}

function lookupComboPrice(offerId: string): { mrp: number; sale: number } {
  const offer = defaultComboOffers.find((o) => o.id === offerId);
  if (offer) return { mrp: offer.mrp, sale: offer.salePrice };
  return { mrp: 0, sale: 0 };
}

function lookupGiftPrice(): { mrp: number; sale: number } {
  const totalMrp = defaultGiftProducts.reduce((sum, p) => sum + p.mrp, 0);
  const totalSale = defaultGiftProducts.reduce((sum, p) => sum + p.salePrice, 0);
  return {
    mrp: totalMrp || defaultGiftOffer.requiredQuantity * 5150,
    sale: totalSale || defaultGiftOffer.requiredQuantity * 3890,
  };
}

function buildCartItemPayload(
  productId: string,
  quantity: number,
  itemType: string,
  selectedProductIds?: string[],
): CartItemPayload {
  let price = { mrp: 0, sale: 0 };
  if (itemType === "combo") {
    price = lookupComboPrice(productId);
  } else if (itemType === "gift") {
    price = lookupGiftPrice();
  } else {
    price = lookupProductPrice(productId);
  }
  return {
    productId,
    quantity,
    itemType,
    ...(selectedProductIds ? { selectedProductIds } : {}),
    mrpAmount: price.mrp,
    salesAmount: price.sale,
  };
}

type CustomerFlowContextValue = ReturnType<typeof useCustomerFlowValue>;
const CustomerFlowContext = createContext<CustomerFlowContextValue | null>(null);

function useCustomerFlowValue() {
  const [state, dispatch] = useReducer(customerFlowReducer, initialCustomerFlowState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const value = JSON.parse(stored) as typeof initialCustomerFlowState;
        if (value.session)
          dispatch({
            type: "session/login",
            name: value.session.name,
            mobile: value.session.mobile,
          });
        if (value.session?.cameFromLoginHere && value.session.mobile)
          dispatch({
            type: "session/login-here",
            mobile: value.session.mobile,
            password: "",
          });
        if (value.session?.verified) dispatch({ type: "session/verify" });
        if (value.session?.aadhaarVerified && value.session.aadhaarNumber)
          dispatch({ type: "session/verify-aadhaar", aadhaarNumber: value.session.aadhaarNumber });
        if (value.session?.digilockerOtpVerified)
          dispatch({ type: "session/verify-digilocker-otp" });
        if (
          value.session?.verificationComplete &&
          value.session.dateOfBirth &&
          value.session.age != null
        )
          dispatch({
            type: "session/verification-complete",
            dateOfBirth: value.session.dateOfBirth,
            age: value.session.age,
          });
        if (value.session?.ageVerified) dispatch({ type: "session/verify-age" });
        if (value.session?.profileComplete) dispatch({ type: "session/profile-complete" });
        if (value.selectedCategoryId)
          dispatch({ type: "selection/category", categoryId: value.selectedCategoryId });
        if (value.selectedBrandId)
          dispatch({ type: "selection/brand", brandId: value.selectedBrandId });
        value.cart?.forEach((line) => dispatch({ type: "cart/add", ...line }));
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }

    getCartApi()
      .then((items) => {
        if (items && items.length > 0) {
          items.forEach((item) => {
            dispatch({
              type: "cart/add",
              productId: item.productId,
              quantity: item.quantity,
              itemType: (item.itemType as "product" | "combo" | "gift") ?? "product",
              ...(item.selectedProductIds ? { selectedProductIds: item.selectedProductIds } : {}),
            });
          });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  return useMemo(
    () => ({
      state,
      hydrated,
      cartCount: state.cart.reduce((total, line) => total + line.quantity, 0),
      login: (name: string, mobile: string) => dispatch({ type: "session/login", name, mobile }),
      loginHere: (mobile: string, password: string) =>
        dispatch({ type: "session/login-here", mobile, password }),
      verifyOtp: () => dispatch({ type: "session/verify" }),
      verifyAadhaar: (aadhaarNumber: string) =>
        dispatch({ type: "session/verify-aadhaar", aadhaarNumber }),
      verifyDigilockerOtp: () => dispatch({ type: "session/verify-digilocker-otp" }),
      completeVerification: (dateOfBirth: string, age: number) =>
        dispatch({ type: "session/verification-complete", dateOfBirth, age }),
      verifyAge: () => dispatch({ type: "session/verify-age" }),
      completeProfile: () => dispatch({ type: "session/profile-complete" }),
      selectCategory: (categoryId: string) => dispatch({ type: "selection/category", categoryId }),
      selectBrand: (brandId: string) => dispatch({ type: "selection/brand", brandId }),
      addToCart: async (productId: string, quantity: number) => {
        const payload = buildCartItemPayload(productId, quantity, "product");
        addToCartApi([payload]).catch(() => {});
        dispatch({ type: "cart/add", productId, quantity });
      },
      addComboToCart: async (offerId: string, quantity: number) => {
        const payload = buildCartItemPayload(offerId, quantity, "combo");
        addToCartApi([payload]).catch(() => {});
        dispatch({ type: "cart/add", productId: offerId, itemType: "combo", quantity });
      },
      addGiftToCart: async (offerId: string, selectedProductIds: string[]) => {
        const payload = buildCartItemPayload(offerId, 1, "gift", selectedProductIds);
        addToCartApi([payload]).catch(() => {});
        dispatch({
          type: "cart/gift",
          productId: offerId,
          selectedProductIds,
        });
      },
      setCartQuantity: async (productId: string, quantity: number) => {
        updateCartItemApi(productId, { quantity }).catch(() => {});
        dispatch({ type: "cart/quantity", productId, quantity });
      },
      removeFromCart: async (productId: string) => {
        removeCartItemApi(productId).catch(() => {});
        dispatch({ type: "cart/remove", productId });
      },
      submitRequirement: async (payload?: SubmitOrderPayload) => {
        if (payload) {
          await submitOrderApi(payload);
        }
        await clearCartApi();
        await getOrderHistoryApi();
        dispatch({ type: "requirement/submit" });
      },
      dismissConfirmation: () => dispatch({ type: "confirmation/dismiss" }),
      logout: () => {
        clearCartApi().catch(() => {});
        dispatch({ type: "session/logout" });
        window.localStorage.removeItem(STORAGE_KEY);
        window.localStorage.removeItem("customer_access_token");
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("customer_user");
      },
      updateFormDraft: (draft: {
        type: "login" | "login-here" | "otp" | "digilocker-otp" | "aadhaar" | "age-verification";
        data: Record<string, unknown>;
      }) => {
        switch (draft.type) {
          case "login":
            dispatch({
              type: "form-draft/login",
              name: draft.data.name as string,
              mobile: draft.data.mobile as string,
            });
            break;
          case "login-here":
            dispatch({
              type: "form-draft/login-here",
              phoneValue: draft.data.phoneValue as string,
              countryCode: draft.data.countryCode as string,
              dialCode: draft.data.dialCode as string,
              password: draft.data.password as string,
            });
            break;
          case "otp":
            dispatch({ type: "form-draft/otp", otp: draft.data.otp as string });
            break;
          case "digilocker-otp":
            dispatch({ type: "form-draft/digilocker-otp", otp: draft.data.otp as string });
            break;
          case "aadhaar":
            dispatch({ type: "form-draft/aadhaar", aadhaar: draft.data.aadhaar as string });
            break;
          case "age-verification":
            dispatch({
              type: "form-draft/age-verification",
              confirmed: draft.data.confirmed as boolean,
            });
            break;
        }
      },
    }),
    [hydrated, state],
  );
}

export function CustomerFlowProvider({ children }: { children: React.ReactNode }) {
  const value = useCustomerFlowValue();
  return <CustomerFlowContext.Provider value={value}>{children}</CustomerFlowContext.Provider>;
}

export function useCustomerFlow() {
  const value = useContext(CustomerFlowContext);
  if (!value) throw new Error("useCustomerFlow must be used inside CustomerFlowProvider");
  return value;
}
