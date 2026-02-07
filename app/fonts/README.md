# Polices locales

Dépose ici tes fichiers de police pour le front (next/font/local).

**Fichier attendu par défaut :** `Display-Regular.woff2`  
→ utilisé comme police “display” sur le front (voir `app/layout.tsx`).

Tu peux renommer ton fichier en `Display-Regular.woff2` ou adapter le `src` dans `app/layout.tsx` pour pointer vers ton nom de fichier.

**Formats supportés :** `.woff2` (recommandé), `.woff`, `.ttf`, `.otf`.

**Plusieurs graisses (ex. 400 + 700) :** dans `layout.tsx`, remplace `src` par :

```ts
src: [
  { path: "./fonts/MaFont-Regular.woff2", weight: "400" },
  { path: "./fonts/MaFont-Bold.woff2", weight: "700" },
],
```

Puis lance le build / dev : next/font optimise et self-host la police (pas de CLS, pas d’appel à Google Fonts).
