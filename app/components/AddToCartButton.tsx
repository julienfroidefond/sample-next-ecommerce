"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

type Props = {
  disabled: boolean;
  slug: string;
  name: string;
  price: number;
  currency: string;
};

export function AddToCartButton({
  disabled,
  slug,
  name,
  price,
  currency,
}: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart({ slug, name, price, currency });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className="w-full rounded-xl bg-zinc-900 px-6 py-4 font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      {disabled ? "Indisponible" : added ? "Ajouté !" : "Ajouter au panier"}
    </button>
  );
}
