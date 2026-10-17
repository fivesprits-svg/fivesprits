import { describe, expect, it } from "vitest";
import { mapBackendProduct } from "./products-api";

describe("mapBackendProduct", () => {
  it("uses brand, size, and readable unit type for product-card display", () => {
    const product = mapBackendProduct({
      _id: "product-1",
      brandId: "brand-1",
      categoryId: "category-1",
      name: "Kingfisher 750",
      brandName: "Kingfisher",
      size: "750",
      unitTypeId: { _id: "unit-1", customId: "UT000002", name: "Bottle" },
      mrpAmount: 120,
      saleAmount: 120,
    });

    expect(product).toMatchObject({
      name: "Kingfisher 750",
      displayName: "Kingfisher",
      pack: "750",
      unitType: "Bottle",
    });
  });
});
