"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { buildStructuredCart } from "@/features/customer-flow/helpers/cart-view-model";
import { mapRequirementHistory } from "@/features/customer-flow/helpers/requirement-history";
import type { RequirementHistoryEntry } from "@/features/customer-flow/types";
import { logoutApi } from "@/features/customer-flow/services/auth-api";
import {
  getOrderHistoryApi,
  type OrderHistoryEntry,
} from "@/features/customer-flow/services/orders-api";
import { getAuthToken } from "@/features/customer-flow/services/api-client";
import { useToast } from "@/features/customer-flow/components/ui/toast";

const orderHistoryRequests = new Map<string, Promise<OrderHistoryEntry[]>>();

export function useCartSection() {
  const router = useRouter();
  const { state, setCartQuantity, removeFromCart, submitRequirement, dismissConfirmation, logout } =
    useCustomerFlow();
  const userDetails = state.userDetails;

  const [submitting, setSubmitting] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const [requirementHistory, setRequirementHistory] = useState<RequirementHistoryEntry[]>([]);
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  useEffect(() => {
    let isMounted = true;
    const userKey = getAuthToken() ?? "anonymous";
    let request = orderHistoryRequests.get(userKey);
    if (!request) {
      request = getOrderHistoryApi();
      orderHistoryRequests.set(userKey, request);
    }

    request
      .then((orders) => {
        if (!isMounted) return;
        setRequirementHistory(mapRequirementHistory(orders));
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const isRegularUser = Boolean(state.userDetails?.userType === "regular");
  console.log(state.cart);

  const handleLogout = useCallback(async () => {
    if (logoutLoading) return;
    setShowConfirmPopup(false);
    setSubmitting(false);
    setLogoutLoading(true);
    try {
      await logoutApi();
      logout();
      router.push("/");
    } catch {
      setLogoutLoading(false);
    }
  }, [logoutLoading, logout, router]);

  const handleConfirmSubmit = useCallback(async () => {
    setSubmitting(true);
    try {
      const orderItems = state.cart
        .filter((line) => !line.outOfStock)
        .map((line) => {
          const details = (line.productDetails ?? {}) as Record<string, unknown>;
          const mrp = Number(details.mrp ?? details.mrpAmount ?? details.originalPrice ?? 0);
          const salePrice = Number(
            details.salePrice ?? details.saleAmount ?? details.offerPrice ?? mrp,
          );
          return {
            productId: line.productId,
            quantity: line.quantity,
            itemType: line.itemType ?? "product",
            ...(line.selectedProductIds ? { selectedProductIds: line.selectedProductIds } : {}),
            mrp,
            salePrice,
          };
        });

      await submitRequirement({
        items: orderItems,
        deliveryAddress: userDetails?.address ?? "",
        permitNumber: userDetails?.permitNumber ?? "",
      });
      orderHistoryRequests.delete(getAuthToken() ?? "anonymous");
      const orders = await getOrderHistoryApi();
      setRequirementHistory(mapRequirementHistory(orders));
      showSuccessToast("Requirement submitted successfully.");
    } catch (err) {
      showErrorToast(err instanceof Error ? err.message : "Failed to submit requirement.");
      setSubmitting(false);
    }
  }, [state.cart, userDetails, submitRequirement, showSuccessToast, showErrorToast]);

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirmPopup(false);
    setSubmitting(false);
    dismissConfirmation();
  }, [dismissConfirmation]);

  const structuredCart = useMemo(
    () => buildStructuredCart(state.cart, [], [], [], undefined),
    [state.cart],
  );

  return {
    state,
    structuredCart,
    requirementHistory,
    isRegularUser,
    submitting,
    logoutLoading,
    showConfirmPopup,
    setShowConfirmPopup,
    handleConfirmSubmit,
    handleDismissConfirmation,
    handleLogout,
    setCartQuantity,
    removeFromCart,
  };
}
