export default function FrontLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-14 text-center">
        <div className="mx-auto h-10 w-64 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700 sm:w-80" />
        <div className="mx-auto mt-4 h-5 max-w-2xl animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mx-auto mt-2 h-5 max-w-xl animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      </section>

      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800/50"
          >
            <div className="aspect-square rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="mt-4 h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="mt-2 h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="mt-4 h-10 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </section>
    </div>
  );
}
