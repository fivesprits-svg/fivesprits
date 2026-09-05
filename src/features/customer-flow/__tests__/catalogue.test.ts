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

  it("ensures each brand has at least 10 products", () => {
    expect(getBrandsByCategory("whisky")).toHaveLength(8);
    expect(brands.every((brand) => getProductsByBrand(brand.id).length >= 10)).toBe(true);
  });
});
