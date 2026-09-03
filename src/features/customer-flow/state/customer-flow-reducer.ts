import type { CustomerFlowAction, CustomerFlowState } from "@/features/customer-flow/types";

export const initialCustomerFlowState: CustomerFlowState = {
  session: null,
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
    case "session/login":
      return { ...state, session: { name: action.name, mobile: action.mobile, verified: false } };
    case "session/verify":
      return state.session ? { ...state, session: { ...state.session, verified: true } } : state;
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
    case "requirement/submit":
      return { ...state, cart: [], showConfirmation: true };
    case "confirmation/dismiss":
      return { ...state, showConfirmation: false };
    case "session/logout":
      return initialCustomerFlowState;
  }
}
