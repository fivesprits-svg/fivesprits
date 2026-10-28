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

  it("starts a guest session that can browse without completing customer verification", () => {
    const next = customerFlowReducer(initialCustomerFlowState, {
      type: "session/login-as-guest",
      accessToken: "guest-token",
    });

    expect(next.accessToken).toBe("guest-token");
    expect(next.userDetails).toMatchObject({
      name: "Guest",
      verified: true,
      isGuest: true,
      verificationSkipped: true,
      profileComplete: true,
    });
  });
});
