import { brands, categories } from "@/features/customer-flow/data/catalogue";
export const resolveCategory = (id?: string | null) =>
  categories.find((item) => item.id === id) ?? null;
export const resolveBrand = (id?: string | null) => brands.find((item) => item.id === id) ?? null;
