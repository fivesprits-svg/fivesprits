import { describe, expect, it } from "vitest";
import { mapRequirementHistory } from "./requirement-history";

describe("mapRequirementHistory", () => {
  it("maps a newly created order for immediate display in requirement history", () => {
    expect(
      mapRequirementHistory([
        {
          _id: "order-1",
          orderNumber: "REQ-001",
          status: "Pending",
          createdAt: "2026-10-31T08:00:00.000Z",
          totalItems: 1,
          totalMrp: 500,
          totalSalePrice: 450,
          items: [
            { productId: "product-1", name: "Whisky", pack: "750ml", quantity: 1, salePrice: 450 },
          ],
        },
      ]),
    ).toEqual([
      expect.objectContaining({
        id: "order-1",
        requirementNo: "REQ-001",
        status: "Pending",
        totalItems: 1,
        totalOriginalMrp: 500,
        totalSalePrice: 450,
        items: [{ name: "Whisky", pack: "750ml", quantity: 1, price: 450, image: "" }],
      }),
    ]);
  });
});
