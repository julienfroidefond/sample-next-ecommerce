import Link from "next/link";
import { Suspense } from "react";
import { CartSummary } from "@/app/components/CartSummary";
import { NavAuth } from "@/app/components/NavAuth";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { getDictionary, getLocale } from "@/app/i18n/getDictionary";

export async function Nav() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

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
                {dict.nav.home}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                {dict.nav.about}
              </Link>
            </li>
            <li>
              <Link href="/demo" className="hover:underline">
                {dict.nav.demo}
              </Link>
            </li>
          </ul>
          <LanguageSwitcher currentLang={locale} />
          <Suspense fallback={<div className="h-8 w-20" />}>
            <NavAuth />
          </Suspense>
          <CartSummary />
        </div>
      </nav>
    </header>
  );
}
