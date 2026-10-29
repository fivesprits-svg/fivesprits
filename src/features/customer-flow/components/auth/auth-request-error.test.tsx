import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AuthRequestError } from "./auth-request-error";

describe("AuthRequestError", () => {
  it("announces a request failure inside the form", () => {
    render(<AuthRequestError message="Invalid mobile number or password." />);

    expect(screen.getByRole("alert")).toHaveTextContent("Invalid mobile number or password.");
  });

  it("does not render when there is no request failure", () => {
    const { container } = render(<AuthRequestError message="" />);

    expect(container).toBeEmptyDOMElement();
  });
});
