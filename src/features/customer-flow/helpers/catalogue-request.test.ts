import { describe, expect, it } from "vitest";
import { canRenderCatalogueResults } from "./catalogue-request";

describe("canRenderCatalogueResults", () => {
  it("hides category A results while category B is loading", () => {
    expect(canRenderCatalogueResults("category-a", "category-b", false)).toBe(false);
  });
});
