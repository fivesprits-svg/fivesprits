import { describe, expect, it } from "vitest";

import { hasResponseData } from "./api-client";

describe("hasResponseData", () => {
  it("rejects successful-looking payloads that omit the data field", () => {
    expect(hasResponseData({ success: true })).toBe(false);
  });

  it("accepts payloads with data, including a null value", () => {
    expect(hasResponseData({ success: true, data: null })).toBe(true);
  });
});
