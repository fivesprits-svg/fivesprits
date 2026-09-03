import {
  brands,
  categories,
  getBrandsByCategory,
  getProductsByBrand,
  products,
} from "@/features/customer-flow/data/catalogue";

describe("customer catalogue", () => {
  it("keeps every brand connected to a category", () => {
    expect(
      brands.every((brand) => categories.some((category) => category.id === brand.categoryId)),
    ).toBe(true);
    expect(categories.every((category) => getBrandsByCategory(category.id).length > 0)).toBe(true);
  });

  it("keeps every product connected to a brand with a positive MRP", () => {
    expect(products.every((product) => brands.some((brand) => brand.id === product.brandId))).toBe(
      true,
    );
    expect(products.every((product) => product.mrp > 0)).toBe(true);
  });

  it("filters brands and products by their parent", () => {
    expect(
      getBrandsByCategory(categories[0].id).every((brand) => brand.categoryId === categories[0].id),
    ).toBe(true);
    expect(
      getProductsByBrand(brands[0].id).every((product) => product.brandId === brands[0].id),
    ).toBe(true);
  });

  it("provides enough catalogue entries to reproduce the Figma mobile grids", () => {
    expect(getBrandsByCategory("whisky")).toHaveLength(8);
    expect(getProductsByBrand("old-monk")).toHaveLength(6);
  });

  it("maps every Old Monk product to its distinct Figma image export", () => {
    const oldMonkProducts = getProductsByBrand("old-monk");
    expect(oldMonkProducts.every((product) => product.image.includes("/figma-images/"))).toBe(true);
    expect(new Set(oldMonkProducts.map((product) => product.image))).toHaveLength(6);
    expect(oldMonkProducts.find((product) => product.id === "balvenie-wood")?.image).toContain(
      "73df0c99e6acd3f7b7bb5a049588d2c058caf884",
    );
  });
});
