export function hasImageSource(source?: string | null): source is string {
  return Boolean(source?.trim());
}
