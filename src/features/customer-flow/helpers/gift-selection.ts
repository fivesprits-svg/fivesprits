export function selectionToQuantities(selectedProductIds: string[] = []) {
  return selectedProductIds.reduce<Record<string, number>>((quantities, productId) => {
    quantities[productId] = (quantities[productId] ?? 0) + 1;
    return quantities;
  }, {});
}

export function quantitiesToSelection(quantities: Record<string, number>) {
  return Object.entries(quantities).flatMap(([productId, quantity]) =>
    Array.from({ length: quantity }, () => productId),
  );
}
