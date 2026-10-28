import { describe, expect, it } from "vitest";
import { canGuestViewPath } from "./auth-guards";

describe("canGuestViewPath", () => {
  it("allows guest navigation throughout the catalogue", () => {
    expect(canGuestViewPath("/categories")).toBe(true);
    expect(canGuestViewPath("/brands/")).toBe(true);
    expect(canGuestViewPath("/products/")).toBe(true);
  });

  it("keeps request and account pages unavailable to guests", () => {
    expect(canGuestViewPath("/cart")).toBe(false);
    expect(canGuestViewPath("/profile")).toBe(false);
  });
});
