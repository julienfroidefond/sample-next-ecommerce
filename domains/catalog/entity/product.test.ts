import { describe, it, expect } from "vitest";
import {
  isInStock,
  isLowStock,
  formatPrice,
  formatStockLabel,
  formatSpecLabel,
  formatSpecValue,
  getProductPath,
  type Product,
} from "./product";

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: "1",
  name: "Casque Audio",
  slug: "casque-audio",
  description: "Un super casque",
  price: 99.99,
  currency: "€",
  stock: 25,
  sku: "CSQ-001",
  category: "Audio",
  brand: "SoundTech",
  images: { main: "/img.jpg", gallery: [] },
  specs: {},
  ...overrides,
});

describe("isInStock", () => {
  it("retourne true si stock > 0", () => {
    expect(isInStock(makeProduct({ stock: 5 }))).toBe(true);
  });

  it("retourne false si stock = 0", () => {
    expect(isInStock(makeProduct({ stock: 0 }))).toBe(false);
  });
});

describe("isLowStock", () => {
  it("retourne true si stock entre 1 et le seuil", () => {
    expect(isLowStock(makeProduct({ stock: 3 }))).toBe(true);
  });

  it("retourne false si stock > seuil par défaut (10)", () => {
    expect(isLowStock(makeProduct({ stock: 15 }))).toBe(false);
  });

  it("retourne false si stock = 0", () => {
    expect(isLowStock(makeProduct({ stock: 0 }))).toBe(false);
  });

  it("accepte un seuil custom", () => {
    expect(isLowStock(makeProduct({ stock: 20 }), 25)).toBe(true);
  });
});

describe("formatPrice", () => {
  it("formate le prix avec 2 décimales et la devise", () => {
    expect(formatPrice(makeProduct({ price: 99.9, currency: "€" }))).toBe("99.90 €");
  });

  it("gère les prix entiers", () => {
    expect(formatPrice(makeProduct({ price: 50, currency: "$" }))).toBe("50.00 $");
  });
});

describe("formatStockLabel", () => {
  it("affiche le stock avec pluriel", () => {
    expect(formatStockLabel(makeProduct({ stock: 25 }))).toBe("En stock (25 disponibles)");
  });

  it("affiche le stock sans pluriel pour 1", () => {
    expect(formatStockLabel(makeProduct({ stock: 1 }))).toBe("En stock (1 disponible)");
  });

  it("affiche rupture de stock", () => {
    expect(formatStockLabel(makeProduct({ stock: 0 }))).toBe("Rupture de stock");
  });
});

describe("formatSpecLabel", () => {
  it("transforme camelCase en label lisible", () => {
    expect(formatSpecLabel("batteryLife")).toBe("Battery Life");
  });

  it("capitalise la première lettre", () => {
    expect(formatSpecLabel("color")).toBe("Color");
  });
});

describe("formatSpecValue", () => {
  it("affiche Oui pour true", () => {
    expect(formatSpecValue(true)).toBe("Oui");
  });

  it("affiche Non pour false", () => {
    expect(formatSpecValue(false)).toBe("Non");
  });

  it("convertit les nombres en string", () => {
    expect(formatSpecValue(42)).toBe("42");
  });
});

describe("getProductPath", () => {
  it("retourne le chemin vers la fiche produit", () => {
    expect(getProductPath(makeProduct({ slug: "mon-produit" }))).toBe("/produit/mon-produit");
  });
});
