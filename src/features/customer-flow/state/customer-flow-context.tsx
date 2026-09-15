"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  customerFlowReducer,
  initialCustomerFlowState,
} from "@/features/customer-flow/state/customer-flow-reducer";
import {
  addToCartApi,
  clearCartApi,
  getCartApi,
  removeCartItemApi,
  updateCartItemApi,
  type CartItemPayload,
} from "@/features/customer-flow/services/cart-api";
import {
  submitOrderApi,
  getOrderHistoryApi,
  type SubmitOrderPayload,
} from "@/features/customer-flow/services/orders-api";
import { fetchCustomerProfileApi } from "@/features/customer-flow/services/user-api";
import type { UserDetails } from "@/features/customer-flow/types/state";

const STORAGE_KEY = "five-spirits-customer-flow-v1";

function buildCartItemPayload(
  productId: string,
  quantity: number,
  itemType: string,
  selectedProductIds?: string[],
  customPrice?: { mrp?: number; sale?: number },
): CartItemPayload {
  const price = {
    mrp: customPrice?.mrp ?? 0,
    sale: customPrice?.sale ?? customPrice?.mrp ?? 0,
  };
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
        const user = value.userDetails;
        if (user) {
          dispatch({
            type: "userDetails/set",
            userDetails: user,
          });
        }
        if (value.selectedCategoryId)
          dispatch({ type: "selection/category", categoryId: value.selectedCategoryId });
        if (value.selectedBrandId)
          dispatch({ type: "selection/brand", brandId: value.selectedBrandId });
      } else {
        const storedUser = window.localStorage.getItem("customer_user");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser) {
              dispatch({
                type: "userDetails/set",
                userDetails: parsedUser,
              });
            }
          } catch {}
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }

    // Fetch latest user details from /api/v1/users/me
    fetchCustomerProfileApi()
      .then((user) => {
        if (user) {
          dispatch({
            type: "userDetails/set",
            userDetails: user as Partial<UserDetails>,
          });
          if (typeof window !== "undefined") {
            window.localStorage.setItem("customer_user", JSON.stringify(user));
          }
        }
      })
      .catch(() => {});

    getCartApi()
      .then((items) => {
        if (items && items.length > 0) {
          const cartItems = items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            itemType: (item.itemType as "product" | "combo" | "gift") ?? "product",
            ...(item.selectedProductIds ? { selectedProductIds: item.selectedProductIds } : {}),
            productDetails: item.productDetails,
          }));
          dispatch({ type: "cart/set", cart: cartItems });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  const setUserDetails = useCallback((details: Partial<UserDetails>) => {
    dispatch({ type: "userDetails/set", userDetails: details });
  }, []);

  const login = useCallback((name: string, mobile: string) => {
    dispatch({ type: "session/login", name, mobile });
  }, []);

  const loginHere = useCallback(
    (mobile: string, password: string, userData?: Partial<UserDetails>) => {
      dispatch({ type: "session/login-here", mobile, password });
      if (userData) {
        dispatch({
          type: "userDetails/set",
          userDetails: { ...userData, cameFromLoginHere: true },
        });
      }
    },
    [],
  );

  const verifyOtp = useCallback((userData?: Partial<UserDetails>) => {
    dispatch({ type: "session/verify" });
    if (userData) {
      dispatch({ type: "userDetails/set", userDetails: userData });
    }
  }, []);

  const verifyAadhaar = useCallback((aadhaarNumber: string) => {
    dispatch({ type: "session/verify-aadhaar", aadhaarNumber });
  }, []);

  const verifyDigilockerOtp = useCallback(() => {
    dispatch({ type: "session/verify-digilocker-otp" });
  }, []);

  const completeVerification = useCallback((dateOfBirth: string, age: number) => {
    dispatch({ type: "session/verification-complete", dateOfBirth, age });
  }, []);

  const verifyAge = useCallback(() => {
    dispatch({ type: "session/verify-age" });
  }, []);

  const completeProfile = useCallback(() => {
    dispatch({ type: "session/profile-complete" });
  }, []);

  const selectCategory = useCallback((categoryId: string) => {
    dispatch({ type: "selection/category", categoryId });
  }, []);

  const selectBrand = useCallback((brandId: string) => {
    dispatch({ type: "selection/brand", brandId });
  }, []);

  const addToCart = useCallback(
    async (productId: string, quantity: number, productDetails?: Record<string, unknown>) => {
      const customPrice = productDetails
        ? {
            mrp: Number(productDetails.mrp ?? productDetails.mrpAmount ?? 0),
            sale: Number(
              productDetails.salePrice ??
                productDetails.saleAmount ??
                productDetails.mrp ??
                productDetails.mrpAmount ??
                0,
            ),
          }
        : undefined;
      const payload = buildCartItemPayload(productId, quantity, "product", undefined, customPrice);
      dispatch({ type: "cart/add", productId, quantity, productDetails });
      try {
        const items = await addToCartApi([payload]);
        if (items && items.length > 0) {
          const cartItems = items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            itemType: (item.itemType as "product" | "combo" | "gift") ?? "product",
            ...(item.selectedProductIds ? { selectedProductIds: item.selectedProductIds } : {}),
            productDetails: item.productDetails ?? productDetails,
          }));
          dispatch({ type: "cart/set", cart: cartItems });
        }
      } catch {}
    },
    [],
  );

  const addComboToCart = useCallback(
    async (offerId: string, quantity: number, productDetails?: Record<string, unknown>) => {
      const customPrice = productDetails
        ? {
            mrp: Number(productDetails.mrp ?? productDetails.originalPrice ?? 0),
            sale: Number(
              productDetails.salePrice ?? productDetails.offerPrice ?? productDetails.mrp ?? 0,
            ),
          }
        : undefined;
      const payload = buildCartItemPayload(offerId, quantity, "combo", undefined, customPrice);
      dispatch({
        type: "cart/add",
        productId: offerId,
        itemType: "combo",
        quantity,
        productDetails,
      });
      try {
        const items = await addToCartApi([payload]);
        if (items && items.length > 0) {
          const cartItems = items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            itemType: (item.itemType as "product" | "combo" | "gift") ?? "product",
            ...(item.selectedProductIds ? { selectedProductIds: item.selectedProductIds } : {}),
            productDetails: item.productDetails ?? productDetails,
          }));
          dispatch({ type: "cart/set", cart: cartItems });
        }
      } catch {}
    },
    [],
  );

  const addGiftToCart = useCallback(
    async (
      offerId: string,
      selectedProductIds: string[],
      productDetails?: Record<string, unknown>,
    ) => {
      const payload = buildCartItemPayload(offerId, 1, "gift", selectedProductIds);
      dispatch({
        type: "cart/gift",
        productId: offerId,
        selectedProductIds,
      });
      try {
        const items = await addToCartApi([payload]);
        if (items && items.length > 0) {
          const cartItems = items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            itemType: (item.itemType as "product" | "combo" | "gift") ?? "product",
            ...(item.selectedProductIds ? { selectedProductIds: item.selectedProductIds } : {}),
            productDetails: item.productDetails ?? productDetails,
          }));
          dispatch({ type: "cart/set", cart: cartItems });
        }
      } catch {}
    },
    [],
  );

  const syncCart = useCallback(async () => {
    try {
      const items = await getCartApi();
      if (items && items.length > 0) {
        const cartItems = items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          itemType: (item.itemType as "product" | "combo" | "gift") ?? "product",
          ...(item.selectedProductIds ? { selectedProductIds: item.selectedProductIds } : {}),
          productDetails: item.productDetails,
        }));
        dispatch({ type: "cart/set", cart: cartItems });
      }
    } catch {}
  }, []);

  const setCartQuantity = useCallback(async (productId: string, quantity: number) => {
    updateCartItemApi(productId, { quantity }).catch(() => {});
    dispatch({ type: "cart/quantity", productId, quantity });
  }, []);

  const removeFromCart = useCallback(async (productId: string) => {
    removeCartItemApi(productId).catch(() => {});
    dispatch({ type: "cart/remove", productId });
  }, []);

  const submitRequirement = useCallback(async (payload?: SubmitOrderPayload) => {
    if (payload) {
      await submitOrderApi(payload);
    }
    await clearCartApi();
    await getOrderHistoryApi();
    dispatch({ type: "requirement/submit" });
  }, []);

  const dismissConfirmation = useCallback(() => {
    dispatch({ type: "confirmation/dismiss" });
  }, []);

  const logout = useCallback(() => {
    clearCartApi().catch(() => {});
    dispatch({ type: "session/logout" });
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem("customer_access_token");
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("customer_user");
  }, []);

  const updateFormDraft = useCallback(
    (draft: {
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
    [],
  );

  return useMemo(
    () => ({
      state,
      hydrated,
      userDetails: state.userDetails,
      cartCount: state.cart.reduce((total, line) => total + line.quantity, 0),
      setUserDetails,
      login,
      loginHere,
      verifyOtp,
      verifyAadhaar,
      verifyDigilockerOtp,
      completeVerification,
      verifyAge,
      completeProfile,
      selectCategory,
      selectBrand,
      addToCart,
      addComboToCart,
      addGiftToCart,
      syncCart,
      setCartQuantity,
      removeFromCart,
      submitRequirement,
      dismissConfirmation,
      logout,
      updateFormDraft,
    }),
    [
      state,
      hydrated,
      setUserDetails,
      login,
      loginHere,
      verifyOtp,
      verifyAadhaar,
      verifyDigilockerOtp,
      completeVerification,
      verifyAge,
      completeProfile,
      selectCategory,
      selectBrand,
      addToCart,
      addComboToCart,
      addGiftToCart,
      syncCart,
      setCartQuantity,
      removeFromCart,
      submitRequirement,
      dismissConfirmation,
      logout,
      updateFormDraft,
    ],
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
