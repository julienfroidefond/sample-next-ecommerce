"use client";

import { CartProvider } from "@/app/context/CartContext";

export function CartProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartProvider>{children}</CartProvider>;
}
