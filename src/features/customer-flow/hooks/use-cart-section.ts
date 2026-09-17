"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { buildStructuredCart } from "@/features/customer-flow/helpers/cart-view-model";
import type { RequirementHistoryEntry } from "@/features/customer-flow/types";
import { logoutApi } from "@/features/customer-flow/services/auth-api";
import { fetchCustomerProfileApi } from "@/features/customer-flow/services/user-api";
import { getOrderHistoryApi } from "@/features/customer-flow/services/orders-api";
import { useToast } from "@/features/customer-flow/components/ui/toast";

export function useCartSection() {
  const router = useRouter();
  const {
    state,
    setCartQuantity,
    removeFromCart,
    submitRequirement,
    dismissConfirmation,
    logout,
    syncCart,
  } = useCustomerFlow();

  const [submitting, setSubmitting] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const [requirementHistory, setRequirementHistory] = useState<RequirementHistoryEntry[]>([]);
  const [profileData, setProfileData] = useState({ address: "", permitNumber: "" });
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  useEffect(() => {
    let isMounted = true;
    syncCart();

    fetchCustomerProfileApi().then((user) => {
      if (!isMounted || !user) return;
      setProfileData({
        address: user.address ?? "",
        permitNumber: user.permitNumber ?? "",
      });
    });

    getOrderHistoryApi()
      .then((orders) => {
        if (!isMounted || !orders || orders.length === 0) return;
        const mapped: RequirementHistoryEntry[] = orders.map((order) => ({
          id: order._id,
          requirementNo: order.orderNumber ?? order._id,
          date: order.createdAt
            ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "",
          status: (order.status as RequirementHistoryEntry["status"]) ?? "In Review",
          permitNumber: order.permitNumber ?? "",
          deliveryAddress: order.deliveryAddress ?? "",
          totalItems: order.totalItems ?? order.items?.length ?? 0,
          totalOriginalMrp: order.totalMrp ?? 0,
          totalSalePrice: order.totalSalePrice ?? 0,
          items: (order.items ?? []).map((rawItem: unknown) => {
            const item = (rawItem ?? {}) as Record<string, unknown>;
            const rawProd = (
              typeof item.productId === "object" && item.productId !== null ? item.productId : {}
            ) as Record<string, unknown>;
            const details = (item.productDetails ?? {}) as Record<string, unknown>;

            const name = String(
              item.name ||
                details.name ||
                details.productName ||
                details.comboName ||
                details.giftName ||
                rawProd.name ||
                rawProd.title ||
                item.productId ||
                "Product",
            );
            const rawSize =
              item.pack || details.pack || details.size || rawProd.pack || rawProd.size || "";
            const pack = rawSize
              ? /^\d+$/.test(String(rawSize).trim())
                ? `${rawSize}ml`
                : String(rawSize)
              : "";
            const image = String(
              item.image ||
                item.productImageUrl ||
                item.imageUrl ||
                details.image ||
                details.productImageUrl ||
                details.offerImageUrl ||
                details.imageUrl ||
                rawProd.image ||
                rawProd.productImageUrl ||
                rawProd.imageUrl ||
                "",
            );
            const price = Number(
              item.salePrice ??
                item.price ??
                item.mrp ??
                details.salePrice ??
                details.saleAmount ??
                details.mrp ??
                details.mrpAmount ??
                0,
            );

            return {
              name,
              pack,
              quantity: Number(item.quantity ?? 1),
              price,
              image,
            };
          }),
        }));
        setRequirementHistory(mapped);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [syncCart]);

  const isRegularUser = Boolean(
    state.userDetails?.userType === "regular" ||
    state.userDetails?.cameFromLoginHere ||
    state.userDetails?.mobile ||
    state.userDetails?.mobileNumber ||
    state.userDetails?._id,
  );
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
      const orderItems = state.cart.map((line) => {
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
        deliveryAddress: profileData.address,
        permitNumber: profileData.permitNumber,
      });
      showSuccessToast("Requirement submitted successfully.");
    } catch (err) {
      showErrorToast(err instanceof Error ? err.message : "Failed to submit requirement.");
      setSubmitting(false);
    }
  }, [
    state.cart,
    profileData.address,
    profileData.permitNumber,
    submitRequirement,
    showSuccessToast,
    showErrorToast,
  ]);

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
