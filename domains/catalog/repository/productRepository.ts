import type { Product } from "@/domains/catalog/entity/product";
import { findAllProducts, findProductBySlug as findProductBySlugInDb } from "@/domains/catalog/data/productData";

export async function getProducts(): Promise<Product[]> {
  return findAllProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return findProductBySlugInDb(slug);
}

export async function listProductsFromDb(): Promise<Product[]> {
  return getProducts();
}
