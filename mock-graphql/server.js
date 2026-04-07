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
  graphiql: false,
});

const GRAPHIQL_HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>GraphQL Store Consoles</title>
  <link rel="stylesheet" href="https://unpkg.com/graphiql@3.7.0/graphiql.min.css" />
</head>
<body style="margin:0;height:100vh">
  <div id="graphiql" style="height:100vh"></div>
  <script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/graphiql@3.7.0/graphiql.min.js"></script>
  <script>
    const root = ReactDOM.createRoot(document.getElementById('graphiql'));
    const fetcher = GraphiQL.createFetcher({ url: '/api/2024-01/graphql.json' });
    root.render(
      React.createElement(GraphiQL, {
        fetcher,
        defaultTabs: [
          {
            query: '# Récupérer les 6 premiers produits\\nquery GetProducts {\\n  products(first: 6) {\\n    nodes {\\n      id\\n      title\\n      handle\\n      description\\n      featuredImage { url }\\n      priceRange {\\n        minVariantPrice { amount currencyCode }\\n      }\\n    }\\n  }\\n}',
          },
          {
            query: '# Récupérer un produit par son handle\\nquery GetProductByHandle($handle: String!) {\\n  productByHandle(handle: $handle) {\\n    id\\n    title\\n    handle\\n    description\\n    featuredImage { url }\\n    priceRange {\\n      minVariantPrice { amount currencyCode }\\n    }\\n  }\\n}',
            variables: '{ "handle": "xbox-series-x" }',
          },
          {
            query: '# Juste les titres et prix des 3 premiers\\nquery GetProducts {\\n  products(first: 3) {\\n    nodes {\\n      title\\n      priceRange {\\n        minVariantPrice { amount currencyCode }\\n      }\\n    }\\n  }\\n}',
          }
        ],
      })
    );
  </script>
</body>
</html>`;

const server = createServer(async (req, res) => {
  // Serve GraphiQL UI at root
  if (req.url === "/" || req.url === "/index.html") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(GRAPHIQL_HTML);
    return;
  }
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
