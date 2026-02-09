import type { SimilarProduct } from "@/domains/catalog/entity/similarProduct";
import {
  findSimilarProductsBySlug,
  findSimilarProductsByProductId,
} from "@/domains/catalog/data/similarProductData";

export async function getSimilarProductsBySlug(
  slug: string
): Promise<SimilarProduct[]> {
  return findSimilarProductsBySlug(slug);
}

export async function getSimilarProductsByProductId(
  productId: string
): Promise<SimilarProduct[]> {
  return findSimilarProductsByProductId(productId);
}
