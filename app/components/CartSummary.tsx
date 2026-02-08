"use client";

import { useCart } from "@/app/context/CartContext";
import { getCartCurrency } from "@/domains/catalog/entity/cart";

export function CartSummary() {
  const { totalArticles, totalPrice, items } = useCart();
  const currency = getCartCurrency(items) ?? "EUR";

  if (totalArticles === 0) return null;

  return (
    <span className="rounded-full bg-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
      {totalArticles} article{totalArticles > 1 ? "s" : ""} · {totalPrice.toFixed(2)} {currency}
    </span>
  );
}
