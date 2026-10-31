import { describe, expect, it } from "vitest";
import { hasImageSource } from "./image-source";

describe("hasImageSource", () => {
  it("rejects blank image URLs so cards render their placeholder", () => {
    expect(hasImageSource("")).toBe(false);
    expect(hasImageSource("   ")).toBe(false);
    expect(hasImageSource("/category.png")).toBe(true);
  });
});
