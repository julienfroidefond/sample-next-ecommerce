"use client";

import { use } from "react";
import { ProductGrid } from "@/app/(front)/demo/get-products/ProductGrid";
import type { Product } from "@/domains/catalog/entity/product";

export function ProductsWithUse({
  productsPromise,
}: {
  productsPromise: Promise<Product[]>;
}) {
  const products = use(productsPromise);
  return <ProductGrid products={products} />;
}
