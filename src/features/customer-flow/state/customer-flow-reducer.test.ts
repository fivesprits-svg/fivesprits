import { describe, expect, it } from "vitest";
import { customerFlowReducer, initialCustomerFlowState } from "./customer-flow-reducer";

describe("customerFlowReducer", () => {
  it("allows an authenticated customer to skip post-login verification", () => {
    const state = {
      ...initialCustomerFlowState,
      userDetails: { name: "Customer", mobile: "9999999999", verified: true },
    };

    const next = customerFlowReducer(state, { type: "session/skip-verification" });

    expect(next.userDetails).toMatchObject({
      verificationSkipped: true,
      ageVerified: true,
    });
    expect(next.userDetails?.verificationComplete).toBeUndefined();
  });
});
