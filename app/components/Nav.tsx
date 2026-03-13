import Link from "next/link";
import { Suspense } from "react";
import { CartSummary } from "@/app/components/CartSummary";
import { NavAuth } from "@/app/components/NavAuth";

export function Nav() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-xl font-semibold">
          {process.env.NEXT_PUBLIC_SITE_NAME}
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
          </ul>
          <Suspense fallback={<div className="h-8 w-20" />}>
            <NavAuth />
          </Suspense>
          <CartSummary />
        </div>
      </nav>
    </header>
  );
}
