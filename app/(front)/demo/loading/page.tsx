export default async function DemoLoadingPage() {
  await new Promise((r) => setTimeout(r, 2000));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Loading terminé
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Tu as vu le skeleton pendant 2 secondes.
      </p>
    </div>
  );
}
