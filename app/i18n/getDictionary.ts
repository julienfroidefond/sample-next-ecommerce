import { cookies } from "next/headers";

const dictionaries = {
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;
export const locales: Locale[] = ["fr", "en"];
export const defaultLocale: Locale = "fr";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get("NEXT_LOCALE")?.value;
  if (value && value in dictionaries) return value as Locale;
  return defaultLocale;
}

export async function getDictionary(locale?: Locale) {
  const lng = locale ?? (await getLocale());
  return dictionaries[lng]();
}
