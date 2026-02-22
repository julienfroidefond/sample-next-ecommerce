import Link from "next/link";
import { CartSummary } from "@/app/components/CartSummary";

export function Nav() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-xl font-semibold">
          News App
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:underline">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/demo" className="hover:underline">
                Démo
              </Link>
            </li>
            <li>
              <Link
                href="/admin"
                className="text-zinc-500 hover:text-zinc-900 hover:underline dark:text-zinc-500 dark:hover:text-zinc-100"
              >
                Admin
              </Link>
            </li>
          </ul>
          <Link
            href="/login"
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/50"
          >
            Connexion
          </Link>
          <CartSummary />
        </div>
      </nav>
    </header>
  );
}
