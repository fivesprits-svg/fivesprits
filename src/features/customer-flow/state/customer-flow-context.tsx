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
  type CartItemResponse,
} from "@/features/customer-flow/services/cart-api";
import {
  submitOrderApi,
  getOrderHistoryApi,
  type SubmitOrderPayload,
} from "@/features/customer-flow/services/orders-api";
import { fetchCustomerProfileApi } from "@/features/customer-flow/services/user-api";
import { clearAuthStorage, getAuthToken } from "@/features/customer-flow/services/api-client";
import type { CartLine, UserDetails } from "@/features/customer-flow/types/state";

const STORAGE_KEY = "five-spirits-customer-flow-v1";

function normalizeProductId(productId: unknown): string {
  if (!productId) return "";
  if (typeof productId === "string") return productId;
  if (typeof productId === "object" && productId !== null) {
    const obj = productId as Record<string, unknown>;
    return String(obj._id || obj.id || obj.productId || "");
  }
  return String(productId);
}

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

function formatCartItem(
  item: CartLine | CartItemResponse,
  fallbackDetails?: Record<string, unknown>,
) {
  const rawDetails = (item.productDetails ?? fallbackDetails ?? {}) as Record<string, unknown>;
  const itemSale = "saleAmount" in item ? item.saleAmount : undefined;
  const itemMrp = "mrpAmount" in item ? item.mrpAmount : "mrp" in item ? item.mrp : undefined;
  const priceChange = "change" in item ? item.change?.saleAmount : undefined;
  const salePrice = Number(
    priceChange?.current ??
      rawDetails.salePrice ??
      rawDetails.saleAmount ??
      item.salePrice ??
      itemSale ??
      rawDetails.offerPrice ??
      rawDetails.mrp ??
      rawDetails.mrpAmount ??
      itemMrp ??
      0,
  );
  const mrp = Number(
    rawDetails.mrp ?? rawDetails.mrpAmount ?? rawDetails.originalPrice ?? itemMrp ?? salePrice,
  );

  const productDetails = {
    ...rawDetails,
    mrp: mrp || salePrice,
    mrpAmount: mrp || salePrice,
    salePrice,
    saleAmount: salePrice,
    outOfStock: Boolean(rawDetails.outOfStock),
  };

  return {
    productId: normalizeProductId(item.productId),
    quantity: item.quantity,
    itemType: (item.itemType as "product" | "combo" | "gift") ?? "product",
    ...(item.selectedProductIds ? { selectedProductIds: item.selectedProductIds } : {}),
    salePrice,
    saleAmount: salePrice,
    mrp: mrp || salePrice,
    ...(priceChange?.snapshot != null && priceChange.current != null
      ? {
          priceChange: {
            snapshot: Number(priceChange.snapshot),
            current: Number(priceChange.current),
          },
        }
      : {}),
    outOfStock: Boolean(rawDetails.outOfStock),
    productDetails,
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
        if (Array.isArray(value.cart) && value.cart.length > 0) {
          dispatch({
            type: "cart/set",
            cart: value.cart.map((line) => formatCartItem(line)),
          });
        }
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

    if (!getAuthToken()) return;

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
          const cartItems = items.map((item) => formatCartItem(item));
          dispatch({ type: "cart/set", cart: cartItems });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleAuthExpired = () => {
      dispatch({ type: "session/logout" });
      window.localStorage.removeItem(STORAGE_KEY);
      clearAuthStorage();
      window.location.replace("/");
    };

    window.addEventListener("customer-auth-expired", handleAuthExpired);
    return () => window.removeEventListener("customer-auth-expired", handleAuthExpired);
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
      const mrp = productDetails ? Number(productDetails.mrp ?? productDetails.mrpAmount ?? 0) : 0;
      const sale = productDetails
        ? Number(
            productDetails.salePrice ??
              productDetails.saleAmount ??
              productDetails.offerPrice ??
              mrp,
          )
        : 0;
      const enrichedDetails = productDetails
        ? {
            ...productDetails,
            mrp: mrp || sale,
            mrpAmount: mrp || sale,
            salePrice: sale,
            saleAmount: sale,
          }
        : undefined;
      const customPrice = productDetails ? { mrp, sale } : undefined;
      const payload = buildCartItemPayload(productId, quantity, "product", undefined, customPrice);
      dispatch({ type: "cart/add", productId, quantity, productDetails: enrichedDetails });
      try {
        const items = await addToCartApi([payload]);
        if (items && items.length > 0) {
          const cartItems = items.map((item) => formatCartItem(item, enrichedDetails));
          dispatch({ type: "cart/set", cart: cartItems });
        }
      } catch {}
    },
    [],
  );

  const addComboToCart = useCallback(
    async (offerId: string, quantity: number, productDetails?: Record<string, unknown>) => {
      const mrp = productDetails
        ? Number(productDetails.mrp ?? productDetails.originalPrice ?? 0)
        : 0;
      const sale = productDetails
        ? Number(
            productDetails.salePrice ??
              productDetails.offerPrice ??
              productDetails.saleAmount ??
              mrp,
          )
        : 0;
      const enrichedDetails = productDetails
        ? {
            ...productDetails,
            mrp: mrp || sale,
            originalPrice: mrp || sale,
            salePrice: sale,
            saleAmount: sale,
          }
        : undefined;
      const customPrice = productDetails ? { mrp, sale } : undefined;
      const payload = buildCartItemPayload(offerId, quantity, "combo", undefined, customPrice);
      dispatch({
        type: "cart/add",
        productId: offerId,
        itemType: "combo",
        quantity,
        productDetails: enrichedDetails,
      });
      try {
        const items = await addToCartApi([payload]);
        if (items && items.length > 0) {
          const cartItems = items.map((item) => formatCartItem(item, enrichedDetails));
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
          const cartItems = items.map((item) => formatCartItem(item, productDetails));
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
        const cartItems = items.map((item) => formatCartItem(item));
        dispatch({ type: "cart/set", cart: cartItems });
      }
    } catch {}
  }, []);

  const setCartQuantity = useCallback(async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeCartItemApi(productId).catch(() => {});
      dispatch({ type: "cart/remove", productId });
    } else {
      updateCartItemApi(productId, { quantity }).catch(() => {});
      dispatch({ type: "cart/quantity", productId, quantity });
    }
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
    clearAuthStorage();
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
      cartCount: state.cartCount,
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
