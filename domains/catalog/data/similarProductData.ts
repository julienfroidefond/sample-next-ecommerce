import { prisma } from "@/lib/prisma";
import { mapRowToProduct } from "@/domains/catalog/data/productData";
import type { SimilarProduct } from "@/domains/catalog/entity/similarProduct";

export async function findSimilarProductsByProductId(
  productId: string
): Promise<SimilarProduct[]> {
  const rows = await prisma.similarProduct.findMany({
    where: { productId },
    include: { similarProduct: true },
    orderBy: { score: "asc" },
  });
  return rows.map((row) => ({
    product: mapRowToProduct(row.similarProduct),
    score: row.score ?? undefined,
  }));
}

export async function findSimilarProductsBySlug(
  slug: string
): Promise<SimilarProduct[]> {
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!product) return [];
  return findSimilarProductsByProductId(product.id);
}
