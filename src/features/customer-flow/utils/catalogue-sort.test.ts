import { describe, expect, it } from "vitest";
import { sortCatalogueItems } from "./catalogue-sort";

describe("sortCatalogueItems", () => {
  it("orders names alphabetically without case sensitivity", () => {
    expect(
      sortCatalogueItems([
        { id: "1", name: "zebra" },
        { id: "2", name: "Apple" },
        { id: "3", name: "banana" },
      ]).map((item) => item.name),
    ).toEqual(["Apple", "banana", "zebra"]);
  });
});
