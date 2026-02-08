"use client";

import Link from "next/link";
import { useState } from "react";

export default function DemoPage() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("Erreur volontaire pour tester la boundary.");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Démo
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        loading.tsx et error.tsx du segment (front).
      </p>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:gap-8">
        <section className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
            Loading
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Skeleton 2 s puis contenu.
          </p>
          <Link
            href="/demo/loading"
            className="mt-3 inline-block rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Tester le loading
          </Link>
        </section>

        <section className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
            Error boundary
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Affiche error.tsx puis Réessayer.
          </p>
          <button
            type="button"
            onClick={() => setShouldThrow(true)}
            className="mt-3 rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Déclencher l&apos;erreur
          </button>
        </section>
      </div>
    </div>
  );
}
