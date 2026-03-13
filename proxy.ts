import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);
const PREFETCH_COOKIE = "ab_prefetch_variant";
const VARIANT_A = "A";
const VARIANT_B = "B";
type PrefetchVariant = typeof VARIANT_A | typeof VARIANT_B;

function isPrefetchVariant(value?: string): value is PrefetchVariant {
  return value === VARIANT_A || value === VARIANT_B;
}

function pickRandomVariant(): PrefetchVariant {
  return Math.random() < 0.5 ? VARIANT_A : VARIANT_B;
}

function resolvePrefetchVariant(forced?: string, fromCookie?: string): PrefetchVariant {
  if (isPrefetchVariant(forced)) return forced;
  if (isPrefetchVariant(fromCookie)) return fromCookie;
  return pickRandomVariant();
}

function isFrontPath(pathname: string): boolean {
  return pathname === "/" || pathname.startsWith("/produit");
}

const LOCALE_COOKIE = "NEXT_LOCALE";
const SUPPORTED_LOCALES = ["fr", "en"];
const DEFAULT_LOCALE = "fr";

function detectLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  // Parse "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7" → cherche la première langue supportée
  const preferred = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0].trim().split("-")[0].toLowerCase());
  return preferred.find((lang) => SUPPORTED_LOCALES.includes(lang)) ?? DEFAULT_LOCALE;
}

export default auth((req) => {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (req.auth?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  const res = NextResponse.next();

  // Détection de la langue du navigateur si pas de cookie
  if (!req.cookies.has(LOCALE_COOKIE)) {
    const locale = detectLocale(req.headers.get("Accept-Language"));
    res.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  if (isFrontPath(req.nextUrl.pathname)) {
    const forcedVariant = req.nextUrl.searchParams.get("ab_prefetch")?.toUpperCase();
    const cookieVariant = req.cookies.get(PREFETCH_COOKIE)?.value;
    const variant = resolvePrefetchVariant(forcedVariant, cookieVariant);

    if (cookieVariant !== variant) {
      res.cookies.set(PREFETCH_COOKIE, variant, {
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
  }

  return res;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
