"use client";

import { useEffect } from "react";

export default function FrontError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/30">
        <h2 className="text-lg font-semibold text-red-800 dark:text-red-200">
          Une erreur est survenue
        </h2>
        <p className="mt-2 text-sm text-red-700 dark:text-red-300">
          {error.message}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
