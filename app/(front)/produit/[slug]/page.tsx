import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { AddToCartButton } from "@/app/components/AddToCartButton";
import { ProductTabs } from "@/app/components/ProductTabs";
import { SimilarProducts } from "@/app/components/SimilarProducts";
import {
  formatPrice,
  formatStockLabel,
  isInStock,
} from "@/domains/catalog/entity/product";
import { getProductBySlug } from "@/domains/catalog/repository/productRepository";

export default async function ProductPage(props: PageProps<"/produit/[slug]">) {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p>Produit introuvable.</p>
      </div>
    );
  }

  const inStock = isInStock(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-200">
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-900 dark:text-zinc-200">{product.name}</span>
      </nav>

      <Suspense
        fallback={
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="aspect-square animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
            <div className="space-y-4">
              <div className="h-10 w-3/4 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-64 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            </div>
          </div>
        }
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={product.images.main}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {product.images.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.gallery.map((url, i) => (
                  <div
                    key={i}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700"
                  >
                    <Image
                      src={url}
                      alt={`${product.name} - vue ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {product.brand} · {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              {product.name}
            </h1>

            <Suspense
              fallback={
                <div className="mt-4 h-32 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
              }
            >
              <ProductTabs slug={slug} product={product} />
            </Suspense>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {formatPrice(product)}
              </span>
              <span
                className={
                  inStock
                    ? "text-sm text-emerald-600 dark:text-emerald-400"
                    : "text-sm text-zinc-500 dark:text-zinc-400"
                }
              >
                {formatStockLabel(product)}
              </span>
            </div>

            <div className="mt-8">
              <AddToCartButton
                disabled={!inStock}
                slug={product.slug}
                name={product.name}
                price={product.price}
                currency={product.currency}
              />
            </div>

            <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
              Réf. {product.sku}
            </p>
          </div>
        </div>

        <Suspense
          fallback={
            <section className="mt-16 border-t border-zinc-200 pt-12 dark:border-zinc-800">
              <div className="h-8 w-48 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-72 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800"
                  />
                ))}
              </div>
            </section>
          }
        >
          <SimilarProducts slug={slug} />
        </Suspense>
      </Suspense>
    </div>
  );
}
