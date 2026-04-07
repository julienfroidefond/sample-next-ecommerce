import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { createSchema, createYoga } from "graphql-yoga";
import { products } from "./data.js";

const PUBLIC_DIR = new URL("./public", import.meta.url).pathname;
const MIME_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Image {
      url: String!
    }

    type MoneyV2 {
      amount: String!
      currencyCode: String!
    }

    type PriceRange {
      minVariantPrice: MoneyV2!
    }

    type Product {
      id: ID!
      title: String!
      handle: String!
      description: String!
      featuredImage: Image
      priceRange: PriceRange!
    }

    type ProductConnection {
      nodes: [Product!]!
    }

    type Query {
      products(first: Int!): ProductConnection!
      productByHandle(handle: String!): Product
    }
  `,
  resolvers: {
    Query: {
      products: (_parent, { first }) => ({
        nodes: products.slice(0, first),
      }),
      productByHandle: (_parent, { handle }) =>
        products.find((p) => p.handle === handle) ?? null,
    },
  },
});

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/2024-01/graphql.json",
  landingPage: false,
  graphiql: {
    endpoint: "/api/2024-01/graphql.json",
    defaultQuery: `# 🎮 Bienvenue sur l'API GraphQL du Store Consoles !
#
# Voici quelques exemples de requêtes à tester :

# ── Récupérer les 6 premiers produits ──────────────────
query GetProducts {
  products(first: 6) {
    nodes {
      id
      title
      handle
      description
      featuredImage {
        url
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
}

# ── Récupérer un produit par son handle ────────────────
# query GetProductByHandle {
#   productByHandle(handle: "playstation-5-edition-standard") {
#     id
#     title
#     description
#     featuredImage {
#       url
#     }
#     priceRange {
#       minVariantPrice {
#         amount
#         currencyCode
#       }
#     }
#   }
# }

# ── Avec une variable ─────────────────────────────────
# query GetProductByHandle($handle: String!) {
#   productByHandle(handle: $handle) {
#     id
#     title
#     handle
#     description
#     featuredImage {
#       url
#     }
#     priceRange {
#       minVariantPrice {
#         amount
#         currencyCode
#       }
#     }
#   }
# }
#
# Variables (à coller dans le panneau "Variables") :
# { "handle": "xbox-series-x" }
`,
  },
});

const server = createServer(async (req, res) => {
  // Serve static files from /images/*
  if (req.url?.startsWith("/images/")) {
    const filePath = join(PUBLIC_DIR, req.url);
    const ext = extname(filePath);
    const mime = MIME_TYPES[ext];
    if (mime) {
      try {
        const data = await readFile(filePath);
        res.writeHead(200, { "Content-Type": mime, "Cache-Control": "public, max-age=86400" });
        res.end(data);
        return;
      } catch {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
    }
  }
  // Everything else goes to Yoga (GraphQL)
  yoga(req, res);
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Mock GraphQL server running at http://localhost:${port}/api/2024-01/graphql.json`);
});
