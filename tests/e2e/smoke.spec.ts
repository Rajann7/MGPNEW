import { expect, test } from "@playwright/test";

// Phase 3 smoke: the app serves its core public routes.
// Deep journey specs land with their owning phases (P04+).

test("homepage responds and renders", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.locator("body")).toBeVisible();
});

test("search page responds", async ({ page }) => {
  const response = await page.goto("/search");
  expect(response?.status()).toBe(200);
});

test("login page responds", async ({ page }) => {
  const response = await page.goto("/login");
  expect(response?.status()).toBe(200);
});
