import Link from "next/link";
import { connection } from "next/server";
import { revalidateTag } from "next/cache";
import { computePrimes, getCachedPrimes } from "@/app/lib/expensiveComputation";

const LIMIT = 50_000_000;

async function revalidatePrimesCache() {
  "use server";
  revalidateTag("primes-demo", "max");
}

function measureRaw(limit: number) {
  const start = performance.now();
  const result = computePrimes(limit);
  return { result, duration: Math.round(performance.now() - start) };
}

async function measureCached(limit: number) {
  const start = performance.now();
  const result = await getCachedPrimes(limit);
  return { result, duration: Math.round(performance.now() - start) };
}

export default async function UnstableCacheDemoPage() {
  await connection();

  const { result: raw, duration: durationRaw } = measureRaw(LIMIT);
  const { result: cached, duration: durationCached } = await measureCached(LIMIT);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/demo"
        className="mb-6 inline-block text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← Retour démo
      </Link>

      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        unstable_cache
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Mémoïsation serveur d&apos;une fonction de calcul coûteuse.
      </p>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
        <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">
          unstable_cache
        </code>{" "}
        enveloppe une fonction async et met son résultat en cache côté serveur.
        La colonne de gauche recalcule à chaque requête — celle de droite lit
        depuis le cache.
      </p>

      <section className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
        <p className="mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Code
        </p>
        <pre className="overflow-x-auto rounded bg-zinc-900 px-4 py-3 text-sm text-zinc-100">
          <code>{`import { unstable_cache } from "next/cache";

// Fonction coûteuse (crible d'Ératosthène)
export function computePrimes(limit: number) { ... }

// Version mise en cache
export const getCachedPrimes = unstable_cache(
  async (limit: number) => computePrimes(limit),
  ["primes"],               // clé de cache
  { tags: ["primes-demo"] } // pour revalidation
);`}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
          Comparaison sur cette requête
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-700">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Sans cache
            </p>
            <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {durationRaw} ms
            </p>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              {raw.count.toLocaleString("fr-FR")} premiers · somme{" "}
              {raw.sum.toLocaleString("fr-FR")}
            </p>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-800 dark:bg-emerald-900/10">
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Avec unstable_cache
            </p>
            <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {durationCached} ms
            </p>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              {cached.count.toLocaleString("fr-FR")} premiers · somme{" "}
              {cached.sum.toLocaleString("fr-FR")}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          Rechargez la page : la colonne gauche reste lente, la droite reste à
          ~0 ms. Le cache survit entre les requêtes.
        </p>

        <form action={revalidatePrimesCache} className="mt-4">
          <button
            type="submit"
            className="rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Vider le cache
          </button>
        </form>
        <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
          Après avoir vidé le cache, rechargez — la droite sera lente une fois,
          puis rapide à nouveau.
        </p>
      </section>
    </div>
  );
}
