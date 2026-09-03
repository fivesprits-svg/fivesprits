export type Category = { id: string; name: string; image: string };
export type Brand = { id: string; categoryId: string; name: string; image: string };
export type Product = {
  id: string;
  brandId: string;
  name: string;
  pack: string;
  mrp: number;
  image: string;
};
