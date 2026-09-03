import { products } from "@/features/customer-flow/data/catalogue";
import {
  customerFlowReducer,
  initialCustomerFlowState,
} from "@/features/customer-flow/state/customer-flow-reducer";

describe("customer flow reducer", () => {
  it("adds quantities for an existing cart product", () => {
    const once = customerFlowReducer(initialCustomerFlowState, {
      type: "cart/add",
      productId: products[0].id,
      quantity: 2,
    });
    const twice = customerFlowReducer(once, {
      type: "cart/add",
      productId: products[0].id,
      quantity: 1,
    });
    expect(twice.cart).toEqual([{ productId: products[0].id, quantity: 3 }]);
  });

  it("retains products from different brands", () => {
    const first = customerFlowReducer(initialCustomerFlowState, {
      type: "cart/add",
      productId: products[0].id,
      quantity: 1,
    });
    const second = customerFlowReducer(first, {
      type: "cart/add",
      productId: products[4].id,
      quantity: 2,
    });
    expect(second.cart).toHaveLength(2);
  });

  it("persists combo offers and their quantities in the shared cart", () => {
    const state = customerFlowReducer(initialCustomerFlowState, {
      type: "cart/add",
      productId: "reserve-sparkling-combo",
      itemType: "combo",
      quantity: 2,
    });

    expect(state.cart).toEqual([
      { productId: "reserve-sparkling-combo", itemType: "combo", quantity: 2 },
    ]);
  });

  it("persists the selected products for a completed gift offer", () => {
    const selectedProductIds = ["hennessy-vsop", "moet-chandon"];
    const state = customerFlowReducer(initialCustomerFlowState, {
      type: "cart/add",
      productId: "premium-trolley",
      itemType: "gift",
      quantity: 1,
      selectedProductIds,
    });

    expect(state.cart[0]).toMatchObject({ itemType: "gift", selectedProductIds });
  });

  it("clears the cart on submission but keeps the verified session", () => {
    const state = {
      ...initialCustomerFlowState,
      session: { name: "Asha", mobile: "9876543210", verified: true },
      cart: [{ productId: products[0].id, quantity: 1 }],
    };
    const next = customerFlowReducer(state, { type: "requirement/submit" });
    expect(next.cart).toEqual([]);
    expect(next.session?.verified).toBe(true);
    expect(next.showConfirmation).toBe(true);
  });

  it("resets all prototype state on logout", () => {
    const state = {
      ...initialCustomerFlowState,
      session: { name: "Asha", mobile: "9876543210", verified: true },
      cart: [{ productId: products[0].id, quantity: 1 }],
    };
    expect(customerFlowReducer(state, { type: "session/logout" })).toEqual(
      initialCustomerFlowState,
    );
  });
});
