import { describe, expect, it } from "vitest";
import { getDigilockerStatus } from "./digilocker-status";

describe("getDigilockerStatus", () => {
  it("marks a case-insensitive verified status as verified", () => {
    expect(getDigilockerStatus("verified")).toEqual({ label: "Verified", verified: true });
    expect(getDigilockerStatus("VERIFIED")).toEqual({ label: "Verified", verified: true });
  });

  it("uses a placeholder when no status is available", () => {
    expect(getDigilockerStatus()).toEqual({ label: "--", verified: false });
  });
});
