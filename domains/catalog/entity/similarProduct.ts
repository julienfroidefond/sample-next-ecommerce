import type { Product } from "./product";

/** Produit similaire : produit + score optionnel (ordre d'affichage) */
export type SimilarProduct = {
  product: Product;
  score?: number;
};

export function getSimilarProductPath(similar: SimilarProduct): string {
  return `/produit/${similar.product.slug}`;
}
