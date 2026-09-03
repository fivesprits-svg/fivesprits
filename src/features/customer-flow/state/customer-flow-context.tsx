"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import {
  customerFlowReducer,
  initialCustomerFlowState,
} from "@/features/customer-flow/state/customer-flow-reducer";

const STORAGE_KEY = "five-spirits-customer-flow-v1";

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
      addToCart: (productId: string, quantity: number) =>
        dispatch({ type: "cart/add", productId, quantity }),
      addComboToCart: (offerId: string, quantity: number) =>
        dispatch({ type: "cart/add", productId: offerId, itemType: "combo", quantity }),
      addGiftToCart: (offerId: string, selectedProductIds: string[]) =>
        dispatch({
          type: "cart/gift",
          productId: offerId,
          selectedProductIds,
        }),
      setCartQuantity: (productId: string, quantity: number) =>
        dispatch({ type: "cart/quantity", productId, quantity }),
      removeFromCart: (productId: string) => dispatch({ type: "cart/remove", productId }),
      submitRequirement: () => dispatch({ type: "requirement/submit" }),
      dismissConfirmation: () => dispatch({ type: "confirmation/dismiss" }),
      logout: () => {
        dispatch({ type: "session/logout" });
        window.localStorage.removeItem(STORAGE_KEY);
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
