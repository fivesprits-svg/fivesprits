import type { Brand, Category } from "@/features/customer-flow/types";

export const resolveCategory = (id?: string | null, list: Category[] = []) =>
  list.find((item) => item.id === id) ?? null;

export const resolveBrand = (id?: string | null, list: Brand[] = []) =>
  list.find((item) => item.id === id) ?? null;
