import { connection } from "next/server";
import { cookies } from "next/headers";
import { ProductCard } from "../components/ProductCard";
import { SponsoredProducts } from "../components/SponsoredProducts";
import { getProducts } from "@/domains/catalog/repository/productRepository";
import { getDictionary } from "@/app/i18n/getDictionary";

export default async function Home() {
  await connection();
  const dict = await getDictionary();
  const variant = (await cookies()).get("ab_prefetch_variant")?.value;
  const prefetchMode = variant === "B" ? "hover" : "auto";
  const products = await getProducts();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-14 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          {dict.home.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          {dict.home.subtitle}
        </p>
      </section>

      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} prefetchMode={prefetchMode} />
        ))}
      </section>

      <SponsoredProducts limit={6} linkToInternal />
    </div>
  );
}
