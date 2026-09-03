import { comboOffers, giftOffer, giftProducts } from "@/features/customer-flow/data/offers";

describe("Figma offer catalogue", () => {
  it("contains the two combo offers shown in Figma", () => {
    expect(comboOffers).toHaveLength(2);
    expect(comboOffers[0].salePrice).toBe(3890);
    expect(comboOffers[0].items).toContain("1 × Sparkling Brut Celebration (750 ml) FREE");
  });

  it("matches the gift offer selection requirement", () => {
    expect(giftOffer.requiredQuantity).toBe(6);
    expect(giftOffer.gift).toBe("Premium Trolley");
    expect(giftProducts).toHaveLength(6);
  });
});
