import Link from "next/link";
import { Suspense } from "react";
import { getProducts } from "@/domains/catalog/repository/productRepository";
import { ProductsWithUse } from "./ProductsWithUse";

export default function DemoUseGetProductsPage() {
  const productsPromise = getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/demo"
        className="mb-6 inline-block text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← Retour démo
      </Link>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        use() (React)
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        La promise est créée côté serveur, le Client Component déplie avec{" "}
        <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">use()</code>
        .
      </p>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
        C&apos;est un <strong>fetch RSC</strong> : pas de <code>fetch()</code>{" "}
        côté navigateur. Le serveur exécute <code>getProducts()</code>, et quand
        la promise se résout, le résultat est streamé dans le payload RSC. Dans
        l&apos;onglet Network, tu vois le document HTML puis les requêtes RSC
        (stream) qui livrent les données, pas une API REST appelée par le
        client.
      </p>

      <section className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
        <p className="mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Code
        </p>
        <pre className="overflow-x-auto rounded bg-zinc-900 px-4 py-3 text-sm text-zinc-100">
          <code>{`// Server Component (page)
const productsPromise = getProducts();
return (
  <Suspense fallback={...}>
    <ProductsWithUse productsPromise={productsPromise} />
  </Suspense>
);

// Client Component
"use client";
import { use } from "react";
function ProductsWithUse({ productsPromise }) {
  const products = use(productsPromise);
  return ( ... );
}`}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
          Résultat
        </h2>
        <Suspense
          fallback={
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-700"
                />
              ))}
            </div>
          }
        >
          <ProductsWithUse productsPromise={productsPromise} />
        </Suspense>
      </section>
    </div>
  );
}
