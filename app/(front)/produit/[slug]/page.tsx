import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/app/components/AddToCartButton";
import {
  formatPrice,
  formatSpecLabel,
  formatSpecValue,
  formatStockLabel,
  isInStock,
} from "@/domains/catalog/entity/product";
import { getProductBySlug } from "@/domains/catalog/repository/productRepository";

const TAB_DESCRIPTION = "description";
const TAB_SPECS = "specs";
const VALID_TABS = [TAB_DESCRIPTION, TAB_SPECS] as const;

export default async function ProductPage(props: PageProps<"/produit/[slug]">) {
  const { slug } = await props.params;
  const { tab: tabParam } = await props.searchParams;
  const tab = VALID_TABS.includes(tabParam as (typeof VALID_TABS)[number])
    ? (tabParam as (typeof VALID_TABS)[number])
    : TAB_DESCRIPTION;

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

          <div className="mt-4 flex gap-2 border-b border-zinc-200 dark:border-zinc-700">
            <Link
              href={`/produit/${slug}?tab=${TAB_DESCRIPTION}`}
              className={`border-b-2 px-2 pb-2 text-sm font-medium transition-colors ${
                tab === TAB_DESCRIPTION
                  ? "border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
              }`}
            >
              Description
            </Link>
            <Link
              href={`/produit/${slug}?tab=${TAB_SPECS}`}
              className={`border-b-2 px-2 pb-2 text-sm font-medium transition-colors ${
                tab === TAB_SPECS
                  ? "border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
              }`}
            >
              Caractéristiques
            </Link>
          </div>
          <div className="mt-4 text-zinc-600 dark:text-zinc-400">
            {tab === TAB_DESCRIPTION && (
              <p className="text-lg">{product.description}</p>
            )}
            {tab === TAB_SPECS && (
              <dl className="space-y-2 text-sm">
                {Object.entries(product.specs).map(([key, value]) =>
                  value !== undefined && value !== null ? (
                    <div key={key} className="flex justify-between gap-4">
                      <dt className="text-zinc-500 dark:text-zinc-400">
                        {formatSpecLabel(key)}
                      </dt>
                      <dd>{formatSpecValue(value)}</dd>
                    </div>
                  ) : null
                )}
                {Object.keys(product.specs).length === 0 && (
                  <p className="text-zinc-500">Aucune caractéristique.</p>
                )}
              </dl>
            )}
          </div>

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
    </div>
  );
}
