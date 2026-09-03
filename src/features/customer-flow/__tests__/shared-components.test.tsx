import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuantityStepper } from "@/features/customer-flow/components/quantity-stepper";

describe("QuantityStepper", () => {
  it("exposes labelled increment and decrement controls", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantityStepper value={2} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    await user.click(screen.getByRole("button", { name: "Decrease quantity" }));
    expect(onChange).toHaveBeenNthCalledWith(1, 3);
    expect(onChange).toHaveBeenNthCalledWith(2, 1);
  });

  it("does not decrement below one", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantityStepper value={1} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Decrease quantity" }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
