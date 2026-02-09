# News app : un ecommerce exemple

Ce site est un sample qui accompagne le cours Next.js. Application e-commerce type catalogue produits avec panier (cookie/session), fiche produit, produits similaires et zone admin.

## Prérequis

- **Node.js** 18+
- **pnpm** (recommandé) ou npm/yarn

## Installation

```bash
pnpm install
```

## Base de données

Le projet utilise **Prisma** avec **SQLite** (`dev.db`). Le client Prisma est généré dans `generated/prisma`.

```bash
# Appliquer les migrations
pnpm prisma migrate dev

# (Optionnel) Réinitialiser la DB et réappliquer les migrations + seed
pnpm prisma migrate reset

# Peupler la base (produits, paniers, similaires)
pnpm run db:seed
```

## Scripts

| Commande           | Description                            |
| ------------------ | -------------------------------------- |
| `pnpm dev`         | Serveur de développement (Next.js)     |
| `pnpm build`       | Build de production                    |
| `pnpm start`       | Démarrer le serveur en mode production |
| `pnpm lint`        | Linter ESLint                          |
| `pnpm run db:seed` | Exécuter le seed Prisma                |

## Structure du projet

- **`app/`** — App Router Next.js 16
  - **`(front)/`** — Pages publiques : accueil, about, fiche produit `produit/[slug]`, démo loading/error
  - **`(admin)/`** — Zone admin : tableau de bord, liste produits
  - **`api/`** — Routes API : `cart`, `products`
  - **`components/`** — Composants partagés (Nav, Footer, ProductCard, AddToCartButton, etc.)
  - **`lib/`** — Utilitaires (ex. `cartCookie`)
- **`domains/catalog/`** — Domaine catalogue : entités, repositories, données (Product, Cart, SimilarProduct)
- **`prisma/`** — Schéma, migrations, seed
- **`generated/prisma`** — Client Prisma généré

## Stack

- **Next.js 16**, React 19
- **Prisma 7** + SQLite (better-sqlite3)
- **Tailwind CSS 4**
- **TypeScript 5**

Images externes autorisées (config) : `images.unsplash.com`.

---

## Description du cours

Ce cours plonge les étudiants dans le framework Next.js, un outil moderne permettant de créer des applications React performantes avec des fonctionnalités intégrées pour le rendu côté serveur (SSR), le rendu statique (SSG) et la gestion des routes. Les étudiants apprendront à configurer et à déployer des applications web avec Next.js, tout en explorant des concepts avancés comme la génération de pages statiques, le rendu dynamique côté serveur et l'optimisation des performances web. Le cours couvrira également l'intégration de bases de données, l'authentification, la gestion de l'état avec des outils comme Redux ou Context API, et l'utilisation des API pour créer des applications full stack. En combinant théorie et projets pratiques, les étudiants seront prêts à développer des applications web modernes et performantes, tout en respectant les meilleures pratiques du développement front-end et full stack.

## Objectifs pédagogiques

- Comprendre les concepts fondamentaux de Next.js, y compris le rendu côté serveur (SSR) et la génération de pages statiques (SSG).
- Apprendre à développer des applications React avec Next.js, en utilisant le routage dynamique, la gestion de l'état, et l'optimisation des performances.
- Mettre en œuvre des techniques d'optimisation web, comme le chargement différé (lazy loading), le pré-chargement de données, et l'optimisation des images.
- Intégrer des API RESTful et GraphQL dans une application Next.js pour gérer les données dynamiques côté client et serveur.
- Gérer l'authentification et les sessions utilisateur dans une application Next.js à l'aide de bibliothèques comme next-auth.

### Par jour en détail

#### Jour 1 – Fondations & App Router

**Objectif pédagogique global**  
Comprendre et adopter le nouveau paradigme Next.js (Server-first) afin de poser des bases architecturales solides et performantes.

*À l'issue de la journée, les participants seront capables de :*

- Expliquer le changement de paradigme SPA → Next.js hybride (serveur + client) et ses impacts sur performance, SEO et UX
- Distinguer clairement Server Components vs Client Components, leurs responsabilités et leurs contraintes
- Utiliser correctement l'App Router comme un arbre de rendu (layouts, pages, segments), et non comme un simple routeur
- Structurer une application avec les conventions Next.js (`app/`, fichiers spéciaux, route groups)
- Appliquer le principe « Server by default, client by exception »
- Éviter les anti-patterns structurels hérités du monde SPA
- Mettre en place les fondations d'un back-office Next.js (routes dynamiques, colocation, premiers RSC)

---

#### Jour 2 – Data Fetching & Rendering

**Objectif pédagogique global**  
Maîtriser le rendu et le cache comme primitives centrales de Next.js pour construire des pages rapides, scalables et cohérentes.

*À l'issue de la journée, les participants seront capables de :*

- Comprendre que `fetch` est une API de rendu, intégrée au cache global de Next.js
- Choisir consciemment entre Static Rendering, ISR, Dynamic Rendering
- Mettre en œuvre : cache par défaut, revalidation temporelle (ISR), revalidation par tag
- Utiliser les mécanismes avancés de cache : `cache()`, `unstable_cache`, `use cache`
- Exploiter le streaming serveur avec Suspense, `loading.tsx`, slots parallèles
- Comprendre l'impact du rendu sur la performance perçue, la charge serveur et la scalabilité
- Identifier et éviter les anti-patterns data (fetch client inutile, double fetching, cache désactivé par défaut)
- Comparer concrètement les stratégies de rendu via un atelier expérimental

---

#### Jour 3 – Navigation, Actions & Mutations

**Objectif pédagogique global**  
Construire des flux applicatifs complets, sécurisés et cohérents dans une architecture Server-first.

*À l'issue de la journée, les participants seront capables de :*

- Comprendre que la navigation Next.js orchestre rendu + cache, pas seulement l'URL
- Utiliser correctement `<Link>` et le préfetch ; `useRouter`, `usePathname`, `useSearchParams` (en observation, pas en logique métier)
- Implémenter des Route Handlers alignés avec l'arborescence applicative
- Choisir entre Node runtime et Edge runtime selon les cas d'usage
- Gérer l'état HTTP serveur : `headers()`, `cookies()`
- Concevoir et utiliser des Server Actions pour les mutations, la sécurité et la revalidation automatique du cache
- Appliquer le pattern clé : **Mutation → Revalidation → Redirect**
- Mettre en place une gestion d'erreurs unifiée (Server Actions + error boundaries)
- Utiliser le middleware à bon escient (auth, permissions, feature flags)
- Éviter les anti-patterns critiques (fetch client pour mutations, logique métier dans le middleware)
- Implémenter un flux d'authentification et de mutation complet en atelier

---

#### Jour 4 – Performance, Production & Architecture avancée

**Objectif pédagogique global**  
Rendre une application Next.js réellement « production-ready » : performante, observable, maintenable et industrialisable.

*À l'issue de la journée, les participants seront capables de :*

- Mesurer la performance réelle via les Core Web Vitals (TTFB, LCP, INP)
- Appliquer la règle d'or : moins de JavaScript = plus de performance
- Réduire le JS client grâce à : Server Components, dynamic imports, analyse de bundle (`next build --analyze`)
- Concevoir une stratégie de cache multi-niveaux (Next.js, CDN, cache applicatif)
- Gérer correctement les metadata SEO et le SEO via Server Components
- Debugger efficacement les Server Components en production
- Comprendre le fonctionnement réel de `next build` : compilation, tree-shaking, pré-rendu
- Sécuriser et gérer les variables d'environnement
- Choisir une stratégie de déploiement : Vercel ou self-hosting
- Mettre en place une architecture B2B scalable (feature folders, colocation, server-first)
- Planifier une migration Pages Router → App Router
- Identifier et corriger les anti-patterns de production
- Réaliser un audit complet de performance et d'architecture sur une application existante
