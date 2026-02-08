"use client";

import {
  addItemToCart,
  getTotalArticles,
  getTotalPrice,
  type CartItem,
} from "@/domains/catalog/entity/cart";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type { CartItem } from "@/domains/catalog/entity/cart";

type CartContextValue = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  totalArticles: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => addItemToCart(prev, item));
  }, []);

  const totalArticles = useMemo(() => getTotalArticles(items), [items]);
  const totalPrice = useMemo(() => getTotalPrice(items), [items]);

  const value = useMemo<CartContextValue>(
    () => ({ items, addToCart, totalArticles, totalPrice }),
    [items, addToCart, totalArticles, totalPrice]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
