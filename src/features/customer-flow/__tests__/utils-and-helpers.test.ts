import { formatMrp } from "@/features/customer-flow/utils/currency";
import { validateLogin } from "@/features/customer-flow/utils/login-validation";
import { buildCartRows } from "@/features/customer-flow/helpers/cart-view-model";
import { brands, products } from "@/features/customer-flow/data/catalogue";
import { comboOffers, giftOffer } from "@/features/customer-flow/data/offers";

describe("customer flow utilities", () => {
  it("validates the Figma login fields", () => {
    expect(validateLogin("", "123")).toEqual({
      name: "Please enter your name",
      mobile: "Enter a valid 10-digit mobile number",
    });
  });

  it("formats MRP for the catalogue", () => {
    expect(formatMrp(2450)).toBe("₹2,450");
  });

  it("resolves products, combo offers, and gifts into cart rows", () => {
    const rows = buildCartRows(
      [
        { productId: products[0].id, quantity: 1 },
        { productId: comboOffers[0].id, itemType: "combo", quantity: 2 },
        {
          productId: giftOffer.id,
          itemType: "gift",
          quantity: 1,
          selectedProductIds: ["hennessy-vsop"],
        },
      ],
      products,
      brands,
      comboOffers,
      giftOffer,
    );

    expect(rows.map((row) => row.type)).toEqual(["product", "combo", "gift"]);
    expect(rows[2].detail).toContain("1 selected item");
  });
});
