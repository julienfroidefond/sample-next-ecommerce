"use client";

import { useRouter } from "next/navigation";

const locales = ["fr", "en"] as const;

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();

  const switchLang = (lang: string) => {
    document.cookie = `NEXT_LOCALE=${lang};path=/;max-age=31536000`;
    router.refresh();
  };

  return (
    <div className="flex gap-1">
      {locales.map((lang) => (
        <button
          key={lang}
          onClick={() => switchLang(lang)}
          className={`rounded px-2 py-1 text-xs font-medium uppercase transition ${
            lang === currentLang
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
