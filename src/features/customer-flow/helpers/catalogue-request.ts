/**
 * Results belong to the URL query that fetched them. Do not render an older
 * result set while navigation to a new query is still loading.
 */
export function canRenderCatalogueResults(
  loadedQueryKey: string | null,
  activeQueryKey: string,
  isLoading: boolean,
): boolean {
  return !isLoading && loadedQueryKey === activeQueryKey;
}
