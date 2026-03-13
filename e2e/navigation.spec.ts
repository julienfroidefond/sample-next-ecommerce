import { test, expect } from "@playwright/test";

test.describe("Navigation et catalogue", () => {
  test("la page d'accueil affiche les produits", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/News App/);
    const products = page.getByTestId("product-card");
    await expect(products.first()).toBeVisible();
  });

  test("cliquer sur un produit mène à la fiche produit", async ({ page }) => {
    await page.goto("/");
    const firstCard = page.getByTestId("product-card").first();
    const productName = await firstCard.locator("h2").textContent();
    await firstCard.locator("a").click();
    await page.waitForURL(/\/produit\//);
    await expect(page.getByTestId("product-name")).toContainText(productName!);
  });

  test("le switch de langue change les textes", async ({ page }) => {
    await page.context().addCookies([
      { name: "NEXT_LOCALE", value: "fr", url: "http://localhost:3000" },
    ]);
    await page.goto("/");
    await expect(page.getByTestId("home-title")).toContainText("Nos produits");
    await page.getByTestId("lang-switch-en").click();
    await expect(page.getByTestId("home-title")).toContainText("Our products");
  });
});
