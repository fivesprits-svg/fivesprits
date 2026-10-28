import { describe, expect, it } from "vitest";
import { isValidComboOfferId } from "./offers-api";

describe("isValidComboOfferId", () => {
  it("rejects malformed offer IDs before making an API request", () => {
    expect(isValidComboOfferId("weuirwirh")).toBe(false);
  });

  it("accepts MongoDB object IDs used by combo offers", () => {
    expect(isValidComboOfferId("507f1f77bcf86cd799439011")).toBe(true);
  });
});
