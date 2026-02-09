import Link from "next/link";
import { ProductGrid } from "./ProductGrid";
import { getProducts } from "@/domains/catalog/repository/productRepository";

export default async function DemoGetProductsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/demo"
        className="mb-6 inline-block text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← Retour démo
      </Link>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        getProducts
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Exemple d&apos;utilisation dans un Server Component.
      </p>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
        Le <strong>async / await</strong> est essentiel ici : le composant est{" "}
        <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">async</code>
        , et on <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">await getProducts()</code> avant de rendre. Le serveur attend donc la fin du fetch avant d&apos;envoyer le HTML — la première réponse contient déjà toute la liste. Sans <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">await</code>, tu enverrais une promise (objet) au lieu des données, et le rendu planterait ou serait vide. Par ailleurs, tout <strong>l&apos;arbre est bloquant</strong> : si des composants enfants font eux aussi des <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">await</code>, le serveur attend que tous soient résolus avant d&apos;envoyer le HTML — pas de stream par sous-partie tant qu&apos;on n&apos;utilise pas des boundaries (Suspense, etc.).
      </p>

      <section className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
        <p className="mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Code
        </p>
        <pre className="overflow-x-auto rounded bg-zinc-900 px-4 py-3 text-sm text-zinc-100">
          <code>{`import { getProducts } from "@/domains/catalog/repository/productRepository";

export default async function Page() {
  const products = await getProducts();
  return ( ... );  // produits dispo dans \`products\`
}`}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
          Résultat ({products.length} produits)
        </h2>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
