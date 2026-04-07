const BASE_URL = process.env.PUBLIC_URL || "http://mock-graphql.sample-next-ecommerce.orb.local";

// Catalogue d'un vendeur exclusif de consoles de jeu — prix en euros
export const products = [
  {
    id: "gid://shopify/Product/2001",
    title: "PlayStation 5 Édition Standard",
    handle: "playstation-5-edition-standard",
    description:
      "La PS5 avec lecteur Blu-ray Ultra HD. Profitez du ray-tracing, du SSD ultra-rapide et du retour haptique de la manette DualSense pour une expérience de jeu nouvelle génération.",
    featuredImage: {
      url: `${BASE_URL}/images/ps5-standard.jpg`,
    },
    priceRange: {
      minVariantPrice: {
        amount: "549.99",
        currencyCode: "EUR",
      },
    },
  },
  {
    id: "gid://shopify/Product/2002",
    title: "PlayStation 5 Édition Digitale",
    handle: "playstation-5-edition-digitale",
    description:
      "La PS5 100% dématérialisée, sans lecteur de disque. Accédez à votre bibliothèque de jeux directement depuis le PlayStation Store. Design épuré et silencieux.",
    featuredImage: {
      url: `${BASE_URL}/images/ps5-digital.jpg`,
    },
    priceRange: {
      minVariantPrice: {
        amount: "449.99",
        currencyCode: "EUR",
      },
    },
  },
  {
    id: "gid://shopify/Product/2003",
    title: "Xbox Series X",
    handle: "xbox-series-x",
    description:
      "La console la plus puissante de Microsoft. 12 téraflops de puissance, SSD 1 To, compatibilité 4K à 120 fps et accès au Xbox Game Pass pour des centaines de jeux.",
    featuredImage: {
      url: `${BASE_URL}/images/xbox-series-x.jpg`,
    },
    priceRange: {
      minVariantPrice: {
        amount: "499.99",
        currencyCode: "EUR",
      },
    },
  },
  {
    id: "gid://shopify/Product/2004",
    title: "Xbox Series S",
    handle: "xbox-series-s",
    description:
      "La console next-gen la plus compacte de Microsoft. 100% digitale, performances solides en 1440p et prix accessible. Parfaite pour débuter dans l'écosystème Xbox.",
    featuredImage: {
      url: `${BASE_URL}/images/xbox-series-s.jpg`,
    },
    priceRange: {
      minVariantPrice: {
        amount: "299.99",
        currencyCode: "EUR",
      },
    },
  },
  {
    id: "gid://shopify/Product/2005",
    title: "Nintendo Switch OLED",
    handle: "nintendo-switch-oled",
    description:
      "La Switch avec un écran OLED 7 pouces aux couleurs éclatantes, un large support ajustable et 64 Go de stockage. Jouez en mode portable, sur table ou sur TV.",
    featuredImage: {
      url: `${BASE_URL}/images/nintendo-switch-oled.jpg`,
    },
    priceRange: {
      minVariantPrice: {
        amount: "349.99",
        currencyCode: "EUR",
      },
    },
  },
  {
    id: "gid://shopify/Product/2006",
    title: "Nintendo Switch Lite",
    handle: "nintendo-switch-lite",
    description:
      "La console portable par excellence. Légère, compacte et disponible en plusieurs coloris. Idéale pour jouer en déplacement à tout le catalogue Switch compatible.",
    featuredImage: {
      url: `${BASE_URL}/images/nintendo-switch-lite.jpg`,
    },
    priceRange: {
      minVariantPrice: {
        amount: "219.99",
        currencyCode: "EUR",
      },
    },
  },
  {
    id: "gid://shopify/Product/2007",
    title: "Steam Deck OLED 1 To",
    handle: "steam-deck-oled-1to",
    description:
      "Le PC portable de Valve avec écran OLED HDR 7,4 pouces, 1 To de stockage NVMe et une autonomie améliorée. Toute votre bibliothèque Steam dans la poche.",
    featuredImage: {
      url: `${BASE_URL}/images/steam-deck-oled.jpg`,
    },
    priceRange: {
      minVariantPrice: {
        amount: "679.00",
        currencyCode: "EUR",
      },
    },
  },
  {
    id: "gid://shopify/Product/2008",
    title: "SEGA Mega Drive Mini 2",
    handle: "sega-mega-drive-mini-2",
    description:
      "Replongez dans les années 90 avec cette réplique miniature de la Mega Drive. 60 jeux cultes préinstallés dont Sonic, Streets of Rage et Shining Force. Deux manettes incluses.",
    featuredImage: {
      url: `${BASE_URL}/images/retro-mega-drive.jpg`,
    },
    priceRange: {
      minVariantPrice: {
        amount: "109.99",
        currencyCode: "EUR",
      },
    },
  },
  {
    id: "gid://shopify/Product/2009",
    title: "Manette DualSense PS5 — Blanc Glacier",
    handle: "manette-dualsense-ps5-blanc-glacier",
    description:
      "La manette sans fil DualSense avec retour haptique, gâchettes adaptatives et micro intégré. Coloris Blanc Glacier, compatible PS5 et PC.",
    featuredImage: {
      url: `${BASE_URL}/images/manette-ps5.jpg`,
    },
    priceRange: {
      minVariantPrice: {
        amount: "69.99",
        currencyCode: "EUR",
      },
    },
  },
  {
    id: "gid://shopify/Product/2010",
    title: "Manette Xbox Elite Series 2 Core",
    handle: "manette-xbox-elite-series-2-core",
    description:
      "La manette pro Xbox avec palettes interchangeables, gâchettes réglables et grip caoutchouté. Jusqu'à 40 heures d'autonomie. Compatible Xbox et PC.",
    featuredImage: {
      url: `${BASE_URL}/images/manette-xbox.jpg`,
    },
    priceRange: {
      minVariantPrice: {
        amount: "139.99",
        currencyCode: "EUR",
      },
    },
  },
];
